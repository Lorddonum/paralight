import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface ExhibitionEvent {
  name: string;
  location: string;
  date: string;
  images: string[];
}

const events: ExhibitionEvent[] = [
  { 
    name: "Poland Lighting Fair", 
    location: "Warsaw, Poland", 
    date: "2024",
    images: [
      "/exhibitions/poland-2024/img-1.jpg",
      "/exhibitions/poland-2024/img-2.jpg",
      "/exhibitions/poland-2024/img-3.jpg",
      "/exhibitions/poland-2024/img-4.jpg",
      "/exhibitions/poland-2024/img-5.jpg",
      "/exhibitions/poland-2024/img-6.jpg",
      "/exhibitions/poland-2024/img-7.jpg",
      "/exhibitions/poland-2024/img-8.jpg",
    ]
  },
  { 
    name: "LED Technology Exhibition", 
    location: "Cairo, Egypt", 
    date: "2023",
    images: [
      "/exhibitions/egypt-2023/img-1.jpg",
      "/exhibitions/egypt-2023/img-2.jpg",
      "/exhibitions/egypt-2023/img-3.jpg",
      "/exhibitions/egypt-2023/img-4.jpg",
      "/exhibitions/egypt-2023/img-5.jpg",
      "/exhibitions/egypt-2023/img-6.jpg",
      "/exhibitions/egypt-2023/img-7.jpg",
    ]
  },
  { 
    name: "Hong Kong Electronics Fair", 
    location: "Hong Kong", 
    date: "2023",
    images: [
      "/exhibitions/hongkong-2023/img-1.jpg",
      "/exhibitions/hongkong-2023/img-2.jpg",
      "/exhibitions/hongkong-2023/img-3.jpg",
      "/exhibitions/hongkong-2023/img-4.jpg",
      "/exhibitions/hongkong-2023/img-5.jpg",
      "/exhibitions/hongkong-2023/img-6.jpg",
      "/exhibitions/hongkong-2023/img-7.jpg",
      "/exhibitions/hongkong-2023/img-8.jpg",
    ]
  },
  { 
    name: "Barcelona Lighting Fair", 
    location: "Barcelona, Spain", 
    date: "2022",
    images: [
      "/exhibitions/spain-2022/img-1.jpg",
      "/exhibitions/spain-2022/img-2.jpg",
      "/exhibitions/spain-2022/img-3.jpg",
      "/exhibitions/spain-2022/img-4.jpg",
      "/exhibitions/spain-2022/img-5.jpg",
      "/exhibitions/spain-2022/img-6.jpg",
    ]
  },
  { 
    name: "India Lighting Exhibition", 
    location: "New Delhi, India", 
    date: "2022",
    images: [
      "/exhibitions/india-2022/img-1.jpg",
      "/exhibitions/india-2022/img-2.jpg",
      "/exhibitions/india-2022/img-3.jpg",
      "/exhibitions/india-2022/img-4.jpg",
      "/exhibitions/india-2022/img-5.jpg",
      "/exhibitions/india-2022/img-6.jpg",
      "/exhibitions/india-2022/img-7.jpg",
    ]
  },
  { 
    name: "Expolux Brazil", 
    location: "São Paulo, Brazil", 
    date: "2022",
    images: [
      "/exhibitions/brazil-2022/img-1.jpg",
      "/exhibitions/brazil-2022/img-2.jpg",
      "/exhibitions/brazil-2022/img-3.jpg",
      "/exhibitions/brazil-2022/img-4.jpg",
      "/exhibitions/brazil-2022/img-5.jpg",
      "/exhibitions/brazil-2022/img-6.jpg",
    ]
  },
];

function ExhibitionCard({ event, onClick }: { event: ExhibitionEvent; onClick: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (event.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % event.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [event.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="group relative bg-gray-800/50 border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={event.images[currentIndex]}
            alt={`${event.name} - Image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {event.images.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex % 5 ? "bg-white w-4" : "bg-white/40"
              }`}
            />
          ))}
          {event.images.length > 5 && (
            <span className="text-white/60 text-xs ml-1">+{event.images.length - 5}</span>
          )}
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
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
      </div>
    </motion.div>
  );
}

function Lightbox({ 
  event, 
  onClose 
}: { 
  event: ExhibitionEvent; 
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % event.images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [event.images.length, onClose]);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % event.images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + event.images.length) % event.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white/70 hover:text-white transition-colors z-10"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="absolute top-6 left-6 text-white z-10">
        <h3 className="font-display text-2xl font-medium">{event.name}</h3>
        <p className="text-white/60 text-sm">{event.location} - {event.date}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white transition-colors z-10"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white transition-colors z-10"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      <div 
        className="relative w-full max-w-5xl mx-4 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={event.images[currentIndex]}
            alt={`${event.name} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {event.images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 text-white/60 text-sm">
        {currentIndex + 1} / {event.images.length}
      </div>
    </motion.div>
  );
}

export default function Exhibition() {
  const [selectedEvent, setSelectedEvent] = useState<ExhibitionEvent | null>(null);

  return (
    <section className="py-32 bg-gray-900">
      <div className="container mx-auto px-8 lg:px-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <ExhibitionCard 
              key={event.name} 
              event={event} 
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <Lightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
