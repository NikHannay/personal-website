import { useState, useRef, ReactNode, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { LiquidMetal } from "@paper-design/shaders-react";

interface LiquidMetalButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const LiquidMetalButton = ({ 
  children, 
  className, 
  onClick, 
  href,
  type = "button",
  disabled = false
}: LiquidMetalButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttonContent = (
    <motion.button
      ref={containerRef}
      type={type}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "relative rounded-full font-sans transition-all duration-500",
        "bg-white dark:bg-black text-accent overflow-hidden group",
        !disabled ? "hover:scale-[1.05] active:scale-[0.98] hover:text-white" : "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        // Give it some base padding to ensure the border is visible if the className doesn't provide enough
        padding: "1px", 
      }}
    >
      {/* 1. Default State: Orange Liquid Metal Outline */}
      <div className="absolute inset-0 z-0">
        {dimensions.width > 0 && dimensions.height > 0 && (
          <LiquidMetal
            width={dimensions.width}
            height={dimensions.height}
            colorBack="#FF6321" // Orange tinge
            colorTint="#FFD2B2" // Lighter orange shine
            repetition={4}
            softness={0.2}
            shiftRed={0.5}
            shiftBlue={0.2}
            distortion={0.2}
            contour={0.5}
            angle={45}
            speed={1.5}
            scale={1.5}
            fit="cover"
          />
        )}
      </div>

      {/* 1.1 Aesthetic Overlay for Default State */}
      <div 
        className={cn(
          "absolute inset-0 z-[5] bg-accent/5 pointer-events-none transition-opacity duration-500",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      />

      {/* 2. Inner Mask to create the "Outline" effect in default state */}
      <div 
        className={cn(
          "absolute inset-[1.5px] rounded-full z-10 transition-opacity duration-500",
          "bg-white dark:bg-black",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      />

      {/* 3. Hover State: Premium Silver Liquid Metal Fill */}
      <div 
        className={cn(
          "absolute inset-0 z-20 transition-opacity duration-700 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        {dimensions.width > 0 && dimensions.height > 0 && (
          <LiquidMetal
            width={dimensions.width}
            height={dimensions.height}
            colorBack="#aaaaac" // Premium silver
            colorTint="#ffffff"
            repetition={2}
            softness={0.12}
            shiftRed={0.2}
            shiftBlue={0.2}
            distortion={0.08}
            contour={0.3}
            angle={25}
            speed={1.5}
            scale={3.0} // Heavily increased to hide any central shape
            fit="cover"
          />
        )}
      </div>

      {/* 4. Button Content */}
      <span className={cn(
        "relative z-30 flex items-center justify-center gap-2 w-full h-full",
        // Only apply default padding if no custom padding is provided in className
        !className?.match(/(^|\s)p[xy]?-\d+/) && "px-8 py-4"
      )}>
        {children}
      </span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="contents">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};
