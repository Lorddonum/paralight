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
    <section className="py-32 bg-[#d8e4ec] relative overflow-hidden">
      {/* Map background centered on China */}
      <div className="absolute inset-0">
        <img
          src={mapImg}
          alt=""
          className="w-[200%] h-full object-cover object-[70%_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d8e4ec]/80 via-transparent to-[#d8e4ec]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#d8e4ec]/90 via-transparent to-[#d8e4ec]/60" />
      </div>

      <div className="container mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4"
            >
              Worldwide Presence
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 font-medium mb-8"
            >
              Global Export <span className="italic font-normal">Network</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg"
            >
              We proudly export our lighting solutions to over 100 countries
              worldwide, delivering premium aluminum profiles and commercial
              lighting systems to partners across Asia, Europe, the Middle East,
              Africa, and the Americas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link href="/contact">
                <button className="px-8 py-4 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300">
                  Become a Partner
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className={`bg-white border border-gray-100 p-10 ${index === 2 ? "sm:col-span-2" : ""}`}
              >
                <stat.icon className="w-6 h-6 text-gray-400 mb-6" />
                <h3 className="font-display text-5xl text-gray-900 font-medium mb-2">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
