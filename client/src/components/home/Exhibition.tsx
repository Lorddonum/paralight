import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface ExhibitionEvent {
  name: string;
  location: string;
  logo: string;
  images: string[];
  zoomOut?: boolean;
}

const exhibitionEvents: ExhibitionEvent[] = [
  { 
    name: "Middle East Energy", 
    location: "Dubai, UAE", 
    logo: "/exhibitions/logos/middle-east-energy.jpg",
    zoomOut: true,
    images: [
      "/exhibitions/dubai-2024/img-1.jpg",
      "/exhibitions/dubai-2024/img-2.jpg",
      "/exhibitions/dubai-2024/img-3.jpg",
      "/exhibitions/dubai-2024/img-4.jpg",
      "/exhibitions/dubai-2024/img-5.jpg",
      "/exhibitions/dubai-2024/img-6.jpg",
      "/exhibitions/dubai-2024/img-7.jpg",
      "/exhibitions/dubai-2024/img-8.jpg",
    ]
  },
  { 
    name: "Canton Fair", 
    location: "Guangzhou, China", 
    logo: "/exhibitions/logos/canton-fair.jpg",
    zoomOut: true,
    images: [
      "/exhibitions/canton-2024/img-1.jpg",
      "/exhibitions/canton-2024/img-2.jpg",
      "/exhibitions/canton-2024/img-3.jpg",
      "/exhibitions/canton-2024/img-4.jpg",
      "/exhibitions/canton-2024/img-5.jpg",
      "/exhibitions/canton-2024/img-6.jpg",
      "/exhibitions/canton-2024/img-7.jpg",
      "/exhibitions/canton-2024/img-8.jpg",
    ]
  },
  { 
    name: "GILF", 
    location: "Guzhen, China", 
    logo: "/exhibitions/logos/gilf.jpg",
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
    name: "LED Middle East", 
    location: "Cairo, Egypt", 
    logo: "/exhibitions/logos/led-middle-east.png",
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
    name: "HK Lighting Fair", 
    location: "Hong Kong", 
    logo: "/exhibitions/logos/hk-lighting-fair.jpg",
    zoomOut: true,
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
    name: "Light + Building", 
    location: "Frankfurt, Germany", 
    logo: "/exhibitions/logos/light-building.jpg",
    zoomOut: true,
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
    name: "LEDTEC Asia", 
    location: "Ho Chi Minh, Vietnam", 
    logo: "/exhibitions/logos/ledtec-asia.jpg",
    zoomOut: true,
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
    name: "Expolux", 
    location: "São Paulo, Brazil", 
    logo: "/exhibitions/logos/expolux.png",
    zoomOut: true,
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

function ExhibitionLightbox({ 
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
        <p className="text-white/60 text-sm">{event.location}</p>
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
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % exhibitionEvents.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % exhibitionEvents.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + exhibitionEvents.length) % exhibitionEvents.length);
  };

  const getVisibleIndices = () => {
    const total = exhibitionEvents.length;
    const left = (activeIndex - 1 + total) % total;
    const center = activeIndex;
    const right = (activeIndex + 1) % total;
    return [left, center, right];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="h-full py-12 bg-gray-900 flex flex-col justify-center">
      <div className="container mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-cyan text-[11px] font-medium uppercase tracking-[0.3em]">
            Meet Us Worldwide
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mt-4 mb-6">
            <span className="italic font-normal">Exhibitions</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            We participate in leading lighting exhibitions worldwide, showcasing 
            our latest innovations and connecting with global partners.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 text-white/60 hover:text-white transition-colors"
            data-testid="exhibition-prev"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 text-white/60 hover:text-white transition-colors"
            data-testid="exhibition-next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="flex items-center justify-center gap-6 md:gap-10 overflow-hidden py-4">
            {visibleIndices.map((eventIndex, position) => {
              const event = exhibitionEvents[eventIndex];
              const isCenter = position === 1;
              
              return (
                <motion.div
                  key={`${eventIndex}-${activeIndex}`}
                  initial={{ opacity: 0, x: position === 0 ? -100 : position === 2 ? 100 : 0 }}
                  animate={{ 
                    opacity: isCenter ? 1 : 0.5,
                    x: 0,
                    scale: isCenter ? 1.1 : 0.9,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => setSelectedEvent(event)}
                  className="group cursor-pointer flex-shrink-0"
                  data-testid={`exhibition-logo-${eventIndex}`}
                >
                  <div className={`overflow-hidden h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 transition-all duration-500 ${
                    isCenter 
                      ? "ring-2 ring-brand-cyan/50 shadow-lg shadow-brand-cyan/20" 
                      : "hover:opacity-80"
                  } ${event.zoomOut ? "bg-white flex items-center justify-center p-4" : ""}`}>
                    <img
                      src={event.logo}
                      alt={event.name}
                      className={event.zoomOut ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className={`text-sm font-medium transition-colors ${
                      isCenter ? "text-brand-cyan" : "text-white/70 group-hover:text-white"
                    }`}>
                      {event.name}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">{event.location}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {exhibitionEvents.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-brand-cyan w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                data-testid={`exhibition-dot-${idx}`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <ExhibitionLightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
