import { GraduationCap, Trophy, Languages, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

const About = () => {
  const education = [{
    degree: "MSc. Software Systems",
    institution: "Kongu Engineering College",
    year: "2024 - 2029",
    detail: "Currently pursuing with 7.57 CGPA"
  }, {
    degree: "HSC",
    institution: "Sree Dharmasastha Higher Secondary",
    year: "2023 - 2024",
    detail: "Completed with 82.5%"
  }];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section id="about" className="py-40 relative bg-white overflow-hidden">
      {/* Designer Decorative Wash */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent opacity-60" />
      
      <div className="container px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-24 items-center"
        >
          <div className="relative">
              {/* Decorative designer elements */}
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
              <div className="absolute -bottom-32 -right-10 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px]" />
              
              <div className="relative z-10">
                 <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 text-white mb-10 shadow-2xl shadow-slate-900/10">
                   <Sparkles className="w-4 h-4 text-primary" />
                   <span className="text-[11px] font-black uppercase tracking-[0.3em]">Origin Story</span>
                 </motion.div>
                 
                 <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-black mb-12 text-slate-900 tracking-tighter leading-[0.85]">
                   DEDICATED TO <br /> THE <span className="text-primary italic underline underline-offset-[12px] decoration-primary/20">CRAFT</span>
                 </motion.h2>
 
                 <motion.div variants={itemVariants} className="space-y-10 text-slate-500 text-2xl font-medium leading-relaxed max-w-xl font-inter">
                   <p>
                     I operate at the intersection of 
                     <span className="text-slate-900 font-bold italic"> logic and intuition</span>. 
                     My objective is to engineer digital ecosystems that don't just execute, but 
                     <span className="text-primary underline decoration-primary/20 decoration-2 underline-offset-4">evolve</span> 
                     with the complexities of their users.
                   </p>
                   <p className="text-slate-400 text-lg">
                     From micro-optimizing low-level system performance to architecting high-frequency 
                     AI inference pipelines, I build the foundations that support the next generation of systemic thought.
                   </p>
                 </motion.div>
              </div>
          </div>

          <motion.div variants={itemVariants} className="relative">
             <div className="bg-white border border-slate-100 rounded-[4.5rem] p-12 lg:p-20 shadow-soft relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-8 mb-20">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-slate-900 flex items-center justify-center shadow-xl">
                      <GraduationCap className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-2">Academic</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Formation & Degrees</p>
                    </div>
                  </div>
                  
                  <div className="space-y-16">
                    {education.map((edu, index) => (
                      <motion.div 
                        key={index} 
                        className="relative pl-12 border-l-2 border-slate-100"
                        whileHover={{ x: 12 }}
                      >
                        <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-primary ring-[8px] ring-white shadow-xl" />
                        <span className="text-xs text-slate-400 font-black tracking-[0.3em] mb-3 block uppercase">{edu.year}</span>
                        <h4 className="text-3xl font-black text-slate-900 mb-2 leading-[0.9] tracking-tighter">{edu.degree}</h4>
                        <p className="text-xl text-slate-400 font-bold mb-4">{edu.institution}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-slate-400 text-[11px] font-black uppercase tracking-wider border border-slate-100">
                          {edu.detail}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-24 pt-16 border-t border-slate-50">
                    <div className="flex items-center gap-8 mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-white">
                        <Languages className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tighter">Dialects</h3>
                    </div>
                    <div className="flex flex-wrap gap-5">
                      {["Tamil", "English", "Telugu"].map(lang => (
                        <span 
                          key={lang} 
                          className="px-8 py-4 text-xs font-black tracking-[0.4em] bg-white border border-slate-100 rounded-2xl text-slate-900 shadow-soft hover:shadow-xl hover:border-primary/20 transition-all cursor-default uppercase"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;