import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, FileText, Zap, MoveRight, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";

const COLOR_MAP: Record<string, string> = {
  "white": "#FFFFFF",
  "black": "#000000",
  "gold": "#FFD700",
  "silver": "#C0C0C0",
  "grey": "#808080",
  "gray": "#808080",
  "red": "#FF0000",
  "blue": "#0000FF",
  "green": "#008000",
  "yellow": "#FFFF00",
  "orange": "#FFA500",
  "brown": "#8B4513",
  "bronze": "#CD7F32",
  "champagne": "#F7E7CE",
  "rose gold": "#B76E79",
  "matte black": "#1C1C1C",
  "sandy white": "#F5F5DC",
  "sand white": "#F5F5DC",
  "sand black": "#2B2B2B",
  "sandy black": "#2B2B2B",
  "anodized": "#A8A9AD",
};

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
  technicalDrawingUrl?: string | null;
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

const ZOOM_LEVEL = 2; // Adjustable zoom percentage (2 = 200%)

const getColorFromText = (colorText: string | null): string[] => {
  if (!colorText) return [];
  const lowerText = colorText.toLowerCase();
  const colors: string[] = [];
  
  for (const [name, hex] of Object.entries(COLOR_MAP)) {
    if (lowerText.includes(name)) {
      colors.push(hex);
    }
  }
  
  return colors.length > 0 ? colors : [];
};

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

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
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white font-sans">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center py-40">
            <p className="text-gray-500 uppercase tracking-widest">Product not found</p>
            <Link href="/products">
              <button className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A8E8] hover:text-gray-600 transition-colors">
                Back to Catalog
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const brandColor = product.brand === "Paralight" ? "#00A8E8" : "#ECAA00";

  const specs = [
    { label: "Model", value: product.modelNumber },
    { label: "Wattage", value: product.wattage },
    { label: "Material", value: product.material },
    { label: "Finish", value: product.finish },
    { label: "Dimensions", value: product.dimensions },
    { label: "Voltage", value: product.voltage },
    { label: "Color", value: product.color },
    { label: "CRI", value: product.cri },
    { label: "CCT", value: product.cct },
    { label: "Beam Angle", value: product.beamAngle },
  ].filter(spec => spec.value);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white font-sans">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span 
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: brandColor }}
              data-testid="text-brand"
            >
              {product.brand}
            </span>
            <span className="bg-gray-800 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest" data-testid="text-series">
              {product.series}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div 
                ref={imageContainerRef}
                className="aspect-[4/3] bg-gray-50 border border-gray-100 relative overflow-hidden rounded-lg cursor-zoom-in"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <div 
                  className="w-full h-full flex items-center justify-center p-8 transition-transform duration-100"
                  style={isZooming && product.image ? {
                    transform: `scale(${ZOOM_LEVEL})`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : undefined}
                >
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" data-testid="product-image" />
                  ) : (
                    <Package className="w-24 h-24 text-gray-200" />
                  )}
                </div>
                {getColorFromText(product.color).length > 0 && (
                  <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                    {getColorFromText(product.color).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                        title={product.color || ''}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-6 py-4 border-t border-b border-gray-100">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Certifications</span>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-700">⑧</span>
                  <span className="text-sm font-bold text-gray-700">RoHS</span>
                  <span className="text-lg font-bold text-gray-700">CE</span>
                  <span className="text-lg font-bold text-gray-700">CB</span>
                </div>
              </div>

              <div className="pt-2">
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2" data-testid="text-name">
                  {product.name}
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4" data-testid="text-model">
                  {product.modelNumber}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6" data-testid="text-description">
                  {product.description}
                </p>
                <a 
                  href={product.catalogueUrl || undefined} 
                  download={`${product.name}-Catalogue.pdf`}
                  data-testid="link-catalogue"
                  className={`inline-flex items-center gap-3 text-xs uppercase tracking-widest transition-all ${
                    !product.catalogueUrl 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  onClick={(e) => !product.catalogueUrl && e.preventDefault()}
                >
                  <FileText className="w-4 h-4" />
                  {product.catalogueUrl ? "Download Catalogue" : "Catalogue Not Available"}
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-lg">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-6 text-center">
                  Control Integration
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {CONTROL_ICONS.map((icon, i) => (
                    <div key={i} className="text-center w-16">
                      <div className="aspect-square bg-white border border-gray-100 rounded p-2 mb-2 flex items-center justify-center">
                        <img src={icon.img} alt={icon.label} className="w-8 h-8 object-contain" />
                      </div>
                      <p className="text-[8px] uppercase tracking-tight text-gray-400">{icon.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {specs.map((spec, i) => (
                    <div 
                      key={spec.label} 
                      className={`p-4 ${i < specs.length - (specs.length % 5 || 5) ? 'border-b' : ''} ${(i + 1) % 5 !== 0 ? 'border-r' : ''} border-gray-100`}
                    >
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{spec.label}</p>
                      <p className="text-xs font-medium text-gray-900 break-words">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {product.brand === "Maglinear" && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-center">
                      Technical Drawings
                    </h3>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <div className="flex items-center justify-center">
                      {product.technicalDrawingUrl ? (
                        <img 
                          src={product.technicalDrawingUrl} 
                          alt="Technical Drawing"
                          className="max-w-full h-auto"
                        />
                      ) : (
                        <div className="text-center py-8">
                          <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
                          </svg>
                          <p className="text-xs text-gray-400 uppercase tracking-widest">Technical drawing available upon request</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div 
                className="p-5 rounded-lg flex items-center justify-between"
                style={{ backgroundColor: `${brandColor}15` }}
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" style={{ color: brandColor }} />
                  <p className="text-xs text-gray-700 uppercase tracking-widest font-medium">
                    Custom solutions available for this system
                  </p>
                </div>
                <Link href="/contact">
                  <button 
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group"
                    style={{ color: brandColor }}
                    data-testid="button-inquire"
                  >
                    Inquire System <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              <Link href="/products">
                <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-900 transition-colors group" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                  Back to Catalog
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
