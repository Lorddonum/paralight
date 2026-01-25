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
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-gray-200 py-4 shadow-sm"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <img src={paralightLogo} alt="Paralight" className="h-40 max-w-[360px] object-cover object-center" />
          <img src={maglinearLogo} alt="Maglinear Lighting" className="h-40 max-w-[360px] object-cover object-center" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors tracking-wide",
                location === link.href
                  ? "text-[#00A8E8] underline underline-offset-8"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              {link.name}
            </Link>
          ))}
          <button className="px-5 py-2 text-xs font-bold tracking-widest uppercase border border-[#00A8E8]/50 text-[#00A8E8] hover:bg-[#00A8E8] hover:text-black transition-all duration-300 rounded-none cursor-pointer">
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 py-8 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-lg font-display transition-colors",
                location === link.href
                  ? "text-[#00A8E8]"
                  : "text-gray-700 hover:text-gray-900",
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
