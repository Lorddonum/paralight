import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function Exhibition() {
  const events = [
    { name: "Canton Fair", location: "Guangzhou, China", date: "Autumn 2025" },
    { name: "Light + Building", location: "Frankfurt, Germany", date: "Spring 2026" },
    { name: "Hong Kong Lighting Fair", location: "Hong Kong", date: "Winter 2025" },
  ];

  return (
    <section id="exhibitions" className="py-32 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">EXHIBITIONS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take part in leading lighting exhibitions worldwide, showcasing our latest innovations 
            and strengthening connections with global partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: index * 0.2 }}
              className="bg-black border border-white/10 p-8 hover:border-[#00A8E8]/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-3 bg-white/5 rounded-none group-hover:bg-[#00A8E8] group-hover:text-black transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-gray-500 uppercase">{event.date}</span>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {event.name}
              </h3>
              <p className="text-gray-400">{event.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
