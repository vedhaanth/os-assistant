import { ArrowDown, Github, Linkedin, Twitter, Instagram, Eye, MoveRight, Sparkles, MapPin, Layers, Zap, Brain } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import profilePhoto from "@/assets/profile.jpg";
import dineeshPhoto from "@/assets/vedhaanth-photo.png";
import Magnetic from "./Magnetic";

const MagneticLink = ({ children, href, label }: { children: React.ReactNode, href: string, label: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((e.clientX - centerX) * 0.4);
    mouseY.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 bg-white/50 backdrop-blur-md shadow-soft text-slate-600 hover:text-primary hover:border-primary/40 transition-colors duration-300"
      aria-label={label}
    >
      {children}
    </motion.a>
  );
};

const Photo3D = ({ src }: { src: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glareX = useTransform(x, [-150, 150], [0, 100]);
  const glareY = useTransform(y, [-150, 150], [0, 100]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1500px" }}
      className="relative cursor-none lg:cursor-default"
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className="w-56 h-56 md:w-72 md:h-72 lg:w-[400px] lg:h-[400px] rounded-[3.5rem] bg-white border-8 border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden group"
      >
        <motion.img
          src={src}
          alt="Vedhaanth L.S"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.1 }}
          className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
        />

        {/* Dynamic Premium Glare */}
        <motion.div
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 80%)`,
            left: useTransform(glareX, (val) => `${val}%`),
            top: useTransform(glareY, (val) => `${val}%`),
          }}
          className="absolute inset-[-50%] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        />

        {/* Inner Glass Border */}
        <div className="absolute inset-0 border-[1px] border-white/30 rounded-[3.5rem] z-20 pointer-events-none" />
      </motion.div>

    </motion.div>
  );
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridX = useTransform(mouseX, [-500, 500], [20, -20]);
  const gridY = useTransform(mouseY, [-500, 500], [20, -20]);

  const springConfig = { damping: 25, stiffness: 150 };
  const gridXSpring = useSpring(gridX, springConfig);
  const gridYSpring = useSpring(gridY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = ["Full Stack Engineer", "AI Software Student", "Software Systems Specialist"];
  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const pauseTime = isDeleting ? 400 : 2500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, displayText.length === currentPhrase.length || displayText.length === 0 ? pauseTime : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft "Noir" Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] right-[5%] w-[700px] h-[700px] bg-blue-50 rounded-full blur-[150px]"
        />

        {/* Animated Grid with Mouse Parallax - Enhanced with Color Mesh */}
        <motion.div
          style={{ x: gridXSpring, y: gridYSpring }}
          className="absolute inset-[-10%] bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"
        />

        {/* New Vibrant "Gorgcy" Orbs */}
        <motion.div
          animate={{ x: [0, 150, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 200, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] mix-blend-multiply"
        />
      </div>

      <motion.div
        className="container relative z-10 px-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Photo Section with Floating Animation */}
          <motion.div
            variants={itemVariants}
            className="relative flex-shrink-0 lg:-ml-20"
          >
            <Photo3D src={dineeshPhoto} />
          </motion.div>

          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:pt-20">

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight mb-8 tracking-tighter whitespace-nowrap lg:mt-12"
            >
              <span className="text-slate-400 font-medium">Hi, I'm </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 italic pr-8 underline underline-offset-[24px] decoration-primary/20" style={{ fontFamily: "'Dancing Script', cursive" }}>Vedhaanth L.S</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl font-bold mb-8 h-[40px] text-slate-600 flex items-center">
              <span className="bg-gradient-to-br from-primary to-purple-600 text-white px-4 py-1.5 rounded-xl mr-4 text-[10px] uppercase font-black tracking-[0.2em] shadow-xl shadow-primary/20">System</span>
              <span className="border-b-2 border-primary/10 pb-1 font-outfit">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-8 bg-primary ml-3"
              />
            </motion.div>

            <motion.p variants={itemVariants} className="text-xl text-slate-500 max-w-xl mb-10 leading-relaxed font-medium font-inter">
              Orchestrating
              <span className="text-slate-900 font-bold"> state-of-the-art AI tools</span> to forge
              <span className="text-slate-900 font-bold"> next-generation digital experiences</span>.
              Blending creative design with cognitive intelligence to build resilient systems that don't just function—they evolve.
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-2xl">
              {[
                { icon: MapPin, label: "Location", value: "Coimbatore", color: "text-blue-500" },
                { icon: Layers, label: "Projects", value: "7+", color: "text-indigo-500" },
                { icon: Zap, label: "Focus", value: "Modern Tech", color: "text-amber-500" },
                { icon: Brain, label: "Learning", value: "AI Systems", color: "text-emerald-500" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.4)" }}
                  className="p-5 bg-white/40 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-soft hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-2xl bg-white shadow-inner flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-sm font-black text-slate-900 tracking-tight">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links & Resume */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-14">
              <MagneticLink href="https://github.com/vedhaanth" label="GitHub"><Github className="w-5 h-5" /></MagneticLink>
              <MagneticLink href="https://www.linkedin.com/in/vedhaanth-ls-743375321/" label="LinkedIn"><Linkedin className="w-5 h-5" /></MagneticLink>
              <MagneticLink href="https://x.com/vedhaanth69038" label="Twitter"><Twitter className="w-5 h-5" /></MagneticLink>

              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.png"
                target="_blank"
                className="flex items-center gap-4 pl-7 pr-5 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-soft group hover:border-primary/40 transition-all duration-300"
              >
                <span className="text-sm font-black text-slate-900 tracking-tight">Technical CV</span>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center group-hover:bg-primary transition-colors shadow-lg shadow-slate-900/10">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
              <Magnetic strength={0.2}>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="group relative h-20 px-12 flex items-center justify-center bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl shadow-slate-900/20 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-4 uppercase tracking-widest text-xs">
                    Discover Projects <MoveRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <motion.a
                  whileHover={{ x: 10 }}
                  href="#contact"
                  className="flex items-center gap-4 h-20 text-slate-900 font-bold group"
                >
                  <span className="text-lg">Let's talk</span>
                  <span className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-100 group-hover:border-primary/20 transition-all duration-300">
                    <ArrowDown className="w-5 h-5" />
                  </span>
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;