import { motion } from "framer-motion";
import { Shield, Eye, Crown } from "lucide-react";

const pillars = [
  { icon: Shield, label: "Discipline", desc: "The foundation of all elevation." },
  { icon: Eye, label: "Silence", desc: "Those who speak do not know." },
  { icon: Crown, label: "Elevation", desc: "Reserved for the resolute." },
];

const PowerSection = () => {
  return (
    <section
      className="relative py-24 sm:py-32 flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/power-section.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient-text text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Echelon Does Not Seek.
          <br />
          It Selects.
        </motion.h2>
        <motion.p
          className="mt-6 sm:mt-8 text-base sm:text-lg text-foreground/70 font-body leading-relaxed max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Influence is not built on noise. It is cultivated through silence,
          precision, and unshakable resolve. Those who enter the Echelon leave
          behind the ordinary.
        </motion.p>

        {/* Pillars grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              className="p-6 sm:p-8 border border-border/30 rounded bg-card/50 backdrop-blur-sm text-center group hover:border-primary/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <pillar.icon className="w-8 h-8 text-primary/60 mx-auto mb-4 group-hover:text-primary transition-colors" />
              <h3 className="font-serif text-lg sm:text-xl text-primary tracking-widest uppercase">{pillar.label}</h3>
              <p className="mt-2 text-sm text-foreground/50 font-body">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerSection;
