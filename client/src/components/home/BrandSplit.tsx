import { motion } from "framer-motion";
import paralightImg from "@/assets/paralight-profiles.png";
import maglinearImg from "@/assets/paralight-brand.png";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const slidingImages = [
  "/brand-split-bg.png",
  "/brand-split-pendant.png",
  "/brand-split-bg.png",
  "/brand-split-pendant.png",
];

export default function BrandSplit() {
  const brands = [
    {
      name: "Paralight",
      subtitle: "Aluminum Profiles",
      description: "Over 300 customizable aluminum profile models with premium finishes including matte black, sandy white, grey, gold, and anti-oxidation coatings.",
      image: paralightImg,
      color: "cyan",
      link: "/products?brand=Paralight"
    },
    {
      name: "Maglinear Lighting",
      subtitle: "Magnetic Track Systems",
      description: "Advanced magnetic track lighting and commercial lighting solutions. Panels, downlights, and pendant systems designed for modern architectural spaces.",
      image: maglinearImg,
      color: "gold",
      link: "/products?brand=Maglinear"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Animated sliding background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top row - sliding left */}
        <div className="absolute top-0 left-0 w-full h-[300px] opacity-[0.25]">
          <motion.div
            className="flex gap-16 items-center h-full"
            animate={{ x: [0, -1500] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: '300%' }}
          >
            {[...slidingImages, ...slidingImages, ...slidingImages].map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="" 
                className="h-[250px] w-auto object-contain flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>
        
        {/* Bottom row - sliding right */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] opacity-[0.2]">
          <motion.div
            className="flex gap-16 items-center h-full"
            animate={{ x: [-1500, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            style={{ width: '300%' }}
          >
            {[...slidingImages, ...slidingImages, ...slidingImages].map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="" 
                className="h-[250px] w-auto object-contain flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={brand.link}>
                <div className="group relative h-[500px] lg:h-[580px] overflow-hidden cursor-pointer">
                  {/* Image */}
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      brand.color === 'cyan' ? 'object-[center_40%]' : 'object-[center_10%]'
                    }`}
                    loading="lazy"
                  />
                  
                  {/* Overlay - neutral dark shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-14">
                    <span className="inline-block text-[10px] font-medium tracking-[0.25em] uppercase mb-4 transition-all duration-300 text-white">
                      {brand.subtitle}
                    </span>
                    
                    <h3 className={`font-display text-4xl lg:text-5xl font-medium mb-4 flex items-center gap-4 transition-all duration-300 ${
                      brand.color === 'cyan' ? 'text-brand-cyan group-hover:brightness-125' : 'text-brand-gold group-hover:brightness-125'
                    }`}>
                      {brand.name}
                      <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-6 opacity-90 group-hover:text-gray-200 transition-colors duration-300">
                      {brand.description}
                    </p>
                    
                    <span className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                      brand.color === 'cyan' ? 'text-brand-cyan group-hover:brightness-125' : 'text-brand-gold group-hover:brightness-125'
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
