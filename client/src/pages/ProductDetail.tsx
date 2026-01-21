import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, FileText, Zap, MoveRight, ArrowLeft } from "lucide-react";
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

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("paralight_products");
    if (stored) {
      const products: Product[] = JSON.parse(stored);
      const found = products.find(p => p.id === Number(params?.id));
      if (found) setProduct(found);
    }
  }, [params?.id]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Link href="/products">
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 text-gray-500 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="aspect-[4/5] bg-zinc-950 border border-white/10 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  ) : (
                    <Package className="w-20 h-20 text-white/5" />
                  )}
                </div>
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <span className="bg-white text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{product.brand}</span>
                  <span className="bg-zinc-800 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{product.series}</span>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-display font-bold uppercase tracking-widest mb-4">{product.name}</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">{product.modelNumber}</p>
                <p className="text-gray-400 leading-relaxed text-sm mb-8">{product.description}</p>
                <a 
                  href={product.catalogueUrl} 
                  download={`${product.name}-Catalogue.pdf`}
                  className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group transition-all ${!product.catalogueUrl ? 'opacity-30 cursor-not-allowed' : ''}`}
                  onClick={(e) => !product.catalogueUrl && e.preventDefault()}
                >
                  <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <FileText className="w-4 h-4" />
                  </span>
                  {product.catalogueUrl ? "Download Catalogue" : "Catalogue Not Available"}
                </a>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
