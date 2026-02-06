import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Download, Loader2, FolderOpen, Search, ArrowRight, BookOpen, Layers, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  series: string[];
  brand: string;
  category: string;
  catalogueUrl: string | null;
  image: string | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  shape: 'circle' | 'square' | 'diamond';
  rotation: number;
  rotationSpeed: number;
}

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const dimRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [
      { r: 139, g: 115, b: 85 },
      { r: 210, g: 180, b: 140 },
      { r: 196, g: 167, b: 125 },
      { r: 160, g: 130, b: 109 },
    ];

    const initParticles = (w: number, h: number) => {
      const particles: Particle[] = [];
      const count = Math.max(25, Math.floor((w * h) / 35000));
      const shapes: ('circle' | 'square' | 'diamond')[] = ['circle', 'square', 'diamond'];
      
      for (let i = 0; i < count; i++) {
        const c = colors[i % colors.length];
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.1,
          size: 2 + Math.random() * 4,
          opacity: 0.03 + Math.random() * 0.08,
          color: `rgba(${c.r}, ${c.g}, ${c.b},`,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
      return particles;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dimRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width;
      canvas.height = rect.height;
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const drawGrid = (w: number, h: number, time: number) => {
      const spacing = 80;
      const wave = Math.sin(time * 0.0005) * 0.3;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + wave * 0.01})`;
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < w; x += spacing) {
        const offset = Math.sin(x * 0.005 + time * 0.001) * 3;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + offset, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        const offset = Math.cos(y * 0.005 + time * 0.001) * 3;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + offset);
        ctx.stroke();
      }
    };

    const drawConnections = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.04;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const { width: w, height: h } = dimRef.current;
      timeRef.current += 16;
      ctx.clearRect(0, 0, w, h);

      drawGrid(w, h, timeRef.current);

      const particles = particlesRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      drawConnections(particles);

      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `${p.color} ${p.opacity})`;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'square') {
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.4);
          ctx.lineTo(p.size * 1.4, 0);
          ctx.lineTo(0, p.size * 1.4);
          ctx.lineTo(-p.size * 1.4, 0);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

export default function Downloads() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<"all" | "Paralight" | "Maglinear">("all");
  const [activeSeries, setActiveSeries] = useState<string>("all");

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

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesBrand = activeBrand === "all" || p.brand === activeBrand;
      const matchesSeries = activeSeries === "all" || (p.series || []).includes(activeSeries);
      const query = searchQuery.toLowerCase();
      const matchesSearch = query === "" || 
        p.name.toLowerCase().includes(query) ||
        p.modelNumber.toLowerCase().includes(query) ||
        (p.series || []).some(s => s.toLowerCase().includes(query));
      return matchesBrand && matchesSearch && matchesSeries;
    });
  }, [products, activeBrand, activeSeries, searchQuery]);

  const allSeries = useMemo(() => {
    const brandProducts = activeBrand === "all" 
      ? products 
      : products.filter(p => p.brand === activeBrand);
    return Array.from(new Set(brandProducts.flatMap(p => p.series || []))).sort();
  }, [products, activeBrand]);

  const paralightCount = products.filter(p => p.brand === "Paralight").length;
  const maglinearCount = products.filter(p => p.brand === "Maglinear").length;

  const groupBySeries = (prods: Product[]) => {
    return prods.reduce((acc, product) => {
      const seriesKey = product.series && product.series.length > 0 ? product.series[0] : "Other";
      if (!acc[seriesKey]) acc[seriesKey] = [];
      acc[seriesKey].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };

  const grouped = groupBySeries(filteredProducts);

  return (
    <div className="min-h-screen bg-[#1a1610] text-white selection:bg-[#00A8E8] selection:text-white font-sans">
      <Navbar />
      
      <div className="relative pt-32 pb-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatedBackground />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8B7355]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ECAA00]/8 rounded-full blur-[150px]" />
          <div className="absolute top-[60%] left-[10%] w-[400px] h-[400px] bg-[#D2B48C]/6 rounded-full blur-[120px]" />
        </div>
        
        <main className="relative z-10">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Hero Section */}
            <div className="mb-16">
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
                className="text-lg text-white/50 leading-relaxed max-w-2xl mb-10"
              >
                Access product catalogues, specifications, and technical documentation for our complete range of architectural lighting solutions.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <BookOpen className="w-4 h-4 text-[#00A8E8]" />
                  <div>
                    <span className="text-lg font-bold text-white">{products.length}</span>
                    <span className="text-xs text-white/40 ml-2">Total Catalogues</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-[#00A8E8]" />
                  <div>
                    <span className="text-lg font-bold text-white">{paralightCount}</span>
                    <span className="text-xs text-white/40 ml-2">Paralight</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-[#ECAA00]" />
                  <div>
                    <span className="text-lg font-bold text-white">{maglinearCount}</span>
                    <span className="text-xs text-white/40 ml-2">Maglinear Lighting</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 mb-10 backdrop-blur-sm"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search by name, model number, or series..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#00A8E8]/50 focus:ring-1 focus:ring-[#00A8E8]/20 transition-all"
                    data-testid="input-search-downloads"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <X className="w-3 h-3 text-white/60" />
                    </button>
                  )}
                </div>
                
                {/* Brand Filter */}
                <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
                  {[
                    { key: "all" as const, label: "All", color: "bg-white text-gray-900" },
                    { key: "Paralight" as const, label: "Paralight", color: "bg-[#00A8E8] text-white" },
                    { key: "Maglinear" as const, label: "Maglinear", color: "bg-[#ECAA00] text-white" },
                  ].map(b => (
                    <button
                      key={b.key}
                      onClick={() => { setActiveBrand(b.key); setActiveSeries("all"); }}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        activeBrand === b.key ? b.color : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      }`}
                      data-testid={`filter-${b.key}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Series pills */}
              {allSeries.length > 1 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 mr-1">Series:</span>
                    <button
                      onClick={() => setActiveSeries("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeSeries === "all" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      }`}
                    >
                      All
                    </button>
                    {allSeries.map(s => (
                      <button
                        key={s}
                        onClick={() => setActiveSeries(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeSeries === s ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Content */}
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
                className="text-center py-32 bg-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-9 h-9 text-white/20" />
                </div>
                <p className="text-lg font-medium text-white/80 mb-2">No catalogues found</p>
                <p className="text-sm text-white/40">
                  {searchQuery ? "Try adjusting your search terms" : "Check back soon for updates"}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {Object.entries(grouped).map(([series, prods], sIdx) => {
                    const brandColor = prods[0]?.brand === "Paralight" ? "#00A8E8" : "#ECAA00";
                    const brandName = prods[0]?.brand === "Maglinear" ? "Maglinear Lighting" : prods[0]?.brand;
                    
                    return (
                      <motion.div
                        key={series}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: sIdx * 0.05 }}
                        className="bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm"
                      >
                        {/* Series header */}
                        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${brandColor}15` }}
                            >
                              <FolderOpen className="w-4 h-4" style={{ color: brandColor }} />
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-white">{series}</h3>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span 
                                  className="text-[10px] uppercase tracking-widest font-medium"
                                  style={{ color: brandColor }}
                                >
                                  {brandName}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-[10px] text-white/40 uppercase tracking-wider">
                                  {prods.length} file{prods.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Layers className="w-4 h-4 text-white/15" />
                        </div>
                        
                        {/* Product rows */}
                        <div className="divide-y divide-white/5">
                          {prods.map((product, idx) => (
                            <motion.a
                              key={product.id}
                              href={product.catalogueUrl || "#"}
                              download={`${product.name}-Catalogue.pdf`}
                              data-testid={`download-${product.id}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.03 }}
                              className="group flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition-all"
                            >
                              {/* Product image thumbnail */}
                              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {product.image ? (
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <FileText className="w-5 h-5 text-white/20" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-white/90 group-hover:text-white truncate transition-colors">
                                  {product.name}
                                </h4>
                                <span className="text-[10px] text-white/30 uppercase tracking-wider font-mono">
                                  {product.modelNumber}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] uppercase tracking-wider text-white/40 hidden sm:block">
                                  PDF
                                </span>
                                <div 
                                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                                  style={{ backgroundColor: `${brandColor}15` }}
                                >
                                  <Download className="w-4 h-4" style={{ color: brandColor }} />
                                </div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Bottom info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4"
                >
                  <p className="text-xs text-white/25">
                    Showing {filteredProducts.length} of {products.length} catalogues
                  </p>
                  <a 
                    href="/contact" 
                    className="flex items-center gap-2 text-xs text-white/40 hover:text-[#00A8E8] transition-colors group"
                  >
                    Need a custom specification sheet?
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </motion.div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
