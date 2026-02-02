import { Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";
import { Link } from "wouter";

export default function Footer() {
  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook", color: "#1877F2" },
    { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram", color: "#E4405F" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn", color: "#0A66C2" },
    { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube", color: "#FF0000" },
    { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter", color: "#1DA1F2" },
    { icon: Music2, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok", color: "#00F2EA" },
    { icon: Pin, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest", color: "#E60023" },
  ];

  const quickLinks = [
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-slate-800" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00A8E8]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#ECAA00]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      {/* Top accent gradient line */}
      <div className="relative h-1 bg-gradient-to-r from-[#00A8E8] via-[#ECAA00] to-[#00A8E8]" />
      
      <div className="relative container mx-auto px-8 lg:px-12">
        {/* Brand Section - Top */}
        <div className="pt-16 pb-12 border-b border-gray-800/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center -space-x-6">
              <div className="h-12 overflow-hidden flex items-center">
                <img src={paralightLogo} alt="Paralight" className="h-32 max-w-[260px] object-cover object-center brightness-110" />
              </div>
              <div className="h-12 overflow-hidden flex items-center">
                <img src={maglinearLogo} alt="Maglinear" className="h-20 max-w-[180px] object-cover object-center brightness-110" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md lg:text-right">
              Premium LED aluminum profiles and magnetic track lighting systems, 
              crafted for architects and designers who demand excellence.
            </p>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="py-16 border-b border-gray-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact info - prominent */}
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-white font-medium mb-6">
                Let's Work <span className="italic font-normal text-brand-cyan">Together</span>
              </h3>
              <div className="space-y-4">
                <a 
                  href="mailto:inquiry@paralight.cc" 
                  className="flex items-center gap-4 text-xl md:text-2xl text-white hover:text-brand-cyan transition-colors group"
                >
                  <Mail className="w-6 h-6 text-brand-cyan shrink-0" />
                  inquiry@paralight.cc
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
                <a 
                  href="tel:+8618128259727" 
                  className="flex items-center gap-4 text-xl md:text-2xl text-white hover:text-brand-gold transition-colors group"
                >
                  <Phone className="w-6 h-6 text-brand-gold shrink-0" />
                  +86 181 2825 9727
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
              <div className="flex items-start gap-4 mt-6 text-gray-400">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City, Guangdong, China
                </span>
              </div>
            </div>

            {/* Social Media - prominent */}
            <div className="lg:text-right">
              <h4 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-6">
                Follow Us
              </h4>
              <div className="flex flex-wrap lg:justify-end gap-3">
                {socials.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="py-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {quickLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <span className="text-gray-700">|</span>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative py-6 border-t border-gray-800/30">
          <p className="text-xs text-gray-600 text-center">
            © 2026 <span className="text-gray-500">Paralight Group</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
