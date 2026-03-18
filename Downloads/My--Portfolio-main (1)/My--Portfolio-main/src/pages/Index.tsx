import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider type="reveal" className="-mt-20" />
        <About />
        <Achievements />
        <SectionDivider type="wash" flip />
        <Projects />
        <SectionDivider type="wave" color="#f8fafc" className="-mb-1" />
        <Skills />
        <SectionDivider type="wave" color="white" flip className="-mb-1" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
