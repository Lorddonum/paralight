import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import aboutVideo from "@assets/abutus_1768691137923.mp4";
import { Award, ShieldCheck, Factory, Truck, Users, Star } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Production Facility", value: "30,000㎡" },
    { label: "Skilled Professionals", value: "200+" },
    { label: "Annual Revenue", value: "$47.8M" },
    { label: "Years Experience", value: "10+" },
  ];

  const team = [
    { name: "Si Tu Yonghong", role: "Chairman", quote: "Details shape brilliance" },
    { name: "Michelle", role: "CEO", desc: "15 years of lighting export experience" },
    { name: "Taha", role: "International Comms & Marketing" },
    { name: "Helen", role: "International Sales Manager" },
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

      {/* Leadership */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center underline underline-offset-8">THE TEAM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                className="group border border-gray-200 p-8 bg-white hover:bg-gray-50 transition-all duration-500 shadow-sm"
              >
                <div className="w-12 h-[1px] bg-current mb-6" />
                <h3 className="text-xl font-display font-bold mb-2">{member.name}</h3>
                <p className="text-sm uppercase tracking-widest opacity-60 mb-4">{member.role}</p>
                {member.quote && <p className="italic text-sm">"{member.quote}"</p>}
                {member.desc && <p className="text-sm">{member.desc}</p>}
              </motion.div>
            ))}
          </div>
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
