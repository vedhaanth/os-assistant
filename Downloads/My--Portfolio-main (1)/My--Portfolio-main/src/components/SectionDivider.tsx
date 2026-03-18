import { motion } from "framer-motion";

interface SectionDividerProps {
  type: "wave" | "wash" | "reveal";
  color?: string;
  className?: string;
  flip?: boolean;
}

const SectionDivider = ({ type, color = "white", className = "", flip = false }: SectionDividerProps) => {
  if (type === "wave") {
    return (
      <div className={`relative w-full h-32 overflow-hidden ${className} ${flip ? "rotate-180" : ""}`} style={{ color }}>
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ d: "M0,160L48,176.3C96,193,192,226,288,226.7C384,227,480,195,576,176.3C672,158,768,153,864,176.3C960,200,1056,252,1152,252.7C1248,253,1344,202,1392,176.3L1440,150L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
            animate={{ 
              d: [
                "M0,160L48,176.3C96,193,192,226,288,226.7C384,227,480,195,576,176.3C672,158,768,153,864,176.3C960,200,1056,252,1152,252.7C1248,253,1344,202,1392,176.3L1440,150L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,176.3C96,193,192,226,288,226.7C384,227,480,195,576,176.3C672,158,768,153,864,176.3C960,200,1056,252,1152,252.7C1248,253,1344,202,1392,176.3L1440,150L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (type === "wash") {
    return (
      <div className={`relative w-full h-48 pointer-events-none ${className}`}>
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent" 
          style={{ 
            clipPath: flip 
              ? "polygon(0 0, 100% 20%, 100% 100%, 0 80%)" 
              : "polygon(0 20%, 100% 0, 100% 80%, 0 100%)" 
          }}
        />
      </div>
    );
  }

  return null;
};

export default SectionDivider;
