import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, FileText, Zap, MoveRight, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string;
  brand: string;
  category: string;
  application?: string | null;
  finish?: string | null;
  material?: string | null;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params?.id) return;
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center py-40">
            <p className="text-gray-500 uppercase tracking-widest">Product not found</p>
            <Link href="/products">
              <button className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-gray-400 transition-colors">
                Back to Catalog
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Link href="/products">
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 text-gray-500 hover:text-white transition-colors group" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="aspect-[4/5] bg-zinc-950 border border-white/10 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" data-testid="product-image" />
                  ) : (
                    <Package className="w-20 h-20 text-white/5" />
                  )}
                </div>
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${product.brand === "Paralight" ? "bg-[#00A8E8] text-black" : "bg-[#ECAA00] text-black"}`} data-testid="text-brand">{product.brand}</span>
                  <span className="bg-zinc-800 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest" data-testid="text-series">{product.series}</span>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-display font-bold uppercase tracking-widest mb-4" data-testid="text-name">{product.name}</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-6" data-testid="text-model">{product.modelNumber}</p>
                <p className="text-gray-400 leading-relaxed text-sm mb-8" data-testid="text-description">{product.description}</p>
                <a 
                  href={product.catalogueUrl || undefined} 
                  download={`${product.name}-Catalogue.pdf`}
                  data-testid="link-catalogue"
                  className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group transition-all ${!product.catalogueUrl ? 'opacity-30 cursor-not-allowed' : ''}`}
                  onClick={(e) => !product.catalogueUrl && e.preventDefault()}
                >
                  <span className="w-12 h-12 rounded-full border border-[#00A8E8]/30 flex items-center justify-center group-hover:bg-[#00A8E8] group-hover:text-black transition-all">
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
                <table className="w-full border-collapse" data-testid="specs-table">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Mod</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Wattage</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Material</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Finish</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Dimensions</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Voltage</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Color</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">CRI</th>
                      <th className="py-4 pr-6 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">CCT</th>
                      <th className="py-4 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Beam Angle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-6 pr-6 text-[10px] uppercase font-medium whitespace-nowrap">{product.modelNumber}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.wattage || '-'}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.material || '-'}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.finish || '-'}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.dimensions || '-'}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.voltage || '-'}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.color || '-'}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.cri || '-'}</td>
                      <td className="py-6 pr-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.cct || '-'}</td>
                      <td className="py-6 text-[10px] uppercase text-gray-400 whitespace-nowrap">{product.beamAngle || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="pt-12 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-4">
                  <Zap className="w-5 h-5 text-[#ECAA00]" />
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Custom solutions available for this system</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A8E8] hover:text-[#00C4E8] transition-colors group" data-testid="button-inquire">
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
