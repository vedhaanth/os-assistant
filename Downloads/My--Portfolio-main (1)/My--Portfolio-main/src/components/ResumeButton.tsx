import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ResumeButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button after scrolling down 500px (approx height of Hero)
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div
            className={cn(
                "fixed bottom-12 right-8 z-50 transition-all duration-500 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            )}
        >
            <a
                href="/resume.png"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button
                    size="lg"
                    className="rounded-full shadow-[0_0_20px_hsl(180_100%_50%_/_0.3)] hover:shadow-[0_0_30px_hsl(180_100%_50%_/_0.5)] bg-background/80 backdrop-blur-md border border-primary/50 text-foreground hover:bg-primary/10 transition-all duration-300 group"
                >
                    <Eye className="mr-2 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:text-primary transition-colors">
                        View Resume
                    </span>
                </Button>
            </a>
        </div>
    );
};

export default ResumeButton;
