import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, MoveRight } from "lucide-react";
import { Link } from "wouter";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string;
  brand: "Paralight" | "Maglinear";
  wattage: string;
  dimensions: string;
  voltage: string;
  color: string;
  cri: string;
  cct: string;
  beamAngle: string;
  image?: string;
  catalogueUrl?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("Paralight");

  useEffect(() => {
    const stored = localStorage.getItem("paralight_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts([]);
    }
  }, []);

  const filteredProducts = products.filter(p => p.brand === activeBrand);

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
              <span className="text-gray-500 italic">Systems</span>
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

          {/* Filter Bar */}
          <div className="flex gap-8 mb-20 border-b border-white/10 pb-6">
            {["Paralight", "Maglinear"].map(brand => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${
                  activeBrand === brand ? "text-white" : "text-gray-500 hover:text-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="space-y-6 cursor-pointer">
                    <div className="aspect-[4/5] bg-zinc-950 border border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <span className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transform translate-y-4 group-hover:translate-y-0 transition-transform">
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
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-40 border border-white/5 bg-white/[0.02]">
                <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">No products available in this category</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
