import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import aboutVideo from "@assets/abutus_1768691137923.mp4";
import chairmanImg from "@/assets/chairman-situ.png";
import ceoImg from "@/assets/ceo-michelle.png";
import salesTeamImg from "@/assets/sales-team.png";
import logisticsTeamImg from "@/assets/logistics-team.png";
import rdTeamImg from "@/assets/rd-team.png";
import productionTeamImg from "@/assets/production-team.png";
import coreTeamImg from "@/assets/core-team.png";
import milestone2016_1 from "@/assets/milestone-2016-1.png";
import milestone2016_2 from "@/assets/milestone-2016-2.png";
import milestone2016_3 from "@/assets/milestone-2016-3.png";
import milestone2019_1 from "@/assets/milestone-2019-1.png";
import milestone2019_2 from "@/assets/milestone-2019-2.png";
import milestone2019_3 from "@/assets/milestone-2019-3.png";
import milestone2021sep_1 from "@/assets/milestone-2021sep-1.png";
import milestone2021sep_2 from "@/assets/milestone-2021sep-2.png";
import { Truck, Users, Lightbulb, Package, Quote, Award, CheckCircle, Globe, Heart, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

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
      bio: "As a product structural engineer and a recognized hands-on leader in the lighting industry, Chairman Situ Yonghong also serves as the Vice President of the Zhongshan Kaiping Chamber of Commerce; while deeply cultivating corporate growth, he actively integrates industry resources and promotes industrial upgrades, using his dual role as an \"industry participant and promoter\" to empower the standardized development of linear lighting, embedding the philosophies \"details cast light\" and \"details are the rhythm of light\" into the brand DNA to ensure that \"true light stands the test of time.\"",
      image: chairmanImg,
      color: "#ECAA00",
      bgGradient: "from-amber-50 to-orange-100"
    },
    {
      name: "Michelle",
      role: "CEO",
      tagline: "A Force in Global Trade Illuminating the World Through Execution",
      subtitle: "Connecting Continents, Weaving a Warm Bridge of Global Commerce",
      bio: "With 18 years of experience in international trade resources, Michelle serves as the \"customized lighthouse\" of Paralight Group across the globe. Leveraging outstanding industry standards and strategic thinking, she has cultivated deep expertise in the foreign trade sector, helping local enterprises \"go global\" — an effort highly recognized across cyclical industries. Through her impressive professional competence and market achievements, she exemplifies meticulous dedication within the linear lighting industry.",
      image: ceoImg,
      color: "#00A8E8",
      bgGradient: "from-cyan-50 to-blue-100"
    }
  ];

  const teams = [
    {
      name: "Sales Team",
      icon: Users,
      color: "#00A8E8",
      image: salesTeamImg,
      description: "Serving as the vital link between clients and our enterprise, our team utilizes multilingual expertise to transcend regional boundaries and connect precisely with a global customer base. Starting from the initial order discussions, we thoroughly explore individualized requirements and maintain attentive after-sales follow-up — guaranteeing that \"every client need receives immediate and effective implementation.\""
    },
    {
      name: "Logistics Team",
      icon: Truck,
      color: "#ECAA00",
      image: logisticsTeamImg,
      description: "Integrating resources across the entire chain, accurately transmitting customer needs to all departments, and coordinating resources such as design and logistics to ensure customized service delivery. Progress is updated to customers in real time, making collaboration transparent and manageable — minimizing information gaps and reducing customer waiting costs."
    },
    {
      name: "R&D Team",
      icon: Lightbulb,
      color: "#00A8E8",
      image: rdTeamImg,
      description: "Our R&D team brings together industry engineers and embedded marketing experts who work side by side throughout every development cycle. Each project begins with a deep understanding of customer pain points, ensuring the delivery of precise, application-specific, and customized solutions."
    },
    {
      name: "Production Team",
      icon: Package,
      color: "#ECAA00",
      image: productionTeamImg,
      description: "Our entire production workflow is managed by experienced technical experts. We adapt flexibly to client specifications, conducting thorough inspections from raw materials to final products, complemented by professional brand packaging—all to guarantee flawless delivery and ensure every item fulfills customer expectations."
    }
  ];

  const milestones = [
    {
      year: "2016",
      month: "October",
      title: "Establishment of Paralight Aluminum Accessories Sales Department",
      description: "Focusing on the core business of LED linear lighting aluminum profiles and kits — This marked our formal entry into the linear lighting sector. Through precise positioning, we built our initial client base and industry expertise, laying a solid foundation for deep manufacturing integration and future supply chain expansion.",
      images: [milestone2016_1, milestone2016_2, milestone2016_3]
    },
    {
      year: "2019",
      month: "December",
      title: "Establishment of Zhongshan Paralight Lighting Technology Co., Ltd.",
      description: "Transitioning from \"component sales\" to a dual-track \"manufacturing + sales\" model, we deepened our R&D and production capabilities for core products, further solidifying our manufacturing edge in the linear lighting sector.",
      images: [milestone2019_1, milestone2019_2, milestone2019_3]
    },
    {
      year: "2021",
      month: "January",
      title: "Establishment of Jiangmen Dingsu Plastic Co., Ltd.",
      location: "Jiangmen",
      description: "Achieving in-house production and sales of PC covers for linear lighting, we have completely integrated the entire chain: from raw materials to aluminum profiles and PC covers, through to finished products.",
      images: []
    },
    {
      year: "2021",
      month: "September",
      title: "Establishment of Guangdong Changqi Lighting Technology Co., Ltd.",
      location: "Zhongshan",
      description: "We focused on the R&D and scaled production of linear luminaires and LED linear aluminum profiles. By expanding production capacity and driving technological iteration, we significantly enhanced the manufacturing strength of our core products, meeting the demands of global market expansion.",
      images: [milestone2021sep_1, milestone2021sep_2]
    },
    {
      year: "2022",
      month: "December",
      title: "Establishment of Jiangmen Tianmai Trading Co., Ltd.",
      description: "Professional integration of the Polycarbonate (PC) resin raw material supply chain — Establishing an industrial centralized procurement system to ensure stable supply and quality control of premium PC resin. This secures product consistency from the very start of the raw material stage and solidifies our core advantage: a fully controllable supply chain.",
      images: []
    },
    {
      year: "2023",
      month: "January",
      title: "Establishment of Jiangmen Paralight Lighting Technology Co., Ltd.",
      description: "Relocation of the office team from Zhongshan to Jiangmen — Establishing the group's core operational hub to deeply integrate Jiangmen's industrial resources. This move drives the integrated development of production, R&D, and management, providing the organizational backbone for large-scale and global operations.",
      images: []
    },
    {
      year: "2024",
      month: "July",
      title: "Establishment of overseas company C & B in Brazil",
      description: "Positioned as a distribution center in South America, we have built a regional warehousing and distribution network, significantly shortening delivery cycles in the South American market and enhancing the responsiveness and localized service capabilities of our global supply chain.",
      images: []
    },
    {
      year: "2025",
      month: "March",
      title: "Establishment of Maglinear Lighting Technology Co., Ltd.",
      description: "By incorporating commercial lighting and magnetic track series into the product portfolio, we have expanded from a singular focus on linear lighting to a full-scenario linear lighting range encompassing \"linear + commercial + magnetic\" solutions, officially advancing toward becoming a \"full-scenario linear lighting solution provider.\"",
      images: []
    }
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

  const certifications = [
    { name: "High-tech Enterprise", desc: "Recognized innovation leader" },
    { name: "CB / BIS / RoHS / CE", desc: "International compliance" },
    { name: "Member of Lighting Association", desc: "Industry partnership" },
    { name: "Gold Supplier Awards", desc: "Excellence in service" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-56 h-56 bg-[#00A8E8] rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#ECAA00] rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
              PARALIGHT GROUP
            </h1>
            <p className="text-xl md:text-2xl font-light mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-[#ECAA00]">
                A Global Ecosystem of Light
              </span>
            </p>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              With nearly a decade of experience, Paralight Group has become a trusted name 
              in the global lighting industry, specializing in LED aluminum profiles, 
              magnetic track lighting, and commercial lighting solutions.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/20 to-[#ECAA00]/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center hover:bg-white/15 transition-all">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#00A8E8]" />
                  <div className="text-xl md:text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">Manufacturing Excellence</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-3">Inside Our Factory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              A deep dive into precision lighting manufacturing where craftsmanship meets high-tech automation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-video relative overflow-hidden rounded-2xl shadow-2xl group"
          >
            <video 
              src={aboutVideo} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
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
            <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">Advancing with Strategic Vision</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4">Development Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base">
              Guided by a clear strategic roadmap, Paralight Group has steadily advanced from a focused expert in linear lighting to a complete solutions partner for all lighting scenarios. Each phase of our growth reinforces our commitment to two key pillars: end-to-end supply chain mastery and worldwide strategic presence.
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
                        src={milestones[currentMilestone].images[currentImageIndex]} 
                        alt={milestones[currentMilestone].title}
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
                              idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
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
                      ? 'w-8 h-3 bg-gray-600' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
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
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[450px]`}>
                {/* Text Content */}
                <div className={`flex flex-col justify-center py-12 lg:py-16 px-8 lg:px-16 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <span 
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
                      style={{ backgroundColor: `${exec.color}20`, color: exec.color }}
                    >
                      {exec.role}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-5" style={{ color: exec.color }}>
                      {exec.name}
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-700 font-light leading-relaxed italic">
                      "{exec.tagline}"
                    </p>
                  </motion.div>
                </div>
                
                {/* Image */}
                <div className={`relative h-[450px] overflow-hidden ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
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
                <Quote className="w-10 h-10 absolute -top-5 left-0 opacity-20" style={{ color: exec.color }} />
                <h3 className="text-lg font-semibold mb-3" style={{ color: exec.color }}>
                  {exec.subtitle}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {exec.bio}
                </p>
                <Quote className="w-10 h-10 absolute -bottom-5 -right-5 opacity-20 rotate-180" style={{ color: exec.color }} />
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
            <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">The People Behind Paralight</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">Our Teams</h2>
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
                <span className="font-bold text-sm bg-gradient-to-r from-[#00A8E8] to-[#ECAA00] bg-clip-text text-transparent">Core Team</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Client-Centric Philosophy</h2>
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
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-lg md:text-xl font-display font-bold">The Heart of Paralight Group</p>
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
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 font-light">
                    At Paralight Group, our culture is defined by a <span className="font-semibold text-[#00A8E8]">"Client-Centric"</span> philosophy, brought to life through a seamless integration of manufacturing and trade. Led by visionary leadership, our teams leverage specialized expertise and intuitive collaboration to ensure that <span className="font-semibold text-[#ECAA00]">"Client Satisfaction"</span> is the heartbeat of every stage in our partnership.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    This closed-loop system—from responsive demand to collaborative support and full-chain satisfaction—represents the <span className="font-semibold">core competitive advantage</span> of Paralight Group and is the foundation of the trust we have built with global partners.
                  </p>
                </div>
                <Quote className="w-10 h-10 text-[#ECAA00] opacity-20 absolute bottom-4 right-4 rotate-180" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Team Sections */}
      {teams.map((team, i) => (
        <section key={i} className={`py-12 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={i % 2 === 1 ? 'lg:order-2' : ''}
              >
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                  style={{ backgroundColor: `${team.color}15` }}
                >
                  <team.icon className="w-4 h-4" style={{ color: team.color }} />
                  <span className="font-semibold text-sm" style={{ color: team.color }}>{team.name}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{team.name}</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {team.description}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative overflow-hidden rounded-2xl shadow-xl group ${i % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <img 
                  src={team.image} 
                  alt={team.name}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${team.color}40, transparent)` }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Certifications */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[#ECAA00] text-xs font-semibold uppercase tracking-widest">Quality Assurance</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">Honors & Certifications</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/20 to-[#ECAA00]/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all h-full">
                  <CheckCircle className="w-7 h-7 mx-auto mb-2 text-[#00A8E8]" />
                  <h4 className="font-bold text-sm mb-1">{cert.name}</h4>
                  <p className="text-xs text-gray-400">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Delivery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">Worldwide Shipping</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">Fast & Efficient Global Delivery</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                We load an average of 2 containers per day, and 50-60 containers a month. 
                Our reinforced 5-layer packaging system ensures product safety across moisture, 
                pressure, and impact during international transit.
              </p>
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-[#00A8E8]">2</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mt-1">Containers / Day</div>
                </div>
                <div className="w-px h-16 bg-gray-200" />
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-[#ECAA00]">5</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mt-1">Layer Packaging</div>
                </div>
                <div className="w-px h-16 bg-gray-200" />
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-[#00A8E8]">60+</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mt-1">Countries Served</div>
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
