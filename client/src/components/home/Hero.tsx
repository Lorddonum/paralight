import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/abstract_architectural_lighting_design_with_aluminum_profiles.png";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <img
          src={heroBg}
          alt="Architectural Lighting Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-[#00A8E8] font-mono text-sm tracking-[0.3em] uppercase mb-6">
            Architectural Lighting Solutions
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-8xl font-display font-bold text-white tracking-tight mb-8"
        >
          PRECISION IN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] via-[#00C4E8] to-[#ECAA00]">
            EVERY PROFILE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg mb-12 font-light leading-relaxed"
        >
          Defining modern spaces with high-quality aluminum profiles and
          advanced magnetic track lighting systems. Engineered for durability,
          designed for elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <button className="px-8 py-4 bg-[#00A8E8] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#00C4E8] transition-colors">
            Explore Profiles
          </button>
          <button className="px-8 py-4 border border-[#ECAA00]/50 text-[#ECAA00] font-bold uppercase tracking-widest text-xs hover:bg-[#ECAA00]/10 transition-colors">
            View Lighting
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
