import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { useState, useEffect } from "react";
import honor1 from "@/assets/honor-1.png";
import honor2 from "@/assets/honor-2.png";
import honor3 from "@/assets/honor-3.png";
import honor4 from "@/assets/honor-4.png";
import honor5 from "@/assets/honor-5.png";

export default function Exhibition() {
  const events = [
    { name: "Canton Fair", location: "Guangzhou, China", date: "2024" },
    { name: "Light + Building", location: "Frankfurt, Germany", date: "2023" },
    { name: "Hong Kong Lighting Fair", location: "Hong Kong", date: "2022" },
  ];

  const honors = [
    { image: honor1, title: "High-Tech Enterprise Certificate", year: "2023" },
    { image: honor2, title: "Work Registration Certificate", year: "2021" },
    { image: honor3, title: "Trademark Registration - Paralight", year: "2022" },
    { image: honor4, title: "Trademark Registration - Class 35", year: "2024" },
    { image: honor5, title: "Trademark Registration - PXG", year: "2024" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % honors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [honors.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % honors.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + honors.length) % honors.length);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
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

        {/* Honors Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Honors header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-gold/20 text-brand-gold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-2xl lg:text-3xl text-white font-medium">
                  Honors & Certifications
                </h3>
                <p className="text-gray-500 text-sm mt-1">Our achievements and recognition</p>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-3 bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slideshow */}
          <div className="relative overflow-hidden bg-gray-800/30 border border-gray-700/50 p-8 md:p-12">
            <div className="flex items-center gap-8 md:gap-16">
              {/* Main image */}
              <div className="relative w-full md:w-2/3 aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={honors[currentSlide].image}
                    alt={honors[currentSlide].title}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-contain p-4"
                  />
                </AnimatePresence>
              </div>

              {/* Info */}
              <div className="hidden md:block flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-brand-gold text-sm font-medium tracking-wide">
                      {honors[currentSlide].year}
                    </span>
                    <h4 className="font-display text-2xl text-white font-medium mt-2 mb-4">
                      {honors[currentSlide].title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Official certification recognizing Paralight Group's commitment to quality, 
                      innovation, and industry excellence.
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Slide indicators */}
                <div className="flex items-center gap-2 mt-8">
                  {honors.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1 transition-all duration-300 ${
                        index === currentSlide 
                          ? 'w-8 bg-brand-gold' 
                          : 'w-4 bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile info */}
            <div className="md:hidden mt-6">
              <span className="text-brand-gold text-sm font-medium tracking-wide">
                {honors[currentSlide].year}
              </span>
              <h4 className="font-display text-xl text-white font-medium mt-1">
                {honors[currentSlide].title}
              </h4>
              
              {/* Mobile slide indicators */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {honors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-6 bg-brand-gold' 
                        : 'w-3 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
