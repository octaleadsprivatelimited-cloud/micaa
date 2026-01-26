import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxBackgroundProps {
  imageSrc: string;
  className?: string;
  speed?: number; // 0.1 = slow, 0.5 = medium, 1 = fast
  overlay?: string;
}

export const ParallaxBackground = ({
  imageSrc,
  className = "",
  speed = 0.3,
  overlay = "bg-primary/80",
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 30}%`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-cover bg-center ${className}`}
        style={{
          backgroundImage: `url(${imageSrc})`,
          y,
          scale: 1.1, // Slightly larger to prevent gaps during parallax
        }}
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
};

export const ParallaxBackgroundSubtle = ({
  imageSrc,
  className = "",
  speed = 0.15,
  overlay = "bg-background/95",
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 20}%`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-cover bg-center ${className}`}
        style={{
          backgroundImage: `url(${imageSrc})`,
          y,
          scale: 1.05,
        }}
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
};
