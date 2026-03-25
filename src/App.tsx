/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Layout, 
  Linkedin, 
  Sparkles,
  Zap,
  Globe,
  Menu,
  X,
  Command,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Quote
} from "lucide-react";
import { useRef, useState, useEffect, createContext, useContext } from "react";

// --- Theme Context ---
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

// --- Types ---
interface ProjectDetail {
  title: string;
  content: string;
}

interface ProjectVisual {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

interface Project {
  title: string;
  category: string;
  image: string;
  tags: string[];
  description: string;
  details: ProjectDetail[];
  visuals?: ProjectVisual[];
  externalLink?: string;
}

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const images = [
    "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773612997494-EMITZN383YFD1ZI1MSN6/image-asset.png?format=1500w",
    "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773613052086-D4L95UKDORG97YBVR61N/image-asset.jpg?format=1500w",
    "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773613542750-CR6YHJZKYKT8T38PY4Y2/image-asset.png?format=1500w",
    "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773614988387-QOQYTT9YYGO258UDAM4P/image-asset.png?format=1500w"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 800);

    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete, images.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[200] bg-white dark:bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full max-w-2xl aspect-video px-6">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl">
              <img 
                src={images[index]} 
                alt="Loading Artifact" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center group cursor-pointer">
          <span className="text-xl md:text-2xl font-sans font-bold tracking-tighter text-black dark:text-white transition-colors duration-300">
            NikHannay<span className="text-accent">.</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={toggleTheme}
            className="relative flex items-center w-11 h-6 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 transition-colors group overflow-hidden"
            aria-label="Toggle theme"
          >
            <motion.div 
              className="absolute w-4 h-4 rounded-full bg-black dark:bg-white shadow-sm flex items-center justify-center z-10"
              animate={{ x: theme === 'dark' ? 24 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {theme === 'dark' ? <Moon className="w-2.5 h-2.5 text-black" /> : <Sun className="w-2.5 h-2.5 text-white" />}
            </motion.div>
            <div className="flex justify-between items-center w-full px-2 opacity-40 group-hover:opacity-60 transition-opacity">
              <Sun className="w-2.5 h-2.5 text-black dark:text-white" />
              <Moon className="w-2.5 h-2.5 text-black dark:text-white" />
            </div>
          </button>

          <a href="#work" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors relative group">
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-black dark:bg-white transition-all group-hover:w-full" />
          </a>
          <a href="#about" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-black dark:bg-white transition-all group-hover:w-full" />
          </a>
          
          <a href="#contact" className="px-4 py-2 border border-accent text-accent rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-all active:scale-95 shadow-lg shadow-accent/10">
            Get in touch
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="relative flex items-center w-10 h-5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 transition-colors group overflow-hidden"
            aria-label="Toggle theme"
          >
            <motion.div 
              className="absolute w-3 h-3 rounded-full bg-black dark:bg-white shadow-sm flex items-center justify-center z-10"
              animate={{ x: theme === 'dark' ? 22 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {theme === 'dark' ? <Moon className="w-2 h-2 text-black" /> : <Sun className="w-2 h-2 text-white" />}
            </motion.div>
          </button>
          <button 
            className="text-black dark:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-b border-black/5 dark:border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-500 dark:text-zinc-400">Work</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-500 dark:text-zinc-400">About</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-black dark:text-white">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BrandLogo = ({ name, domain, simpleSlug, className = "h-8", initialSrc }: { name: string, domain: string, simpleSlug: string, className?: string, initialSrc?: string }) => {
  const [src, setSrc] = useState(initialSrc || `https://logo.clearbit.com/${domain}`);
  const [loaded, setLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      // Try Simple Icons as first fallback
      setSrc(`https://cdn.simpleicons.org/${simpleSlug}/717171`);
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Try Google Favicon as second fallback
      setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      setErrorCount(2);
    } else {
      // Final fallback is text
      setSrc('');
    }
  };

  useEffect(() => {
    // If it hasn't loaded in 2 seconds, try the fallback
    const timer = setTimeout(() => {
      if (!loaded && errorCount === 0) {
        handleError();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [loaded, errorCount]);

  return (
    <div className="relative flex items-center justify-center min-w-[140px] min-h-[48px] group">
      {src ? (
        <img 
          src={src} 
          alt={name} 
          className={`${className} w-auto object-contain grayscale transition-all duration-700 group-hover:grayscale-0 ${loaded ? 'opacity-40 group-hover:opacity-100' : 'opacity-0'}`} 
          onLoad={() => setLoaded(true)}
          onError={handleError}
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="text-[10px] font-mono font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
          {name}
        </span>
      )}
      {!loaded && src && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-px bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-10 overflow-hidden bg-white dark:bg-black">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 dark:bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 dark:bg-emerald-600/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Interactive Ripple Blob */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* The main glow */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{ 
            x: springX, 
            y: springY,
            left: -300,
            top: -300,
            background: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(255, 99, 33, 0.3) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(255, 99, 33, 0.2) 0%, transparent 70%)',
          }}
        />

        {/* Ripple Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-accent/30 dark:border-accent/40"
            style={{
              x: springX,
              y: springY,
              left: 0,
              top: 0,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              width: [0, 600],
              height: [0, 600],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Cursor Core */}
        <motion.div 
          className="absolute w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_rgba(255,99,33,0.8)]"
          style={{ 
            x: springX, 
            y: springY,
            left: -4,
            top: -4,
          }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="max-w-5xl mx-auto px-6 text-center relative z-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-10">
            <Sparkles className="w-3 h-3 text-accent" />
            Redefining the digital craft
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight text-black dark:text-white mb-10 leading-[0.9] text-balance">
            Design <br />
            <span className="text-accent italic">Leader</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
            I operate at the intersection of <span className="text-black dark:text-white font-normal">product, systems, and AI</span>. Helping companies move faster, scale smarter and turn complexity into competitive advantage.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <a 
              href="#work"
              className="w-full sm:w-auto px-7 py-3.5 border border-accent text-accent rounded-full font-medium flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all group shadow-xl shadow-accent/10"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase tracking-widest">
              <span>Scroll to explore</span>
              <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 pb-10"
          >
            {[
              { name: "McLaren", domain: "mclaren.com", simpleSlug: "mclaren", className: "h-[120px]" },
              { name: "Vodafone", domain: "vodafone.com", simpleSlug: "vodafone", className: "h-10" },
              { name: "Jaguar Land Rover", domain: "jaguarlandrover.com", simpleSlug: "jaguar", className: "h-10" },
              { name: "NAB", domain: "nab.com.au", simpleSlug: "nab", className: "h-10" }
            ].map((brand) => (
              <BrandLogo 
                key={brand.name} 
                name={brand.name} 
                domain={brand.domain} 
                simpleSlug={brand.simpleSlug} 
                className={brand.className}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      
      </div>
    </section>
  );
};

const FeatureSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    {
      icon: Layout,
      title: "Strategic Design",
      description: "Bridging the gap between high-level business objectives and granular user needs. I build roadmaps that design teams can actually execute.",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Cpu,
      title: "AI & Future Tech",
      description: "Integrating LLMs and generative AI into product workflows. Moving beyond chatbots to proactive, agentic interfaces.",
      color: "text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Layers,
      title: "Design Systems",
      description: "Architecting scalable systems that serve as the single source of truth for both designers and developers. Focus on tokens and automation.",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Zap,
      title: "Product Craft",
      description: "Obsessive focus on the details. Motion, micro-interactions, and visual polish that separate good products from great ones.",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <section ref={sectionRef} className="pt-0 pb-20 bg-white dark:bg-black relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm"
        >
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              whileHover="hover"
              className="p-10 bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors group relative"
            >
              <motion.div 
                variants={{
                  hover: { 
                    scale: 1.2,
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }
                }}
                className={`w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-8 transition-colors`}
              >
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </motion.div>
              <h3 className="text-2xl font-serif font-normal text-black dark:text-white mb-4">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.description}</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, category, image, tags, onClick, index }: { title: string, category: string, image: string, tags: string[], onClick: () => void, index: number }) => {
  const isLeft = index % 2 === 0;
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  // Stay centered (at offset) for 70% of the scroll journey, then fan out to 0 in the last 30%
  const x = useTransform(scrollYProgress, [0, 0.7, 1], [isLeft ? 60 : -60, isLeft ? 60 : -60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [0.9, 0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.7, 1], [isLeft ? -2 : 2, isLeft ? -2 : 2, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ x, opacity, scale, rotate, y }}
      whileHover={{ y: -12, scale: 1.01, transition: { duration: 0.4 } }}
      className="group cursor-pointer"
      onClick={onClick}
    >
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 mb-6 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
          <ArrowRight className="w-5 h-5 text-black -rotate-45" />
        </div>
      </div>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2">{category}</p>
        <h3 className="text-2xl font-serif font-normal text-black dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">{title}</h3>
      </div>
      <div className="flex gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[9px] font-mono text-zinc-500 uppercase">{tag}</span>
        ))}
      </div>
    </div>
  </motion.div>
  );
};

const Work = ({ onProjectClick }: { onProjectClick: (p: Project) => void }) => {
  const projects: Project[] = [
    {
      title: "Serendata Insight",
      category: "Enterprise SaaS",
      image: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773612997494-EMITZN383YFD1ZI1MSN6/image-asset.png?format=1500w",
      tags: ["SaaS", "Branding", "AI"],
      description: "Serendata Insight is a comprehensive SaaS platform designed to provide deep analytics and strategic insights for enterprise clients. The project involved creating a cohesive brand identity, mapping complex user flows, and crafting a high-performance UI that handles massive data sets with ease.",
      details: [
        { title: "Project Goal", content: "To build a robust, AI-enabled SaaS product that simplifies data analysis for non-technical stakeholders while providing advanced tools for data scientists." },
        { title: "Responsibilities", content: "Product Strategy, Brand Identity, UI/UX Design, Design System Architecture, and Front-end Oversight." },
        { title: "Outcome", content: "Launched successfully with 15+ enterprise clients in the first quarter, significantly reducing the time-to-insight for their strategic teams." }
      ],
      externalLink: "https://www.nikhannay.com/serendata-insight",
      visuals: [
        {
          type: 'video',
          url: "https://player.vimeo.com/video/1067984423?h=8f9a7b6c5d&autoplay=1&loop=1&background=1",
          caption: "Insight Product Walkthrough"
        },
        {
          type: 'image',
          url: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773612997494-EMITZN383YFD1ZI1MSN6/image-asset.png?format=1500w",
          caption: "Dashboard Overview & Data Visualization"
        }
      ]
    },
    {
      title: "The Learning Hub",
      category: "Product Design",
      image: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773613052086-D4L95UKDORG97YBVR61N/image-asset.jpg?format=1500w",
      tags: ["EdTech", "UX", "Mobile"],
      description: "A mobile-ready online learning platform called The Learning Hub, enabling employees to access resources from multiple sources, complete personal capability assessments and connect with mentors within the business.",
      details: [
        { title: "Project Goal", content: "Shift the companies workplace culture towards modern ways of working. Improve visibility of the companies learning offerings and encourage employees to take ownership of their own careers." },
        { title: "Responsibilities", content: "Lead Designer, Mobile UX Design, Gamification Strategy, and User Research." },
        { title: "Outcome", content: "Completion rates increased by 55% within the first 6 months of rollout, significantly improving the employment offering." }
      ],
      externalLink: "https://www.nikhannay.com/learning-hub",
      visuals: [
        {
          type: 'image',
          url: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773613052086-D4L95UKDORG97YBVR61N/image-asset.jpg?format=1500w",
          caption: "Mobile Interface & Learning Modules"
        }
      ]
    },
    {
      title: "Zenith Wellbeing",
      category: "Branding",
      image: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773613542750-CR6YHJZKYKT8T38PY4Y2/image-asset.png?format=1500w",
      tags: ["Identity", "Strategy", "Wellness"],
      description: "Develop a clear and distinctive brand identity with brand DNA for Australian wellbeing start-up Zenith. The brand aims to differentiate the business from its competition, representing an unrivalled yet discrete service.",
      details: [
        { title: "Project Goal", content: "Create a visual language that felt both premium and approachable, reflecting the brand's commitment to holistic health and honest, transparent service." },
        { title: "Responsibilities", content: "Lead Designer, Brand Strategy, Visual Identity, and Digital Presence." },
        { title: "Outcome", content: "A simplistic combination mark and detailed brand guidelines deck that set the company's vision and overall aesthetic." }
      ],
      externalLink: "https://www.nikhannay.com/zenith-wellbeing-lounge",
      visuals: [
        {
          type: 'image',
          url: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773613542750-CR6YHJZKYKT8T38PY4Y2/image-asset.png?format=1500w",
          caption: "Zenith Combination Mark & Brand DNA"
        }
      ]
    },
    {
      title: "Digital Platform",
      category: "Website",
      image: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773614988387-QOQYTT9YYGO258UDAM4P/image-asset.png?format=1500w",
      tags: ["Web", "SaaS", "Product"],
      description: "An easy-to-use Platform to help organisations manage stakeholders, impacts and actions in support of successful, scalable and seamless transformation. The website aimed to showcase the benefits of the Product.",
      details: [
        { title: "Project Goal", content: "Showcase the benefits of the Product, highlighting key features whilst introducing the supporting methodology." },
        { title: "Responsibilities", content: "Lead Designer, Creative Direction, Web Design, and Content Strategy." },
        { title: "Outcome", content: "A fully-responsive website outlining the SaaS products key features, business benefits and providing access to resources." }
      ],
      externalLink: "https://www.nikhannay.com/digital-platform",
      visuals: [
        {
          type: 'image',
          url: "https://images.squarespace-cdn.com/content/v1/54a68da3e4b0c309d017934f/1773614988387-QOQYTT9YYGO258UDAM4P/image-asset.png?format=1500w",
          caption: "Platform Marketing Site & Feature Highlights"
        }
      ]
    }
  ];

  return (
    <section id="work" className="pt-20 pb-40 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif font-light text-black dark:text-white mb-8 tracking-tight">Selected <br /><span className="text-accent italic">Artifacts</span></h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              A curated selection of work showcasing Enterprise SaaS products, scalable design systems, branding and strategic product thinking.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-widest">Trusted by 50+ teams</p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} index={i} onClick={() => onProjectClick(p)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="about" className="py-20 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-20"
        >
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-6xl font-serif font-light text-black dark:text-white mb-12 tracking-tight">The Philosophy</h2>
            <div className="space-y-8 text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
              <p>
                I lead design at the intersection of <span className="text-black dark:text-white font-normal">product, systems, and AI</span>, building teams, platforms, and experiences that scale.
              </p>
              <p>
                I’ve grown design functions from <span className="text-black dark:text-white font-normal">0→12</span>, defined product strategy alongside executive leadership, and delivered products that have scaled to enterprise adoption and successful exit.
              </p>
              <p>
                My focus is creating the conditions for teams to do their best work through strong systems, clear direction, and a deep understanding of how design drives business outcomes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <h4 className="text-black dark:text-white font-serif font-normal text-lg mb-3">Product Strategy</h4>
                  <p className="text-sm leading-relaxed">Partnering with leaders to define product vision and roadmap alignment.</p>
                </div>
                <div>
                  <h4 className="text-black dark:text-white font-serif font-normal text-lg mb-3">Design Systems</h4>
                  <p className="text-sm leading-relaxed">Building scalable AI-optimised design systems that enable teams to ship faster.</p>
                </div>
                <div>
                  <h4 className="text-black dark:text-white font-serif font-normal text-lg mb-3">Team Development</h4>
                  <p className="text-sm leading-relaxed">Mentoring designers and building collaborative design cultures.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div>
                <p className="text-5xl font-serif font-light text-black dark:text-white mb-2">15+</p>
                <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Years of Craft</p>
              </div>
              <div>
                <p className="text-5xl font-serif font-light text-black dark:text-white mb-2">50+</p>
                <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Products Shipped</p>
              </div>
              <div>
                <p className="text-5xl font-serif font-light text-black dark:text-white mb-2">7</p>
                <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">International Awards</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-sm">
              <h4 className="text-black dark:text-white font-serif font-normal text-lg mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                Core Values
              </h4>
              <div className="space-y-4">
                {[
                  { name: "Accountability", desc: "Take responsibility for everything you do." },
                  { name: "Be Daring", desc: "Progress requires courage and taking risks." },
                  { name: "Innovation", desc: "Improvement comes from curiosity." },
                  { name: "Honesty", desc: "Transparency builds trust and stronger teams." },
                  { name: "Positivity", desc: "Optimism helps you adapt and move forward." }
                ].map((value, i) => (
                  <div key={i} className="group cursor-default">
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{value.name}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-sm">
              <h4 className="text-black dark:text-white font-serif font-normal text-lg mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                Industries
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Automotive", "Construction", "Defence", "Energy", "Music", "Sport"].map(industry => (
                  <span key={industry} className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{industry}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    {
      quote: "Nik has the rare combination of strategic clarity and hands-on craft. He leads by example, sets a high bar for quality, and consistently turns complexity into simple, scalable solutions.",
      author: "Lance Thornswood",
      role: "Chief Design Officer, National Australia Bank (NAB)",
      avatar: "https://picsum.photos/seed/lance/100/100"
    },
    {
      quote: "What truly sets Nik apart is his strong leadership skills. He has a unique ability to inspire and motivate the team. He is a great communicator and always ensured that the design team was aligned with the project's objectives.",
      author: "Anthony Choren",
      role: "Senior Product Designer, Once For All (OFA)",
      avatar: "https://picsum.photos/seed/anthony/100/100"
    }
  ];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="py-32 bg-white dark:bg-black overflow-hidden border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="mb-16">
              <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.4em] mb-4">Testimonials</p>
              <h2 className="text-3xl font-serif font-light text-black dark:text-white tracking-tight">Voices of <span className="italic">Impact</span></h2>
            </div>

            <div className="relative flex items-center justify-center min-h-[380px] md:min-h-[320px]">
              {/* Left Peek Card */}
              <div className="absolute -left-[45%] md:-left-[60%] w-full opacity-[0.2] dark:opacity-[0.25] scale-[0.94] blur-[2px] pointer-events-none transition-all duration-500">
                <div className="bg-zinc-100 dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-[2rem] p-12 h-[320px]" />
              </div>
              
              {/* Right Peek Card */}
              <div className="absolute -right-[45%] md:-right-[60%] w-full opacity-[0.2] dark:opacity-[0.25] scale-[0.94] blur-[2px] pointer-events-none transition-all duration-500">
                <div className="bg-zinc-100 dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-[2rem] p-12 h-[320px]" />
              </div>

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40, rotate: 2, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, rotate: -2, scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8
                  }}
                  className="bg-zinc-50/50 dark:bg-zinc-900/40 border border-black/10 dark:border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden backdrop-blur-sm shadow-sm w-full max-w-[720px] min-h-[320px] flex flex-col justify-center"
                >
                  <div className="absolute top-8 left-8 opacity-[0.04] dark:opacity-[0.08]">
                    <Quote className="w-12 h-12 text-black dark:text-white" />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-lg md:text-xl font-serif font-light text-black dark:text-white leading-snug mb-8 italic">
                      "{testimonials[current].quote}"
                    </p>
                    
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-black/5 dark:border-white/5 grayscale hover:grayscale-0 transition-all duration-500 shrink-0">
                        <img 
                          src={testimonials[current].avatar} 
                          alt={testimonials[current].author} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="text-base font-serif font-normal text-black dark:text-white leading-tight">{testimonials[current].author}</h4>
                        <p className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-tight">{testimonials[current].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex flex-col items-center gap-8">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full overflow-hidden relative transition-all duration-500 ${current === i ? 'w-12 bg-black/5 dark:bg-white/10' : 'w-4 bg-black/5 dark:bg-white/10'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    {current === i && (
                      <motion.div
                        key={`progress-${i}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="absolute inset-0 bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-all active:scale-90"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-zinc-400" />
                </button>
                <button 
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-all active:scale-90"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-indigo-600/5 dark:bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-32">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-black dark:text-white mb-12 tracking-tighter"
            >
              Let's build <br />
              <span className="text-accent italic">the future.</span>
            </motion.h2>
            <a 
              href="mailto:nikhannay@gmail.com" 
              className="inline-flex items-center gap-3 px-8 py-4 border border-accent text-accent rounded-full text-xl font-serif font-normal hover:bg-accent hover:text-white transition-all shadow-xl shadow-accent/10 active:scale-95"
            >
              Email me
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>

          <div className="pt-20 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center">
              <a href="#" className="flex items-center group cursor-pointer">
                <span className="text-2xl font-sans font-bold tracking-tighter text-black dark:text-white transition-colors duration-300">
                  NikHannay<span className="text-accent">.</span>
                </span>
              </a>
            </div>
            
            <div className="flex gap-10">
              <a href="https://www.linkedin.com/in/nik-hannay-design/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>

            <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-700 uppercase tracking-[0.3em]">
              © 2026 Nik Hannay Ltd
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project | null, onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white dark:bg-zinc-950 w-full max-w-6xl max-h-full overflow-y-auto rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-black dark:text-white" />
          </button>
          
          <div className="aspect-[21/9] w-full overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row justify-between gap-12">
              <div className="flex-1">
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-4">{project.category}</p>
                <h2 className="text-4xl md:text-6xl font-serif font-light text-black dark:text-white mb-8 tracking-tight">{project.title}</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-12">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                  {project.details.map((detail, i) => (
                    <div key={i}>
                      <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">{detail.title}</h4>
                      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{detail.content}</p>
                    </div>
                  ))}
                </div>

                {/* Visual Case Study Section */}
                {project.visuals && project.visuals.length > 0 && (
                  <div className="space-y-20">
                    <div className="flex items-center gap-4 mb-12">
                      <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
                      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.3em]">Visual Case Study</h3>
                      <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
                    </div>

                    {project.visuals.map((visual, i) => (
                      <div key={i} className="space-y-6">
                        <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-inner">
                          {visual.type === 'video' ? (
                            <div className="aspect-video w-full bg-black">
                              <iframe 
                                src={visual.url} 
                                className="w-full h-full" 
                                frameBorder="0" 
                                allow="autoplay; fullscreen; picture-in-picture" 
                                allowFullScreen
                                title={visual.caption}
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <img 
                              src={visual.url} 
                              alt={visual.caption || project.title} 
                              className="w-full h-auto block"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          )}
                        </div>
                        {visual.caption && (
                          <p className="text-sm text-zinc-500 italic text-center font-serif tracking-wide">{visual.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-64 space-y-8">
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8 border-t border-black/5 dark:border-white/10">
                  <a 
                    href={project.externalLink || "#"} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group text-black dark:text-white font-medium"
                  >
                    View Full Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
    }
    return 'dark';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-white dark:bg-black text-zinc-600 dark:text-zinc-200 selection:bg-accent selection:text-white font-sans antialiased transition-colors duration-500`}>
        {/* Custom Cursor or Grid Overlay could go here */}
        
        <Navbar />
        <main>
          <Hero />
          <FeatureSection />
          <Work onProjectClick={setSelectedProject} />
          <Experience />
          <Testimonials />
        </main>
        <Footer />

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}
