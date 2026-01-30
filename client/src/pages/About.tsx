import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import aboutVideo from "@assets/abutus_1768691137923.mp4";
import chairmanImg from "@/assets/chairman-situ.png";
import ceoImg from "@/assets/ceo-michelle.png";
import salesTeamImg from "@/assets/sales-team.png";
import logisticsTeamImg from "@/assets/logistics-team.png";
import rdTeamImg from "@/assets/rd-team.png";
import { Award, ShieldCheck, Factory, Truck, Users, Star, Quote } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Production Facility", value: "30,000㎡" },
    { label: "Skilled Professionals", value: "200+" },
    { label: "Annual Revenue", value: "$47.8M" },
    { label: "Years Experience", value: "10+" },
  ];

  const executives = [
    {
      name: "Situ Yonghong",
      role: "Chairman",
      tagline: "Anchoring quality with craftsmanship while embracing industry responsibility.",
      subtitle: "Identifying quality at his fingertips, an industry leader building soul through precision.",
      bio: "As a product structural engineer and a recognized hands-on leader in the lighting industry, Chairman Situ Yonghong also serves as the Vice President of the Zhongshan Kaiping Chamber of Commerce; while deeply cultivating corporate growth, he actively integrates industry resources and promotes industrial upgrades, using his dual role as an \"industry participant and promoter\" to empower the standardized development of linear lighting, embedding the philosophies \"details cast light\" and \"details are the rhythm of light\" into the brand DNA to ensure that \"true light stands the test of time.\"",
      image: chairmanImg,
      color: "#ECAA00"
    },
    {
      name: "Michelle",
      role: "CEO",
      tagline: "A Force in Global Trade Illuminating the World Through Execution",
      subtitle: "Connecting Continents, Weaving a Warm Bridge of Global Commerce",
      bio: "With 18 years of experience in international trade resources, Michelle serves as the \"customized lighthouse\" of Paralight Group across the globe. Leveraging outstanding industry standards and strategic thinking, she has cultivated deep expertise in the foreign trade sector, helping local enterprises \"go global\" — an effort highly recognized across cyclical industries. Through her impressive professional competence and market achievements, she exemplifies meticulous dedication within the linear lighting industry.",
      image: ceoImg,
      color: "#00A8E8"
    }
  ];

  const team = [
    { name: "Taha", role: "International Comms & Marketing", desc: "Bridging cultures through strategic communication" },
    { name: "Helen", role: "International Sales Manager", desc: "Building lasting client relationships worldwide" },
  ];

  const certifications = [
    "High-tech enterprise",
    "CB / BIS / RoHS / CE",
    "Member of Lighting Association",
    "Gold Supplier Awards",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            PARALIGHT GROUP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-[#ECAA00] italic">A Global Ecosystem</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed font-light"
            >
              With nearly a decade of experience, Paralight Group has become a trusted name 
              in the global lighting industry, specializing in LED aluminum profiles, 
              magnetic track lighting, and commercial lighting.
            </motion.p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="border border-gray-200 p-6 bg-gray-50">
                  <div className="text-2xl font-display font-bold">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4 uppercase tracking-tighter">Inside Our Factory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A deep dive into precision lighting manufacturing. Craftsmanship meets high-tech automation.</p>
          </div>
          <div className="aspect-video relative overflow-hidden border border-gray-200 rounded-lg shadow-lg group">
             <video 
               src={aboutVideo} 
               autoPlay 
               loop 
               muted 
               playsInline 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      {executives.map((exec, i) => (
        <section key={i} className="relative overflow-hidden">
          {/* Hero Banner */}
          <div className="bg-[#f5e6d3]">
            <div className="container mx-auto px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px] ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Text Content */}
                <div className={`flex flex-col justify-center py-16 lg:py-20 lg:pl-12 ${i % 2 === 1 ? 'lg:order-2 lg:pl-0 lg:pr-12' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                      <span className="text-gray-800">{exec.role}: </span>
                      <span style={{ color: exec.color }}>{exec.name}</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed max-w-lg">
                      {exec.tagline}
                    </p>
                  </motion.div>
                </div>
                
                {/* Image */}
                <div className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
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
          <div className="bg-white py-16">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="w-8 h-8 flex-shrink-0" style={{ color: exec.color }} />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2" style={{ color: exec.color }}>
                  {exec.name}:
                </h3>
                <p className="text-lg text-gray-700 font-medium mb-6">
                  {exec.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed text-base columns-1 md:columns-2 gap-8">
                  {exec.bio}
                </p>
                <div className="flex justify-end mt-6">
                  <Quote className="w-8 h-8 transform rotate-180" style={{ color: exec.color }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Sales Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">Sales Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Serving as the vital link between clients and our enterprise, our team utilizes multilingual expertise to transcend regional boundaries and connect precisely with a global customer base. Starting from the initial order discussions, we thoroughly explore individualized requirements and maintain attentive after-sales follow-up — guaranteeing that "every client need receives immediate and effective implementation."
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl shadow-lg"
          >
            <img 
              src={salesTeamImg} 
              alt="Paralight Sales Team" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Logistics Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">Logistics Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Integrating resources across the entire chain, accurately transmitting customer needs to all departments, and coordinating resources such as design and logistics to ensure customized service delivery. Progress is updated to customers in real time, making collaboration transparent and manageable — minimizing information gaps and reducing customer waiting costs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl shadow-lg"
          >
            <img 
              src={logisticsTeamImg} 
              alt="Paralight Logistics Team" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* R&D Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">R&D Team</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our R&D team brings together industry engineers and embedded marketing experts who work side by side throughout every development cycle. Each project begins with a deep understanding of customer pain points, ensuring the delivery of precise, application-specific, and customized solutions. By integrating product development with market insight, the team also provides agile support for go-to-market initiatives, including the creation of tailored promotional materials. This integrated approach allows us not only to solve technical challenges, but also to help clients strengthen market positioning and expand their impact.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl shadow-lg"
          >
            <img 
              src={rdTeamImg} 
              alt="Paralight R&D Team" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Honors */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-display font-bold mb-8">Honors & Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-4 text-lg">
                  <Star className="w-5 h-5 fill-black" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-100 flex items-center justify-center border border-black/5">CE / RoHS</div>
            <div className="aspect-square bg-gray-100 flex items-center justify-center border border-black/5">BIS / CB</div>
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="py-20 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <Truck className="w-12 h-12 mb-8 opacity-50" />
              <h2 className="text-4xl font-display font-bold mb-8">Fast & Efficient Global Delivery</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We load an average of 2 containers per day, and 50-60 containers a month. 
                Our reinforced 5-layer packaging system ensures product safety across moisture, 
                pressure, and impact during international transit.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold">2 / day</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Avg Loading</div>
                </div>
                <div className="w-[1px] h-10 bg-gray-300" />
                <div>
                  <div className="text-3xl font-bold">5-Layer</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Packaging</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border border-gray-200 -z-10 rounded-lg" />
              <div className="aspect-video bg-gray-100 border border-gray-200 flex items-center justify-center italic text-gray-500 rounded-lg">
                Logistics & Packaging Showcase
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
