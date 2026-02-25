import { motion } from "framer-motion";

const SigilSection = () => {
  return (
    <section className="py-24 sm:py-32 flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Radial glow behind sigil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <motion.img
        src="/images/sigil.png"
        alt="Illumi Echelon Sigil"
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 sigil-glow relative z-10"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.p
        className="mt-8 sm:mt-10 font-serif text-lg sm:text-xl md:text-2xl text-primary tracking-[0.3em] uppercase relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Illumi Echelon
      </motion.p>
      <motion.div
        className="mt-4 w-24 h-[1px] bg-primary/40 relative z-10"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.p
        className="mt-6 text-muted-foreground font-body text-sm sm:text-base tracking-widest uppercase relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Order of the Silent Ascent
      </motion.p>
    </section>
  );
};

export default SigilSection;
