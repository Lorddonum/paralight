import { motion, AnimatePresence, useAnimation, useInView as useFramerInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import chairmanImg from "@/assets/chairman-situ.png";
import ceoImg from "@/assets/ceo-michelle.png";
import coreTeamImg from "@/assets/core-team.png";
import milestone2016_1 from "@/assets/milestone-2016-1.png";
import milestone2016_2 from "@/assets/milestone-2016-2.png";
import milestone2016_3 from "@/assets/milestone-2016-3.png";
import milestone2019_1 from "@/assets/milestone-2019-1.png";
import milestone2019_2 from "@/assets/milestone-2019-2.png";
import milestone2019_3 from "@/assets/milestone-2019-3.png";
import milestone2021jan_1 from "@/assets/milestone-2021jan-1.png";
import milestone2021jan_2 from "@/assets/milestone-2021jan-2.png";
import milestone2021jan_3 from "@/assets/milestone-2021jan-3.png";
import milestone2021sep_1 from "@/assets/milestone-2021sep-1.png";
import milestone2021sep_2 from "@/assets/milestone-2021sep-2.png";
import milestone2022dec_1 from "@/assets/milestone-2022dec-1.png";
import milestone2022dec_2 from "@/assets/milestone-2022dec-2.png";
import milestone2022dec_3 from "@/assets/milestone-2022dec-3.png";
import honor1 from "@/assets/honor-1.png";
import honor2 from "@/assets/honor-2.png";
import honor3 from "@/assets/honor-3.png";
import honor4 from "@/assets/honor-4.png";
import honor5 from "@/assets/honor-5.png";
import honor6 from "@/assets/honor-6.jpg";
import honor7 from "@/assets/honor-7.jpg";
import honor8 from "@/assets/honor-8.jpg";
import honor9 from "@/assets/honor-9.jpg";
import honor10 from "@/assets/honor-10.jpg";
import {
  Truck,
  Users,
  Lightbulb,
  Package,
  Quote,
  Award,
  CheckCircle,
  Globe,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ExhibitionEvent {
  name: string;
  location: string;
  images: string[];
}

const exhibitionEvents: ExhibitionEvent[] = [
  { 
    name: "Middle East Energy", 
    location: "Dubai, UAE", 
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

function ExhibitionCard({ event, onClick, index }: { event: ExhibitionEvent; onClick: () => void; index: number }) {
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative bg-[#0a1628] border border-white/10 overflow-hidden hover:border-[#00A8E8]/50 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {event.images.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex % 5 ? "bg-[#00A8E8] w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-display text-xl text-white font-medium mb-2 group-hover:text-[#00A8E8] transition-colors duration-300">
          {event.name}
        </h3>
        <p className="text-white/50 text-sm">{event.location}</p>
      </div>
    </motion.div>
  );
}

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

function HonorsSlideshow() {
  const honors = [
    { image: honor1, title: "High-Tech Enterprise Certificate", year: "2023" },
    { image: honor2, title: "Work Registration Certificate", year: "2021" },
    { image: honor3, title: "Trademark Registration - Paralight", year: "2022" },
    { image: honor4, title: "Trademark Registration - Class 35", year: "2024" },
    { image: honor5, title: "Trademark Registration - PXG", year: "2024" },
    { image: honor6, title: "JMELIA Association Council Member", year: "2023" },
    { image: honor7, title: "High-Tech Enterprise Plaque", year: "2023" },
    { image: honor8, title: "Middle East Lighting Expo Award", year: "2023" },
    { image: honor9, title: "High-Tech Enterprise Recognition", year: "2023" },
    { image: honor10, title: "Corporate Legal Advisor Unit", year: "2023" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % honors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [honors.length]);

  useEffect(() => {
    if (lightboxOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowRight") setCurrentSlide((prev) => (prev + 1) % honors.length);
        if (e.key === "ArrowLeft") setCurrentSlide((prev) => (prev - 1 + honors.length) % honors.length);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxOpen, honors.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % honors.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + honors.length) % honors.length);

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex-1" />
        <div className="flex gap-1.5">
          {honors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-300 rounded-full ${
                index === currentSlide ? "w-6 bg-[#ECAA00]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div 
        className="relative bg-white rounded-xl overflow-hidden shadow-2xl cursor-pointer group aspect-[4/3]"
        onClick={() => setLightboxOpen(true)}
        data-testid="button-honor-lightbox"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={honors[currentSlide].image}
            alt={honors[currentSlide].title}
            loading="eager"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-contain p-4"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-[#ECAA00] text-xs font-medium">{honors[currentSlide].year}</span>
          <h4 className="text-white font-medium text-sm mt-1">{honors[currentSlide].title}</h4>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              data-testid="button-close-honor-lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              data-testid="button-prev-honor-lightbox"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              data-testid="button-next-honor-lightbox"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div 
              className="max-w-4xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={honors[currentSlide].image}
                  alt={honors[currentSlide].title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-[80vh] object-contain bg-white rounded-lg shadow-2xl"
                />
              </AnimatePresence>
              <div className="text-center mt-4">
                <h4 className="text-white font-display text-lg">{honors[currentSlide].title}</h4>
                <span className="text-[#ECAA00] text-sm">{honors[currentSlide].year}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, amount: 0.5 });
  const [phase, setPhase] = useState<"idle" | "circle" | "splitting" | "revealed">("idle");
  const phaseRef = useRef(phase);
  const animatingRef = useRef(false);

  phaseRef.current = phase;

  const containerRef = useRef<HTMLElement | null>(null);
  const blockWheelRef = useRef<((e: WheelEvent) => void) | null>(null);

  const unlockScroll = () => {
    if (containerRef.current && blockWheelRef.current) {
      containerRef.current.removeEventListener('wheel', blockWheelRef.current, { capture: true } as EventListenerOptions);
      blockWheelRef.current = null;
    }
  };

  useEffect(() => {
    if (!isInView || phase !== "idle") return;

    const scrollContainer = sectionRef.current?.closest('.snap-y') as HTMLElement | null;
    if (!scrollContainer) return;
    containerRef.current = scrollContainer;

    const blockWheel = (e: WheelEvent) => {
      const currentPhase = phaseRef.current;
      if (currentPhase === "revealed" || currentPhase === "idle") return;

      e.preventDefault();
      e.stopPropagation();

      if (animatingRef.current) return;
      if (e.deltaY > 0 && currentPhase === "circle") {
        animatingRef.current = true;
        setPhase("splitting");
        setTimeout(() => {
          setPhase("revealed");
          setTimeout(() => {
            unlockScroll();
            animatingRef.current = false;
          }, 800);
        }, 1200);
      }
    };
    blockWheelRef.current = blockWheel;
    scrollContainer.addEventListener('wheel', blockWheel, { passive: false, capture: true });

    animatingRef.current = true;
    setPhase("circle");
    setTimeout(() => { animatingRef.current = false; }, 1200);

    return () => unlockScroll();
  }, [isInView]);

  const circleImages = [
    "/images/showcase-1.png",
    "/images/showcase-2.png",
    "/images/showcase-3.png",
    "/images/showcase-4.png",
  ];

  return (
    <section
      ref={sectionRef}
      className="snap-start h-screen overflow-hidden relative flex flex-col justify-center"
      style={{ backgroundColor: '#c4b49a' }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(160,140,110,0.15) 2px, rgba(160,140,110,0.15) 4px),
          repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(180,160,130,0.1) 2px, rgba(180,160,130,0.1) 4px),
          radial-gradient(ellipse at 20% 50%, rgba(200,185,160,0.4) 0%, transparent 70%),
          radial-gradient(ellipse at 80% 50%, rgba(185,170,140,0.3) 0%, transparent 70%),
          linear-gradient(180deg, rgba(210,195,170,0.3) 0%, transparent 30%, transparent 70%, rgba(170,155,130,0.3) 100%)
        `
      }} />

      <div className="container mx-auto px-8 lg:px-12 relative z-10 h-full">
        <div className="relative h-full">

          {/* === CIRCLE SPLIT INTRO ANIMATION === */}
          {phase !== "revealed" && phase !== "idle" && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              {/* Left half of circle */}
              <motion.div
                className="absolute"
                style={{
                  width: 'min(500px, 70vw)',
                  height: 'min(500px, 70vw)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  clipPath: 'inset(0 50% 0 0)',
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={
                  phase === "circle"
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { y: 300, opacity: 0 }
                }
                transition={
                  phase === "circle"
                    ? { duration: 1.2, ease: "easeOut" }
                    : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                }
              >
                <div className="w-full h-full relative">
                  <img src={circleImages[0]} alt="" className="absolute top-0 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[2]} alt="" className="absolute top-0 left-1/2 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[1]} alt="" className="absolute top-1/2 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[3]} alt="" className="absolute top-1/2 left-1/2 w-1/2 h-1/2 object-cover" />
                  <div className="absolute inset-0 bg-[#c4b49a]/30" />
                </div>
              </motion.div>

              {/* Right half of circle */}
              <motion.div
                className="absolute"
                style={{
                  width: 'min(500px, 70vw)',
                  height: 'min(500px, 70vw)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  clipPath: 'inset(0 0 0 50%)',
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={
                  phase === "circle"
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { y: -300, opacity: 0 }
                }
                transition={
                  phase === "circle"
                    ? { duration: 1.2, ease: "easeOut" }
                    : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                }
              >
                <div className="w-full h-full relative">
                  <img src={circleImages[0]} alt="" className="absolute top-0 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[2]} alt="" className="absolute top-0 left-1/2 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[1]} alt="" className="absolute top-1/2 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[3]} alt="" className="absolute top-1/2 left-1/2 w-1/2 h-1/2 object-cover" />
                  <div className="absolute inset-0 bg-[#c4b49a]/30" />
                </div>
              </motion.div>

              {/* Text overlay on circle */}
              <motion.div
                className="absolute z-10 text-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  phase === "circle"
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={
                  phase === "circle"
                    ? { duration: 0.8, delay: 0.6 }
                    : { duration: 0.6 }
                }
              >
                <h2 className="font-display text-4xl lg:text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <span className="italic">In-House Design.</span>
                  <br />
                  <span className="text-3xl lg:text-5xl">World-Class Quality</span>
                </h2>
              </motion.div>

            </div>
          )}

          {/* === REVEALED CONTENT (existing showcase images) === */}
          {/* Image 3 - Top Left - Sketching */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={phase === "revealed" ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-[-3%] left-[5%] w-[45%] lg:w-[40%] z-30"
          >
            <img
              src="/images/showcase-3.png"
              alt="Design sketching"
              className="w-full h-auto rounded-lg shadow-2xl grayscale"
              loading="eager"
            />
          </motion.div>

          {/* Image 2 - Bottom Left - Living Room */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={phase === "revealed" ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-[35%] lg:w-[30%] z-20"
          >
            <img
              src="/images/showcase-2.png"
              alt="Modern living room lighting"
              className="w-full h-auto rounded-lg shadow-2xl grayscale"
              loading="eager"
            />
          </motion.div>

          {/* Image 1 - Top Right - Showroom */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={phase === "revealed" ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="absolute top-[2%] right-[-3%] w-[45%] lg:w-[40%] z-10"
          >
            <img
              src="/images/showcase-1.png"
              alt="Modern showroom"
              className="w-full h-auto rounded-lg shadow-2xl grayscale"
              loading="eager"
            />
          </motion.div>

          {/* Image 4 - Bottom Right - Measuring */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={phase === "revealed" ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-[-5%] right-[15%] w-[50%] lg:w-[45%] z-20"
          >
            <img
              src="/images/showcase-4.png"
              alt="Precision measurement"
              className="w-full h-auto rounded-lg shadow-2xl grayscale"
              loading="eager"
            />
          </motion.div>

          {/* Center Text Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={phase === "revealed" ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] lg:w-[32%] bg-[#f5efe6]/85 backdrop-blur-sm p-6 lg:p-10 z-40 shadow-2xl border border-[#d4c9b8]"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#3d3428] mb-3 leading-tight">
              <span className="italic">In-House Design.</span>
              <br />
              World-Class Quality
            </h2>
            <p className="text-[#6b5d4d] text-sm lg:text-base leading-relaxed">
              At Paralight Group, we bridge the gap between technical
              innovation and manufacturing excellence. By designing and
              producing our own products in-house, we deliver high-performance
              lighting solutions built with meticulous precision.
            </p>
          </motion.div>

          {/* Decorative star */}
          <motion.div
            className="absolute bottom-6 right-6 text-[#8b7a60]/50"
            animate={phase === "revealed" ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const stats = [
    { label: "Production Facility", value: "30,000㎡", icon: Package },
    { label: "Skilled Professionals", value: "200+", icon: Users },
    { label: "Annual Revenue", value: "$47.8M", icon: Globe },
    { label: "Years Experience", value: "10+", icon: Award },
  ];

  const executives = [
    {
      name: "Situ Yonghong",
      role: "Chairman",
      tagline: "Anchoring quality with craftsmanship while embracing industry responsibility.",
      subtitle: "Identifying quality at his fingertips, an industry leader building soul through precision.",
      bio: 'As a product structural engineer and a recognized hands-on leader in the lighting industry, Chairman Situ Yonghong also serves as the Vice President of the Zhongshan Kaiping Chamber of Commerce; while deeply cultivating corporate growth, he actively integrates industry resources and upholds the belief that "Quality is the lifeblood of Paralight Group," leading the company into a new era of international expansion and future supply chain leadership.',
      image: chairmanImg,
      color: "#00A8E8",
      bgGradient: "from-sky-50 via-white to-cyan-50",
    },
    {
      name: "Michelle",
      role: "CEO",
      tagline: "One-stop lighting solutions with the client at the center.",
      subtitle: "A globalized perspective managing systematic operations.",
      bio: "Holding an MBA from Hong Kong, CEO Michelle Tang leads Paralight Group's strategic expansion into international markets, championing client-centric product development, integrated supply chain operations, and long-term vision for global partnerships. Under her leadership, Paralight Group has launched multiple product lines, systematized production workflows, and positioned itself as a comprehensive lighting solutions provider.",
      image: "/michelle.jpg",
      color: "#ECAA00",
      bgGradient: "from-amber-50 via-white to-yellow-50",
    },
  ];

  const milestones = [
    {
      year: "2016",
      month: "Dec",
      title: "Paralight Founded in Guzhen",
      description: "In December 2016, Paralight was officially established in Guzhen, the lighting capital of China. Initially specializing in LED linear lighting aluminum profiles, the company quickly became a key industry player with its focus on quality and extensive product range.",
      images: [milestone2016_1, milestone2016_2, milestone2016_3],
    },
    {
      year: "2019",
      month: "Jan",
      title: "Birth of Maglinear Lighting Brand",
      description: "To meet growing demand for smart commercial lighting, Maglinear Lighting was launched. Specializing in high-end magnetic track systems and commercial fixtures, Maglinear Lighting marked Paralight Group's entry into integrated lighting solutions.",
      images: [milestone2019_1, milestone2019_2, milestone2019_3],
    },
    {
      year: "2021",
      month: "Jan",
      title: "New 30,000 sqm Factory Operational",
      description: "Paralight Group officially moved to a new 30,000 sqm manufacturing base, featuring dedicated production lines, warehousing, a display center, and office space. This was a major step in scaling our capacity.",
      images: [milestone2021jan_1, milestone2021jan_2, milestone2021jan_3],
    },
    {
      year: "2021",
      month: "Sep",
      title: "Showroom Unveiled",
      description: "Paralight Group officially inaugurated its upgraded showroom, reflecting the company's product vision and aesthetic philosophy through immersive lighting displays.",
      images: [milestone2021sep_1, milestone2021sep_2],
    },
    {
      year: "2022",
      month: "Dec",
      title: "VIP Room & International Expansion",
      description: "The Maglinear Lighting VIP experience room was introduced to provide an immersive product demonstration environment for global partners. This year also marked Paralight Group's active global strategy in overseas markets.",
      images: [milestone2022dec_1, milestone2022dec_2, milestone2022dec_3],
    },
    {
      year: "2025",
      month: "Jan",
      title: "Full-Chain Service for All Lighting Scenarios",
      description: "Moving forward, Paralight Group will continue building toward a comprehensive lighting ecosystem, offering customized, one-stop lighting solutions for commercial, residential, and architectural projects worldwide.",
      images: [],
    },
  ];

  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextMilestone = () => {
    setCurrentMilestone((prev) => (prev + 1) % milestones.length);
    setCurrentImageIndex(0);
  };

  const prevMilestone = () => {
    setCurrentMilestone((prev) => (prev - 1 + milestones.length) % milestones.length);
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    const currentImages = milestones[currentMilestone].images;
    if (currentImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentMilestone]);

  const [selectedEvent, setSelectedEvent] = useState<ExhibitionEvent | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<{ name: string; role: string; image: string } | null>(null);
  const [teamIndex, setTeamIndex] = useState(0);

  const teamMembers = [
    { name: "Mr. Ou", role: "Production Manager", image: "/team-mr-ou.jpg" },
    { name: "Stephy", role: "Sales Manager", image: "/team-stephy.jpg" },
    { name: "Taha", role: "Marketing Specialist", image: "/team-taha.jpg" },
    { name: "Name", role: "Role", image: "/team-member-1.jpg" },
    { name: "Name", role: "Role", image: "/team-member-2.jpg" },
    { name: "Name", role: "Role", image: "/team-member-3.jpg" },
    { name: "Name", role: "Role", image: "/team-member-4.jpg" },
    { name: "Name", role: "Role", image: "/team-member-5.jpg" },
    { name: "Name", role: "Role", image: "/team-member-6.jpg" },
  ];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="snap-start h-screen relative flex flex-col justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img src="/about-banner.jpg" alt="Paralight Factory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-gray-500 mb-6">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white font-medium mb-6">
              Paralight <span className="italic font-normal">Group</span>
            </h1>
            <p className="text-xl text-gray-400 font-light">A Global Ecosystem of Light</p>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              With nearly a decade of experience, Paralight Group has become a trusted name in the global lighting industry, specializing in LED aluminum profiles, magnetic track lighting, and commercial lighting solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#F5F0E8]/20 border border-[#F5F0E8]/25 p-6 text-center rounded-lg">
                <stat.icon className="w-5 h-5 mx-auto mb-3 text-[#F5F0E8]/60" />
                <div className="font-display text-2xl md:text-3xl text-[#F5F0E8] font-medium">{stat.value}</div>
                <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#F5F0E8]/70 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="snap-start h-screen flex flex-col bg-white overflow-hidden">
        <div className="pt-24 pb-8 flex-1 flex flex-col container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-3 block">
              Manufacturing Excellence
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-gray-900 font-medium mb-3">
              Inside Our <span className="italic font-normal">Factory</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              A deep dive into precision lighting manufacturing where craftsmanship meets innovation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 min-h-0 relative overflow-hidden rounded-2xl shadow-2xl group"
          >
            <iframe
              src="https://www.youtube.com/embed/Jt2rWta5RRw?autoplay=1&mute=1&loop=1&playlist=Jt2rWta5RRw"
              title="About Paralight"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Development Journey */}
      <section className="snap-start h-screen flex flex-col justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#00A8E8] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#ECAA00] rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">
              Advancing with Strategic Vision
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4">Development Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base">
              Guided by a clear strategic roadmap, Paralight Group has steadily advanced from a focused expert in linear lighting to a complete solutions partner for all lighting scenarios.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <button
                onClick={prevMilestone}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                data-testid="button-prev-milestone"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </button>
              <button
                onClick={nextMilestone}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                data-testid="button-next-milestone"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </button>

              <motion.div
                key={currentMilestone}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {milestones[currentMilestone].images.length > 0 ? (
                      <img
                        src={milestones[currentMilestone].images[currentImageIndex]}
                        alt={milestones[currentMilestone].title}
                        loading="eager"
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400 text-sm">Image coming soon</p>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                      <span className="text-[#00A8E8] font-bold text-sm">{milestones[currentMilestone].month}</span>
                      <span className="text-3xl font-display font-bold text-gray-900 ml-2">{milestones[currentMilestone].year}</span>
                    </div>
                    {milestones[currentMilestone].images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {milestones[currentMilestone].images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer hover:scale-125 ${
                              idx === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-4">
                      {milestones[currentMilestone].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                      {milestones[currentMilestone].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              {milestones.map((milestone, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMilestone(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentMilestone ? "w-8 h-3 bg-gray-600" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  data-testid={`button-milestone-${index}`}
                >
                  <span className="sr-only">{milestone.year}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Section */}
      <section className={`snap-start h-screen relative overflow-hidden bg-gradient-to-br ${executives[0].bgGradient}`}>
        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full flex items-center justify-center p-8 lg:p-12"
          >
            <img src={executives[0].image} alt={executives[0].name} loading="eager" className="w-full h-[85%] object-cover object-top rounded-2xl shadow-2xl" />
          </motion.div>

          <div className="relative flex flex-col justify-center px-10 lg:px-16 overflow-hidden">
            {/* Grid pattern - top right */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,168,232,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(0,168,232,0.35) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)',
                WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)',
              }}
            />
            {/* Dot pattern - bottom left */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(0,168,232,0.25) 2px, transparent 2px)`,
                backgroundSize: '18px 18px',
                backgroundPosition: '9px 9px',
                maskImage: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 35%, transparent 60%)',
                WebkitMaskImage: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 35%, transparent 60%)',
              }}
            />
            {/* Diagonal lines - center accent */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(0,168,232,0.1) 50px, rgba(0,168,232,0.1) 51.5px)`,
                maskImage: 'radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.7) 0%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.7) 0%, transparent 65%)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#00A8E8]/10 text-[#00A8E8] mb-4 uppercase tracking-widest">{executives[0].role}</span>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-gray-900 mb-3">{executives[0].name}</h2>
              <p className="text-base lg:text-lg text-gray-500 font-light italic mb-6">"{executives[0].tagline}"</p>
              <p className="text-sm text-[#00A8E8] font-medium mb-4">{executives[0].subtitle}</p>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{executives[0].bio}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className={`snap-start h-screen relative overflow-hidden bg-gradient-to-br ${executives[1].bgGradient}`}>
        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex flex-col justify-center px-10 lg:px-16 order-2 lg:order-1 overflow-hidden">
            {/* Grid pattern - top left */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(236,170,0,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(236,170,0,0.35) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                maskImage: 'linear-gradient(to bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)',
                WebkitMaskImage: 'linear-gradient(to bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)',
              }}
            />
            {/* Dot pattern - bottom right */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(236,170,0,0.25) 2px, transparent 2px)`,
                backgroundSize: '18px 18px',
                backgroundPosition: '9px 9px',
                maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 35%, transparent 60%)',
                WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 35%, transparent 60%)',
              }}
            />
            {/* Diagonal lines - center accent */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 50px, rgba(236,170,0,0.1) 50px, rgba(236,170,0,0.1) 51.5px)`,
                maskImage: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.7) 0%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.7) 0%, transparent 65%)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#ECAA00]/10 text-[#ECAA00] mb-4 uppercase tracking-widest">{executives[1].role}</span>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-gray-900 mb-3">{executives[1].name}</h2>
              <p className="text-base lg:text-lg text-gray-500 font-light italic mb-6">"{executives[1].tagline}"</p>
              <p className="text-sm text-[#ECAA00] font-medium mb-4">{executives[1].subtitle}</p>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{executives[1].bio}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2"
          >
            <img src={executives[1].image} alt={executives[1].name} loading="eager" className="w-full h-[85%] object-cover object-top rounded-2xl shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* REDESIGNED: Core Team + Design Philosophy - Asymmetric Split Layout */}
      <section className="snap-start h-screen relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left: Core Team Image */}
          <div className="relative bg-[#0a1628]">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img src="/core-team.jpg" alt="Paralight Core Team" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 via-[#0a1628]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
            </motion.div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
                  <Heart className="w-4 h-4 text-[#00A8E8]" />
                  <span className="font-medium text-sm text-white">Core Team</span>
                </div>
                <h3 className="font-display text-3xl lg:text-4xl text-white font-bold mb-2">
                  The Heart of Paralight
                </h3>
                <p className="text-white/60 text-sm lg:text-base max-w-md">
                  Bringing vision to life through dedication and expertise
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right: Philosophy Content */}
          <div className="bg-gradient-to-br from-[#F5F0E8] to-white p-8 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#ECAA00] text-xs font-semibold uppercase tracking-widest mb-4 block">Our Philosophy</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Client-Centric <span className="italic font-normal text-[#00A8E8]">Excellence</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  At Paralight Group, our culture is defined by a <span className="font-semibold text-[#00A8E8]">"Client-Centric"</span> philosophy, 
                  brought to life through seamless integration of manufacturing and trade.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Target, label: "Precision", desc: "Every detail matters" },
                    { icon: Sparkles, label: "Innovation", desc: "Constant evolution" },
                    { icon: Zap, label: "Speed", desc: "Rapid response" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                    >
                      <item.icon className="w-6 h-6 text-[#00A8E8] mb-2" />
                      <h4 className="font-semibold text-gray-900 text-sm">{item.label}</h4>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50">
                  <Quote className="w-6 h-6 text-[#ECAA00] opacity-30 mb-2" />
                  <p className="text-gray-700 leading-relaxed text-sm italic">
                    "This closed-loop system—from responsive demand to collaborative support and full-chain satisfaction—represents 
                    the core competitive advantage of Paralight Group."
                  </p>
                </div>

                {/* Team Member Slider */}
                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTeamIndex((prev) => (prev === 0 ? teamMembers.length - 2 : prev - 2))}
                      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                      data-testid="button-team-prev"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>

                    <div className="flex gap-6 flex-1 justify-center overflow-visible">
                      <AnimatePresence mode="popLayout">
                        {[0, 1].map((offset) => {
                          const idx = (teamIndex + offset) % teamMembers.length;
                          const member = teamMembers[idx];
                          return (
                            <motion.div
                              key={`${idx}-${teamIndex}`}
                              initial={{ opacity: 0, x: 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -30 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-3 cursor-pointer group"
                              onClick={() => setSelectedTeamMember(member)}
                            >
                              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-[#00A8E8] transition-all duration-300">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate">{member.name}</p>
                                <p className="text-xs text-gray-500 truncate">{member.role}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={() => setTeamIndex((prev) => (prev + 2) % teamMembers.length)}
                      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                      data-testid="button-team-next"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {selectedTeamMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setSelectedTeamMember(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTeamMember(null)}
                  className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedTeamMember.image}
                    alt={selectedTeamMember.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="bg-[#0a1628] px-6 py-4 text-center">
                    <h3 className="text-white font-display font-bold text-lg">{selectedTeamMember.name}</h3>
                    <p className="text-white/60 text-sm">{selectedTeamMember.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Showcase Animation Section with Circle Split Intro */}
      <ShowcaseSection />

      {/* REDESIGNED: Certifications + Honors - Side by Side */}
      <section className="snap-start h-screen flex flex-col justify-center bg-gradient-to-br from-[#060d18] via-[#0a1628] to-[#0d1f38] overflow-hidden">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-xl bg-[#00A8E8]/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-[#00A8E8]" />
                </div>
                <div>
                  <span className="text-[#00A8E8] text-sm font-semibold uppercase tracking-widest">Quality Assurance</span>
                  <h3 className="font-display text-3xl text-white font-bold">Certifications</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { name: "High-tech Enterprise", desc: "Recognized innovation leader" },
                  { name: "CB / BIS / RoHS / CE", desc: "International compliance" },
                  { name: "Lighting Association", desc: "Industry partnership" },
                  { name: "Gold Supplier Awards", desc: "Excellence in service" },
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
                  >
                    <CheckCircle className="w-7 h-7 text-[#00A8E8] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white text-base mb-2">{cert.name}</h4>
                    <p className="text-sm text-white/50">{cert.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Honors Slideshow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-xl bg-[#ECAA00]/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-[#ECAA00]" />
                </div>
                <div>
                  <span className="text-[#ECAA00] text-sm font-semibold uppercase tracking-widest">Recognition</span>
                  <h3 className="font-display text-3xl text-white font-bold">Official Certificates</h3>
                </div>
              </div>

              <HonorsSlideshow />
            </motion.div>
          </div>
        </div>
      </section>

      {/* REDESIGNED: Exhibitions - Dark theme grid */}
      <section className="snap-start h-screen flex flex-col justify-center bg-[#0a1628] overflow-hidden">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest mb-3 block">Meet Us</span>
              <h2 className="font-display text-3xl lg:text-5xl text-white font-bold">
                <span className="italic font-normal">Global</span> Exhibitions
              </h2>
            </div>
            <p className="text-white/50 max-w-md text-sm lg:text-base">
              We participate in leading lighting exhibitions worldwide, showcasing our latest innovations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exhibitionEvents.map((event, index) => (
              <ExhibitionCard key={event.name} event={event} onClick={() => setSelectedEvent(event)} index={index} />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedEvent && <ExhibitionLightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </AnimatePresence>
      </section>

      {/* REDESIGNED: Global Delivery - Full width with stats */}
      <section className="snap-start h-screen flex flex-col justify-center bg-gradient-to-r from-[#F5F0E8] to-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#00A8E8]/5 to-transparent" />
        
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest mb-4 block">Worldwide Shipping</span>
                <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Fast & <span className="italic font-normal text-[#00A8E8]">Efficient</span> Delivery
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  We load an average of 2 containers per day, and 50-60 containers a month. Our reinforced 5-layer 
                  packaging system ensures product safety across moisture, pressure, and impact during international transit.
                </p>

                <div className="flex flex-wrap items-center gap-8">
                  {[
                    { value: "2", label: "Containers / Day", color: "#00A8E8" },
                    { value: "5", label: "Layer Packaging", color: "#ECAA00" },
                    { value: "60+", label: "Countries Served", color: "#00A8E8" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl lg:text-5xl font-display font-bold" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-[#00A8E8]/20 to-[#ECAA00]/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl p-12 shadow-xl border border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <Truck className="w-24 h-24 text-[#00A8E8]/30 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Global logistics network</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}
