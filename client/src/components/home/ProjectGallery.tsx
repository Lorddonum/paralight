import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

export default function ProjectGallery() {
  const projects = [
    { image: project1 },
    { image: project2 },
    { image: project3 },
    { image: project4 },
    { image: project5 },
    { image: project6 },
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="h-full py-8 overflow-hidden relative flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8e0d4] via-[#f0e8dc] to-[#e8e0d4]" />
      
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
        backgroundSize: '100% 4px',
      }} />

      <div className="relative z-10">
        <div className="container mx-auto px-6 mb-8 text-center">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-600">
            Our Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-gray-900 mt-2">
            Project <span className="italic font-normal">Gallery</span>
          </h2>
        </div>
        <div className="flex h-[450px] md:h-[550px]">
          {projects.map((project, index) => {
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
                    : `polygon(${index === 0 ? '0' : '8%'} 0, 100% 0, ${index === projects.length - 1 ? '100%' : '92%'} 100%, 0 100%)`,
                }}
                initial={{ flex: 1 }}
                animate={{
                  flex: isHovered ? 5 : isAnyHovered ? 0.4 : 1,
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
                    src={project.image}
                    alt={`Project ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovered ? 1.05 : 1.4,
                      x: isHovered ? 0 : `${(index - 2.5) * 8}%`,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </motion.div>

                <motion.div 
                  className="absolute inset-0"
                  style={{
                    background: isHovered 
                      ? `linear-gradient(to top, ${isBlue ? 'rgba(0,30,45,0.6)' : 'rgba(45,35,0,0.6)'} 0%, rgba(0,0,0,0.2) 35%, transparent 60%)` 
                      : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)',
                  }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  className="absolute top-4 left-4 font-mono text-xs tracking-wider"
                  animate={{
                    opacity: isHovered ? 1 : 0.4,
                    color: isHovered ? accentColor : '#666',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl font-bold">0{index + 1}</span>
                  <span className="text-gray-500">/0{projects.length}</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 40,
                  }}
                  transition={{ duration: 0.5, delay: isHovered ? 0.15 : 0 }}
                >
                  <motion.div
                    className="h-[1px] mb-4"
                    style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}, transparent)` }}
                    animate={{ width: isHovered ? '60%' : '0%' }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                  <span style={{ color: accentColor }} className="text-[10px] uppercase tracking-[0.3em] font-medium">
                    Interior Design
                  </span>
                  <h3 className="text-white text-lg md:text-xl font-medium mt-1 font-display">
                    Lighting Project
                  </h3>
                  <motion.div 
                    className="flex items-center gap-2 mt-4"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-white/60 text-xs uppercase tracking-widest">Explore</span>
                    <motion.div
                      animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: accentColor }} />
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

        <div className="relative mt-6 flex justify-center gap-3">
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className="w-8 h-1 rounded-full cursor-pointer"
              animate={{
                backgroundColor: hoveredIndex === index ? '#00A8E8' : 'rgba(255,255,255,0.2)',
                scaleX: hoveredIndex === index ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setHoveredIndex(index)}
            />
          ))}
        </div>
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
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/30 rounded-full blur-[200px]" />
            </div>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-cyan-400 transition-colors z-10"
              data-testid="button-close-project-lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => prev !== null ? (prev - 1 + projects.length) % projects.length : 0); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => prev !== null ? (prev + 1) % projects.length : 0); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all z-10"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 via-transparent to-amber-500/50 rounded-lg opacity-50 blur-sm" />
              <motion.img
                key={selectedImage}
                src={projects[selectedImage].image}
                alt={`Project ${selectedImage + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute top-4 left-4 font-mono text-cyan-400">
                <span className="text-3xl font-bold">0{selectedImage + 1}</span>
                <span className="text-gray-500">/0{projects.length}</span>
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(index); }}
                  className="w-16 h-12 overflow-hidden transition-all relative"
                  animate={{ 
                    opacity: index === selectedImage ? 1 : 0.4,
                  }}
                >
                  <img src={projects[index].image} alt="" className="w-full h-full object-cover" />
                  <motion.div 
                    className="absolute inset-0 border-2"
                    animate={{
                      borderColor: index === selectedImage ? '#00A8E8' : 'transparent',
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
