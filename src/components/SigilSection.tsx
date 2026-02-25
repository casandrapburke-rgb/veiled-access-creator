import { motion } from "framer-motion";

const SigilSection = () => {
  return (
    <section className="py-32 flex flex-col items-center justify-center bg-background">
      <motion.img
        src="/images/sigil.png"
        alt="The Order Sigil"
        className="w-40 h-40 md:w-56 md:h-56 sigil-glow"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.p
        className="mt-10 font-serif text-xl md:text-2xl text-primary tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Ordo Silentium
      </motion.p>
      <motion.div
        className="mt-4 w-24 h-[1px] bg-primary/40"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </section>
  );
};

export default SigilSection;
