import { motion } from "framer-motion";

const PowerSection = () => {
  return (
    <section
      className="relative py-32 flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/power-section.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-background/75" />

      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold gold-gradient-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Circle Does Not Seek.
          <br />
          It Selects.
        </motion.h2>
        <motion.p
          className="mt-8 text-lg text-foreground/70 font-body leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Influence is not built on noise. It is cultivated through silence,
          precision, and unshakable resolve. Those who enter the circle leave
          behind the ordinary.
        </motion.p>
        <motion.div
          className="mt-8 flex justify-center gap-8 text-sm tracking-[0.2em] uppercase text-primary/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span>Discipline</span>
          <span className="text-primary/30">•</span>
          <span>Elevation</span>
          <span className="text-primary/30">•</span>
          <span>Silence</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PowerSection;
