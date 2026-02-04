import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const applicationCategories = [
  { image: "/gallery/villa-pool.jpg", label: "Villa and luxury residence" },
  { image: "/gallery/luxury-living.jpg", label: "Super Large Flat Layer" },
  { image: "/gallery/private-club.jpg", label: "Private club" },
  { image: "/gallery/commercial-office.jpg", label: "Real estate project" },
  { image: "/gallery/five-star-hotel.jpg", label: "Commercial Office Space" },
  { image: "/gallery/top-apartment.jpg", label: "Five-star plus hotel" },
  { image: "/gallery/home-decoration.jpg", label: "Top Apartment" },
  { image: "/gallery/marble-living.jpg", label: "Ordinary home decoration" },
];

export default function ProjectGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="h-full overflow-hidden relative flex flex-col">
      <div className="absolute inset-0">
        <img
          src="/gallery/hero-villa.jpg"
          alt="Modern architectural lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/50 to-[#0a1628]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/40" />
      </div>

      <div className="relative z-10 p-8 lg:p-12 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight">
            <span className="italic font-normal">Industry</span> Applications
          </h2>
          <p className="text-gray-300 mt-4 text-sm lg:text-base leading-relaxed">
            Featuring hundreds of LED linear lighting aluminum profile models with 
            extensive stock of premium materials. The range covers all dimensions, 
            from compact precision components to large-scale profiles.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 flex-1 flex px-4 lg:px-8 pb-4">
        {applicationCategories.map((category, index) => {
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;
          const isBlue = index % 2 === 0;
          const accentColor = isBlue ? '#00A8E8' : '#ECAA00';
          
          return (
            <motion.div
              key={index}
              className="relative overflow-hidden cursor-pointer"
              style={{ 
                clipPath: isHovered 
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                  : `polygon(${index === 0 ? '0' : '8%'} 0, 100% 0, ${index === applicationCategories.length - 1 ? '100%' : '92%'} 100%, 0 100%)`,
              }}
              initial={{ flex: 1 }}
              animate={{
                flex: isHovered ? 4 : isAnyHovered ? 0.5 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(index)}
              data-testid={`button-project-${index}`}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  filter: isAnyHovered && !isHovered 
                    ? "brightness(0.3) saturate(0.3) blur(1px)" 
                    : "brightness(1) saturate(1) blur(0px)",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={category.image}
                  alt={category.label}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.05 : 1.4,
                    x: isHovered ? 0 : `${(index - 3.5) * 8}%`,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </motion.div>

              <motion.div 
                className="absolute inset-0"
                style={{
                  background: isHovered 
                    ? `linear-gradient(to top, ${isBlue ? 'rgba(0,30,45,0.7)' : 'rgba(45,35,0,0.7)'} 0%, rgba(0,0,0,0.3) 40%, transparent 70%)` 
                    : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)',
                }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <motion.div
                className="absolute top-3 left-3 font-mono text-xs tracking-wider"
                animate={{
                  opacity: isHovered ? 1 : 0.4,
                  color: isHovered ? accentColor : '#666',
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl font-bold">0{index + 1}</span>
                <span className="text-gray-500">/0{applicationCategories.length}</span>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 30,
                }}
                transition={{ duration: 0.5, delay: isHovered ? 0.15 : 0 }}
              >
                <motion.div
                  className="h-[1px] mb-3"
                  style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}, transparent)` }}
                  animate={{ width: isHovered ? '60%' : '0%' }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
                <span style={{ color: accentColor }} className="text-[9px] uppercase tracking-[0.25em] font-medium">
                  Application
                </span>
                <h3 className="text-white text-sm md:text-base font-medium mt-1 font-display leading-tight">
                  {category.label}
                </h3>
                <motion.div 
                  className="flex items-center gap-2 mt-3"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-white/60 text-[10px] uppercase tracking-widest">Explore</span>
                  <motion.div
                    animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight className="w-3 h-3" style={{ color: accentColor }} />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  boxShadow: isHovered 
                    ? `inset 0 0 60px ${isBlue ? 'rgba(0, 168, 232, 0.08)' : 'rgba(236, 170, 0, 0.08)'}, inset 0 0 0 1px ${isBlue ? 'rgba(0, 168, 232, 0.25)' : 'rgba(236, 170, 0, 0.25)'}` 
                    : 'inset 0 0 0 0 transparent',
                }}
                transition={{ duration: 0.4 }}
              />

              <motion.div
                className="absolute top-0 left-0 w-full h-[2px]"
                style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scaleX: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-cyan-400 transition-colors z-10"
              data-testid="button-close-gallery-lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev !== null
                    ? (prev - 1 + applicationCategories.length) % applicationCategories.length
                    : 0
                );
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all z-10"
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev !== null ? (prev + 1) % applicationCategories.length : 0
                );
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all z-10"
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              className="max-w-5xl max-h-[85vh] mx-4 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.img
                key={selectedImage}
                src={applicationCategories[selectedImage].image}
                alt={applicationCategories[selectedImage].label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg font-medium">
                  {applicationCategories[selectedImage].label}
                </p>
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {applicationCategories.map((cat, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className="w-16 h-12 overflow-hidden transition-all relative"
                  animate={{
                    opacity: index === selectedImage ? 1 : 0.4,
                  }}
                  data-testid={`button-gallery-thumb-${index}`}
                >
                  <img
                    src={cat.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 border-2"
                    animate={{
                      borderColor:
                        index === selectedImage ? "#00A8E8" : "transparent",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
