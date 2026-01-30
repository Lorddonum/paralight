import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Downloads", href: "/downloads" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "shadow-lg"
          : "",
      )}
    >
      <div className="flex items-stretch">
        {/* Logo section with white background extending to left edge */}
        <div className="bg-white flex-shrink-0">
          <div className={cn(
            "pl-6 pr-8 flex items-center transition-all duration-300",
            scrolled ? "py-2" : "py-3"
          )}>
            <Link
              href="/"
              className="flex items-center -space-x-8 hover:opacity-80 transition-opacity"
            >
              <div className="h-16 overflow-hidden flex items-center">
                <img src={paralightLogo} alt="Paralight" className="h-40 max-w-[360px] object-cover object-center" />
              </div>
              <div className="h-16 overflow-hidden flex items-center">
                <img src={maglinearLogo} alt="Maglinear Lighting" className="h-28 max-w-[280px] object-cover object-center" />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Nav section with gradient background */}
        <div className={cn(
          "bg-gradient-to-r from-[#00A8E8] via-[#ECAA00] to-[#F5D88A] flex-grow flex items-center justify-end px-6 transition-all duration-300",
          scrolled ? "py-2" : "py-3"
        )}>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors tracking-wide",
                location === link.href
                  ? "text-gray-900 underline underline-offset-8"
                  : "text-gray-800 hover:text-gray-900",
              )}
            >
              {link.name}
            </Link>
          ))}
          <button className="px-5 py-2 text-xs font-bold tracking-widest uppercase border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-none cursor-pointer">
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 py-8 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-lg font-display transition-colors",
                location === link.href
                  ? "text-[#00A8E8]"
                  : "text-gray-300 hover:text-white",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
