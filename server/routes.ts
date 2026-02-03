import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import sharp from "sharp";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products", details: String(error) });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
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
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // PUT product (full update)
  app.put("/api/products/:id", async (req, res) => {
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
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

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
