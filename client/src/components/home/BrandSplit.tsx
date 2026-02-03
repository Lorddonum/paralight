import { motion } from "framer-motion";
import paralightImg from "@/assets/paralight-profiles.png";
import maglinearImg from "@/assets/paralight-brand.png";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function BrandSplit() {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const brands = [
    {
      name: "Paralight",
      subtitle: "Aluminum Profiles",
      description: "Over 300 customizable aluminum profile models with premium finishes including matte black, sandy white, grey, gold, and anti-oxidation coatings.",
      image: paralightImg,
      color: "cyan",
      link: "/products?brand=Paralight",
      expandFrom: "top-left"
    },
    {
      name: "Maglinear Lighting",
      subtitle: "Magnetic Track Systems",
      description: "Advanced magnetic track lighting and commercial lighting solutions. Panels, downlights, and pendant systems designed for modern architectural spaces.",
      image: maglinearImg,
      color: "gold",
      link: "/products?brand=Maglinear",
      expandFrom: "bottom-right"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.video 
          autoPlay 
          loop 
          muted={true}
          playsInline
          className="w-full h-full object-cover opacity-40"
          animate={{ filter: hoveredBrand ? 'blur(4px)' : 'blur(0px)' }}
          transition={{ duration: 0.5 }}
        >
          <source src="/brand-split-bg.mp4" type="video/mp4" />
        </motion.video>
        {/* Soft gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-30" />
        {/* Hover color overlay - cyan for Paralight */}
        <motion.div 
          className="absolute inset-0 bg-brand-cyan"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredBrand === 'Paralight' ? 0.12 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {/* Hover color overlay - gold for Maglinear */}
        <motion.div 
          className="absolute inset-0 bg-brand-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredBrand === 'Maglinear Lighting' ? 0.12 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container mx-auto px-8 lg:px-12 relative z-10 pt-8">
        {/* Section header */}
        <div className="text-center mb-20" style={{ marginLeft: '-120px' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-medium tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Our Brands
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 font-medium"
          >
            Two Pillars of <span className="italic font-normal">Excellence</span>
          </motion.h2>
        </div>

        {/* Brand cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredBrand(brand.name)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <Link href={brand.link}>
                <div className="group relative h-[400px] lg:h-[480px] overflow-hidden cursor-pointer rounded-lg">
                  {/* Expanding image with triangular clip */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ 
                      clipPath: brand.expandFrom === 'top-left' 
                        ? 'polygon(0 0, 0 0, 0 0)' 
                        : 'polygon(100% 100%, 100% 100%, 100% 100%)'
                    }}
                    animate={{ 
                      clipPath: hoveredBrand === brand.name 
                        ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                        : brand.expandFrom === 'top-left'
                          ? 'polygon(0 0, 0 0, 0 0)'
                          : 'polygon(100% 100%, 100% 100%, 100% 100%)'
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className={`absolute inset-0 w-full h-full object-cover ${
                        brand.color === 'cyan' ? 'object-[center_40%]' : 'object-[center_10%]'
                      }`}
                      loading="lazy"
                    />
                    {/* Overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                  </motion.div>
                  
                  {/* Blur backdrop behind text */}
                  <div 
                    className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-500 ${
                      hoveredBrand === brand.name ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      background: brand.color === 'cyan' 
                        ? 'radial-gradient(ellipse at center, rgba(0, 168, 232, 0.08) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse at center, rgba(236, 170, 0, 0.08) 0%, transparent 70%)'
                    }}
                  />
                  
                  {/* Content - centered text */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center p-10 lg:p-14 transition-all duration-500 ${
                    hoveredBrand === brand.name ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                  }`}>
                    <span className={`inline-block text-[10px] font-medium tracking-[0.25em] uppercase mb-4 ${
                      brand.color === 'cyan' ? 'text-brand-cyan/70' : 'text-brand-gold/70'
                    }`}>
                      {brand.subtitle}
                    </span>
                    
                    <h3 className={`font-display text-4xl lg:text-5xl font-medium mb-4 text-center ${
                      brand.color === 'cyan' ? 'text-brand-cyan' : 'text-brand-gold'
                    }`}>
                      {brand.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed max-w-sm text-center mb-6">
                      {brand.description}
                    </p>
                    
                    <span className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide ${
                      brand.color === 'cyan' ? 'text-brand-cyan' : 'text-brand-gold'
                    }`}>
                      Hover to explore
                    </span>
                  </div>
                  
                  {/* Content on hover - bottom positioned */}
                  <div className={`absolute bottom-0 left-0 right-0 p-10 lg:p-14 transition-all duration-500 ${
                    hoveredBrand === brand.name ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <span className="inline-block text-[10px] font-medium tracking-[0.25em] uppercase mb-4 text-white/80">
                      {brand.subtitle}
                    </span>
                    
                    <h3 className={`font-display text-4xl lg:text-5xl font-medium mb-4 flex items-center gap-4 ${
                      brand.color === 'cyan' ? 'text-brand-cyan' : 'text-brand-gold'
                    }`}>
                      {brand.name}
                      <ArrowRight className="w-6 h-6" />
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-6">
                      {brand.description}
                    </p>
                    
                    <span className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide ${
                      brand.color === 'cyan' ? 'text-brand-cyan' : 'text-brand-gold'
                    }`}>
                      View Collection
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
