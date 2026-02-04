import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";

export default function Navbar({ darkText = false }: { darkText?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isLightSection, setIsLightSection] = useState(false);
  const [isFooterSection, setIsFooterSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location !== '/') {
      setIsLightSection(false);
      setIsFooterSection(false);
      return;
    }
    
    const scrollContainer = document.querySelector('.snap-y');
    if (!scrollContainer) return;

    const checkSection = () => {
      const sections = scrollContainer.querySelectorAll('section.snap-start');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          // Sections with light backgrounds: BrandSplit (1), GlobalNetwork (2), Exhibition (3), ProjectGallery (4)
          setIsLightSection(index === 1 || index === 2 || index === 3 || index === 4);
          // Footer section (index 5) has dark blue background
          setIsFooterSection(index === 5);
        }
      });
    };

    scrollContainer.addEventListener('scroll', checkSection);
    checkSection();
    
    return () => scrollContainer.removeEventListener('scroll', checkSection);
  }, [location]);

  const isProductsPage = location === '/products' || location.startsWith('/products/');
  const useDarkText = (darkText || isLightSection || scrolled || isProductsPage) && !isFooterSection;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Downloads", href: "/downloads" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isFooterSection
          ? "bg-[#0A1628]"
          : isProductsPage
            ? "bg-white shadow-sm"
            : scrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm"
              : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center -space-x-6 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="h-10 lg:h-12 overflow-hidden flex items-center">
              <img src={paralightLogo} alt="Paralight" className="h-28 lg:h-32 max-w-[240px] object-cover object-center" />
            </div>
            <div className="h-10 lg:h-12 overflow-hidden flex items-center">
              <img src={maglinearLogo} alt="Maglinear Lighting" className="h-16 lg:h-20 max-w-[160px] object-cover object-center" />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-300",
                  location === link.href
                    ? useDarkText ? "text-brand-cyan" : "text-white"
                    : useDarkText 
                      ? "text-gray-600 hover:text-gray-900" 
                      : "text-white/90 hover:text-white",
                )}
              >
                {link.name}
                {location === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-current" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <button className={cn(
                "px-6 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-300",
                useDarkText
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              )}>
                Get in Touch
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden p-2 transition-colors duration-300",
              useDarkText ? "text-gray-900" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="container mx-auto px-8 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block py-3 text-base font-medium transition-colors border-b border-gray-50 last:border-0",
                location === link.href
                  ? "text-brand-cyan"
                  : "text-gray-600 hover:text-gray-900",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <button className="w-full mt-4 px-6 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
