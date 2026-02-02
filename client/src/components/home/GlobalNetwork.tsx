import { motion } from "framer-motion";
import mapImg from "@/assets/global-map.jpg";
import { Globe, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";

export default function GlobalNetwork() {
  const stats = [
    { icon: Globe, label: "Countries Served", value: "100+" },
    { icon: Users, label: "Global Partners", value: "3000+" },
    { icon: TrendingUp, label: "Projects Completed", value: "10k+" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Map background - full visibility */}
      <div className="absolute inset-0">
        <img
          src={mapImg}
          alt=""
          className="w-[200%] h-full object-cover object-[70%_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d8e4ec]/60 via-transparent to-[#d8e4ec]/40" />
      </div>

      {/* Content overlay on left */}
      <div className="relative z-10">
        <div className="container mx-auto px-8 lg:px-12 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl p-10 lg:p-12 relative"
          >
            {/* Blur background layer with fading edges */}
            <div 
              className="absolute inset-0 -z-10"
              style={{
                background: 'rgba(245, 240, 232, 0.55)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                maskImage: 'radial-gradient(ellipse 90% 90% at 30% 35%, black 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 70%, transparent 90%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 30% 35%, black 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 70%, transparent 90%)',
              }}
            />
            <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-gray-500 mb-4">
              Worldwide Presence
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 font-medium mb-6">
              Global Export <span className="italic font-normal">Network</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We proudly export our lighting solutions to over 100 countries
              worldwide, delivering premium aluminum profiles and commercial
              lighting systems to partners across Asia, Europe, the Middle East,
              Africa, and the Americas.
            </p>

            <Link href="/contact">
              <button className="px-8 py-4 bg-brand-gold text-gray-900 text-sm font-medium tracking-wide hover:bg-[#d49900] transition-colors duration-300">
                Become a Partner
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Stats bar at bottom */}
        <div className="bg-gray-900/90 backdrop-blur-sm">
          <div className="container mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-8 py-12 px-8"
                >
                  <stat.icon className="w-10 h-10 text-brand-gold shrink-0" />
                  <div>
                    <h3 className="font-display text-4xl lg:text-5xl text-white font-medium">
                      {stat.value}
                    </h3>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
