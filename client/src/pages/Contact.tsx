import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      details: "No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City",
      link: "#",
    },
    {
      icon: Phone,
      title: "Phone / Whatsapp",
      details: "+86 181 2825 9727",
      link: "tel:+8618128259727",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "inquiry@paralight.cc",
      link: "mailto:inquiry@paralight.cc",
    },
  ];

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/" },
    { icon: Instagram, href: "https://www.instagram.com/paralight.group/" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/" },
    { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting" },
    { icon: Twitter, href: "https://x.com/Paralight_Group" },
    { icon: Music2, href: "https://www.tiktok.com/@paralightmaglinear" },
    { icon: Pin, href: "https://www.pinterest.com/ParalightMaglinear/" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-[#ECAA00] italic">The Future Together</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 font-light leading-relaxed"
            >
              Whether you're a wholesaler, distributor, or working on a lighting
              project — our team is here to support you with custom solutions
              and partnership opportunities.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* info and socials */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-[#00A8E8] group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-bold">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-900 group-hover:text-gray-600 transition-colors leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-gray-200">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-bold">
                  Follow Our Journey
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socials.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-[#00A8E8] hover:text-white hover:border-[#00A8E8] transition-all"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 border border-gray-200 p-8 md:p-12 relative rounded-lg shadow-sm"
            >
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-gray-300 -mt-2 -mr-2 pointer-events-none rounded-tr-lg" />
              <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-tighter text-gray-900">
                Visit Us
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-[#00A8E8] transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-[#00A8E8] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      Whatsapp
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-[#00A8E8] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-[#00A8E8] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-[#00A8E8] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#00A8E8] text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#00C4E8] transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      {/* maps embed*/}
      <section className="h-[500px] w-full border-y border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3320625624775!2d113.123456!3d22.56789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzA0LjQiTiAxMTPCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2s!4v1612345678901!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
}
