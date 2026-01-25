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
    <footer className="bg-black border-t border-white/10 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <img src={paralightLogo} alt="Paralight" className="h-10 object-contain mb-1" />
              <img src={maglinearLogo} alt="Maglinear Lighting" className="h-6 object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Precision engineered aluminum profiles and advanced magnetic lighting systems for modern architectural spaces.
            </p>
            <div className="flex flex-wrap gap-4">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#00A8E8] hover:text-black hover:border-[#00A8E8] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aluminum Profiles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Magnetic Track Light</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Linear Systems</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LED Strips</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#global" className="hover:text-white transition-colors">Global Network</a></li>
              <li><a href="/#exhibitions" className="hover:text-white transition-colors">Exhibitions</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for new product launches.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 w-full"
              />
              <button className="bg-[#00A8E8] text-black px-4 py-2 text-xs font-bold uppercase hover:bg-[#00C4E8] transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Paralight. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
