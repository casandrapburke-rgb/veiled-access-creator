import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <motion.h1
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight gold-gradient-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Silence Is Power.
          <br />
          Power Is Earned.
        </motion.h1>

        <motion.div
          className="mt-10 space-y-3 text-lg md:text-xl font-body leading-relaxed text-foreground/80"
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
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link to="/apply">
            <Button variant="hero" size="lg">
              Request Entry
            </Button>
          </Link>
          <Link to="/access">
            <Button variant="heroOutline" size="lg">
              Member Access
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
