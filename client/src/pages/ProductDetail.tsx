import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Package,
  FileText,
  Zap,
  MoveRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";
import controlIntegrationImg from "@/assets/control-integration.png";

const COLOR_MAP: Record<string, string> = {
  white: "#FFFFFF",
  black: "#000000",
  gold: "#FFD700",
  silver: "#C0C0C0",
  grey: "#808080",
  gray: "#808080",
  red: "#FF0000",
  blue: "#0000FF",
  green: "#008000",
  yellow: "#FFFF00",
  orange: "#FFA500",
  brown: "#8B4513",
  bronze: "#CD7F32",
  champagne: "#F7E7CE",
  "rose gold": "#B76E79",
  "matte black": "#1C1C1C",
  "sandy white": "#F5F5DC",
  "sand white": "#F5F5DC",
  "sand black": "#2B2B2B",
  "sandy black": "#2B2B2B",
  anodized: "#A8A9AD",
};

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string[];
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
  images?: string[] | null;
  catalogueUrl?: string | null;
  technicalDrawingUrl?: string | null;
  technicalDrawings?: string[] | null;
  // Paralight-specific fields
  subSeries?: string[] | null;
  standardLength?: string | null;
  diffuserFinish?: string | null;
  diffuserMaterial?: string | null;
  accessories?: string | null;
  ledStripSize?: string | null;
  installationMethod?: string | null;
  packagingMethodADesc?: string | null;
  packagingMethodASpec?: string | null;
  packagingMethodBDesc?: string | null;
  packagingMethodBSpec?: string | null;
  accessoriesSpec?: string | null;
  // Maglinear-specific fields
  mountingTrack?: string | null;
  // Technical Specifications (JSON string for table data)
  technicalSpecs?: string | null;
}

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
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showDrawingLightbox, setShowDrawingLightbox] = useState(false);
  const [lightboxDrawingIndex, setLightboxDrawingIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    setIsLoading(true);
    setProduct(null);
    setRelatedProducts([]);
    setSelectedImageIndex(0);
    setShowDrawingLightbox(false);
    setLightboxDrawingIndex(0);
    
    const fetchProduct = async () => {
      if (!params?.id) return;
      try {
        const productRes = await fetch(`/api/products/${params.id}`);
        
        if (productRes.ok) {
          const data = await productRes.json();
          setProduct(data);
          
          // Fetch related products from dedicated endpoint
          const relatedRes = await fetch(`/api/products/${params.id}/related?limit=4`);
          if (relatedRes.ok) {
            const related = await relatedRes.json();
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [params?.id]);

  // All hooks must be called before any early returns
  const brandColor = product?.brand === "Paralight" ? "#00A8E8" : "#ECAA00";

  const specs = useMemo(() => {
    if (!product) return [];
    return [
      { label: "Model", value: product.modelNumber },
      { label: "Wattage", value: product.wattage },
      { label: "Application", value: product.application },
      { label: "Material", value: product.material },
      { label: "Finish", value: product.finish },
      { label: "Dimensions", value: product.dimensions },
      { label: "Voltage", value: product.voltage },
      { label: "Color", value: product.color },
      { label: "CRI", value: product.cri },
      { label: "CCT", value: product.cct },
      { label: "Beam Angle", value: product.beamAngle },
      // Paralight-specific specs
      ...(product.brand === "Paralight" ? [
        { label: "Sub Series", value: (product.subSeries || []).join(", ") || null },
        { label: "Standard Length", value: product.standardLength },
        { label: "Diffuser Finish", value: product.diffuserFinish },
        { label: "Diffuser Material", value: product.diffuserMaterial },
        { label: "Accessories", value: product.accessories },
        { label: "LED Strip Size", value: product.ledStripSize },
        { label: "Installation Method", value: product.installationMethod },
      ] : []),
      // Maglinear-specific specs
      ...(product.brand === "Maglinear" ? [
        { label: "Mounting Track", value: product.mountingTrack },
      ] : [])
    ].filter((spec) => spec.value && spec.value.trim() !== "");
  }, [product]);

  // Parse additional specification rows
  const additionalSpecRows = useMemo(() => {
    if (!product?.technicalSpecs) return [];
    try {
      return JSON.parse(product.technicalSpecs) as Array<{ model?: string; wattage?: string; application?: string; finish?: string; material?: string; dimensions?: string; voltage?: string; color?: string; cri?: string; cct?: string; beamAngle?: string; mountingTrack?: string; diffuserMaterial?: string; accessories?: string; ledStripSize?: string; installationMethod?: string; wallThickness?: string }>;
    } catch {
      return [];
    }
  }, [product?.technicalSpecs]);

  // Convert additional rows to displayable specs - Model always shows first
  const getAdditionalRowSpecs = useCallback((row: typeof additionalSpecRows[0], mainModelNumber: string) => {
    const otherSpecs = [
      { label: "Wattage", value: row.wattage },
      { label: "Application", value: row.application },
      { label: "Finish", value: row.finish },
      { label: "Material", value: row.material },
      { label: "Dimensions", value: row.dimensions },
      { label: "Voltage", value: row.voltage },
      { label: "Color", value: row.color },
      { label: "CRI", value: row.cri },
      { label: "CCT", value: row.cct },
      { label: "Beam Angle", value: row.beamAngle },
      { label: "Mounting Track", value: row.mountingTrack },
      { label: "Diffuser Material", value: row.diffuserMaterial },
      { label: "Accessories", value: row.accessories },
      { label: "LED Strip Size", value: row.ledStripSize },
      { label: "Installation Method", value: row.installationMethod },
      { label: "Wall Thickness", value: row.wallThickness },
    ].filter((spec) => spec.value && spec.value.trim() !== "");
    
    // Always include Model as the first column, use main model if not specified
    return [
      { label: "Model", value: row.model?.trim() || mainModelNumber },
      ...otherSpecs
    ];
  }, []);

  // Early returns after all hooks
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
            <p className="text-gray-500 uppercase tracking-widest">
              Product not found
            </p>
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-8 lg:px-12">
          {/* Back to Catalog */}
          <Link href="/products">
            <button
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-900 transition-colors group mb-6"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Catalog
            </button>
          </Link>

          {/* Breadcrumb-style tags */}
          <div className="flex items-center gap-3 mb-10">
            <span
              className="px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase text-white"
              style={{ backgroundColor: brandColor }}
              data-testid="text-brand"
            >
              {product.brand}
            </span>
            {(product.series || []).map((s, idx) => (
              <span
                key={idx}
                className="bg-gray-900 text-white px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase"
                data-testid={`text-series-${idx}`}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div>
                <h1
                  className="font-display text-3xl md:text-4xl text-gray-900 font-medium mb-2"
                  data-testid="text-name"
                >
                  {product.name}
                </h1>
                <p
                  className="text-sm text-gray-400 tracking-wide"
                  data-testid="text-model"
                >
                  {product.modelNumber}
                </p>
              </div>
              {(() => {
                const allImages = [
                  product.image,
                  ...(product.images || [])
                ].filter(Boolean) as string[];
                const currentImage = allImages[selectedImageIndex] || product.image;
                
                return (
                  <>
                    <div
                      ref={imageContainerRef}
                      className="aspect-square max-w-md mx-auto bg-gray-50 border border-gray-100 relative overflow-hidden rounded-lg cursor-zoom-in"
                      onMouseEnter={() => setIsZooming(true)}
                      onMouseLeave={() => setIsZooming(false)}
                      onMouseMove={handleMouseMove}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center p-8 transition-transform duration-100"
                        style={
                          isZooming && currentImage
                            ? {
                                transform: `scale(${ZOOM_LEVEL})`,
                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                              }
                            : undefined
                        }
                      >
                        {currentImage ? (
                          <img
                            src={currentImage}
                            alt={product.name}
                            loading="eager"
                            className="max-w-full max-h-full object-contain"
                            data-testid="product-image"
                          />
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
                              title={product.color || ""}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {allImages.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {allImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden transition-all ${
                              selectedImageIndex === index 
                                ? 'border-gray-900' 
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <img 
                              src={img} 
                              alt={`${product.name} ${index + 1}`}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}

              <div className="flex items-center justify-center gap-6 py-4 border-t border-b border-gray-100">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                  Certifications
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-700">⑧</span>
                  <span className="text-sm font-bold text-gray-700">RoHS</span>
                  <span className="text-lg font-bold text-gray-700">CE</span>
                  <span className="text-lg font-bold text-gray-700">CB</span>
                </div>
              </div>

              <div className="pt-2">
                <p
                  className="text-gray-600 leading-relaxed text-sm mb-6"
                  data-testid="text-description"
                >
                  {product.description}
                </p>
                <a
                  href={product.catalogueUrl || undefined}
                  download={`${product.name}-Catalogue.pdf`}
                  data-testid="link-catalogue"
                  className={`inline-flex items-center gap-3 text-xs uppercase tracking-widest transition-all ${
                    !product.catalogueUrl
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={(e) => !product.catalogueUrl && e.preventDefault()}
                >
                  <FileText className="w-4 h-4" />
                  {product.catalogueUrl
                    ? "Download Catalogue"
                    : "Catalogue Not Available"}
                </a>
              </div>

              {/* Packaging Method - Paralight Only */}
              {product.brand === "Paralight" && (
                <div className="mt-6">
                  <img 
                    src="/packaging-method.png" 
                    alt="Packaging Method"
                    className="w-full max-w-2xl mx-auto"
                  />
                </div>
              )}
            </div>

            <div className="space-y-8">
              {product.brand !== "Paralight" && (
                <div className="bg-gray-50 border border-gray-100 p-6 rounded-lg">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 text-center">
                    Control Integration
                  </h3>
                  <img 
                    src={controlIntegrationImg} 
                    alt="Control Integration - ON-OFF, Bluetooth, Tuya Smart, 2.4GHz Wi-Fi, Zigbee, DALI Dimm, CCT Control" 
                    loading="lazy"
                    className="w-full max-w-xl mx-auto object-contain"
                  />
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-center">
                    Technical Specifications
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`p-4 ${i < specs.length - (specs.length % 5 || 5) ? "border-b" : ""} ${(i + 1) % 5 !== 0 ? "border-r" : ""} border-gray-100`}
                    >
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">
                        {spec.label}
                      </p>
                      <p className="text-xs font-medium text-gray-900 break-words">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Additional Specification Rows */}
                {additionalSpecRows.map((row, rowIndex) => {
                  const rowSpecs = getAdditionalRowSpecs(row, product.modelNumber);
                  if (rowSpecs.length === 0) return null;
                  return (
                    <div key={rowIndex} className="border-t border-gray-100">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {rowSpecs.map((spec, i) => (
                          <div
                            key={`${rowIndex}-${spec.label}`}
                            className={`p-4 ${i < rowSpecs.length - (rowSpecs.length % 5 || 5) ? "border-b" : ""} ${(i + 1) % 5 !== 0 ? "border-r" : ""} border-gray-100`}
                          >
                            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">
                              {spec.label}
                            </p>
                            <p className="text-xs font-medium text-gray-900 break-words">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Technical Drawing */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-center">
                    Technical Drawing
                  </h3>
                </div>
                <div className="p-4 bg-gray-50">
                  {(() => {
                    const allDrawings = [
                      product.technicalDrawingUrl,
                      ...(product.technicalDrawings || [])
                    ].filter(Boolean) as string[];
                    
                    if (allDrawings.length === 0) {
                      return (
                        <div className="flex items-center justify-center h-44">
                          <div className="text-center">
                            <svg
                              className="w-10 h-10 text-gray-300 mx-auto mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                              ></path>
                            </svg>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                              Technical drawing available upon request
                            </p>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div className={`grid gap-3 ${allDrawings.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {allDrawings.map((drawing, index) => (
                          <div 
                            key={index}
                            className="h-44 bg-white border border-gray-100 rounded flex items-center justify-center p-2 cursor-pointer hover:border-gray-300 transition-colors"
                            onClick={() => {
                              setLightboxDrawingIndex(index);
                              setShowDrawingLightbox(true);
                            }}
                            title="Click to view full size"
                          >
                            <img
                              src={drawing}
                              alt={`Technical Drawing ${index + 1}`}
                              loading="lazy"
                              className="max-w-full max-h-full object-contain hover:opacity-80 transition-opacity"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Packaging Information - Paralight only */}
              {product.brand === "Paralight" && (product.packagingMethodADesc || product.packagingMethodBDesc) && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-center">
                      Packaging Information
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Packaging Method</th>
                          <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Description</th>
                          <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Specifications</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.packagingMethodADesc && (
                          <tr className="border-b border-gray-100">
                            <td className="px-4 py-3 font-medium text-gray-900">Method A</td>
                            <td className="px-4 py-3 text-gray-600">{product.packagingMethodADesc}</td>
                            <td className="px-4 py-3 text-gray-600">{product.packagingMethodASpec || '-'}</td>
                          </tr>
                        )}
                        {product.packagingMethodBDesc && (
                          <tr>
                            <td className="px-4 py-3 font-medium" style={{ color: brandColor }}>Method B<br/><span className="text-[10px] text-gray-400">(Additional Fee)</span></td>
                            <td className="px-4 py-3 text-gray-600">{product.packagingMethodBDesc}</td>
                            <td className="px-4 py-3 text-gray-600">{product.packagingMethodBSpec || '-'}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Accessories Specification - Paralight only */}
              {product.brand === "Paralight" && product.accessoriesSpec && (() => {
                try {
                  const accessoriesData = JSON.parse(product.accessoriesSpec);
                  if (!Array.isArray(accessoriesData) || accessoriesData.length === 0) return null;
                  
                  // Find application row if exists
                  const applicationRow = accessoriesData.find((item: { no?: string }) => 
                    item.no?.toLowerCase() === 'application'
                  );
                  const regularRows = accessoriesData.filter((item: { no?: string }) => 
                    item.no?.toLowerCase() !== 'application'
                  );
                  
                  return (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-center">
                          Accessories Specification
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100 w-16">NO.</th>
                              <th className="px-4 py-3 text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Specification</th>
                              <th className="px-4 py-3 text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100 w-20">QTY</th>
                              <th className="px-4 py-3 text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {regularRows.map((item: { no?: string; specification?: string; qty?: string; remarks?: string }, index: number) => (
                              <tr key={index} className="border-b border-gray-100">
                                <td className="px-4 py-3 text-center font-medium" style={{ color: brandColor }}>{item.no || '-'}</td>
                                <td className="px-4 py-3 text-center text-gray-600">{item.specification || '-'}</td>
                                <td className="px-4 py-3 text-center text-gray-600">{item.qty || '-'}</td>
                                <td className="px-4 py-3 text-center text-gray-600">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                            {applicationRow && (
                              <tr className="bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-700">Application:</td>
                                <td colSpan={3} className="px-4 py-3 text-gray-600">{applicationRow.specification || '-'}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                } catch {
                  return null;
                }
              })()}

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
                    Inquire System{" "}
                    <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>

      {showDrawingLightbox && product && (
        (() => {
          const allDrawings = [
            product.technicalDrawingUrl,
            ...(product.technicalDrawings || [])
          ].filter(Boolean) as string[];
          
          if (allDrawings.length === 0) return null;
          
          const currentDrawing = allDrawings[lightboxDrawingIndex];
          
          return (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8 cursor-pointer"
              onClick={() => setShowDrawingLightbox(false)}
            >
              <button 
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                onClick={() => setShowDrawingLightbox(false)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {allDrawings.length > 1 && (
                <>
                  <button
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxDrawingIndex((prev) => (prev - 1 + allDrawings.length) % allDrawings.length);
                    }}
                  >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxDrawingIndex((prev) => (prev + 1) % allDrawings.length);
                    }}
                  >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
                    {lightboxDrawingIndex + 1} / {allDrawings.length}
                  </div>
                </>
              )}
              
              <img
                src={currentDrawing}
                alt={`Technical Drawing ${lightboxDrawingIndex + 1} - Full Size`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          );
        })()
      )}

      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-6 py-16 border-t border-gray-100">
          <h2 className="text-xl font-display font-bold uppercase tracking-widest text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              const relatedBrandColor = relatedProduct.brand === "Paralight" ? "#00A8E8" : "#ECAA00";
              return (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <div className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                      {relatedProduct.image ? (
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Package className="w-12 h-12 text-gray-300" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white rounded"
                          style={{ backgroundColor: relatedBrandColor }}
                        >
                          {relatedProduct.brand}
                        </span>
                        <span className="text-[8px] text-gray-400 uppercase tracking-widest">
                          {(relatedProduct.series || []).join(", ")}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#00A8E8] transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                        {relatedProduct.modelNumber}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
