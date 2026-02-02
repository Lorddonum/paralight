import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, Loader2, X, SlidersHorizontal, Search, ArrowRight } from "lucide-react";
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
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
              Product Catalog
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-gray-900 font-medium mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-gray-500 text-lg">
              {getPageSubtitle()}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-28">
                {/* Mobile filter toggle */}
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 mb-6 px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-100 w-full justify-center"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Search */}
                  <div className="p-5 border-b border-gray-100" ref={searchContainerRef}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSuggestions(true);
                          setHighlightedIndex(-1);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        data-testid="search-input"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all"
                      />
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute left-0 right-0 mt-2 mx-5 bg-white border border-gray-100 shadow-xl z-50 overflow-hidden rounded-lg">
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

                  {/* Brand filter */}
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">Brand</h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => setActiveBrand("All")}
                        data-testid="filter-brand-all"
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                          activeBrand === "All" 
                            ? "bg-gray-900 text-white font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        All Brands
                      </button>
                      {["Paralight", "Maglinear"].map(brand => (
                        <button
                          key={brand}
                          onClick={() => setActiveBrand(brand)}
                          data-testid={`filter-brand-${brand.toLowerCase()}`}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center gap-2 ${
                            activeBrand === brand 
                              ? "bg-gray-900 text-white font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${brand === "Paralight" ? "bg-brand-cyan" : "bg-brand-gold"}`} />
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Series filter */}
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">Series</h3>
                    <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                      <button
                        onClick={() => setActiveSeries("All")}
                        data-testid="filter-series-all"
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                          activeSeries === "All" 
                            ? "bg-gray-900 text-white font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        All Series
                      </button>
                      {seriesList.map(series => (
                        <button
                          key={series}
                          onClick={() => setActiveSeries(series)}
                          data-testid={`filter-series-${series.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                            activeSeries === series 
                              ? "bg-gray-900 text-white font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {series}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sub Series filter - only show when sub series exist */}
                  {subSeriesList.length > 0 && (
                    <div className="p-5">
                      <h3 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">Sub Series</h3>
                      <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                        <button
                          onClick={() => setActiveSubSeries("All")}
                          data-testid="filter-subseries-all"
                          className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                            activeSubSeries === "All" 
                              ? "bg-gray-900 text-white font-medium"
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
                            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                              activeSubSeries === subSeries 
                                ? "bg-gray-900 text-white font-medium"
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
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {/* Results header */}
              <div className="flex items-center justify-between mb-8 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                </p>
                
                {(activeSeries !== "All" || activeSubSeries !== "All" || searchQuery) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeSeries !== "All" && (
                      <button 
                        onClick={() => setActiveSeries("All")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-cyan/10 text-brand-cyan text-xs font-medium rounded-full hover:bg-brand-cyan/20 transition-colors"
                      >
                        {activeSeries}
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    {activeSubSeries !== "All" && (
                      <button 
                        onClick={() => setActiveSubSeries("All")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full hover:bg-brand-gold/20 transition-colors"
                      >
                        {activeSubSeries}
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
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
                  <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product, index) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="group"
                      data-testid={`product-card-${product.id}`}
                    >
                      <Link href={`/products/${product.id}`}>
                        <div className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                          {/* Image container */}
                          <div className="aspect-square bg-gray-50 relative overflow-hidden">
                            {product.image ? (
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-12 h-12 text-gray-300" />
                              </div>
                            )}
                            {/* Brand indicator */}
                            <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
                              product.brand === "Paralight" ? "bg-brand-cyan" : "bg-brand-gold"
                            }`} />
                          </div>
                          {/* Product info */}
                          <div className="p-4">
                            <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                              product.brand === "Paralight" 
                                ? "text-brand-cyan" 
                                : "text-brand-gold"
                            }`}>
                              {product.series}
                            </span>
                            <h2 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-1 mt-1">
                              {product.name}
                            </h2>
                            <p className="text-xs text-gray-400 mt-1">{product.modelNumber}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {filteredProducts.length === 0 && !isLoading && (
                    <div className="col-span-full text-center py-24 bg-white rounded-xl border border-gray-100">
                      <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                      <p className="text-sm text-gray-400">No products found</p>
                    </div>
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
