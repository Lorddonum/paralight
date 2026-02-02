import { motion } from "framer-motion";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/abstract_architectural_lighting_design_with_aluminum_profiles.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Architectural Lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 text-[11px] font-medium tracking-[0.3em] uppercase text-[#00A8E8] border border-[#00A8E8]/40 bg-[#00A8E8]/10">
            Architectural Lighting Excellence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight mb-8"
        >
          Precision in{" "}
          <span className="italic font-normal text-[#ECAA00]">Every</span>
          <br />
          Profile
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-xl mx-auto text-lg text-white/70 font-light leading-relaxed mb-12"
        >
          Defining modern spaces with premium aluminum profiles and 
          advanced magnetic track lighting systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/products">
            <button className="px-10 py-4 bg-[#00A8E8] text-white text-sm font-medium tracking-wide hover:bg-[#0090c8] transition-colors duration-300">
              Explore Collection
            </button>
          </Link>
          <Link href="/about">
            <button className="px-10 py-4 border border-[#ECAA00]/50 text-[#ECAA00] text-sm font-medium tracking-wide hover:bg-[#ECAA00]/10 transition-colors duration-300">
              Our Story
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
