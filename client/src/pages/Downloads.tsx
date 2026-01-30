import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Download, Loader2, FolderOpen } from "lucide-react";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  series: string;
  brand: string;
  category: string;
  catalogueUrl: string | null;
}

export default function Downloads() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.filter((p: Product) => p.catalogueUrl));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const paralightProducts = products.filter(p => p.brand === "Paralight");
  const maglinearProducts = products.filter(p => p.brand === "Maglinear");

  const groupByCategory = (prods: Product[]) => {
    return prods.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };

  const paralightByCategory = groupByCategory(paralightProducts);
  const maglinearByCategory = groupByCategory(maglinearProducts);

  const CatalogueCard = ({ product }: { product: Product }) => (
    <a
      href={product.catalogueUrl || "#"}
      download={`${product.name}-Catalogue.pdf`}
      data-testid={`download-${product.id}`}
      className="group flex items-center gap-4 p-4 bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all rounded-lg"
    >
      <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded ${
        product.brand === "Paralight" ? "bg-[#00A8E8]/10" : "bg-[#ECAA00]/10"
      }`}>
        <FileText className={`w-4 h-4 ${
          product.brand === "Paralight" ? "text-[#00A8E8]" : "text-[#ECAA00]"
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#00A8E8] transition-colors">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">
          {product.series} • {product.modelNumber}
        </p>
      </div>
      <Download className="w-4 h-4 text-gray-300 group-hover:text-[#00A8E8] shrink-0 transition-colors" />
    </a>
  );

  const CategorySection = ({ category, products: prods }: { category: string; products: Product[] }) => (
    <div className="mb-8">
      <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
        <FolderOpen className="w-3 h-3" />
        {category}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prods.map(product => (
          <CatalogueCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-[#00A8E8] selection:text-white font-sans">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900"
            >
              Download Center
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 leading-relaxed"
            >
              Access all product catalogues, specifications, and technical documentation for our complete range of lighting solutions.
            </motion.p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-40">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-40 bg-white rounded-xl border border-gray-200">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500">No catalogues available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 p-8"
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                  <div className="w-3 h-8 bg-[#00A8E8] rounded-full" />
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900">Paralight</h2>
                    <p className="text-xs text-gray-500">LED Aluminum Profiles</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {paralightProducts.length} files
                  </span>
                </div>
                
                {Object.keys(paralightByCategory).length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">No catalogues available</p>
                ) : (
                  Object.entries(paralightByCategory).map(([category, prods]) => (
                    <CategorySection key={category} category={category} products={prods} />
                  ))
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 p-8"
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                  <div className="w-3 h-8 bg-[#ECAA00] rounded-full" />
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900">Maglinear</h2>
                    <p className="text-xs text-gray-500">Magnetic Track Lighting</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {maglinearProducts.length} files
                  </span>
                </div>
                
                {Object.keys(maglinearByCategory).length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">No catalogues available</p>
                ) : (
                  Object.entries(maglinearByCategory).map(([category, prods]) => (
                    <CategorySection key={category} category={category} products={prods} />
                  ))
                )}
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
