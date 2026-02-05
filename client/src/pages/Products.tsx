import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, Loader2, X, SlidersHorizontal, Search, ArrowRight, ChevronRight, ChevronDown, Sparkles, ArrowLeft, FileText, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";
import controlIntegrationImg from "@/assets/control-integration.png";

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
  technicalSpecs?: string | null;
  accessoriesSpec?: string | null;
  packagingMethodADesc?: string | null;
  packagingMethodASpec?: string | null;
  packagingMethodBDesc?: string | null;
  packagingMethodBSpec?: string | null;
  packagingMethodImage?: string | null;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [activeSeries, setActiveSeries] = useState<string>("All");
  const [activeSubSeries, setActiveSubSeries] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchProducts = async (retries = 3) => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
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

  const brandFilteredProducts = activeBrand === "All" 
    ? products 
    : products.filter(p => p.brand === activeBrand);

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
    
    const matchingProducts = products
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
    
    const matchingSeries = Array.from(new Set(products.flatMap(p => p.series || [])))
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
      const product = products.find(p => p.id === suggestion.id);
      if (product) {
        setSelectedProduct(product);
        setSelectedImageIndex(0);
      }
    } else if (suggestion.type === 'series') {
      setActiveSeries(suggestion.label);
      setSearchQuery('');
    }
    setShowSuggestions(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBackToGrid = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
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
      ] : [])
    ].filter((spec) => spec.value && spec.value.trim() !== "");
  }, [selectedProduct]);

  const additionalSpecRows = useMemo(() => {
    if (!selectedProduct?.technicalSpecs) return [];
    try {
      return JSON.parse(selectedProduct.technicalSpecs) as Array<{ model?: string; wattage?: string; application?: string; finish?: string; material?: string; dimensions?: string; voltage?: string; color?: string; cri?: string; cct?: string; beamAngle?: string; mountingTrack?: string; cutOutSize?: string; oneCct?: string; threeCct?: string; installationMethod?: string }>;
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
      <>
        <span className="text-brand-gold">LED Aluminum Profiles</span>
        <span className="text-gray-600"> & </span>
        <span className="text-brand-cyan">Magnetic Track Lighting Collection</span>
      </>
    );
    if (activeBrand === "Paralight") return "Premium LED Aluminum Profiles";
    return "Magnetic Track Lighting & Commercial Lights Systems";
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
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1]
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
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1]
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
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1]
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
                  <>Explore Our <motion.span 
                    className="italic font-normal"
                    animate={{ 
                      color: hoveredBrand === "Paralight" 
                        ? "#00A8E8" 
                        : hoveredBrand === "Maglinear" 
                          ? "#ECAA00" 
                          : "#ffffff"
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                  >Collection</motion.span></>
                ) : activeBrand === "Paralight" ? (
                  <>Paralight <span className="italic font-normal text-brand-cyan">Profiles</span></>
                ) : (
                  <>Maglinear <span className="italic font-normal text-brand-gold">Lighting</span></>
                )}
              </h1>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
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

      <main className="py-16 bg-gradient-to-b from-[#f5f2ed] via-[#faf8f5] to-white min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="lg:w-80 shrink-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-28"
              >
                <AnimatePresence mode="wait">
                  {selectedProduct ? (
                    /* FAQ Section - shown when viewing product detail */
                    <motion.div
                      key="faq"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden"
                    >
                      <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800">
                        <h3 className="text-white font-medium flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-brand-cyan" />
                          Frequently Asked Questions
                        </h3>
                      </div>
                      <div className="p-4 space-y-2">
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
                          <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                              className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors"
                              data-testid={`faq-${index}`}
                            >
                              <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                              <ChevronDown 
                                className={`w-4 h-4 text-gray-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                              />
                            </button>
                            <AnimatePresence>
                              {expandedFaq === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
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
                  /* Inline Product Detail View */
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Back button */}
                    <motion.button
                      onClick={handleBackToGrid}
                      className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors group mb-6"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Back to Catalog
                    </motion.button>

                    {/* Product header */}
                    <motion.div 
                      className="flex items-center gap-3 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <span
                        className="px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase text-white rounded"
                        style={{ backgroundColor: brandColor }}
                      >
                        {selectedProduct.brand}
                      </span>
                      {(selectedProduct.series || []).map((s, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-900 text-white px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Left column - Images */}
                      <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div>
                          <h1 className="font-display text-3xl md:text-4xl text-gray-900 font-medium mb-2">
                            {selectedProduct.name}
                          </h1>
                          <p className="text-sm text-gray-400 tracking-wide">
                            {selectedProduct.modelNumber}
                          </p>
                        </div>

                        {/* Main image */}
                        {(() => {
                          const allImages = [
                            selectedProduct.image,
                            ...(selectedProduct.images || [])
                          ].filter(Boolean) as string[];
                          const currentImage = allImages[selectedImageIndex] || selectedProduct.image;

                          return (
                            <>
                              <div className="aspect-square max-w-md mx-auto bg-white border border-gray-100 relative overflow-hidden rounded-2xl shadow-lg">
                                <div className="w-full h-full flex items-center justify-center p-8">
                                  {currentImage ? (
                                    <img
                                      src={currentImage}
                                      alt={selectedProduct.name}
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  ) : (
                                    <Package className="w-24 h-24 text-gray-200" />
                                  )}
                                </div>
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

                        {/* Description */}
                        <div className="pt-4">
                          <p className="text-gray-600 leading-relaxed text-sm mb-6">
                            {selectedProduct.description}
                          </p>
                          
                          {/* Packaging Method Image - Paralight only */}
                          {selectedProduct.brand === "Paralight" && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3 text-center">
                                Packaging Method
                              </h4>
                              <img 
                                src="/packaging-method.png" 
                                alt="Packaging Method" 
                                className="max-w-full h-auto mx-auto"
                              />
                            </div>
                          )}
                          
                          <a
                            href={selectedProduct.catalogueUrl || undefined}
                            download={`${selectedProduct.name}-Catalogue.pdf`}
                            className={`inline-flex items-center gap-3 text-xs uppercase tracking-widest transition-all ${
                              !selectedProduct.catalogueUrl
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                            onClick={(e) => !selectedProduct.catalogueUrl && e.preventDefault()}
                          >
                            <FileText className="w-4 h-4" />
                            {selectedProduct.catalogueUrl
                              ? "Download Catalogue"
                              : "Catalogue Not Available"}
                          </a>
                        </div>
                      </motion.div>

                      {/* Right column - Specs */}
                      <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedProduct.brand !== "Paralight" && (
                          <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 text-center">
                              Control Integration
                            </h3>
                            <img 
                              src={controlIntegrationImg} 
                              alt="Control Integration" 
                              className="w-full max-w-xl mx-auto object-contain"
                            />
                          </div>
                        )}

                        {/* Technical Specifications */}
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                          <div 
                            className="p-4 border-b"
                            style={{ borderColor: `${brandColor}20`, background: `linear-gradient(135deg, ${brandColor}08 0%, transparent 100%)` }}
                          >
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold text-center">
                              Technical Specifications
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                            {specs.map((spec, i) => (
                              <div
                                key={spec.label}
                                className={`p-4 ${i < specs.length - (specs.length % 4 || 4) ? "border-b" : ""} ${(i + 1) % 4 !== 0 ? "border-r" : ""} border-gray-100`}
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
                            const rowSpecs = getAdditionalRowSpecs(row, selectedProduct.modelNumber);
                            if (rowSpecs.length === 0) return null;
                            return (
                              <div key={rowIndex} className="border-t border-gray-100">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                  {rowSpecs.map((spec, i) => (
                                    <div
                                      key={`${rowIndex}-${spec.label}`}
                                      className={`p-4 ${i < rowSpecs.length - (rowSpecs.length % 4 || 4) ? "border-b" : ""} ${(i + 1) % 4 !== 0 ? "border-r" : ""} border-gray-100`}
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
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                          <div 
                            className="p-4 border-b"
                            style={{ borderColor: `${brandColor}20`, background: `linear-gradient(135deg, ${brandColor}08 0%, transparent 100%)` }}
                          >
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold text-center">
                              Technical Drawing
                            </h3>
                          </div>
                          <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                            {(() => {
                              const allDrawings = [
                                selectedProduct.technicalDrawingUrl,
                                ...(selectedProduct.technicalDrawings || [])
                              ].filter(Boolean) as string[];

                              if (allDrawings.length === 0) {
                                return (
                                  <div className="flex items-center justify-center h-32">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                                      Technical drawing available upon request
                                    </p>
                                  </div>
                                );
                              }

                              return (
                                <div className={`grid gap-3 ${allDrawings.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                  {allDrawings.map((drawing, index) => (
                                    <div 
                                      key={index}
                                      className="h-44 bg-white border border-gray-100 rounded flex items-center justify-center p-2"
                                    >
                                      <img
                                        src={drawing}
                                        alt={`Technical Drawing ${index + 1}`}
                                        className="max-w-full max-h-full object-contain"
                                      />
                                    </div>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Accessories Specification - Paralight only */}
                        {selectedProduct.brand === "Paralight" && selectedProduct.accessoriesSpec && (() => {
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
                              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div 
                                  className="p-4 border-b"
                                  style={{ borderColor: `${brandColor}20`, background: `linear-gradient(135deg, ${brandColor}08 0%, transparent 100%)` }}
                                >
                                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold text-center">
                                    Accessories Specification
                                  </h3>
                                </div>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead className="bg-gradient-to-r from-gray-50 to-white">
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
                                          <td colSpan={3} className="px-4 py-3 text-gray-600">{(applicationRow as { specification?: string }).specification || '-'}</td>
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

                        {/* Packaging Information - Paralight only */}
                        {selectedProduct.brand === "Paralight" && (selectedProduct.packagingMethodADesc || selectedProduct.packagingMethodBDesc) && (
                          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div 
                              className="p-4 border-b"
                              style={{ borderColor: `${brandColor}20`, background: `linear-gradient(135deg, ${brandColor}08 0%, transparent 100%)` }}
                            >
                              <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold text-center">
                                Packaging Information
                              </h3>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-gradient-to-r from-gray-50 to-white">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Packaging Method</th>
                                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Description</th>
                                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">Specifications</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedProduct.packagingMethodADesc && (
                                    <tr className="border-b border-gray-100">
                                      <td className="px-4 py-3 font-medium text-gray-900">Method A</td>
                                      <td className="px-4 py-3 text-gray-600">{selectedProduct.packagingMethodADesc}</td>
                                      <td className="px-4 py-3 text-gray-600">{selectedProduct.packagingMethodASpec || '-'}</td>
                                    </tr>
                                  )}
                                  {selectedProduct.packagingMethodBDesc && (
                                    <tr>
                                      <td className="px-4 py-3 font-medium" style={{ color: brandColor }}>Method B<br/><span className="text-[10px] text-gray-400">(Additional Fee)</span></td>
                                      <td className="px-4 py-3 text-gray-600">{selectedProduct.packagingMethodBDesc}</td>
                                      <td className="px-4 py-3 text-gray-600">{selectedProduct.packagingMethodBSpec || '-'}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Related Products Section */}
                    {(() => {
                      const relatedProducts = products.filter(p => 
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
                                    setSelectedProduct(product);
                                    setSelectedImageIndex(0);
                                    setExpandedFaq(null);
                                    if (detailRef.current) {
                                      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
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
                        <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
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
                          {filteredProducts.map((product, index) => (
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</div>
);
}
