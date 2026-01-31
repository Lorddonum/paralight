import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";

export default function Exhibition() {
  const events = [
    { name: "Canton Fair", location: "Guangzhou, China", date: "2024" },
    { name: "Light + Building", location: "Frankfurt, Germany", date: "2023" },
    { name: "Hong Kong Lighting Fair", location: "Hong Kong", date: "2022" },
  ];

  return (
    <section className="py-32 bg-gray-900">
      <div className="container mx-auto px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-gray-500 mb-4"
          >
            Meet Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-6"
          >
            <span className="italic font-normal">Exhibitions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            We participate in leading lighting exhibitions worldwide, showcasing 
            our latest innovations and strengthening connections with global partners.
          </motion.p>
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group relative bg-gray-800/50 border border-gray-700/50 p-10 hover:border-gray-600 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-10">
                <div className="p-3 bg-gray-700/50 text-gray-400 group-hover:bg-brand-cyan group-hover:text-white transition-all duration-300">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-500">
                  {event.date}
                </span>
              </div>
              
              <h3 className="font-display text-2xl lg:text-3xl text-white font-medium mb-3 group-hover:text-brand-cyan transition-colors duration-300">
                {event.name}
              </h3>
              <p className="text-gray-500 text-sm">{event.location}</p>
              
              <ArrowUpRight className="absolute top-10 right-10 w-5 h-5 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
