import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#achievements", label: "Achievements" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled ? "py-4" : "py-10"
    }`}>
      <div className="container px-6 flex justify-center">
        <nav className={`flex items-center justify-between w-full max-w-5xl transition-all duration-500 px-6 py-4 rounded-[2rem] border ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-2xl border-slate-100 shadow-2xl" 
            : "bg-transparent border-transparent"
        }`}>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-3xl font-black text-slate-900 tracking-tighter"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            V
          </a>

          {/* Desktop nav with Liquid Tab Indicator */}
          <div className="hidden md:flex items-center bg-slate-50/50 backdrop-blur-md rounded-2xl p-1.5 border border-slate-100 relative group/nav">
            <ul className="flex items-center relative z-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <motion.a 
                    href={link.href} 
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="relative px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors duration-300 block"
                    onHoverStart={() => {
                      // This could be used for a more advanced state-based indicator
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            
            {/* The Liquid/Glass Indicator */}
            <div className="absolute inset-0 z-0 pointer-events-none p-1.5">
               <div className="w-full h-full relative">
                  {/* We use CSS layout and transition for a simple yet ultra-premium feel, 
                      or we could use a motion shared layout for better physics */}
                  <style>{`
                    .nav-indicator {
                      position: absolute;
                      top: 0;
                      left: 0;
                      height: 100%;
                      background: white;
                      border-radius: 12px;
                      box-shadow: 0 4px 12px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(15,23,42,0.05);
                      transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
                      opacity: 0;
                      z-index: 0;
                    }
                    
                    /* Smart positioning based on hover child index */
                    .group\\/nav:has(li:nth-child(1) a:hover) .nav-indicator { left: 0%; width: 20%; opacity: 1; }
                    .group\\/nav:has(li:nth-child(2) a:hover) .nav-indicator { left: 20%; width: 20%; opacity: 1; }
                    .group\\/nav:has(li:nth-child(3) a:hover) .nav-indicator { left: 40%; width: 20%; opacity: 1; }
                    .group\\/nav:has(li:nth-child(4) a:hover) .nav-indicator { left: 60%; width: 20%; opacity: 1; }
                    .group\\/nav:has(li:nth-child(5) a:hover) .nav-indicator { left: 80%; width: 20%; opacity: 1; }
                  `}</style>
                  <div className="nav-indicator" />
               </div>
            </div>
          </div>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase rounded-xl transition-all hover:shadow-xl group"
          >
            Connect <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Mobile toggle */}
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)} 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white" 
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-[-1] bg-white pt-32 px-6"
          >
            <ul className="flex flex-col gap-10">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    onClick={() => scrollToSection(link.href)} 
                    className="text-5xl font-black text-slate-300 hover:text-slate-900 transition-colors tracking-tighter"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-10">
                <a 
                  href="#contact" 
                  onClick={() => scrollToSection("#contact")} 
                  className="inline-flex items-center gap-4 text-3xl font-black text-slate-900 underline underline-offset-8 decoration-primary/50"
                >
                  START A PROJECT <ArrowUpRight className="w-8 h-8" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;