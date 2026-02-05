import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import sharp from "sharp";
import { cache } from "./cache";

// Pre-warm cache with all products for instant detail loading
async function warmupCache() {
  try {
    console.log("Warming up product cache...");
    const products = await storage.getProducts();
    products.forEach(product => {
      cache.set(`product:${product.id}`, product, 600); // 10 minutes
    });
    cache.set('products:all', products, 300); // 5 minutes
    
    const gridProducts = await storage.getProductsForGrid();
    cache.set('products:grid', gridProducts, 300); // 5 minutes
    
    console.log(`Cache warmed with ${products.length} products`);
  } catch (error) {
    console.error("Cache warmup failed:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Warm up cache on startup - await to ensure cache is ready before serving
  await warmupCache();
  
  // Get all products for grid view (optimized - only essential fields)
  app.get("/api/products/grid", async (req, res) => {
    try {
      const cacheKey = 'products:grid';
      let products = cache.get<any[]>(cacheKey);
      
      if (!products) {
        products = await storage.getProductsForGrid();
        cache.set(cacheKey, products, 300); // Cache for 5 minutes
      }
      
      res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
      res.json(products);
    } catch (error) {
      console.error("Error fetching products for grid:", error);
      res.status(500).json({ error: "Failed to fetch products", details: String(error) });
    }
  });

  // Get all products (full data - for admin)
  app.get("/api/products", async (req, res) => {
    try {
      const cacheKey = 'products:all';
      let products = cache.get<any[]>(cacheKey);
      
      if (!products) {
        products = await storage.getProducts();
        cache.set(cacheKey, products, 120); // Cache for 2 minutes
      }
      
      res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products", details: String(error) });
    }
  });

  // Get single product (with caching)
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cacheKey = `product:${id}`;
      let product = cache.get<any>(cacheKey);
      
      if (!product) {
        product = await storage.getProduct(id);
        if (product) {
          cache.set(cacheKey, product, 300); // Cache for 5 minutes
        }
      }
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get related products (with caching)
  app.get("/api/products/:id/related", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 4;
      const relatedProducts = await storage.getRelatedProducts(id, limit);
      res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
      res.json(relatedProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related products" });
    }
  });

  // Create product
  app.post("/api/products", async (req, res) => {
    try {
      const parsed = insertProductSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const product = await storage.createProduct(parsed.data);
      cache.invalidatePattern('^products:'); // Invalidate all product caches
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Update product
  app.patch("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const parsed = insertProductSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const product = await storage.updateProduct(id, parsed.data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      cache.invalidatePattern('^products:'); // Invalidate all product caches
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      cache.invalidatePattern('^products:'); // Invalidate all product caches
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // PUT/PATCH product (full update)
  const updateProductHandler = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      console.log("Update request for product", id);
      console.log("images count:", req.body.images?.length || 0);
      console.log("technicalDrawings count:", req.body.technicalDrawings?.length || 0);
      console.log("catalogueUrl:", req.body.catalogueUrl ? "present" : "empty");
      const parsed = insertProductSchema.safeParse(req.body);
      if (!parsed.success) {
        console.error("Validation failed:", parsed.error);
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const product = await storage.updateProduct(id, parsed.data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      cache.invalidatePattern('^products:'); // Invalidate all product caches
      res.json(product);
    } catch (error) {
      console.error("Failed to update product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  };
  
  app.put("/api/products/:id", updateProductHandler);

  // Compress image endpoint
  app.post("/api/compress-image", async (req, res) => {
    try {
      const { image, maxWidth = 800, quality = 70 } = req.body;
      
      if (!image || typeof image !== 'string') {
        return res.status(400).json({ error: "No image provided" });
      }

      // Extract base64 data
      const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: "Invalid base64 image format" });
      }

      const imageBuffer = Buffer.from(matches[2], 'base64');
      
      // Compress with sharp
      const compressed = await sharp(imageBuffer)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .jpeg({ quality: quality })
        .toBuffer();

      const compressedBase64 = `data:image/jpeg;base64,${compressed.toString('base64')}`;
      
      const originalSize = imageBuffer.length;
      const newSize = compressed.length;
      const savings = Math.round((1 - newSize / originalSize) * 100);

      res.json({ 
        image: compressedBase64,
        originalSize,
        newSize,
        savings: `${savings}%`
      });
    } catch (error) {
      console.error("Image compression error:", error);
      res.status(500).json({ error: "Failed to compress image" });
    }
  });

  return httpServer;
}
