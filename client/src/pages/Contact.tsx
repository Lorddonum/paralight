import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, Send, ArrowRight, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    country: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City, China",
      link: "#map",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+86 181 2825 9727",
      link: "tel:+8618128259727",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "inquiry@paralight.cc",
      link: "mailto:inquiry@paralight.cc",
    },
  ];

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube" },
    { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter" },
    { icon: Music2, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok" },
    { icon: Pin, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      <Navbar />

      {/* Hero Section with layered background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-gold/15 rounded-full blur-[150px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"
          />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Content */}
        <div className="container mx-auto px-8 lg:px-12 relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-300">Let's Connect</span>
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-6 leading-[0.95]">
              Light Up The
              <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-gold">
                Future Together
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Whether you're a wholesaler, distributor, or working on a lighting project — 
              our team is here to support you.
            </motion.p>

            <motion.a
              href="#contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-gray-900 font-medium rounded-full hover:bg-brand-gold/90 transition-all duration-300 group"
            >
              <span>Send an Inquiry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Info Cards - Floating above transition */}
      <section className="relative -mt-10 z-20 pb-20">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {contactInfo.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-gray-900/80 backdrop-blur-xl border border-white/10 p-8 hover:border-brand-cyan/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-brand-cyan transition-colors" />
                  </div>
                  <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-500 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content - Form and Socials */}
      <section id="contact-form" className="relative py-24 bg-white">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-950 to-transparent" />
        
        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start pt-16">
            {/* Form - Takes more space */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="mb-10">
                <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 block mb-4">
                  Get in Touch
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-gray-900 font-medium">
                  Send us a <span className="italic font-normal">message</span>
                </h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-4 text-gray-900 focus:outline-none focus:border-brand-cyan transition-colors text-lg"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-4 text-gray-900 focus:outline-none focus:border-brand-cyan transition-colors text-lg"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Whatsapp / Phone
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-4 text-gray-900 focus:outline-none focus:border-brand-cyan transition-colors text-lg"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-4 text-gray-900 focus:outline-none focus:border-brand-cyan transition-colors text-lg"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-4 text-gray-900 focus:outline-none focus:border-brand-cyan transition-colors text-lg"
                    placeholder="United States"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-4 text-gray-900 focus:outline-none focus:border-brand-cyan transition-colors resize-none text-lg"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300 mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Sidebar - Socials and extra info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-12"
            >
              {/* Quick contact */}
              <div className="bg-gray-900 p-8 text-white">
                <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-500 mb-6">
                  Prefer a Quick Call?
                </h3>
                <a href="tel:+8618128259727" className="block text-3xl font-display font-medium mb-2 hover:text-brand-cyan transition-colors">
                  +86 181 2825 9727
                </a>
                <p className="text-gray-400 text-sm">Available Monday - Saturday, 9am - 6pm CST</p>
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
                  Follow Our Journey
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {socials.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ y: -4 }}
                      className="aspect-square bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-white transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Partnership note */}
              <div className="bg-gradient-to-br from-brand-cyan/10 to-brand-gold/10 border border-gray-100 p-8">
                <h3 className="font-display text-xl text-gray-900 font-medium mb-3">
                  Partnership Inquiries
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Interested in becoming a distributor or exploring wholesale opportunities? 
                  We'd love to hear from you.
                </p>
                <a href="mailto:partnership@paralight.cc" className="text-sm font-medium text-gray-900 hover:text-brand-cyan transition-colors inline-flex items-center gap-2">
                  partnership@paralight.cc
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section id="map" className="h-[500px] w-full relative">
        <div className="absolute inset-0 bg-gray-950/90 z-10 pointer-events-none" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3320625624775!2d113.123456!3d22.56789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzA0LjQiTiAxMTPCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2s!4v1612345678901!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        {/* Floating location card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-8 md:left-12 z-20 bg-white p-6 shadow-2xl max-w-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-cyan/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <h4 className="font-display text-lg text-gray-900 font-medium mb-1">Paralight Group HQ</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City, China
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
