import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Before the Echelon, I was searching. Now, I understand that silence is the ultimate strategy.",
    author: "Member #4,291",
    role: "Layperson",
  },
  {
    quote: "Discipline opened doors that ambition alone never could. The elevation is real.",
    author: "Member #1,087",
    role: "Agent",
  },
  {
    quote: "You don't find the Echelon. It finds you — when you're ready.",
    author: "Member #7,530",
    role: "Layperson",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl gold-gradient-text font-bold text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Voices from the Circle
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="p-6 sm:p-8 border border-border/30 rounded bg-card/50 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Quote className="w-6 h-6 text-primary/30 mb-4" />
              <p className="text-foreground/70 font-body text-base sm:text-lg leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="mt-6 pt-4 border-t border-border/20">
                <p className="text-primary text-sm font-serif">{t.author}</p>
                <p className="text-muted-foreground text-xs tracking-widest uppercase">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
