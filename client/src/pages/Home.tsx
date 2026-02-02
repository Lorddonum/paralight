import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BrandSplit from "@/components/home/BrandSplit";
import GlobalNetwork from "@/components/home/GlobalNetwork";
import Exhibition from "@/components/home/Exhibition";
import ProjectGallery from "@/components/home/ProjectGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BrandSplit />
        <GlobalNetwork />
        <Exhibition />
        <ProjectGallery />
      </main>
      <Footer />
    </div>
  );
}
