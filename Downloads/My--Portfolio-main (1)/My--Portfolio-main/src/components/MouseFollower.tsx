import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseFollower = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    
    const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            
            const target = e.target as HTMLElement;
            setIsHovering(!!target.closest('button, a, .magnetic-area'));
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* The Main Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-slate-900 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: isHovering ? 2 : 1
                }}
            />
            

            {/* Subtle light background follow */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none z-[-1]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};

export default MouseFollower;
