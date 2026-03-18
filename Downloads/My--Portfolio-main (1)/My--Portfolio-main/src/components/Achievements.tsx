import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Trophy, Crown, Sparkles } from "lucide-react";

const achievements = [
  {
    title: "3rd Prize – Proof of Concept (PoC)",
    description: "Won third place in the \"Proof of Concept\" competition 2025 held inside Kongu Engineering College. Demonstrated the \"Smart Forensic AI Analysis\" system to expert panels.",
    year: "2025",
    rank: "3rd Prize",
    category: "POC",
    icon: Trophy,
    color: "amber",
  },
  {
    title: "2nd Prize – Coding Competition",
    description: "Won 2nd place in a high-stakes coding competition held at Nandha College of Engineering, Perundurai, Erode. This was an inter-college event showcasing technical problem-solving.",
    year: "2026",
    rank: "2nd Prize",
    category: "Coding",
    icon: Trophy,
    color: "blue",
  },
  {
    title: "3rd Prize – Ideathon",
    description: "Secured third place in the college-level Ideathon for the \"Smart Forensic AI Analysis\" system. Focused on innovative problem-solving and technical feasibility among diverse teams.",
    year: "2025",
    rank: "3rd Prize",
    category: "Ideathon",
    icon: Trophy,
    color: "purple",
  }
];

const colorMap = {
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    pill: "bg-amber-500",
    border: "border-amber-500/20",
    accent: "bg-amber-500/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    pill: "bg-blue-500",
    border: "border-blue-500/20",
    accent: "bg-blue-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    pill: "bg-purple-500",
    border: "border-purple-500/20",
    accent: "bg-purple-500/20",
  },
};

const AchievementCard = ({ item, index }: { item: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { damping: 25, stiffness: 200 };
  const rxSpring = useSpring(rotateX, springConfig);
  const rySpring = useSpring(rotateY, springConfig);

  const colors = colorMap[item.color as keyof typeof colorMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      style={{ perspective: "1500px" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative group w-full max-w-lg mx-auto"
    >
      <motion.div
        style={{ rotateX: rxSpring, rotateY: rySpring, transformStyle: "preserve-3d" }}
        className="relative w-full h-full bg-white/40 backdrop-blur-2xl border border-white rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_rgba(30,58,138,0.2)] transition-all duration-700 overflow-hidden group/card"
      >
        {/* Animated Glow Backdrop */}
        <div className={`absolute -top-[20%] -right-[20%] w-[150%] h-[150%] ${colors.accent} rounded-full opacity-30 group-hover/card:opacity-60 blur-[120px] transition-opacity duration-1000 -z-10`} />
        
        {/* Glass Reflection effect - More vibrant */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="flex items-start justify-between mb-12" style={{ transform: "translateZ(30px)" }}>
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`w-20 h-20 rounded-[1.8rem] ${colors.bg} flex items-center justify-center border ${colors.border} shadow-lg backdrop-blur-sm`}
          >
            <item.icon className={`w-10 h-10 ${colors.text}`} />
          </motion.div>
          <div className="flex flex-col items-end gap-3">
             <div className="flex gap-2">
                <span className={`px-5 py-2 rounded-full ${colors.pill} text-white font-black text-[10px] uppercase tracking-widest shadow-lg`}>
                  {item.rank}
                </span>
                <span className="px-4 py-2 rounded-full bg-slate-900 text-white/90 font-black text-[10px] uppercase tracking-widest border border-white/10 shadow-lg">
                  {item.year}
                </span>
             </div>
             <div className={`px-4 py-1.5 rounded-lg ${colors.bg} ${colors.text} font-black text-[9px] uppercase tracking-[0.2em] border ${colors.border}`}>
               {item.category}
             </div>
          </div>
        </div>

        <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none mb-8 group-hover/card:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-slate-500 text-lg leading-relaxed font-medium font-inter">
            {item.description}
          </p>
        </div>

        {/* Decorative Glossy Elements */}
        <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-white/20 rounded-br-[2rem] opacity-40" />
      </motion.div>

      {/* Shadow layer for depth */}
      <div className="absolute -inset-4 bg-black/5 blur-2xl rounded-[4rem] group-hover:bg-black/10 transition-colors duration-700 -z-20" />
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 md:py-48 relative bg-white overflow-hidden">
      {/* Dynamic Background orbs - Vibrant Edition */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ x: [-50, 50, -50], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [50, -50, 50], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-32 max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-slate-900 text-white mb-10 shadow-2xl">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-white font-black tracking-[0.5em] uppercase text-[10px]">Victory Timeline</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 text-slate-900 tracking-tight leading-[0.8] uppercase">
            MY <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary italic pr-4 underline underline-offset-[24px] decoration-primary/20">ACHIEVEMENTS</span>
          </h2>
          <p className="text-slate-400 text-xl font-medium tracking-tight uppercase">
            High-Dimensional Recognition & Competitive Success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-[90rem] mx-auto">
          {achievements.map((item, i) => (
            <AchievementCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
