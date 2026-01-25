import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Download, Filter, Loader2 } from "lucide-react";

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
  const [activeBrand, setActiveBrand] = useState<string>("All");

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

  const filteredProducts = activeBrand === "All" 
    ? products 
    : products.filter(p => p.brand === activeBrand);

  const groupedBySeries = filteredProducts.reduce((acc, product) => {
    if (!acc[product.series]) {
      acc[product.series] = [];
    }
    acc[product.series].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white font-sans">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-12">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-900"
            >
              Product <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-[#ECAA00] italic">Catalogues</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl"
            >
              Download our product catalogues for detailed specifications, dimensions, and installation guides.
            </motion.p>
          </div>

          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex gap-6">
              {["All", "Paralight", "Maglinear"].map(brand => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  data-testid={`filter-brand-${brand.toLowerCase()}`}
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${
                    activeBrand === brand 
                      ? brand === "Paralight" ? "text-[#00A8E8]" : brand === "Maglinear" ? "text-[#ECAA00]" : "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-40">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-40 border border-gray-200 bg-gray-50">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">No catalogues available</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedBySeries).map(([series, seriesProducts]) => (
                <motion.div
                  key={series}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 pb-2 border-b border-gray-100">
                    {series} Series
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {seriesProducts.map((product) => (
                      <a
                        key={product.id}
                        href={product.catalogueUrl || "#"}
                        download={`${product.name}-Catalogue.pdf`}
                        data-testid={`download-${product.id}`}
                        className="group flex items-center gap-4 p-4 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                      >
                        <div className={`w-12 h-12 flex items-center justify-center shrink-0 ${
                          product.brand === "Paralight" ? "bg-[#00A8E8]/10" : "bg-[#ECAA00]/10"
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            product.brand === "Paralight" ? "text-[#00A8E8]" : "text-[#ECAA00]"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate group-hover:text-[#00A8E8] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            {product.modelNumber}
                          </p>
                        </div>
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-gray-600 shrink-0" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
