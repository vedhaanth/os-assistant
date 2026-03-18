import { Github, Linkedin, Twitter, ArrowUp, Mail, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/vedhaanth", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vedhaanth-ls-743375321/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/vedhaanth69038", label: "Twitter" }
  ];

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#achievements", label: "Achievements" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 bg-white border-t border-slate-50">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          
          {/* Column 1: Identity */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: "'Dancing Script', cursive" }}>V</span>
              <div className="h-8 w-[1px] bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Digital</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Architect</span>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] leading-loose max-w-[200px]">
              ENGINEERING RESILIENT ECOSYSTEMS AT SCALE.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Index
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Relay
            </h4>
            <div className="space-y-6">
              <a href="mailto:lsvedhaanth55@gmail.com" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary/5 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter group-hover:text-slate-900 transition-colors">lsvedhaanth55@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">Coimbatore, India</span>
              </div>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Network
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              © 2026 Vedhaanth L S
            </span>
            <div className="hidden md:block w-8 h-[1px] bg-slate-100" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Made with</span>
              <span className="text-rose-500 animate-pulse text-xs relative top-[-1px]">❤️</span>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">by Vedhaanth</span>
            </div>
          </div>

          <motion.button
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-4 pl-7 pr-3 py-3 rounded-2xl bg-slate-900 group shadow-2xl shadow-slate-900/20"
          >
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Return to Apex</span>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;