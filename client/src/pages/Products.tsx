import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, Loader2, X, SlidersHorizontal, Search, ArrowRight, ChevronRight, ChevronDown, ChevronLeft, Sparkles, ArrowLeft, FileText, HelpCircle, Zap, Ruler, Palette, Sun, Eye, Layers, Box, Settings, Download, Image, Info, ListChecks, Wrench, Check, Mail, Phone } from "lucide-react";
import { useLocation } from "wouter";
import controlIntegrationImg from "@/assets/control-integration.png";

// Lightweight type for grid view - only essential fields
interface ProductGridItem {
  id: number;
  name: string;
  modelNumber: string;
  brand: string;
  series: string[];
  subSeries?: string[] | null;
  image?: string | null;
}

// Full product type for detail view
interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string[];
  subSeries?: string[] | null;
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
  standardLength?: string | null;
  diffuserFinish?: string | null;
  diffuserMaterial?: string | null;
  accessories?: string | null;
  ledStripSize?: string | null;
  installationMethod?: string | null;
  mountingTrack?: string | null;
  cutOutSize?: string | null;
  oneCct?: string | null;
  threeCct?: string | null;
  protectionRating?: string | null;
  bluetoothVersion?: string | null;
  technicalSpecs?: string | null;
  accessoriesSpec?: string | null;
  packagingMethodADesc?: string | null;
  packagingMethodASpec?: string | null;
  packagingMethodBDesc?: string | null;
  packagingMethodBSpec?: string | null;
  packagingMethodImage?: string | null;
}

