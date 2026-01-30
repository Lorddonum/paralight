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
import { Truck, Users, Lightbulb, Package, Quote, Award, CheckCircle, Globe, Heart } from "lucide-react";

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

      {/* Executive Leadership */}
      {executives.map((exec, i) => (
        <section key={i} className="relative overflow-hidden">
          <div className={`bg-gradient-to-br ${exec.bgGradient}`}>
            <div className="container mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[280px]`}>
                {/* Text Content */}
                <div className={`flex flex-col justify-center py-8 lg:py-10 px-6 lg:px-10 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-3"
                      style={{ backgroundColor: `${exec.color}20`, color: exec.color }}
                    >
                      {exec.role}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-3" style={{ color: exec.color }}>
                      {exec.name}
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed italic">
                      "{exec.tagline}"
                    </p>
                  </motion.div>
                </div>
                
                {/* Image */}
                <div className={`relative max-h-[300px] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-full"
                  >
                    <img 
                      src={exec.image} 
                      alt={exec.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bio Section */}
          <div className="bg-white py-8">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto relative"
              >
                <Quote className="w-6 h-6 absolute -top-3 -left-3 opacity-20" style={{ color: exec.color }} />
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: exec.color }}>
                  {exec.subtitle}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {exec.bio}
                </p>
                <Quote className="w-6 h-6 absolute -bottom-3 -right-3 opacity-20 rotate-180" style={{ color: exec.color }} />
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
