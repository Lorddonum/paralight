import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { useState, useEffect } from "react";

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
      className="group relative bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-500 cursor-pointer"
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
        <h3 className="font-display text-2xl lg:text-3xl text-gray-900 font-medium mb-3 group-hover:text-brand-cyan transition-colors duration-300">
          {event.name}
        </h3>
        <p className="text-gray-500 text-sm">{event.location}</p>
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

function ExhibitionsSection() {
  const [selectedEvent, setSelectedEvent] = useState<ExhibitionEvent | null>(null);

  return (
    <section className="py-32 bg-[#F5F0E8]">
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
            className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 font-medium mb-6"
          >
            <span className="italic font-normal">Exhibitions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 max-w-xl mx-auto text-lg"
          >
            We participate in leading lighting exhibitions worldwide, showcasing 
            our latest innovations and strengthening connections with global partners.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitionEvents.map((event) => (
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
          <ExhibitionLightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function HonorsSlideshow() {
  const honors = [
    { image: honor1, title: "High-Tech Enterprise Certificate", year: "2023" },
    { image: honor2, title: "Work Registration Certificate", year: "2021" },
    {
      image: honor3,
      title: "Trademark Registration - Paralight",
      year: "2022",
    },
    { image: honor4, title: "Trademark Registration - Class 35", year: "2024" },
    { image: honor5, title: "Trademark Registration - PXG", year: "2024" },
    { image: honor6, title: "JMELIA Association Council Member", year: "2023" },
    { image: honor7, title: "High-Tech Enterprise Plaque", year: "2023" },
    { image: honor8, title: "Middle East Lighting Expo Award", year: "2023" },
    { image: honor9, title: "High-Tech Enterprise Recognition", year: "2023" },
    { image: honor10, title: "Corporate Legal Advisor Unit", year: "2023" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % honors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [honors.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % honors.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + honors.length) % honors.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-gold/20 text-brand-gold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl lg:text-2xl text-white font-medium">
            Official Certificates
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white/5 border border-white/10 p-4 md:p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="relative w-full md:w-1/2 aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-xl">
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
                className="w-full h-full object-contain p-2"
              />
            </AnimatePresence>
          </div>

          <div className="flex-1 text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-brand-gold text-xs font-medium tracking-wide">
                  {honors[currentSlide].year}
                </span>
                <h4 className="font-display text-base md:text-lg text-white font-medium mt-1 mb-2">
                  {honors[currentSlide].title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Official certification recognizing Paralight Group's
                  commitment to quality, innovation, and industry excellence.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center md:justify-start gap-1.5 mt-4">
              {honors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === currentSlide
                      ? "w-6 bg-brand-gold"
                      : "w-3 bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
      tagline:
        "Anchoring quality with craftsmanship while embracing industry responsibility.",
      subtitle:
        "Identifying quality at his fingertips, an industry leader building soul through precision.",
      bio: 'As a product structural engineer and a recognized hands-on leader in the lighting industry, Chairman Situ Yonghong also serves as the Vice President of the Zhongshan Kaiping Chamber of Commerce; while deeply cultivating corporate growth, he actively integrates industry resources and promotes industrial upgrades, using his dual role as an "industry participant and promoter" to empower the standardized development of linear lighting, embedding the philosophies "details cast light" and "details are the rhythm of light" into the brand DNA to ensure that "true light stands the test of time."',
      image: chairmanImg,
      color: "#ECAA00",
      bgGradient: "from-amber-50 to-orange-100",
    },
    {
      name: "Michelle",
      role: "CEO",
      tagline:
        "A Force in Global Trade Illuminating the World Through Execution",
      subtitle:
        "Connecting Continents, Weaving a Warm Bridge of Global Commerce",
      bio: 'With 18 years of experience in international trade resources, Michelle serves as the "customized lighthouse" of Paralight Group across the globe. Leveraging outstanding industry standards and strategic thinking, she has cultivated deep expertise in the foreign trade sector, helping local enterprises "go global" — an effort highly recognized across cyclical industries. Through her impressive professional competence and market achievements, she exemplifies meticulous dedication within the linear lighting industry.',
      image: ceoImg,
      color: "#00A8E8",
      bgGradient: "from-cyan-50 to-blue-100",
    },
  ];

  const milestones = [
    {
      year: "2016",
      month: "October",
      title: "Establishment of Paralight Aluminum Accessories Sales Department",
      description:
        "Focusing on the core business of LED linear lighting aluminum profiles and kits — This marked our formal entry into the linear lighting sector. Through precise positioning, we built our initial client base and industry expertise, laying a solid foundation for deep manufacturing integration and future supply chain expansion.",
      images: [milestone2016_1, milestone2016_2, milestone2016_3],
    },
    {
      year: "2019",
      month: "December",
      title:
        "Establishment of Zhongshan Paralight Lighting Technology Co., Ltd.",
      description:
        'Transitioning from "component sales" to a dual-track "manufacturing + sales" model, we deepened our R&D and production capabilities for core products, further solidifying our manufacturing edge in the linear lighting sector.',
      images: [milestone2019_1, milestone2019_2, milestone2019_3],
    },
    {
      year: "2021",
      month: "January",
      title: "Establishment of Jiangmen Dingsu Plastic Co., Ltd.",
      location: "Jiangmen",
      description:
        "Achieving in-house production and sales of PC covers for linear lighting, we have completely integrated the entire chain: from raw materials to aluminum profiles and PC covers, through to finished products.",
      images: [milestone2021jan_1, milestone2021jan_2, milestone2021jan_3],
    },
    {
      year: "2021",
      month: "September",
      title: "Establishment of Guangdong Changqi Lighting Technology Co., Ltd.",
      location: "Zhongshan",
      description:
        "We focused on the R&D and scaled production of linear luminaires and LED linear aluminum profiles. By expanding production capacity and driving technological iteration, we significantly enhanced the manufacturing strength of our core products, meeting the demands of global market expansion.",
      images: [milestone2021sep_1, milestone2021sep_2],
    },
    {
      year: "2022",
      month: "December",
      title: "Establishment of Jiangmen Tianmai Trading Co., Ltd.",
      description:
        "Professional integration of the Polycarbonate (PC) resin raw material supply chain — Establishing an industrial centralized procurement system to ensure stable supply and quality control of premium PC resin. This secures product consistency from the very start of the raw material stage and solidifies our core advantage: a fully controllable supply chain.",
      images: [milestone2022dec_1, milestone2022dec_2, milestone2022dec_3],
    },
    {
      year: "2023",
      month: "January",
      title:
        "Establishment of Jiangmen Paralight Lighting Technology Co., Ltd.",
      description:
        "Relocation of the office team from Zhongshan to Jiangmen — Establishing the group's core operational hub to deeply integrate Jiangmen's industrial resources. This move drives the integrated development of production, R&D, and management, providing the organizational backbone for large-scale and global operations.",
      images: [],
    },
    {
      year: "2024",
      month: "July",
      title: "Establishment of overseas company C & B in Brazil",
      description:
        "Positioned as a distribution center in South America, we have built a regional warehousing and distribution network, significantly shortening delivery cycles in the South American market and enhancing the responsiveness and localized service capabilities of our global supply chain.",
      images: [],
    },
    {
      year: "2025",
      month: "March",
      title: "Establishment of Maglinear Lighting Technology Co., Ltd.",
      description:
        'By incorporating commercial lighting and magnetic track series into the product portfolio, we have expanded from a singular focus on linear lighting to a full-scenario linear lighting range encompassing "linear + commercial + magnetic" solutions, officially advancing toward becoming a "full-scenario linear lighting solution provider."',
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
    setCurrentMilestone(
      (prev) => (prev - 1 + milestones.length) % milestones.length,
    );
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

  const certifications = [
    { name: "High-tech Enterprise", desc: "Recognized innovation leader" },
    { name: "CB / BIS / RoHS / CE", desc: "International compliance" },
    { name: "Member of Lighting Association", desc: "Industry partnership" },
    { name: "Gold Supplier Awards", desc: "Excellence in service" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-cyan rounded-full blur-[150px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-gold rounded-full blur-[150px]" />
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
            <p className="text-xl text-gray-400 font-light">
              A Global Ecosystem of Light
            </p>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              With nearly a decade of experience, Paralight Group has become a
              trusted name in the global lighting industry, specializing in LED
              aluminum profiles, magnetic track lighting, and commercial
              lighting solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-6 text-center"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-3 text-gray-500" />
                <div className="font-display text-2xl md:text-3xl text-white font-medium">
                  {stat.value}
                </div>
                <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-500 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4 block">
              Manufacturing Excellence
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-gray-900 font-medium mb-4">
              Inside Our <span className="italic font-normal">Factory</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              A deep dive into precision lighting manufacturing where
              craftsmanship meets innovation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-video relative overflow-hidden rounded-2xl shadow-2xl group"
          >
            <iframe
              src="https://www.youtube.com/embed/Jt2rWta5RRw?autoplay=1&mute=1&loop=1&playlist=Jt2rWta5RRw"
              title="About Paralight"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </motion.div>
        </div>
      </section>

      {/* Development Journey */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4">
              Development Journey
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base">
              Guided by a clear strategic roadmap, Paralight Group has steadily
              advanced from a focused expert in linear lighting to a complete
              solutions partner for all lighting scenarios. Each phase of our
              growth reinforces our commitment to two key pillars: end-to-end
              supply chain mastery and worldwide strategic presence.
            </p>
          </motion.div>

          {/* Slideshow */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Navigation Buttons */}
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

              {/* Milestone Card */}
              <motion.div
                key={currentMilestone}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image Placeholder */}
                  <div className="h-64 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {milestones[currentMilestone].images.length > 0 ? (
                      <img
                        src={
                          milestones[currentMilestone].images[currentImageIndex]
                        }
                        alt={milestones[currentMilestone].title}
                        loading="eager"
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400 text-sm">
                          Image coming soon
                        </p>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                      <span className="text-[#00A8E8] font-bold text-sm">
                        {milestones[currentMilestone].month}
                      </span>
                      <span className="text-3xl font-display font-bold text-gray-900 ml-2">
                        {milestones[currentMilestone].year}
                      </span>
                    </div>
                    {milestones[currentMilestone].images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {milestones[currentMilestone].images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer hover:scale-125 ${
                              idx === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
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

            {/* Timeline Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {milestones.map((milestone, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMilestone(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentMilestone
                      ? "w-8 h-3 bg-gray-600"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  data-testid={`button-milestone-${index}`}
                >
                  <span className="sr-only">{milestone.year}</span>
                </button>
              ))}
            </div>

            {/* Year Labels */}
            <div className="flex justify-between items-center mt-4 px-4">
              <span className="text-sm font-semibold text-[#00A8E8]">2016</span>
              <span className="text-xs text-gray-400">Timeline</span>
              <span className="text-sm font-semibold text-[#ECAA00]">2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      {executives.map((exec, i) => (
        <section key={i} className="relative overflow-hidden">
          <div className={`bg-gradient-to-br ${exec.bgGradient}`}>
            <div className="container mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[450px]`}
              >
                {/* Text Content */}
                <div
                  className={`flex flex-col justify-center py-12 lg:py-16 px-8 lg:px-16 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <span
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
                      style={{
                        backgroundColor: `${exec.color}20`,
                        color: exec.color,
                      }}
                    >
                      {exec.role}
                    </span>
                    <h2
                      className="text-3xl md:text-5xl font-display font-bold mb-5"
                      style={{ color: exec.color }}
                    >
                      {exec.name}
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-700 font-light leading-relaxed italic">
                      "{exec.tagline}"
                    </p>
                  </motion.div>
                </div>

                {/* Image */}
                <div
                  className={`relative h-[450px] overflow-hidden ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-full w-full"
                  >
                    <img
                      src={exec.image}
                      alt={exec.name}
                      loading="eager"
                      className="w-full h-full object-contain object-center"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white py-14">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto relative pl-8 md:pl-12"
              >
                <Quote
                  className="w-10 h-10 absolute -top-5 left-0 opacity-20"
                  style={{ color: exec.color }}
                />
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: exec.color }}
                >
                  {exec.subtitle}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {exec.bio}
                </p>
                <Quote
                  className="w-10 h-10 absolute -bottom-5 -right-5 opacity-20 rotate-180"
                  style={{ color: exec.color }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Teams Section Header */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">
              The People Behind Paralight
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Our Teams
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Core Team Section - Featured prominently */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 bg-[#00A8E8] rounded-full blur-[80px]" />
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#ECAA00] rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00A8E8]/10 to-[#ECAA00]/10 rounded-full mb-4 border border-[#00A8E8]/20">
                <Heart className="w-4 h-4 text-[#00A8E8]" />
                <span className="font-bold text-sm bg-gradient-to-r from-[#00A8E8] to-[#ECAA00] bg-clip-text text-transparent">
                  Core Team
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Client-Centric Philosophy
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-[#00A8E8] via-[#ECAA00] to-[#00A8E8] rounded-2xl opacity-20 blur-lg" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img
                  src={coreTeamImg}
                  alt="Paralight Core Team"
                  loading="eager"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-lg md:text-xl font-display font-bold">
                    The Heart of Paralight Group
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <Quote className="w-10 h-10 text-[#00A8E8] opacity-20 absolute top-4 left-4" />
                <div className="relative z-10">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 font-light indent-8">
                    At Paralight Group, our culture is defined by a{" "}
                    <span className="font-semibold text-[#00A8E8]">
                      "Client-Centric"
                    </span>{" "}
                    philosophy, brought to life through a seamless integration
                    of manufacturing and trade. Led by visionary leadership, our
                    teams leverage specialized expertise and intuitive
                    collaboration to ensure that{" "}
                    <span className="font-semibold text-[#ECAA00]">
                      "Client Satisfaction"
                    </span>{" "}
                    is the heartbeat of every stage in our partnership.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    This closed-loop system—from responsive demand to
                    collaborative support and full-chain satisfaction—represents
                    the{" "}
                    <span className="font-semibold">
                      core competitive advantage
                    </span>{" "}
                    of Paralight Group and is the foundation of the trust we
                    have built with global partners.
                  </p>
                </div>
                <Quote className="w-10 h-10 text-[#ECAA00] opacity-20 absolute bottom-4 right-4 rotate-180" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showcase Animation Section */}
      <section className="py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 overflow-hidden">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="relative h-[700px] lg:h-[800px]">
            {/* Image 3 - Top Left - Sketching */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
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
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-[35%] lg:w-[30%] z-20"
            >
              <img
                src="/images/showcase-2.png"
                alt="Modern living room lighting"
                className="w-full h-auto rounded-lg shadow-2xl"
                loading="eager"
              />
            </motion.div>

            {/* Image 1 - Top Right - Showroom */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="absolute top-[2%] right-[-3%] w-[45%] lg:w-[40%] z-10"
            >
              <img
                src="/images/showcase-1.png"
                alt="Modern showroom"
                className="w-full h-auto rounded-lg shadow-2xl"
                loading="eager"
              />
            </motion.div>

            {/* Image 4 - Bottom Right - Measuring */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
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
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] lg:w-[32%] bg-amber-800/50 backdrop-blur-sm p-6 lg:p-10 z-40 shadow-2xl"
            >
              <h2 className="font-display text-2xl lg:text-3xl font-medium text-white mb-3 leading-tight">
                <span className="italic">In-House Design.</span>
                <br />
                World-Class Quality
              </h2>
              <p className="text-amber-100/90 text-sm lg:text-base leading-relaxed">
                At Paralight Group, we bridge the gap between technical
                innovation and manufacturing excellence. By designing and
                producing our own products in-house, we deliver high-performance
                lighting solutions built with meticulous precision.
              </p>
            </motion.div>

            {/* Decorative star */}
            <div className="absolute bottom-6 right-6 text-amber-500/70">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-brand-gold text-[11px] font-medium uppercase tracking-[0.3em]">
              Quality Assurance
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-medium mt-4">
              Honors & Certifications
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 text-center hover:bg-white/10 transition-all"
              >
                <CheckCircle className="w-6 h-6 mx-auto mb-3 text-brand-cyan" />
                <h4 className="font-medium text-sm mb-1">{cert.name}</h4>
                <p className="text-xs text-gray-400">{cert.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Honors Slideshow */}
          <HonorsSlideshow />
        </div>
      </section>

      {/* Exhibitions Section */}
      <ExhibitionsSection />

      {/* Global Delivery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">
                Worldwide Shipping
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">
                Fast & Efficient Global Delivery
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                We load an average of 2 containers per day, and 50-60 containers
                a month. Our reinforced 5-layer packaging system ensures product
                safety across moisture, pressure, and impact during
                international transit.
              </p>
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-[#00A8E8]">
                    2
                  </div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mt-1">
                    Containers / Day
                  </div>
                </div>
                <div className="w-px h-16 bg-gray-200" />
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-[#ECAA00]">
                    5
                  </div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mt-1">
                    Layer Packaging
                  </div>
                </div>
                <div className="w-px h-16 bg-gray-200" />
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-[#00A8E8]">
                    60+
                  </div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mt-1">
                    Countries Served
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00A8E8]/10 to-[#ECAA00]/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-100 rounded-2xl p-12 flex items-center justify-center">
                <Truck className="w-32 h-32 text-gray-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
