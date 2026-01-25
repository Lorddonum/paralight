import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, MoveRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string;
  brand: string;
  category: string;
  wattage: string | null;
  dimensions: string | null;
  voltage: string | null;
  color: string | null;
  cri: string | null;
  cct: string | null;
  beamAngle: string | null;
  image?: string | null;
  catalogueUrl?: string | null;
}

const CATEGORIES = ["All", "Indoor", "Outdoor", "Commercial", "Decorative"];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("Paralight");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.brand === activeBrand && (activeCategory === "All" || p.category === activeCategory));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-12">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-display font-bold mb-8 uppercase tracking-tighter"
            >
              Lighting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-[#ECAA00] italic">Systems</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl"
            >
              Discover our comprehensive range of architectural lighting solutions. 
              From precision aluminum profiles to advanced magnetic track systems.
            </motion.p>
          </div>

          <div className="flex flex-col gap-8 mb-20 border-b border-white/10 pb-12">
            <div className="flex gap-8">
              {["Paralight", "Maglinear"].map(brand => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  data-testid={`filter-brand-${brand.toLowerCase()}`}
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${
                    activeBrand === brand 
                      ? brand === "Paralight" ? "text-[#00A8E8]" : "text-[#ECAA00]"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 sm:gap-12">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  data-testid={`filter-category-${category.toLowerCase()}`}
                  className={`text-[9px] font-medium uppercase tracking-[0.2em] transition-all relative py-2 ${
                    activeCategory === category ? "text-white" : "text-gray-600 hover:text-white"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div 
                      layoutId="category-indicator"
                      className={`absolute -bottom-2 left-0 right-0 h-px ${activeBrand === "Paralight" ? "bg-[#00A8E8]" : "bg-[#ECAA00]"}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-40">
              <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                  data-testid={`product-card-${product.id}`}
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="space-y-6 cursor-pointer">
                      <div className="aspect-[4/5] bg-zinc-950 border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                          <span className="bg-[#00A8E8] text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            View Details
                          </span>
                        </div>
                        <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8" />
                          ) : (
                            <Package className="w-16 h-16 text-white/5" />
                          )}
                        </div>
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          <span className="bg-zinc-900 text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest border border-white/10">{product.series}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-display font-bold uppercase tracking-widest group-hover:text-gray-400 transition-colors">{product.name}</h2>
                          <MoveRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.modelNumber}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {filteredProducts.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-40 border border-white/5 bg-white/[0.02]">
                  <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">No products available in this category</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
