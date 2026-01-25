import { motion } from "framer-motion";
import paralightImg from "@assets/generated_images/stack_of_premium_aluminum_profiles.png";
import maglinearImg from "@assets/generated_images/modern_magnetic_track_lighting_system_interior.png";
import { ArrowRight } from "lucide-react";

export default function BrandSplit() {
  return (
    <section id="brands" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">OUR BRANDS</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00A8E8] to-[#ECAA00] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Paralight Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="group relative h-[600px] overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
            <img 
              src={paralightImg} 
              alt="Paralight Aluminum Profiles" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute bottom-0 left-0 p-10 z-20 max-w-lg">
              <h3 className="text-3xl font-display font-bold text-white mb-4 flex items-center gap-4">
                PARALIGHT <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                Specializing in high-quality aluminum profiles offering over 300 customizable models. 
                Premium finishes including matte black, sandy white, grey, gold, and anti-oxidation coatings.
              </p>
              <span className="text-[#00A8E8] border-b border-[#00A8E8] pb-1 text-sm uppercase tracking-widest">
                View Collection
              </span>
            </div>
          </motion.div>

          {/* Maglinear Brand */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="group relative h-[600px] overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
            <img 
              src={maglinearImg} 
              alt="Maglinear Lighting Systems" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute bottom-0 left-0 p-10 z-20 max-w-lg">
              <h3 className="text-3xl font-display font-bold text-white mb-4 flex items-center gap-4">
                MAGLINEAR <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                Focuses on magnetic track lighting and advanced commercial lighting solutions. 
                Panels, downlights, and pendant linear systems designed for modern architectural spaces.
              </p>
              <span className="text-[#ECAA00] border-b border-[#ECAA00] pb-1 text-sm uppercase tracking-widest">
                View Collection
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
