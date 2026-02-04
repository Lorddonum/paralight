import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Download, Loader2, FolderOpen, Search } from "lucide-react";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  series: string[];
  brand: string;
  category: string;
  catalogueUrl: string | null;
}

export default function Downloads() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<"all" | "Paralight" | "Maglinear">("all");

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

  const filteredProducts = products.filter(p => {
    const matchesBrand = activeBrand === "all" || p.brand === activeBrand;
    const matchesSearch = searchQuery === "" || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.modelNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.series && p.series.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesBrand && matchesSearch;
  });

  const paralightProducts = filteredProducts.filter(p => p.brand === "Paralight");
  const maglinearProducts = filteredProducts.filter(p => p.brand === "Maglinear");

  const groupBySeries = (prods: Product[]) => {
    return prods.reduce((acc, product) => {
      const seriesKey = product.series && product.series.length > 0 ? product.series[0] : "Other";
      if (!acc[seriesKey]) {
        acc[seriesKey] = [];
      }
      acc[seriesKey].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };

  const paralightBySeries = groupBySeries(paralightProducts);
  const maglinearBySeries = groupBySeries(maglinearProducts);

  const CatalogueCard = ({ product, index }: { product: Product; index: number }) => {
    const brandColor = product.brand === "Paralight" ? "#00A8E8" : "#ECAA00";
    
    return (
      <motion.a
        href={product.catalogueUrl || "#"}
        download={`${product.name}-Catalogue.pdf`}
        data-testid={`download-${product.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group relative flex items-center gap-5 p-5 bg-[#0a1628]/40 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:bg-[#0a1628]/60 overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${brandColor}15 0%, transparent 50%)` }}
        />
        
        <div 
          className="relative w-12 h-12 flex items-center justify-center shrink-0 rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${brandColor}20` }}
        >
          <FileText className="w-5 h-5 transition-colors duration-300" style={{ color: brandColor }} />
        </div>
        
        <div className="relative flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-white/90 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">
              {product.modelNumber}
            </span>
            {product.series && product.series.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[10px] uppercase tracking-wider" style={{ color: brandColor }}>
                  {product.series[0]}
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="relative flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
          <span className="text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            Download
          </span>
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${brandColor}20` }}
          >
            <Download className="w-4 h-4 transition-colors" style={{ color: brandColor }} />
          </div>
        </div>
      </motion.a>
    );
  };

  const SeriesSection = ({ series, products: prods, brandColor }: { series: string; products: Product[]; brandColor: string }) => (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${brandColor}20` }}
        >
          <FolderOpen className="w-4 h-4" style={{ color: brandColor }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{series}</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">{prods.length} catalogue{prods.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="space-y-3">
        {prods.map((product, idx) => (
          <CatalogueCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );

  const BrandSection = ({ 
    brand, 
    tagline, 
    color, 
    productsBySeries 
  }: { 
    brand: string; 
    tagline: string; 
    color: string; 
    productsBySeries: Record<string, Product[]>;
  }) => {
    const totalProducts = Object.values(productsBySeries).flat().length;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#0a1628] to-[#0d1f38] rounded-2xl border border-white/10 overflow-hidden"
      >
        <div 
          className="p-8 border-b border-white/10"
          style={{ background: `linear-gradient(135deg, ${color}15 0%, transparent 100%)` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-1.5 h-14 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div>
                <h2 className="text-2xl font-display font-bold text-white">{brand}</h2>
                <p className="text-sm text-white/50 mt-1">{tagline}</p>
              </div>
            </div>
            <div 
              className="px-4 py-2 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {totalProducts} file{totalProducts !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {Object.keys(productsBySeries).length === 0 ? (
            <div className="text-center py-16">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${color}15` }}
              >
                <FileText className="w-7 h-7" style={{ color }} />
              </div>
              <p className="text-sm text-white/50">No catalogues available</p>
              <p className="text-xs text-white/30 mt-1">Check back soon for updates</p>
            </div>
          ) : (
            Object.entries(productsBySeries).map(([series, prods]) => (
              <SeriesSection key={series} series={series} products={prods} brandColor={color} />
            ))
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#060d18] text-white selection:bg-[#00A8E8] selection:text-white font-sans">
      <Navbar />
      
      <div className="relative pt-32 pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A8E8]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ECAA00]/10 rounded-full blur-[150px]" />
        </div>
        
        <main className="relative z-10">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A8E8] to-[#0088c0] flex items-center justify-center shadow-lg shadow-[#00A8E8]/20">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#00A8E8]">
                  Resources
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white"
              >
                Download <span className="italic font-normal text-white/40">Center</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/50 leading-relaxed max-w-2xl"
              >
                Access product catalogues, specifications, and technical documentation for our complete range of architectural lighting solutions.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col md:flex-row gap-4 mb-12"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search catalogues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20 transition-all backdrop-blur-sm"
                  data-testid="input-search-downloads"
                />
              </div>
              
              <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <button
                  onClick={() => setActiveBrand("all")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeBrand === "all" 
                      ? "bg-white text-gray-900" 
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                  data-testid="filter-all"
                >
                  All Brands
                </button>
                <button
                  onClick={() => setActiveBrand("Paralight")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeBrand === "Paralight" 
                      ? "bg-[#00A8E8] text-white" 
                      : "text-white/50 hover:text-[#00A8E8] hover:bg-[#00A8E8]/10"
                  }`}
                  data-testid="filter-paralight"
                >
                  Paralight
                </button>
                <button
                  onClick={() => setActiveBrand("Maglinear")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeBrand === "Maglinear" 
                      ? "bg-[#ECAA00] text-white" 
                      : "text-white/50 hover:text-[#ECAA00] hover:bg-[#ECAA00]/10"
                  }`}
                  data-testid="filter-maglinear"
                >
                  Maglinear Lighting
                </button>
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A8E8]/20 to-[#ECAA00]/20 flex items-center justify-center mb-4">
                  <Loader2 className="w-7 h-7 animate-spin text-[#00A8E8]" />
                </div>
                <p className="text-sm text-white/50">Loading catalogues...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-40 bg-[#0a1628]/50 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-9 h-9 text-white/30" />
                </div>
                <p className="text-lg font-medium text-white mb-2">No catalogues found</p>
                <p className="text-sm text-white/40">
                  {searchQuery ? "Try adjusting your search terms" : "Check back soon for updates"}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {(activeBrand === "all" || activeBrand === "Paralight") && (
                  <BrandSection 
                    brand="Paralight" 
                    tagline="LED Aluminum Profiles" 
                    color="#00A8E8" 
                    productsBySeries={paralightBySeries} 
                  />
                )}
                {(activeBrand === "all" || activeBrand === "Maglinear") && (
                  <BrandSection 
                    brand="Maglinear Lighting" 
                    tagline="Magnetic Track Lighting" 
                    color="#ECAA00" 
                    productsBySeries={maglinearBySeries} 
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
