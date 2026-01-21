import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, FileText, Zap, MoveRight } from "lucide-react";

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
}

const CONTROL_ICONS = [
  { label: "ON-OFF", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/on-off.png" },
  { label: "Bluetooth", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/bluetooth.png" },
  { label: "Tuya Dim", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/tuya.png" },
  { label: "2.4Network", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/2.4g.png" },
  { label: "ZigBee", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/zigbee.png" },
  { label: "DALI Dim", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/dali.png" },
  { label: "0-10V Dim", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/0-10v.png" },
  { label: "CCT control", img: "https://paralight1.ybbis.com/wp-content/uploads/2023/06/cct.png" },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("All");

  useEffect(() => {
    const stored = localStorage.getItem("paralight_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      const initial: Product[] = [
        {
          id: 1,
          name: "MAGNETIC DOT LIGHT",
          modelNumber: "MAG-05/10-ML-D80",
          description: "Precision engineered accent lighting system for architectural magnetic tracks.",
          series: "Magnetic Track",
          brand: "Paralight",
          wattage: "5W",
          dimensions: "D60",
          voltage: "DC24V",
          color: "Sand White/Sand Black",
          cri: "Ra≥90",
          cct: "3000K/4000K/6500K",
          beamAngle: "270°"
        }
      ];
      setProducts(initial);
      localStorage.setItem("paralight_products", JSON.stringify(initial));
    }
  }, []);

  const filteredProducts = activeBrand === "All" 
    ? products 
    : products.filter(p => p.brand === activeBrand);

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
            {["All", "Paralight", "Maglinear"].map(brand => (
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

          <div className="grid grid-cols-1 gap-24">
            {filteredProducts.map((product, index) => (
              <motion.section 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-5 space-y-8">
                  <div className="aspect-[4/5] bg-zinc-950 border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-20 h-20 text-white/5" />
                    </div>
                    <div className="absolute top-6 left-6 z-20 flex gap-2">
                      <span className="bg-white text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{product.brand}</span>
                      <span className="bg-zinc-800 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{product.series}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-4">{product.name}</h2>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">{product.modelNumber}</p>
                    <p className="text-gray-400 leading-relaxed text-sm mb-8">{product.description}</p>
                    <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group">
                      <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <FileText className="w-4 h-4" />
                      </span>
                      Download Catalogue
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-12">
                  <div className="bg-zinc-950/50 border border-white/5 p-8">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-8">Control Integration</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                      {CONTROL_ICONS.map((icon, i) => (
                        <div key={i} className="text-center group">
                          <div className="aspect-square bg-white border border-transparent p-2 mb-2 group-hover:scale-105 transition-transform flex items-center justify-center">
                            <img src={icon.img} alt={icon.label} className="w-full h-auto" />
                          </div>
                          <p className="text-[8px] uppercase tracking-tighter text-gray-500 whitespace-nowrap">{icon.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">Mod</th>
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">Wattage</th>
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">Dimensions</th>
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">Voltage</th>
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">Color</th>
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">CRI</th>
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">CCT</th>
                          <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold">Beam Angle</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-6 text-[10px] uppercase font-medium">{product.modelNumber}</td>
                          <td className="py-6 text-[10px] uppercase text-gray-400">{product.wattage}</td>
                          <td className="py-6 text-[10px] uppercase text-gray-400">{product.dimensions}</td>
                          <td className="py-6 text-[10px] uppercase text-gray-400">{product.voltage}</td>
                          <td className="py-6 text-[10px] uppercase text-gray-400">{product.color}</td>
                          <td className="py-6 text-[10px] uppercase text-gray-400">{product.cri}</td>
                          <td className="py-6 text-[10px] uppercase text-gray-400">{product.cct}</td>
                          <td className="py-6 text-[10px] uppercase text-gray-400">{product.beamAngle}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-12 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <Zap className="w-5 h-5 text-white" />
                      <p className="text-xs text-gray-400 uppercase tracking-widest">Custom solutions available for this system</p>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-gray-400 transition-colors group">
                      Inquire System <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
