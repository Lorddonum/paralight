import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
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

  const filteredProducts = brandFilteredProducts
    .filter(p => activeSeries === "All" || p.series === activeSeries)
    .filter(p => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.modelNumber.toLowerCase().includes(query) ||
        p.series.toLowerCase().includes(query)
      );
    });

  useEffect(() => {
    setActiveSeries("All");
  }, [activeBrand]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate suggestions based on search query
  const getSuggestions = () => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const suggestions: { type: 'product' | 'series' | 'brand'; label: string; sublabel?: string; id?: number }[] = [];
    
    // Add matching products (limit to 5)
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
    
    // Add matching series
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
    return `${activeBrand} Products`;
  };

  const getPageSubtitle = () => {
    if (activeBrand === "All") return "LED Aluminum Profiles & Magnetic Track Lighting";
    if (activeBrand === "Paralight") return "LED Aluminum Profiles";
    return "Magnetic Track Lighting";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-8 lg:hidden">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  <div className="relative" ref={searchContainerRef}>
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
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={`${suggestion.type}-${suggestion.label}-${index}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`w-full px-4 py-3 text-left flex items-center justify-between gap-3 transition-colors ${
                              highlightedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'
                            }`}
                            data-testid={`suggestion-${index}`}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{suggestion.label}</p>
                              {suggestion.sublabel && (
                                <p className="text-xs text-gray-500 truncate">{suggestion.sublabel}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded ${
                                suggestion.type === 'product' 
                                  ? 'bg-blue-50 text-blue-600' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {suggestion.type === 'product' ? 'Product' : 'Series'}
                              </span>
                              <ArrowRight className="w-3 h-3 text-gray-400" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Brand</h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => setActiveBrand("All")}
                        data-testid="filter-brand-all"
                        className={`block w-full text-left px-3 py-2 text-sm transition-all rounded ${
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
                          className={`block w-full text-left px-3 py-2 text-sm transition-all rounded ${
                            activeBrand === brand 
                              ? brand === "Paralight" 
                                ? "bg-[#00A8E8]/10 text-[#00A8E8] font-medium" 
                                : "bg-[#ECAA00]/10 text-[#ECAA00] font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Series</h3>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => setActiveSeries("All")}
                        data-testid="filter-series-all"
                        className={`block w-full text-left px-3 py-2 text-sm transition-all rounded ${
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
                          className={`block w-full text-left px-3 py-2 text-sm transition-all rounded ${
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
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div>
                  <h1 className="text-2xl font-display font-bold text-gray-900">
                    {getPageTitle()}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {getPageSubtitle()}
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-gray-900">{filteredProducts.length}</span> Results
                </div>
              </div>

              {(activeSeries !== "All" || searchQuery) && (
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className="text-xs text-gray-500">Active filters:</span>
                  {activeSeries !== "All" && (
                    <button 
                      onClick={() => setActiveSeries("All")}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
                    >
                      {activeSeries}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
                    >
                      "{searchQuery}"
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {isLoading ? (
                <div className="flex justify-center py-40">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="group"
                      data-testid={`product-card-${product.id}`}
                    >
                      <Link href={`/products/${product.id}`}>
                        <div className="cursor-pointer">
                          <div className="aspect-square bg-gray-50 relative overflow-hidden mb-4 rounded-lg">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
                            <div className="w-full h-full flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                              ) : (
                                <Package className="w-12 h-12 text-gray-200" />
                              )}
                            </div>
                            <div className="absolute top-3 left-3 z-20 flex gap-1">
                              <span className={`px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider rounded ${
                                product.brand === "Paralight" 
                                  ? "bg-[#00A8E8] text-white" 
                                  : "bg-[#ECAA00] text-white"
                              }`}>
                                {product.series}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h2 className="text-sm font-medium text-gray-900 group-hover:text-[#00A8E8] transition-colors line-clamp-1">
                              {product.name}
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5">{product.modelNumber}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {filteredProducts.length === 0 && !isLoading && (
                    <div className="col-span-full text-center py-20">
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
