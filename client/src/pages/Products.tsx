import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, Loader2, X, SlidersHorizontal, Search, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string;
  subSeries?: string | null;
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
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products');
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

  const brandFilteredProducts = activeBrand === "All" 
    ? products 
    : products.filter(p => p.brand === activeBrand);

  const seriesList = Array.from(new Set(brandFilteredProducts.map(p => p.series)));

  const seriesFilteredProducts = brandFilteredProducts
    .filter(p => activeSeries === "All" || p.series === activeSeries);

  const subSeriesList = Array.from(new Set(
    seriesFilteredProducts
      .map(p => p.subSeries)
      .filter((s): s is string => !!s)
  ));

  const filteredProducts = seriesFilteredProducts
    .filter(p => activeSubSeries === "All" || p.subSeries === activeSubSeries)
    .filter(p => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.modelNumber.toLowerCase().includes(query) ||
        p.series.toLowerCase().includes(query) ||
        (p.subSeries && p.subSeries.toLowerCase().includes(query))
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
    
    const matchingSeries = Array.from(new Set(products.map(p => p.series)))
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
      setLocation(`/products/${suggestion.id}`);
    } else if (suggestion.type === 'series') {
      setActiveSeries(suggestion.label);
      setSearchQuery('');
    }
    setShowSuggestions(false);
  };

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
    if (activeBrand === "All") return "LED Aluminum Profiles & Magnetic Track Lighting";
    if (activeBrand === "Paralight") return "Premium LED Aluminum Profiles";
    return "Magnetic Track Lighting Systems";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/60">
                Product Catalog
              </span>
            </motion.div>
            
            <h1 className="font-display text-4xl md:text-6xl text-white font-medium mb-5">
              {activeBrand === "All" ? (
                <>Explore Our <span className="italic font-normal text-brand-cyan">Collection</span></>
              ) : activeBrand === "Paralight" ? (
                <>Paralight <span className="italic font-normal text-brand-cyan">Profiles</span></>
              ) : (
                <>Maglinear <span className="italic font-normal text-brand-gold">Track</span></>
              )}
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {getPageSubtitle()}
            </p>
            
            {/* Brand selector tabs */}
            <div className="flex justify-center gap-3 mt-10">
              {["All", "Paralight", "Maglinear"].map((brand) => (
                <motion.button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeBrand === brand
                      ? brand === "Paralight" 
                        ? "bg-brand-cyan text-white shadow-lg shadow-brand-cyan/30"
                        : brand === "Maglinear"
                        ? "bg-brand-gold text-gray-900 shadow-lg shadow-brand-gold/30"
                        : "bg-white text-gray-900"
                      : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
                  }`}
                  data-testid={`hero-brand-${brand.toLowerCase()}`}
                >
                  {brand === "All" ? "All Products" : brand}
                </motion.button>
              ))}
            </div>
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

                  {/* Series filter */}
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">Product Series</h3>
                    <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                      <button
                        onClick={() => setActiveSeries("All")}
                        data-testid="filter-series-all"
                        className={`block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all ${
                          activeSeries === "All" 
                            ? "bg-gray-900 text-white font-medium shadow-md"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        All Series
                      </button>
                      {seriesList.map(series => {
                        const seriesProducts = brandFilteredProducts.filter(p => p.series === series);
                        const hasCyan = seriesProducts.some(p => p.brand === "Paralight");
                        const hasGold = seriesProducts.some(p => p.brand === "Maglinear");
                        return (
                          <button
                            key={series}
                            onClick={() => setActiveSeries(series)}
                            data-testid={`filter-series-${series.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all flex items-center justify-between ${
                              activeSeries === series 
                                ? hasCyan ? "bg-brand-cyan text-white font-medium shadow-md" : "bg-brand-gold text-gray-900 font-medium shadow-md"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${hasCyan ? "bg-brand-cyan" : "bg-brand-gold"} ${activeSeries === series ? "bg-white" : ""}`} />
                              {series}
                            </span>
                            <span className={`text-xs ${activeSeries === series ? "text-white/70" : "text-gray-400"}`}>
                              {seriesProducts.length}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sub Series filter - only show when sub series exist */}
                  {subSeriesList.length > 0 && (
                    <div className="p-6">
                      <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">Sub Series</h3>
                      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                        <button
                          onClick={() => setActiveSubSeries("All")}
                          data-testid="filter-subseries-all"
                          className={`block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all ${
                            activeSubSeries === "All" 
                              ? "bg-gray-900 text-white font-medium shadow-md"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          All Sub Series
                        </button>
                        {subSeriesList.map(subSeries => (
                          <button
                            key={subSeries}
                            onClick={() => setActiveSubSeries(subSeries)}
                            data-testid={`filter-subseries-${subSeries.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all ${
                              activeSubSeries === subSeries 
                                ? "bg-gray-900 text-white font-medium shadow-md"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {subSeries}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {/* Results header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {filteredProducts.length} Products
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeBrand === "All" ? "All brands" : activeBrand}
                    </p>
                  </div>
                </div>
                
                {(activeSeries !== "All" || activeSubSeries !== "All" || searchQuery) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeSeries !== "All" && (
                      <motion.button 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={() => setActiveSeries("All")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-cyan/10 text-brand-cyan text-xs font-medium rounded-full hover:bg-brand-cyan/20 transition-colors"
                      >
                        {activeSeries}
                        <X className="w-3 h-3" />
                      </motion.button>
                    )}
                    {activeSubSeries !== "All" && (
                      <motion.button 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={() => setActiveSubSeries("All")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full hover:bg-brand-gold/20 transition-colors"
                      >
                        {activeSubSeries}
                        <X className="w-3 h-3" />
                      </motion.button>
                    )}
                    {searchQuery && (
                      <motion.button 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={() => setSearchQuery("")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                      >
                        "{searchQuery}"
                        <X className="w-3 h-3" />
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>

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
                      >
                        <Link href={`/products/${product.id}`}>
                          <motion.div 
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100/50"
                          >
                            {/* Image container */}
                            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
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
                        </Link>
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
