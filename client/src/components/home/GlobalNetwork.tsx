import { motion } from "framer-motion";
import mapImg from "@assets/generated_images/abstract_global_connection_map.png";
import { Globe, TrendingUp, Users } from "lucide-react";

export default function GlobalNetwork() {
  return (
    <section id="global" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={mapImg} alt="Global Map" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-8"
            >
              GLOBAL EXPORT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-[#ECAA00]">NETWORK</span>
            </motion.h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We proudly export our lighting solutions to over 100 countries worldwide, 
              delivering high-quality Aluminum Profiles and Commercial Lighting Systems 
              to partners across Asia, Europe, Middle East, Africa, North & South America, and Oceania.
            </p>

            <button className="px-8 py-4 border border-[#ECAA00] text-[#ECAA00] font-bold uppercase tracking-widest text-xs hover:bg-[#ECAA00] hover:text-black transition-colors">
              Become a Partner
            </button>
          </div>

          <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Globe, label: "Countries", value: "100+" },
              { icon: Users, label: "Partners", value: "500+" },
              { icon: TrendingUp, label: "Projects", value: "10k+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 p-8 ${index === 2 ? 'md:col-span-2' : ''}`}
              >
                <stat.icon className="w-8 h-8 text-white mb-4 opacity-70" />
                <h3 className="text-4xl font-display font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400 uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
