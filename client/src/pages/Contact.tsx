import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageSquare, Send, Globe } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      details: "No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City",
      link: "#"
    },
    {
      icon: Phone,
      title: "Phone / Whatsapp",
      details: "+86 181 2825 9727",
      link: "tel:+8618128259727"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "inquiry@paralight.cc",
      link: "mailto:inquiry@paralight.cc"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-bold mb-8"
            >
              LET'S LIGHT UP <br />
              <span className="text-gray-500 italic">The Future Together</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 font-light leading-relaxed"
            >
              Whether you're a wholesaler, distributor, or working on a lighting project — 
              our team is here to support you with custom solutions and partnership opportunities.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info & Socials */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-bold">{item.title}</h3>
                      <p className="text-lg text-white group-hover:text-gray-300 transition-colors leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-white/10">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-bold">Follow Our Journey</h3>
                <div className="flex gap-4">
                  {[Globe, MessageSquare, Send].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-950 border border-white/10 p-8 md:p-12 relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/20 -mt-2 -mr-2 pointer-events-none" />
              <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-tighter">Visit Us</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Name *</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Email *</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Whatsapp</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Phone</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Address</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-gray-200 transition-colors">
                  Submit Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-zinc-900 flex items-center justify-center border-y border-white/10 grayscale opacity-50">
         <div className="text-center">
           <MapPin className="w-8 h-8 mx-auto mb-4" />
           <p className="font-mono text-xs uppercase tracking-widest">Global Logistics Hub Jiangmen</p>
         </div>
      </section>

      <Footer />
    </div>
  );
}
