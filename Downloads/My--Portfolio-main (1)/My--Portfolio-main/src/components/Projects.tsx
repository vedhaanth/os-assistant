import { ExternalLink, Award, Github, Folder, MoveRight, X, Sparkles, CheckCircle2, Layout, Zap, Cpu } from "lucide-react";
import { motion, Variants, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const projects = [
  {
    title: "Smart Forensic AI Analysis System",
    description: "Automating digital evidence analysis with LPU-accelerated intelligence. Won 2nd place at Proof of Concept 2025.",
    longDescription: "A high-performance AI-driven forensic tool designed to automate complex evidence analysis. By leveraging the Groq LPU™ Inference Engine, this system identifies patterns in digital data with unprecedented speed, reducing investigative overhead by up to 60%.",
    tags: ["React JS", "Node.js", "Groq API"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    color: "from-blue-600/5 to-slate-200/5",
    achievement: "🥈 2nd Place - POC 2025",
    github: "https://github.com/vedhaanth/Smart-Forensic-AI-Analysis-System",
    details: {
      challenge: "Processing massive forensic datasets requires extreme inference speed which traditional CPUs/GPUs fail to deliver at scale.",
      solution: "Integrated Groq API to offload AI inference, combined with a robust Node.js/MongoDB backend for instant data correlation.",
      features: ["LPU-accelerated inference", "Real-time log analysis", "Secure MongoDB data vault"],
      stack: ["React JS", "Node.js", "MongoDB", "Groq API"]
    }
  },
  {
    title: "Assured Contract Farming",
    description: "Empowering 500+ local farmers by enabling direct-to-consumer digital contracts and transparent supply chains.",
    longDescription: "A direct-to-consumer marketplace that eliminates intermediaries through legal, digital contracts between farmers and retail buyers. This system ensures price stability for producers and guarantees fresh produce delivery for consumers.",
    tags: ["React Native", "Node.js", "MySQL"],
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
    color: "from-slate-200/5 to-blue-200/5",
    achievement: null,
    github: "https://github.com/vedhaanth/assured-contract-farmings",
    details: {
      challenge: "Local farmers often face economic exploitation due to a lack of direct market access and transparent pricing models.",
      solution: "Built a React Native mobile ecosystem that facilitates legally-binding digital agreements and transparent payment tracking.",
      features: ["Digital contract signing", "Live market pricing", "Secure payment gateway integration"],
      stack: ["React Native", "Express.js", "MySQL", "Firebase"]
    }
  },
  {
    title: "Waste Segregation Monitoring System",
    description: "Pioneering urban sustainability through real-time waste tracking and IoT-integrated municipal management.",
    longDescription: "An IoT-integrated mobile application designed to monitor municipal waste segregation in real-time. It uses intelligent sensor data and community reporting to optimize waste collection routes and improve city-wide recycling efficiency.",
    tags: ["Flutter", "Firebase"],
    image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=800&q=80",
    color: "from-slate-300/5 to-slate-50/5",
    achievement: null,
    github: "https://github.com/vedhaanth/waste-segregation-monitoring-system-app-",
    details: {
      challenge: "Inefficient waste management and lack of segregation tracking lead to massive environmental pollution in growing urban areas.",
      solution: "Developed a Flutter application with real-time Firebase syncing to track bin capacity and automate municipal collection logs.",
      features: ["NFC/QR bin scanning", "Real-time fill-level monitoring", "Community reward system"],
      stack: ["Flutter", "Firebase Cloud Messenger", "Firestore", "Google Maps API"]
    }
  },
  {
    title: "Deep Forensic Image Detection App",
    description: "Combatting AI-misinformation with a 98% accurate forensic analysis tool for real-time image verification.",
    longDescription: "A cutting-edge Flutter application designed to verify image authenticity in an era of deepfakes. It employs advanced forensic techniques including Error Level Analysis (ELA) and metadata inspection to provide instant, machine-driven confidence reports.",
    tags: ["Flutter", "AI Integration", "Image Forensics"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    color: "from-blue-600/5 to-slate-200/5",
    achievement: "🚀 98% Accuracy (Testing)",
    github: "https://github.com/vedhaanth/Ai-generate-image-or-real-image-",
    details: {
      challenge: "Differentiating between high-quality AI-generated imagery and real photos requires analyzing microscopic artifacts invisible to the human eye.",
      solution: "Developed an ensemble of forensic algorithms integrated into a Flutter mobile pipeline for instant on-device analysis.",
      features: ["Live camera & gallery scan", "Real-time analysis report", "NFC-based metadata vault", "Visual artifact highlighting"],
      stack: ["Flutter", "Python (FastAPI)", "TensorFlow Lite", "Firebase"]
    }
  },
];

const ProjectCard = ({ project, onClick }: { project: typeof projects[0], onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-soft hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ transform: "translateZ(20px)" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Dynamic Premium Glare */}
        <motion.div
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 80%)`,
            left: useTransform(x, [-200, 200], [-50, 150], { clamp: false }),
            top: useTransform(y, [-200, 200], [-50, 150], { clamp: false }),
          }}
          className="absolute inset-[-50%] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-6 left-6 z-20" style={{ transform: "translateZ(40px)" }}>
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <Folder className="w-5 h-5 text-white" />
          </div>
        </div>

        {project.achievement && (
          <div className="absolute top-6 right-6 z-20" style={{ transform: "translateZ(40px)" }}>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[9px] font-black tracking-widest uppercase rounded-full border border-white/20 shadow-xl">
              {project.achievement}
            </div>
          </div>
        )}

        <div className="absolute bottom-8 left-8 right-8 z-20" style={{ transform: "translateZ(50px)" }}>
          <h3 className="text-3xl font-black text-white tracking-tighter mb-3 leading-[0.9]">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[8px] font-black text-white/90 uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 pb-10" style={{ transform: "translateZ(30px)" }}>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium font-inter">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
           <div className="flex items-center gap-2 text-primary font-black text-[10px] tracking-widest uppercase group-hover:translate-x-2 transition-transform">
              Explore Engineering <MoveRight className="w-4 h-4" />
           </div>
           
           <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:bg-slate-50 transition-all shadow-sm"
            >
              <Github className="w-5 h-5" />
            </motion.a>
           </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <section id="projects" className="py-32 relative bg-white">
      <div className="container px-6">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-[2px] bg-slate-200" />
              <span className="text-slate-400 font-black tracking-[0.4em] uppercase text-[9px]">
                Selected Artifacts
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
              MY <span className="text-primary italic">WORK</span>
            </h2>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:w-96 shadow-soft relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed font-inter relative z-10">
              Every project is a fusion of 
              <span className="text-slate-900 font-bold"> high-performance logic</span> and
              mathematically balanced <span className="text-primary font-bold">design principles</span>.
            </p>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </motion.div>

        {/* Big Aesthetic CTA background */}
        <div className="mt-32 text-center relative py-20 px-10 rounded-[4rem] bg-slate-900 overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),transparent)]" />
           <motion.h3 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter z-10 relative"
           >
             READY TO BUILD <br /> SOMETHING <span className="text-primary italic underline underline-offset-8 decoration-primary/20">REAL?</span>
           </motion.h3>
           <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-black rounded-2xl shadow-2xl relative z-10"
           >
             START A CONVERSATION <MoveRight className="w-5 h-5" />
           </motion.a>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-[3rem] z-[201] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white"
            >
              {/* Modal Left - Image & Basic Info */}
              <div className="w-full lg:w-2/5 h-64 lg:h-full relative overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 left-8 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform lg:hidden"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-white/40" />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">Project Exploration</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Right - Detailed Content */}
              <div className="flex-1 h-full overflow-y-auto bg-white p-8 md:p-16 lg:p-20 relative">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-12 right-12 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all hidden lg:flex"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="max-w-2xl">
                  <section className="mb-16">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
                      <Layout className="w-4 h-4" /> Overview
                    </h3>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </section>

                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" /> The Challenge
                      </h4>
                      <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-slate-100 pl-6">
                        {selectedProject.details.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> The Solution
                      </h4>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        {selectedProject.details.solution}
                      </p>
                    </div>
                  </div>

                  <section className="mb-16 pt-12 border-t border-slate-50">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Notable Features</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedProject.details.features.map(feature => (
                        <div key={feature} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl group hover:bg-primary/5 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span className="text-sm font-bold text-slate-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mb-16">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8 flex items-center gap-3">
                      <Cpu className="w-4 h-4" /> Technical Arsenal
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.details.stack.map(tech => (
                        <span key={tech} className="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-900 text-xs font-black uppercase tracking-widest shadow-soft">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <div className="flex items-center gap-8 pt-12 border-t border-slate-100">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900 text-white font-black rounded-[1.5rem] shadow-2xl hover:shadow-slate-900/10 transition-all uppercase tracking-widest text-[10px]"
                    >
                      <Github className="w-5 h-5 text-primary" /> GitHub Repository
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;