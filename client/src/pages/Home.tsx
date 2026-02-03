import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BrandSplit from "@/components/home/BrandSplit";
import GlobalNetwork from "@/components/home/GlobalNetwork";
import Exhibition from "@/components/home/Exhibition";
import ProjectGallery from "@/components/home/ProjectGallery";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-white text-gray-900 selection:bg-[#00A8E8] selection:text-white">
      <Navbar />
      <main>
        <section className="snap-start h-screen overflow-hidden">
          <Hero />
        </section>
        <section className="snap-start h-screen overflow-hidden">
          <BrandSplit />
        </section>
        <section className="snap-start h-screen overflow-hidden">
          <GlobalNetwork />
        </section>
        <section className="snap-start h-screen overflow-hidden">
          <Exhibition />
        </section>
        <section className="snap-start h-screen overflow-hidden">
          <ProjectGallery />
        </section>
        <section className="snap-start">
          <Footer />
        </section>
      </main>
    </div>
  );
}
