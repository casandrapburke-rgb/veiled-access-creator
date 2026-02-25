import { motion } from "framer-motion";

const stats = [
  { value: "147", label: "Nations Represented" },
  { value: "12K+", label: "Silent Members" },
  { value: "2009", label: "Year Established" },
  { value: "∞", label: "Influence" },
];

const StatsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-card border-y border-border/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl gold-gradient-text font-bold">{stat.value}</p>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground tracking-widest uppercase font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
