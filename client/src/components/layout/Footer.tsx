import { Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, MapPin, Phone, Mail } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";
import { Link } from "wouter";

export default function Footer() {
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
    <footer className="bg-gray-900 text-white">
      <div className="bg-[#ECAA00] py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center -space-x-8">
              <div className="h-14 overflow-hidden flex items-center">
                <img src={paralightLogo} alt="Paralight" className="h-36 max-w-[300px] object-cover object-center" />
              </div>
              <div className="h-14 overflow-hidden flex items-center">
                <img src={maglinearLogo} alt="Maglinear Lighting" className="h-24 max-w-[220px] object-cover object-center" />
              </div>
            </div>
            <p className="text-gray-900 font-medium text-center md:text-right max-w-md">
              Premium LED aluminum profiles & magnetic track lighting systems for architects and designers worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-[#00A8E8] font-bold uppercase tracking-widest text-xs mb-6">Paralight Products</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">LED Aluminum Profiles</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Surface Mounted Profiles</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Recessed Profiles</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Corner Profiles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#ECAA00] font-bold uppercase tracking-widest text-xs mb-6">Maglinear Products</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">Magnetic Track Systems</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Panel Lights</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Downlights</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Linear Pendants</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Paralight Group</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Factory</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Certifications</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Become a Partner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#ECAA00] shrink-0" />
                <span>No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City, China</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ECAA00] shrink-0" />
                <a href="tel:+8618128259727" className="hover:text-white transition-colors">+86 181 2825 9727</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ECAA00] shrink-0" />
                <a href="mailto:inquiry@paralight.cc" className="hover:text-white transition-colors">inquiry@paralight.cc</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-3">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#00A8E8] hover:text-white hover:border-[#00A8E8] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500">© 2026 Paralight Group. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
