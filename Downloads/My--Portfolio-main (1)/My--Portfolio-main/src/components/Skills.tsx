import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

const skillGroups = [
  {
    category: "Web Development",
    skills: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: "Expert" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "Expert" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: "Advanced" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: "Advanced" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: "Expert" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: "Expert" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: "Expert" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: "Expert" },
    ]
  },
  {
    category: "Mobile Development",
    skills: [
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", level: "Advanced" },
    ]
  },
  {
    category: "Backend & Automation",
    skills: [
      { name: "n8n", icon: "https://avatars.githubusercontent.com/u/45402633?s=200&v=4", level: "Expert" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", level: "Intermediate" },
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: "Advanced" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: "Advanced" },
      { name: "Neon", icon: "https://avatars.githubusercontent.com/u/89665518?s=200&v=4", level: "Advanced" },
    ]
  },
  {
    category: "Programming Language",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: "Advanced" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", level: "Intermediate" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", level: "Intermediate" },
    ]
  },
  {
    category: "Design & Creativity",
    skills: [
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: "Advanced" },
      { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", level: "Advanced" },
    ]
  }
];

const SkillTile = ({ skill }: { skill: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-60, 60], [10, -10]);
  const rotateY = useTransform(x, [-60, 60], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 150 };
  const rxSpring = useSpring(rotateX, springConfig);
  const rySpring = useSpring(rotateY, springConfig);

  return (
    <motion.div
      style={{ perspective: "1000px" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative group w-full aspect-square"
    >
      <motion.div
        style={{ rotateX: rxSpring, rotateY: rySpring, transformStyle: "preserve-3d" }}
        className="w-full h-full bg-white/60 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-6 shadow-soft hover:shadow-2xl hover:border-primary/40 hover:bg-white/80 transition-all duration-500 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="relative z-10 w-16 h-16 flex items-center justify-center p-4 bg-white rounded-[1.5rem] shadow-inner group-hover:scale-110 transition-transform duration-500">
          <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
        </div>
        
        <div className="text-center relative z-10 flex flex-col items-center gap-2" style={{ transform: "translateZ(20px)" }}>
          <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none">{skill.name}</h4>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-slate-100/50 text-slate-400 rounded-lg whitespace-nowrap">
            {skill.level}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-40 relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [100, -100, 100], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[50%] left-[40%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900 text-white mb-10 shadow-2xl shadow-slate-900/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white font-black tracking-[0.4em] uppercase text-[9px]">Technical Intelligence</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black mb-12 text-slate-900 tracking-tighter leading-[0.8]">
            THE MODERN <br /> <span className="text-primary italic underline underline-offset-[24px] decoration-primary/20">STACK</span>
          </h2>
          <p className="text-slate-500 text-2xl font-medium max-w-2xl mx-auto font-inter">
            A curated ecosystem of high-dimensional tools engineered for speed, scale, and resilience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
          {skillGroups.map((group, groupIdx) => (
            <div 
              key={groupIdx} 
              className={groupIdx === 0 ? "md:col-span-2" : "col-span-1"}
            >
              <div className="flex items-center gap-6 mb-16">
                <span className="text-6xl font-black text-slate-100/80 tracking-tighter">0{groupIdx + 1}.</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{group.category}</h3>
                <div className="flex-1 h-[2px] bg-slate-50" />
              </div>
              
              <div className={`grid gap-8 ${
                groupIdx === 0 
                ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" 
                : "grid-cols-2 lg:grid-cols-3"
              }`}>
                {group.skills.map((skill, i) => (
                  <SkillTile key={i} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;