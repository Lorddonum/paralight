import { motion } from "framer-motion";
import paralightImg from "@/assets/paralight-profiles.png";
import maglinearImg from "@/assets/paralight-brand.png";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function BrandSplit() {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  return (
    <section className="h-full py-12 bg-white relative overflow-hidden flex flex-col justify-center">
      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.video 
          autoPlay 
          loop 
          muted={true}
          playsInline
          className="w-full h-full object-cover opacity-40"
          animate={{ filter: hoveredBrand ? 'blur(6px)' : 'blur(0px)' }}
          transition={{ duration: 0.5 }}
        >
          <source src="/brand-split-bg.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-30" />
        <motion.div 
          className="absolute inset-0 bg-brand-cyan"
          animate={{ opacity: hoveredBrand === 'Paralight' ? 0.12 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div 
          className="absolute inset-0 bg-brand-gold"
          animate={{ opacity: hoveredBrand === 'Maglinear' ? 0.12 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      
      <div className="container mx-auto px-8 lg:px-12 relative z-10 pt-8">
        {/* Section header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Our Brands
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 font-medium"
          >
            Two Pillars of <span className="italic font-normal">Excellence</span>
          </motion.h2>
        </div>

        {/* Brand cards - corner positioned */}
        <div className="relative min-h-[700px] lg:min-h-[650px]">
          
          {/* Paralight Card - bottom left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setHoveredBrand('Paralight')}
            onMouseLeave={() => setHoveredBrand(null)}
            className="lg:absolute lg:bottom-0 lg:left-0 lg:w-[40%] mb-8 lg:mb-0"
          >
            <Link href="/products?brand=Paralight">
              <div className="group relative h-[500px] lg:h-[600px] overflow-hidden cursor-pointer">
                
                {/* Image expanding from bottom-left - triangular shape */}
                <motion.div
                  className="absolute inset-0 z-10"
                  initial={{ clipPath: 'inset(100% 100% 0 0)' }}
                  animate={{ 
                    clipPath: hoveredBrand === 'Paralight' 
                      ? 'inset(0 0 0 0)' 
                      : 'inset(100% 100% 0 0)'
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <img 
                    src={paralightImg} 
                    alt="Paralight"
                    className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                </motion.div>
                
                {/* Blur glow effect */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-2/3 z-0"
                  style={{
                    background: 'radial-gradient(ellipse at bottom left, rgba(0, 168, 232, 0.15) 0%, transparent 60%)'
                  }}
                />
                
                {/* Text - bottom left, staggered */}
                <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 max-w-md">
                  <motion.span 
                    className="inline-block text-[10px] font-medium tracking-[0.3em] uppercase mb-3 transition-colors duration-300"
                    animate={{ x: hoveredBrand === 'Paralight' ? 0 : 0, opacity: 1 }}
                    style={{ color: hoveredBrand === 'Paralight' ? '#ffffff' : '#1a1a1a' }}
                  >
                    Aluminum Profiles
                  </motion.span>
                  
                  <motion.h3 
                    className="font-display text-5xl lg:text-6xl font-medium text-[#00C8FF] mb-4 flex items-center gap-4"
                    animate={{ 
                      textShadow: hoveredBrand === 'Paralight' 
                        ? '0 0 12px rgba(0, 200, 255, 0.5)' 
                        : '0 0 0px rgba(0, 200, 255, 0)'
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    Paralight
                    <motion.span
                      animate={{ x: hoveredBrand === 'Paralight' ? 0 : -10, opacity: hoveredBrand === 'Paralight' ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-8 h-8" />
                    </motion.span>
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${
                      hoveredBrand === 'Paralight' ? 'text-gray-200' : 'text-gray-600'
                    }`}
                  >
                    Over 300 customizable aluminum profile models with premium finishes.
                  </motion.p>
                  
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-brand-cyan">
                    {hoveredBrand === 'Paralight' ? 'View Collection' : 'Explore'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Maglinear Card - top right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            onMouseEnter={() => setHoveredBrand('Maglinear')}
            onMouseLeave={() => setHoveredBrand(null)}
            className="lg:absolute lg:top-0 lg:right-0 lg:w-[40%]"
          >
            <Link href="/products?brand=Maglinear">
              <div className="group relative h-[500px] lg:h-[600px] overflow-hidden cursor-pointer">
                
                {/* Image expanding from top-right - triangular shape */}
                <motion.div
                  className="absolute inset-0 z-10"
                  initial={{ clipPath: 'inset(0 0 100% 100%)' }}
                  animate={{ 
                    clipPath: hoveredBrand === 'Maglinear' 
                      ? 'inset(0 0 0 0)' 
                      : 'inset(0 0 100% 100%)'
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <img 
                    src={maglinearImg} 
                    alt="Maglinear"
                    className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-transparent" />
                </motion.div>
                
                {/* Blur glow effect */}
                <div 
                  className="absolute top-0 right-0 w-full h-2/3 z-0"
                  style={{
                    background: 'radial-gradient(ellipse at top right, rgba(236, 170, 0, 0.15) 0%, transparent 60%)'
                  }}
                />
                
                {/* Text - top right, staggered */}
                <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-20 max-w-md text-right">
                  <motion.span 
                    className="inline-block text-[10px] font-medium tracking-[0.3em] uppercase mb-3 transition-colors duration-300"
                    style={{ color: hoveredBrand === 'Maglinear' ? '#ffffff' : '#1a1a1a' }}
                  >
                    Magnetic Track Systems & Commercial Lights
                  </motion.span>
                  
                  <motion.h3 
                    className="font-display text-5xl lg:text-6xl font-medium text-[#FFD033] mb-4 flex items-center justify-end gap-4"
                    animate={{ 
                      textShadow: hoveredBrand === 'Maglinear' 
                        ? '0 0 12px rgba(255, 200, 50, 0.5)' 
                        : '0 0 0px rgba(255, 200, 50, 0)'
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.span
                      animate={{ x: hoveredBrand === 'Maglinear' ? 0 : 10, opacity: hoveredBrand === 'Maglinear' ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-8 h-8 rotate-180" />
                    </motion.span>
                    Maglinear Lighting
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${
                      hoveredBrand === 'Maglinear' ? 'text-gray-200' : 'text-gray-600'
                    }`}
                  >
                    Advanced magnetic track lighting for modern architectural spaces.
                  </motion.p>
                  
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-brand-gold justify-end">
                    {hoveredBrand === 'Maglinear' ? 'View Collection' : 'Explore'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
