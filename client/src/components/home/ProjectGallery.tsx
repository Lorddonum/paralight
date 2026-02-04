import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const applicationCategories = [
  { image: "/gallery/villa-pool.jpg", label: "Villa and luxury residence" },
  { image: "/gallery/luxury-living.jpg", label: "Super Large Flat Layer" },
  { image: "/gallery/private-club.jpg", label: "Private club" },
  { image: "/gallery/commercial-office.jpg", label: "Real estate project" },
  { image: "/gallery/five-star-hotel.jpg", label: "Commercial Office Space" },
  { image: "/gallery/top-apartment.jpg", label: "Five-star plus hotel" },
  { image: "/gallery/home-decoration.jpg", label: "Top Apartment" },
  { image: "/gallery/marble-living.jpg", label: "Ordinary home decoration" },
];

export default function ProjectGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    container.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => container.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="h-full overflow-hidden relative flex flex-col" style={{ background: 'linear-gradient(to bottom, #0a1628 0%, #0d1f35 100%)' }}>
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight">
              <span className="italic font-normal">Industry</span> Applications
            </h2>
            <p className="text-gray-400 mt-6 text-sm lg:text-base leading-relaxed max-w-md">
              Featuring hundreds of LED linear lighting aluminum profile models with 
              extensive stock of premium materials. The range covers all dimensions, 
              from compact precision components to large-scale profiles. The exquisite 
              surface finishes and dynamic textures adapt perfectly to diverse spatial 
              applications and aesthetic requirements.
            </p>
          </motion.div>
        </div>

        <div className="lg:w-3/5 relative flex-1 lg:flex-none">
          <motion.div
            className="absolute inset-0 lg:relative lg:h-full"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/gallery/hero-villa.jpg"
              alt="Modern architectural lighting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/40 to-transparent lg:from-[#0a1628]/80 lg:via-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      <div className="relative px-4 lg:px-8 pb-6 lg:pb-8">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white/70 hover:text-white transition-all rounded-full"
            data-testid="gallery-scroll-left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white/70 hover:text-white transition-all rounded-full"
            data-testid="gallery-scroll-right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {applicationCategories.map((category, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImage(index)}
              data-testid={`button-category-${index}`}
            >
              <div className="relative w-28 h-28 lg:w-36 lg:h-36 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 border border-white/10 group-hover:border-brand-cyan/50 transition-colors" />
              </div>
              <p className="text-white/70 text-[10px] lg:text-xs mt-2 text-center max-w-28 lg:max-w-36 leading-tight group-hover:text-white transition-colors">
                {category.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-cyan-400 transition-colors z-10"
              data-testid="button-close-gallery-lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev !== null
                    ? (prev - 1 + applicationCategories.length) % applicationCategories.length
                    : 0
                );
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all z-10"
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev !== null ? (prev + 1) % applicationCategories.length : 0
                );
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all z-10"
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              className="max-w-5xl max-h-[85vh] mx-4 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.img
                key={selectedImage}
                src={applicationCategories[selectedImage].image}
                alt={applicationCategories[selectedImage].label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg font-medium">
                  {applicationCategories[selectedImage].label}
                </p>
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {applicationCategories.map((cat, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className="w-16 h-12 overflow-hidden transition-all relative"
                  animate={{
                    opacity: index === selectedImage ? 1 : 0.4,
                  }}
                  data-testid={`button-gallery-thumb-${index}`}
                >
                  <img
                    src={cat.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 border-2"
                    animate={{
                      borderColor:
                        index === selectedImage ? "#00A8E8" : "transparent",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