export default function Products() {
  const [gridProducts, setGridProducts] = useState<ProductGridItem[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [activeSeries, setActiveSeries] = useState<string>("All");
  const [activeSubSeries, setActiveSubSeries] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentDrawingIndex, setCurrentDrawingIndex] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'specs' | 'drawings' | 'accessories'>('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  // Fetch lightweight grid data for product list
  useEffect(() => {
    const fetchProducts = async (retries = 3) => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products/grid');
        if (res.ok) {
          const data = await res.json();
          setGridProducts(data);
        } else {
          const errorText = await res.text();
          console.error("API error:", res.status, errorText);
          if (retries > 0) {
            setTimeout(() => fetchProducts(retries - 1), 1000);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        if (retries > 0) {
          setTimeout(() => fetchProducts(retries - 1), 1000);
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch full product details when needed
  const fetchProductDetail = useCallback(async (productId: number) => {
    setIsLoadingDetail(true);
    try {
      const res = await fetch(`/api/products/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedProduct(data);
        setSelectedImageIndex(0);
        setCurrentDrawingIndex(0);
        setActiveDetailTab('overview');
        setTimeout(() => {
          detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  const brandFilteredProducts = activeBrand === "All" 
    ? gridProducts 
    : gridProducts.filter(p => p.brand === activeBrand);

  const seriesList = Array.from(new Set(brandFilteredProducts.flatMap(p => p.series || [])));

  const seriesFilteredProducts = brandFilteredProducts
    .filter(p => activeSeries === "All" || (p.series || []).includes(activeSeries));

  const subSeriesList = Array.from(new Set(
    seriesFilteredProducts
      .flatMap(p => p.subSeries || [])
      .filter((s): s is string => !!s)
  ));

  const filteredProducts = seriesFilteredProducts
    .filter(p => activeSubSeries === "All" || (p.subSeries || []).includes(activeSubSeries))
    .filter(p => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.modelNumber.toLowerCase().includes(query) ||
        (p.series || []).some(s => s.toLowerCase().includes(query)) ||
        (p.subSeries || []).some(s => s.toLowerCase().includes(query))
      );
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeBrand, activeSeries, activeSubSeries, searchQuery]);

  useEffect(() => {
    setActiveSeries("All");
    setActiveSubSeries("All");
  }, [activeBrand]);

  useEffect(() => {
    setActiveSubSeries("All");
  }, [activeSeries]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSuggestions = () => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const suggestions: { type: 'product' | 'series' | 'brand'; label: string; sublabel?: string; id?: number }[] = [];
    
    const matchingProducts = gridProducts
      .filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.modelNumber.toLowerCase().includes(query)
      )
      .slice(0, 5);
    
    matchingProducts.forEach(p => {
      suggestions.push({
        type: 'product',
        label: p.name,
        sublabel: p.modelNumber,
        id: p.id
      });
    });
    
    const matchingSeries = Array.from(new Set(gridProducts.flatMap(p => p.series || [])))
      .filter(s => s.toLowerCase().includes(query))
      .slice(0, 3);
    
    matchingSeries.forEach(s => {
      suggestions.push({
        type: 'series',
        label: s,
        sublabel: 'Series'
      });
    });
    
    return suggestions;
  };

  const suggestions = getSuggestions();

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    if (suggestion.type === 'product' && suggestion.id) {
      fetchProductDetail(suggestion.id);
    } else if (suggestion.type === 'series') {
      setActiveSeries(suggestion.label);
      setSearchQuery('');
    }
    setShowSuggestions(false);
  };

  const handleProductClick = (product: ProductGridItem) => {
    fetchProductDetail(product.id);
  };

  const handleBackToGrid = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
    setCurrentDrawingIndex(0);
  };

  // Calculate specs for selected product
  const specs = useMemo(() => {
    if (!selectedProduct) return [];
    return [
      { label: "Model", value: selectedProduct.modelNumber },
      { label: "Wattage", value: selectedProduct.wattage },
      { label: "Application", value: selectedProduct.application },
      { label: "Material", value: selectedProduct.material },
      { label: "Finish", value: selectedProduct.finish },
      { label: "Dimensions", value: selectedProduct.dimensions },
      { label: "Voltage", value: selectedProduct.voltage },
      { label: "Color", value: selectedProduct.color },
      { label: "CRI", value: selectedProduct.cri },
      { label: "CCT", value: selectedProduct.cct },
      { label: "Beam Angle", value: selectedProduct.beamAngle },
      ...(selectedProduct.brand === "Paralight" ? [
        { label: "Sub Series", value: (selectedProduct.subSeries || []).join(", ") || null },
        { label: "Standard Length", value: selectedProduct.standardLength },
        { label: "Diffuser Finish", value: selectedProduct.diffuserFinish },
        { label: "Diffuser Material", value: selectedProduct.diffuserMaterial },
        { label: "Accessories", value: selectedProduct.accessories },
        { label: "LED Strip Size", value: selectedProduct.ledStripSize },
        { label: "Installation Method", value: selectedProduct.installationMethod },
      ] : []),
      ...(selectedProduct.brand === "Maglinear" ? [
        { label: "Mounting Track", value: selectedProduct.mountingTrack },
        { label: "Cut Out Size", value: selectedProduct.cutOutSize },
        { label: "1 CCT", value: selectedProduct.oneCct },
        { label: "3 CCT", value: selectedProduct.threeCct },
        { label: "Installation Method", value: selectedProduct.installationMethod },
        { label: "Protection Rating", value: selectedProduct.protectionRating },
        { label: "Bluetooth Version", value: selectedProduct.bluetoothVersion },
        { label: "Adjustable Angle", value: selectedProduct.adjustableAngle },
      ] : [])
    ].filter((spec) => spec.value && spec.value.trim() !== "");
  }, [selectedProduct]);

  const additionalSpecRows = useMemo(() => {
    if (!selectedProduct?.technicalSpecs) return [];
    try {
      return JSON.parse(selectedProduct.technicalSpecs) as Array<{ model?: string; wattage?: string; application?: string; finish?: string; material?: string; dimensions?: string; voltage?: string; color?: string; cri?: string; cct?: string; beamAngle?: string; mountingTrack?: string; cutOutSize?: string; oneCct?: string; threeCct?: string; installationMethod?: string; protectionRating?: string; bluetoothVersion?: string; adjustableAngle?: string }>;
    } catch {
      return [];
    }
  }, [selectedProduct?.technicalSpecs]);

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
      { label: "Cut Out Size", value: row.cutOutSize },
      { label: "1 CCT", value: row.oneCct },
      { label: "3 CCT", value: row.threeCct },
      { label: "Installation Method", value: row.installationMethod },
      { label: "Protection Rating", value: row.protectionRating },
      { label: "Bluetooth Version", value: row.bluetoothVersion },
      { label: "Adjustable Angle", value: row.adjustableAngle },
    ].filter((spec) => spec.value && spec.value.trim() !== "");
    return [
      { label: "Model", value: row.model?.trim() || mainModelNumber },
      ...otherSpecs
    ];
  }, []);

  const brandColor = selectedProduct?.brand === "Paralight" ? "#00A8E8" : "#ECAA00";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const getPageTitle = () => {
    if (activeBrand === "All") return "All Products";
    return activeBrand;
  };

  const getPageSubtitle = () => {
    if (activeBrand === "All") return (
      <span style={{ color: '#d4c9b8' }}>LED Aluminum Profiles & Magnetic Track Lighting</span>
    );
    if (activeBrand === "Paralight") return <span style={{ color: '#0088bb' }}>Premium LED Aluminum Profiles</span>;
    return <span className="text-brand-gold">Magnetic Track Lighting & Commercial Lights Systems</span>;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-20 pb-20 mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Split image background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* All Products background image */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            animate={{ 
              opacity: activeBrand === "All" && !hoveredBrand ? 1 : 0
            }}
            transition={{ 
              duration: 0.15, 
              ease: "linear"
            }}
          >
            <img
              src="/all-products-hero.jpg"
              alt="All Products"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-transparent to-gray-900/60" />
          </motion.div>
          
          {/* Paralight image */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            animate={{ 
              clipPath: activeBrand === "All" 
                ? hoveredBrand === "Paralight"
                  ? "polygon(0 0, 70% 0, 50% 100%, 0 100%)"
                  : hoveredBrand === "Maglinear"
                    ? "polygon(0 0, 50% 0, 30% 100%, 0 100%)"
                    : "polygon(0 0, 0% 0, 0% 100%, 0 100%)" 
                : activeBrand === "Paralight" 
                  ? hoveredBrand === "Maglinear"
                    ? "polygon(0 0, 90% 0, 85% 100%, 0 100%)"
                    : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
                  : hoveredBrand === "Paralight"
                    ? "polygon(0 0, 15% 0, 10% 100%, 0 100%)"
                    : "polygon(0 0, 0% 0, 0% 100%, 0 100%)"
            }}
            transition={{ 
              duration: 0.15, 
              ease: "linear"
            }}
          >
            <img
              src="/paralight-hero.jpg"
              alt="Paralight Aluminum Profiles"
              className="absolute inset-0 w-full h-full object-cover scale-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-transparent to-gray-900/60" />
          </motion.div>
          
          {/* Maglinear image */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            animate={{ 
              clipPath: activeBrand === "All" 
                ? hoveredBrand === "Maglinear"
                  ? "polygon(50% 0, 100% 0, 100% 100%, 30% 100%)"
                  : hoveredBrand === "Paralight"
                    ? "polygon(70% 0, 100% 0, 100% 100%, 50% 100%)"
                    : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" 
                : activeBrand === "Maglinear" 
                  ? hoveredBrand === "Paralight"
                    ? "polygon(10% 0, 100% 0, 100% 100%, 15% 100%)"
                    : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
                  : hoveredBrand === "Maglinear"
                    ? "polygon(85% 0, 100% 0, 100% 100%, 90% 100%)"
                    : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
            }}
            transition={{ 
              duration: 0.15, 
              ease: "linear"
            }}
          >
            <img
              src="/maglinear-hero.jpg"
              alt="Maglinear Lighting Track Systems"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-transparent to-gray-900/60" />
          </motion.div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
        
        <div className="container mx-auto px-8 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block px-16 py-12 relative z-0">
              <div 
                className="absolute inset-0"
                style={{
                  background: 'rgba(245, 240, 232, 0.55)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 70%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 70%, transparent 90%)',
                  zIndex: -1,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/10 border border-gray-900/10 mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-600">
                  Product Catalog
                </span>
              </motion.div>
              
              <h1 className="font-display text-4xl md:text-6xl text-gray-900 font-medium mb-5">
                {activeBrand === "All" ? (
                  <>Explore Our <span className="italic font-normal text-white">Collection</span></>
                ) : activeBrand === "Paralight" ? (
                  <>Paralight <span className="italic font-normal text-brand-cyan">Profiles</span></>
                ) : (
                  <>Maglinear <span className="italic font-normal text-brand-gold">Lighting</span></>
                )}
              </h1>
              <p className="text-gray-600 text-lg max-w-xl mx-auto font-semibold">
                {getPageSubtitle()}
              </p>
            </div>
          </motion.div>
          
          {/* Brand selector tabs - repositioned at bottom */}
          <motion.div 
            className="flex justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {["Paralight", "All", "Maglinear"].map((brand) => (
              <motion.button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                onMouseEnter={() => brand !== "All" && setHoveredBrand(brand)}
                onMouseLeave={() => setHoveredBrand(null)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden ${
                  activeBrand === brand
                    ? brand === "Paralight" 
                      ? "bg-brand-cyan text-white shadow-xl shadow-brand-cyan/40 rounded-full"
                      : brand === "Maglinear"
                      ? "bg-brand-gold text-gray-900 shadow-xl shadow-brand-gold/40 rounded-full"
                      : "bg-white text-gray-900 shadow-xl rounded-full"
                    : "bg-white/5 backdrop-blur-sm text-white/80 hover:bg-white/15 border border-white/20 rounded-full hover:border-white/40"
                }`}
                data-testid={`hero-brand-${brand.toLowerCase()}`}
              >
                <span className="relative z-10">
                  {brand === "All" ? "All Products" : brand === "Maglinear" ? "Maglinear Lighting" : brand}
                </span>
                {activeBrand === brand && (
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    layoutId="activeBrandIndicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <main className="py-16 bg-gradient-to-b from-[#f5f2ed] via-[#faf8f5] to-white min-h-screen relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-cyan/5 to-transparent blur-3xl"
            style={{ top: '10%', left: '-10%' }}
            animate={{ 
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-brand-gold/5 to-transparent blur-3xl"
            style={{ top: '40%', right: '-5%' }}
            animate={{ 
              x: [0, -40, 0],
              y: [0, 50, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-brand-cyan/3 to-transparent blur-3xl"
            style={{ bottom: '20%', left: '30%' }}
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className={`flex flex-col lg:flex-row gap-10 ${selectedProduct ? 'lg:block' : ''}`}>
            {/* Sidebar - hidden when product is selected */}
            <aside className={`lg:w-80 shrink-0 ${selectedProduct ? 'hidden' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-28"
              >
                <AnimatePresence mode="wait">
                  {!selectedProduct && (
                    /* Filters Section - shown when viewing product grid */
                    <motion.div
                      key="filters"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Mobile filter toggle */}
                      <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 mb-6 px-5 py-3.5 bg-white rounded-xl shadow-md border border-gray-100 w-full justify-center"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                      </button>

                      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        {/* Search header */}
                        <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800" ref={searchContainerRef}>
                          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                            <Search className="w-4 h-4 text-brand-cyan" />
                            Find Products
                          </h3>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search by name or model..."
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                                setHighlightedIndex(-1);
                              }}
                              onFocus={() => setShowSuggestions(true)}
                              onKeyDown={handleKeyDown}
                              data-testid="search-input"
                              className="w-full px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all"
                            />
                          </div>
                          {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-0 right-0 mt-2 mx-6 bg-white border border-gray-100 shadow-2xl z-50 overflow-hidden rounded-xl">
                              {suggestions.map((suggestion, index) => (
                                <button
                                  key={`${suggestion.type}-${suggestion.label}-${index}`}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className={`w-full px-4 py-3 text-left flex items-center justify-between gap-3 transition-colors ${
                                    highlightedIndex === index ? 'bg-gray-50' : 'hover:bg-gray-50'
                                  }`}
                                  data-testid={`suggestion-${index}`}
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{suggestion.label}</p>
                                    {suggestion.sublabel && (
                                      <p className="text-xs text-gray-400 truncate">{suggestion.sublabel}</p>
                                    )}
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Series filter with nested sub-series */}
                        <div className="p-6">
                          <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">Product Series</h3>
                          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                            {/* All Series */}
                            <button
                              onClick={() => { setActiveSeries("All"); setActiveSubSeries("All"); }}
                              data-testid="filter-series-all"
                              className={`block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all ${
                                activeSeries === "All" 
                                  ? "bg-gray-900 text-white font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              All Series
                            </button>
                            
                            {/* Series with nested sub-series */}
                            {seriesList.map(series => {
                              const seriesProducts = brandFilteredProducts.filter(p => (p.series || []).includes(series));
                              const seriesSubSeries = Array.from(new Set(
                                seriesProducts.flatMap(p => p.subSeries || []).filter((s): s is string => !!s)
                              ));
                              const hasCyan = seriesProducts.some(p => p.brand === "Paralight");
                              const isSeriesActive = activeSeries === series;
                              
                              return (
                                <div key={series}>
                                  {/* Series button */}
                                  <button
                                    onClick={() => { setActiveSeries(series); setActiveSubSeries("All"); }}
                                    data-testid={`filter-series-${series.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all flex items-center justify-between ${
                                      isSeriesActive && activeSubSeries === "All"
                                        ? hasCyan ? "bg-brand-cyan text-white font-medium" : "bg-brand-gold text-gray-900 font-medium"
                                        : isSeriesActive 
                                          ? hasCyan ? "bg-brand-cyan/10 text-brand-cyan font-medium" : "bg-brand-gold/10 text-brand-gold font-medium"
                                          : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className={`w-1.5 h-1.5 rounded-full ${
                                        isSeriesActive && activeSubSeries === "All" 
                                          ? "bg-white" 
                                          : hasCyan ? "bg-brand-cyan" : "bg-brand-gold"
                                      }`} />
                                      {series}
                                    </span>
                                    <span className={`text-xs ${
                                      isSeriesActive && activeSubSeries === "All" 
                                        ? hasCyan ? "text-white/70" : "text-gray-900/50" 
                                        : "text-gray-400"
                                    }`}>
                                      {seriesProducts.length}
                                    </span>
                                  </button>
                                  
                                  {/* Nested sub-series (show when series is active and has sub-series) */}
                                  {isSeriesActive && seriesSubSeries.length > 0 && (
                                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                                      {seriesSubSeries.map(subSeriesItem => {
                                        const subSeriesCount = seriesProducts.filter(p => (p.subSeries || []).includes(subSeriesItem)).length;
                                        return (
                                          <button
                                            key={subSeriesItem}
                                            onClick={() => setActiveSubSeries(subSeriesItem)}
                                            data-testid={`filter-subseries-${subSeriesItem.toLowerCase().replace(/\s+/g, '-')}`}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center justify-between ${
                                              activeSubSeries === subSeriesItem 
                                                ? "bg-gray-900 text-white font-medium"
                                                : "text-gray-500 hover:bg-gray-50"
                                            }`}
                                          >
                                            <span>{subSeriesItem}</span>
                                            <span className={`text-xs ${activeSubSeries === subSeriesItem ? "text-white/70" : "text-gray-400"}`}>
                                              {subSeriesCount}
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </aside>

            {/* Product grid or detail view */}
            <div className="flex-1" ref={detailRef}>
              <AnimatePresence mode="wait">
{selectedProduct ? (
                  /* Professional Technical Product Detail View */
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10 overflow-hidden"
                  >
                    {/* Document Header - Professional Style */}
                    <div className="border-b-2 border-gray-900 pb-8 mb-10">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <motion.button
                          onClick={handleBackToGrid}
                          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors group"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          Back to Catalog
                        </motion.button>
                        <div className="flex items-center gap-2">
                          <span
                            className="px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-white rounded"
                            style={{ backgroundColor: brandColor }}
                          >
                            {selectedProduct.brand === "Maglinear" ? "Maglinear Lighting" : selectedProduct.brand}
                          </span>
                          {(selectedProduct.series || []).map((s, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-3 py-1.5 text-[10px] font-medium tracking-[0.1em] uppercase rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                          <h1 className="font-display text-4xl md:text-5xl text-gray-900 font-bold tracking-tight">
                            {selectedProduct.name}
                          </h1>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Model</span>
                              <span className="text-sm font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{selectedProduct.modelNumber}</span>
                            </div>
                            {selectedProduct.category && (
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Category</span>
                                <span className="text-xs text-gray-600">{selectedProduct.category}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex items-center gap-3">
                          <a
                            href={selectedProduct.catalogueUrl || undefined}
                            download={`${selectedProduct.name}-Catalogue.pdf`}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                              !selectedProduct.catalogueUrl
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-900 text-white hover:bg-gray-800"
                            }`}
                            onClick={(e) => !selectedProduct.catalogueUrl && e.preventDefault()}
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-gray-50 rounded-xl p-1.5 mb-10 inline-flex gap-1">
                      {[
                        { id: 'overview' as const, label: 'Overview', icon: Info },
                        { id: 'specs' as const, label: 'Specifications', icon: ListChecks },
                        { id: 'drawings' as const, label: 'Drawings', icon: Image },
                        ...(selectedProduct.brand === "Paralight" && selectedProduct.accessoriesSpec ? [{ id: 'accessories' as const, label: 'Accessories', icon: Wrench }] : []),
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveDetailTab(tab.id)}
                          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all rounded-lg ${
                            activeDetailTab === tab.id
                              ? 'bg-white text-gray-900 shadow-sm'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                          }`}
                        >
                          <tab.icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      {activeDetailTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                        >
                          {/* Left: Images */}
                          <div className="space-y-6">
                            {(() => {
                              const allImages = [
                                selectedProduct.image,
                                ...(selectedProduct.images || [])
                              ].filter(Boolean) as string[];
                              const currentImage = allImages[selectedImageIndex] || selectedProduct.image;

                              return (
                                <>
                                  <div 
                                    className="aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-gray-200 relative overflow-hidden rounded-2xl cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
                                    onClick={() => currentImage && setLightboxImage(currentImage)}
                                  >
                                    <div className="w-full h-full flex items-center justify-center p-8">
                                      {currentImage ? (
                                        <>
                                          <img
                                            src={currentImage}
                                            alt={selectedProduct.name}
                                            className="max-w-full max-h-full object-contain"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-black/70 px-3 py-1.5 rounded-full">
                                              Click to enlarge
                                            </span>
                                          </div>
                                        </>
                                      ) : (
                                        <Package className="w-24 h-24 text-gray-200" />
                                      )}
                                    </div>
                                  </div>

                                  {allImages.length > 1 && (
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                      {allImages.map((img, index) => (
                                        <button
                                          key={index}
                                          onClick={() => setSelectedImageIndex(index)}
                                          className={`flex-shrink-0 w-20 h-20 border-2 rounded-xl overflow-hidden transition-all ${
                                            selectedImageIndex === index 
                                              ? 'border-gray-900 ring-2 ring-gray-900/20 shadow-md' 
                                              : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                                          }`}
                                        >
                                          <img 
                                            src={img} 
                                            alt={`${selectedProduct.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                          />
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>

                          {/* Right: Description & Info */}
                          <div className="space-y-8">
                            {/* Description Section */}
                            <div className="prose prose-sm max-w-none">
                              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: brandColor }} />
                                Product Description
                              </h3>
                              <p className="text-gray-600 leading-relaxed text-base">
                                {selectedProduct.description}
                              </p>
                            </div>

                            {/* Key Features */}
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-5 flex items-center gap-2">
                                <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: brandColor }} />
                                Key Features
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                {[
                                  { label: "Application", value: selectedProduct.application },
                                  { label: "Material", value: selectedProduct.material },
                                  { label: "Finish", value: selectedProduct.finish },
                                  { label: "Color Options", value: selectedProduct.color },
                                  { label: "Standard Length", value: selectedProduct.standardLength },
                                  { label: "Installation", value: selectedProduct.installationMethod },
                                ].filter(item => item.value).map((item, idx) => (
                                  <div key={idx} className="flex flex-col p-3 bg-white rounded-lg border border-gray-100">
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-1">{item.label}</span>
                                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Control Integration - Maglinear only */}
                            {selectedProduct.brand !== "Paralight" && (
                              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                                <h3 className="text-base font-bold uppercase tracking-wide mb-5 flex items-center gap-2">
                                  <div className="w-1.5 h-5 rounded-full bg-[#ECAA00]" />
                                  Control Integration
                                </h3>
                                <img 
                                  src={controlIntegrationImg} 
                                  alt="Control Integration" 
                                  className="w-full max-w-xl mx-auto object-contain rounded-lg"
                                />
                              </div>
                            )}

                            {/* Packaging Method Image - Paralight only */}
                            {selectedProduct.brand === "Paralight" && (
                              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-5 flex items-center gap-2">
                                  <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: brandColor }} />
                                  Packaging Method
                                </h3>
                                <img 
                                  src="/packaging-method.png" 
                                  alt="Packaging Method" 
                                  className="max-w-full h-auto mx-auto rounded-lg"
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {activeDetailTab === 'specs' && (
                        <motion.div
                          key="specs"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-8"
                        >
                          {/* Technical Specifications Table */}
                          <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div 
                              className="px-6 py-4 border-b border-gray-200"
                              style={{ background: `linear-gradient(135deg, ${brandColor}10 0%, transparent 100%)` }}
                            >
                              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: brandColor }} />
                                Technical Specifications
                              </h3>
                            </div>
                            <div className="overflow-x-auto max-w-full">
                              <table className="w-full">
                                <tbody>
                                  {(() => {
                                    if (additionalSpecRows.length === 0) {
                                      // No additional rows - show specs normally
                                      return specs.map((spec, i) => (
                                        <tr key={spec.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                          <td className="px-4 py-3 text-xs uppercase tracking-widest text-gray-500 font-medium whitespace-nowrap border-r border-gray-100 sticky left-0 bg-inherit z-10" style={{ minWidth: '140px' }}>
                                            {spec.label}
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-900 font-medium whitespace-nowrap">
                                            {spec.value}
                                          </td>
                                        </tr>
                                      ));
                                    }
                                    
                                    // Has additional rows - build unified column table
                                    const allLabels = new Set<string>();
                                    additionalSpecRows.forEach(row => {
                                      const rowSpecs = getAdditionalRowSpecs(row, selectedProduct.modelNumber);
                                      rowSpecs.forEach(spec => allLabels.add(spec.label));
                                    });
                                    
                                    const labelArray = Array.from(allLabels);
                                    
                                    return labelArray.map((label, labelIdx) => (
                                      <tr key={label} className={labelIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 text-xs uppercase tracking-widest text-gray-500 font-medium whitespace-nowrap border-r border-gray-100 sticky left-0 bg-inherit z-10" style={{ minWidth: '140px' }}>
                                          {label}
                                        </td>
                                        {additionalSpecRows.map((row, colIdx) => {
                                          const rowSpecs = getAdditionalRowSpecs(row, selectedProduct.modelNumber);
                                          const spec = rowSpecs.find(s => s.label === label);
                                          return (
                                            <td key={colIdx} className="px-4 py-3 text-sm text-gray-900 font-medium whitespace-nowrap border-l border-gray-100" style={{ minWidth: '100px' }}>
                                              {spec?.value || '-'}
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    ));
                                  })()}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Packaging Information - Paralight only */}
                          {selectedProduct.brand === "Paralight" && (selectedProduct.packagingMethodADesc || selectedProduct.packagingMethodBDesc) && (
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                              <div 
                                className="px-6 py-4 border-b border-gray-200"
                                style={{ background: `linear-gradient(135deg, ${brandColor}10 0%, transparent 100%)` }}
                              >
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: brandColor }} />
                                  Packaging Information
                                </h3>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-6 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200">Method</th>
                                      <th className="px-6 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200">Description</th>
                                      <th className="px-6 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200">Specifications</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedProduct.packagingMethodADesc && (
                                      <tr className="border-b border-gray-100">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Method A</td>
                                        <td className="px-6 py-4 text-gray-600">{selectedProduct.packagingMethodADesc}</td>
                                        <td className="px-6 py-4 text-gray-600">{selectedProduct.packagingMethodASpec || '-'}</td>
                                      </tr>
                                    )}
                                    {selectedProduct.packagingMethodBDesc && (
                                      <tr>
                                        <td className="px-6 py-4">
                                          <span className="font-semibold" style={{ color: brandColor }}>Method B</span>
                                          <span className="block text-[10px] text-gray-400">(Additional Fee)</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{selectedProduct.packagingMethodBDesc}</td>
                                        <td className="px-6 py-4 text-gray-600">{selectedProduct.packagingMethodBSpec || '-'}</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeDetailTab === 'drawings' && (
                        <motion.div
                          key="drawings"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {(() => {
                            const allDrawings = [
                              selectedProduct.technicalDrawingUrl,
                              ...(selectedProduct.technicalDrawings || [])
                            ].filter(Boolean) as string[];
                            const safeDrawingIndex = Math.min(currentDrawingIndex, Math.max(0, allDrawings.length - 1));
                            const currentDrawing = allDrawings[safeDrawingIndex];

                            return (
                              <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div 
                                  className="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
                                  style={{ background: `linear-gradient(135deg, ${brandColor}10 0%, transparent 100%)` }}
                                >
                                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                    <div className="w-1 h-4 rounded-full" style={{ backgroundColor: brandColor }} />
                                    Technical Drawings
                                  </h3>
                                  {allDrawings.length > 1 && (
                                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                                      {safeDrawingIndex + 1} of {allDrawings.length}
                                    </span>
                                  )}
                                </div>
                                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                                  {allDrawings.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                      <Image className="w-12 h-12 text-gray-300 mb-4" />
                                      <p className="text-sm text-gray-500">Technical drawings available upon request</p>
                                      <p className="text-xs text-gray-400 mt-1">Contact us for detailed specifications</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-6">
                                      <div 
                                        className="relative bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center min-h-[400px] cursor-pointer group"
                                        onClick={() => setLightboxImage(currentDrawing)}
                                      >
                                        <img
                                          src={currentDrawing}
                                          alt={`Technical Drawing ${safeDrawingIndex + 1}`}
                                          className="max-w-full max-h-[500px] object-contain"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center rounded-lg pointer-events-none">
                                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-black/70 px-3 py-1.5 rounded-full">
                                            Click to enlarge
                                          </span>
                                        </div>
                                      </div>
                                      
                                      {allDrawings.length > 1 && (
                                        <div className="flex justify-center gap-3">
                                          <button
                                            onClick={() => setCurrentDrawingIndex(prev => Math.max(0, prev - 1))}
                                            disabled={safeDrawingIndex === 0}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                                              safeDrawingIndex === 0 
                                                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                            }`}
                                          >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                          </button>
                                          <button
                                            onClick={() => setCurrentDrawingIndex(prev => Math.min(allDrawings.length - 1, prev + 1))}
                                            disabled={safeDrawingIndex === allDrawings.length - 1}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                                              safeDrawingIndex === allDrawings.length - 1 
                                                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                            }`}
                                          >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </motion.div>
                      )}

                      {activeDetailTab === 'accessories' && selectedProduct.brand === "Paralight" && selectedProduct.accessoriesSpec && (
                        <motion.div
                          key="accessories"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {(() => {
                            try {
                              const accessoriesData = JSON.parse(selectedProduct.accessoriesSpec);
                              if (!Array.isArray(accessoriesData) || accessoriesData.length === 0) return null;
                              
                              const applicationRow = accessoriesData.find((item: { no?: string }) => 
                                item.no?.toLowerCase() === 'application'
                              );
                              const regularRows = accessoriesData.filter((item: { no?: string }) => 
                                item.no?.toLowerCase() !== 'application'
                              );
                              
                              return (
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                  <div 
                                    className="px-6 py-4 border-b border-gray-200"
                                    style={{ background: `linear-gradient(135deg, ${brandColor}10 0%, transparent 100%)` }}
                                  >
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: brandColor }} />
                                      Accessories Specification
                                    </h3>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-gray-50">
                                        <tr>
                                          <th className="px-6 py-3 text-center text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200 w-20">NO.</th>
                                          <th className="px-6 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200">Specification</th>
                                          <th className="px-6 py-3 text-center text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200 w-24">QTY</th>
                                          <th className="px-6 py-3 text-left text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200">Remarks</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {regularRows.map((item: { no?: string; specification?: string; qty?: string; remarks?: string }, index: number) => (
                                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 text-center font-bold" style={{ color: brandColor }}>{item.no || '-'}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.specification || '-'}</td>
                                            <td className="px-6 py-4 text-center text-gray-600">{item.qty || '-'}</td>
                                            <td className="px-6 py-4 text-gray-600">{item.remarks || '-'}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                    {applicationRow && (
                                      <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
                                        <span className="font-bold text-gray-700 mr-2">Application:</span>
                                        <span className="text-gray-600">{(applicationRow as { specification?: string }).specification || '-'}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            } catch {
                              return null;
                            }
                          })()}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Related Products Section */}
                    {(() => {
                      const relatedProducts = gridProducts.filter(p => 
                        p.id !== selectedProduct.id && 
                        (p.brand === selectedProduct.brand || 
                         (p.series || []).some(s => (selectedProduct.series || []).includes(s)))
                      ).slice(0, 4);
                      
                      if (relatedProducts.length === 0) return null;
                      
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="mt-16"
                        >
                          <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-display font-medium text-gray-900">Related Products</h2>
                            <button
                              onClick={handleBackToGrid}
                              className="text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
                            >
                              View All
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map((product) => {
                              const relatedBrandColor = product.brand === "Paralight" ? "#00A8E8" : "#ECAA00";
                              return (
                                <motion.div
                                  key={product.id}
                                  whileHover={{ y: -4 }}
                                  onClick={() => {
                                    setExpandedFaq(null);
                                    fetchProductDetail(product.id);
                                  }}
                                  className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
                                  data-testid={`related-product-${product.id}`}
                                >
                                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                                    {product.image ? (
                                      <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-12 h-12 text-gray-200" />
                                      </div>
                                    )}
                                    <div 
                                      className="absolute top-2 left-2 px-2 py-1 text-[8px] font-medium uppercase tracking-wider text-white rounded"
                                      style={{ backgroundColor: relatedBrandColor }}
                                    >
                                      {product.brand}
                                    </div>
                                  </div>
                                  <div className="p-3">
                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">{product.modelNumber}</p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })()}

                    {/* FAQ & Custom Request Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-16 border-t border-gray-200 pt-12"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: FAQ */}
                        <div>
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: brandColor }} />
                            <h2 className="text-xl font-display font-semibold text-gray-900">Frequently Asked Questions</h2>
                          </div>
                          <div className="space-y-3">
                        {[
                          {
                            question: "What is the minimum order quantity?",
                            answer: "Our minimum order quantity varies by product. For aluminum profiles, the MOQ is typically 100 meters. For magnetic track lighting, the MOQ is 50 units. Please contact us for specific product requirements."
                          },
                          {
                            question: "What are the lead times?",
                            answer: "Standard lead times are 2-3 weeks for stock items and 4-6 weeks for custom orders. Rush orders may be available upon request with additional fees."
                          },
                          {
                            question: "Do you offer custom lengths?",
                            answer: "Yes, we offer custom cutting services for aluminum profiles. Please specify your required lengths when placing an order. Custom lengths may affect pricing and lead times."
                          },
                          {
                            question: "What warranty do you provide?",
                            answer: "All our products come with a 3-year manufacturer warranty covering defects in materials and workmanship. LED components are warranted for 50,000 hours of operation."
                          },
                          {
                            question: "How can I request a sample?",
                            answer: "Samples are available for evaluation. Please contact our sales team at inquiry@paralight.cc with your requirements. Sample costs may apply but are often credited towards bulk orders."
                          },
                          {
                            question: "Do you ship internationally?",
                            answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by destination. We work with reliable logistics partners to ensure safe and timely delivery."
                          }
                        ].map((faq, index) => (
                          <div 
                            key={index} 
                            className="space-y-2"
                            data-testid={`faq-${index}`}
                          >
                            {/* Question bubble */}
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                              className="inline-flex items-center gap-2 px-4 py-2.5 text-left text-white rounded-2xl rounded-bl-md shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                              style={{ backgroundColor: brandColor }}
                            >
                              <HelpCircle className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm font-medium">{faq.question}</span>
                              <ChevronDown 
                                className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`}
                              />
                            </button>
                            {/* Answer bubble */}
                            <AnimatePresence>
                              {expandedFaq === index && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-6"
                                >
                                  <div className="inline-block bg-gray-100 text-gray-700 px-4 py-3 rounded-2xl rounded-tl-md max-w-lg">
                                    <p className="text-sm leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                          </div>
                        </div>

                        {/* Right: Custom Request */}
                        <div>
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: brandColor }} />
                            <h2 className="text-xl font-display font-semibold text-gray-900">Request Custom Solution</h2>
                          </div>
                          <div 
                            className="rounded-2xl p-6 border-2 border-dashed"
                            style={{ borderColor: `${brandColor}40`, backgroundColor: `${brandColor}05` }}
                          >
                            <div className="text-center mb-6">
                              <div 
                                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                                style={{ backgroundColor: `${brandColor}15` }}
                              >
                                <Wrench className="w-8 h-8" style={{ color: brandColor }} />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need a Custom Version?</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                We can customize this product to meet your specific requirements. Whether you need different dimensions, finishes, or technical specifications, our engineering team is ready to help.
                              </p>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                              {[
                                "Custom lengths and dimensions",
                                "Special finishes and colors",
                                "Modified technical specifications",
                                "Bulk order configurations",
                                "OEM/ODM partnerships"
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                                  <div 
                                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${brandColor}20` }}
                                  >
                                    <Check className="w-3 h-3" style={{ color: brandColor }} />
                                  </div>
                                  {item}
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-col gap-3">
                              <a
                                href={`mailto:inquiry@paralight.cc?subject=Custom Request: ${selectedProduct?.name || 'Product'}&body=Hi,%0D%0A%0D%0AI'm interested in a custom version of ${selectedProduct?.name || 'your product'} (Model: ${selectedProduct?.modelNumber || ''}).%0D%0A%0D%0AMy requirements:%0D%0A- %0D%0A%0D%0APlease contact me to discuss further.%0D%0A%0D%0AThank you.`}
                                className="w-full py-3 px-4 rounded-xl text-white font-medium text-sm text-center transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                style={{ backgroundColor: brandColor }}
                              >
                                <Mail className="w-4 h-4" />
                                Email Custom Request
                              </a>
                              <a
                                href="tel:+8618128259727"
                                className="w-full py-3 px-4 rounded-xl border-2 font-medium text-sm text-center transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
                                style={{ borderColor: brandColor, color: brandColor }}
                              >
                                <Phone className="w-4 h-4" />
                                Call: +86 181 2825 9727
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* Product Grid View */
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Results header */}
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-sm text-gray-500">
                        Showing <span className="font-medium text-gray-900">{paginatedProducts.length}</span> of <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
                        {totalPages > 1 && <span className="ml-2 text-gray-400">(Page {currentPage} of {totalPages})</span>}
                      </p>
                      
                      {(activeSeries !== "All" || activeSubSeries !== "All" || searchQuery) && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {activeSeries !== "All" && (
                            <button 
                              onClick={() => setActiveSeries("All")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                              {activeSeries}
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          {activeSubSeries !== "All" && (
                            <button 
                              onClick={() => setActiveSubSeries("All")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                              {activeSubSeries}
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          {searchQuery && (
                            <button 
                              onClick={() => setSearchQuery("")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                              "{searchQuery}"
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {isLoading ? (
                      <div className="flex justify-center py-40">
                        <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
                          <p className="text-sm text-gray-400">Loading products...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                          {paginatedProducts.map((product, index) => (
                            <motion.div 
                              key={product.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                              className="group"
                              data-testid={`product-card-${product.id}`}
                              onClick={() => handleProductClick(product)}
                            >
                          <motion.div 
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100/50"
                          >
                            {/* Image container */}
                            <div className="aspect-square bg-gray-100 relative overflow-hidden">
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  loading="lazy"
                                  decoding="async"
                                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-12 h-12 text-gray-300" />
                                </div>
                              )}
                              
                              {/* Hover overlay */}
                              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                product.brand === "Paralight" 
                                  ? "bg-gradient-to-t from-brand-cyan/80 via-brand-cyan/20 to-transparent" 
                                  : "bg-gradient-to-t from-brand-gold/80 via-brand-gold/20 to-transparent"
                              }`} />
                              
                              {/* View button on hover */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <motion.div 
                                  initial={{ scale: 0.8 }}
                                  whileHover={{ scale: 1.1 }}
                                  className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-gray-900 shadow-lg flex items-center gap-2"
                                >
                                  View Details
                                  <ChevronRight className="w-4 h-4" />
                                </motion.div>
                              </div>
                              
                              {/* Brand badge */}
                              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg bg-white/20 text-gray-900 border border-white/30">
                                {product.brand}
                              </div>
                            </div>
                            
                            {/* Product info */}
                            <div className="p-5">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                                    product.brand === "Paralight" 
                                      ? "text-brand-cyan" 
                                      : "text-brand-gold"
                                  }`}>
                                    {product.series}
                                  </span>
                                  <h2 className="text-sm font-medium text-gray-900 line-clamp-1 mt-1.5">
                                    {product.name}
                                  </h2>
                                  <p className="text-xs text-gray-400 mt-1">{product.modelNumber}</p>
                                </div>
                                <motion.div 
                                  whileHover={{ x: 3 }}
                                  className={`mt-1 ${
                                    product.brand === "Paralight" ? "text-brand-cyan" : "text-brand-gold"
                                  }`}
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {filteredProducts.length === 0 && !isLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm"
                      >
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                          <Package className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">No products found</p>
                        <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && !isLoading && filteredProducts.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 flex items-center justify-center gap-2"
                  >
                    {/* Previous Button */}
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {(() => {
                        const pages: (number | string)[] = [];
                        const showEllipsisStart = currentPage > 3;
                        const showEllipsisEnd = currentPage < totalPages - 2;
                        
                        if (totalPages <= 7) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          pages.push(1);
                          if (showEllipsisStart) pages.push('...');
                          
                          const start = Math.max(2, currentPage - 1);
                          const end = Math.min(totalPages - 1, currentPage + 1);
                          for (let i = start; i <= end; i++) pages.push(i);
                          
                          if (showEllipsisEnd) pages.push('...');
                          pages.push(totalPages);
                        }
                        
                        return pages.map((page, idx) => (
                          page === '...' ? (
                            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => {
                                setCurrentPage(page as number);
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                              }}
                              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                                currentPage === page
                                  ? 'bg-gray-900 text-white shadow-md'
                                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        ));
                      })()}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </main>
  <Footer />
  
  {/* Lightbox for enlarged image viewing */}
  <AnimatePresence>
    {lightboxImage && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
        onClick={() => setLightboxImage(null)}
      >
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          src={lightboxImage}
          alt="Enlarged view"
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    )}
  </AnimatePresence>
</div>
);
}
