import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs sm:text-sm tracking-[0.2em] uppercase font-body">
            <img src="/images/sigil.png" alt="" className="w-4 h-4 opacity-70" />
            Illumi Echelon
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight gold-gradient-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Silence Is Power.
          <br />
          Power Is Earned.
        </motion.h1>

        <motion.div
          className="mt-8 sm:mt-10 space-y-2 sm:space-y-3 text-base sm:text-lg md:text-xl font-body leading-relaxed text-foreground/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p>Some live loudly and remain invisible.</p>
          <p>Others move in silence and reshape destiny.</p>
          <p>Wealth is not granted. Influence is not random.</p>
          <p className="text-primary font-semibold">
            Those who understand discipline understand elevation.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link to="/apply">
            <Button variant="hero" size="lg" className="w-full sm:w-auto px-10">
              Request Entry
            </Button>
          </Link>
          <Link to="/access">
            <Button variant="heroOutline" size="lg" className="w-full sm:w-auto px-10">
              Member Access
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
