import { Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";

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
    <footer className="bg-[#ECAA00] border-t border-[#d49900] py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6 flex items-center -space-x-6 -ml-12">
              <div className="h-12 overflow-hidden flex items-center">
                <img src={paralightLogo} alt="Paralight" className="h-32 max-w-[280px] object-cover object-center" />
              </div>
              <div className="h-12 overflow-hidden flex items-center">
                <img src={maglinearLogo} alt="Maglinear Lighting" className="h-32 max-w-[280px] object-cover object-center" />
              </div>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed mb-8">
              Precision engineered aluminum profiles and advanced magnetic lighting systems for modern architectural spaces.
            </p>
            <div className="flex flex-wrap gap-4">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-widest text-xs mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-gray-800">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Aluminum Profiles</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Magnetic Track Light</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Linear Systems</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">LED Strips</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-800">
              <li><a href="/about" className="hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="/#global" className="hover:text-gray-900 transition-colors">Global Network</a></li>
              <li><a href="/#exhibitions" className="hover:text-gray-900 transition-colors">Exhibitions</a></li>
              <li><a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
            <p className="text-gray-800 text-sm mb-4">Subscribe to our newsletter for new product launches.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white border border-gray-800 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 w-full"
              />
              <button className="bg-gray-900 text-white px-4 py-2 text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800/20 flex flex-col md:flex-row justify-between items-center text-xs text-gray-800">
          <p>© 2026 Paralight. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
