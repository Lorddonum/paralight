import { Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, MapPin, Phone, Mail } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";
import { Link } from "wouter";

export default function Footer() {
  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook", color: "hover:bg-[#1877F2]" },
    { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
    { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube", color: "hover:bg-[#FF0000]" },
    { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
    { icon: Music2, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok", color: "hover:bg-[#000000]" },
    { icon: Pin, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest", color: "hover:bg-[#E60023]" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a1628] to-[#1a0f00]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00A8E8]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ECAA00]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Top accent line with gradient */}
      <div className="relative h-1 bg-gradient-to-r from-[#00A8E8] via-[#00A8E8]/50 to-[#ECAA00]" />
      
      <div className="relative container mx-auto px-8 lg:px-12">
        {/* Main footer content */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center -space-x-6 mb-6">
              <div className="h-12 overflow-hidden flex items-center">
                <img src={paralightLogo} alt="Paralight" className="h-32 max-w-[260px] object-cover object-center brightness-110" />
              </div>
              <div className="h-12 overflow-hidden flex items-center">
                <img src={maglinearLogo} alt="Maglinear" className="h-20 max-w-[180px] object-cover object-center brightness-110" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Premium LED aluminum profiles and magnetic track lighting systems, 
              crafted for architects and designers who demand excellence.
            </p>
            
            {/* Colorful social icons */}
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#00A8E8] mb-6">
                Products
              </h4>
              <ul className="space-y-4">
                {["Aluminum Profiles", "Magnetic Track Systems", "Panel Lights", "Downlights", "Linear Pendants"].map((item) => (
                  <li key={item}>
                    <Link 
                      href="/products" 
                      className="text-sm text-gray-400 hover:text-[#00A8E8] transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#00A8E8] transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#ECAA00] mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Factory", href: "/about" },
                  { name: "Certifications", href: "/about" },
                  { name: "Downloads", href: "/downloads" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-sm text-gray-400 hover:text-[#ECAA00] transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#ECAA00] transition-all duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white mb-6">
                Contact
              </h4>
              <ul className="space-y-5 text-sm text-gray-400">
                <li className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#00A8E8]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00A8E8]/20 transition-colors">
                    <MapPin className="w-4 h-4 text-[#00A8E8]" />
                  </div>
                  <span className="leading-relaxed pt-1">
                    No. 11, Longsha Industrial Zone,<br />
                    Jianghai District, Jiangmen City, China
                  </span>
                </li>
                <li>
                  <a href="tel:+8618128259727" className="flex items-center gap-3 group hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#ECAA00]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ECAA00]/20 transition-colors">
                      <Phone className="w-4 h-4 text-[#ECAA00]" />
                    </div>
                    +86 181 2825 9727
                  </a>
                </li>
                <li>
                  <a href="mailto:inquiry@paralight.cc" className="flex items-center gap-3 group hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#00A8E8]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00A8E8]/20 transition-colors">
                      <Mail className="w-4 h-4 text-[#00A8E8]" />
                    </div>
                    inquiry@paralight.cc
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2026 <span className="text-[#00A8E8]">Paralight</span> Group. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-[#00A8E8] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-[#ECAA00] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
