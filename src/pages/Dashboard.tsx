import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogOut, Shield, Eye, DollarSign, MessageSquare } from "lucide-react";

const entitlements = [
  { icon: Shield, title: "Strategic Insight Briefings" },
  { icon: Eye, title: "Measured Recognition Access" },
  { icon: DollarSign, title: "Financial Support Review Eligibility" },
  { icon: MessageSquare, title: "Direct Agent Communication Channel" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/images/sigil.png" alt="Illumi Echelon" className="w-7 h-7 sm:w-8 sm:h-8 opacity-60" />
          <span className="font-serif text-primary text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">Illumi Echelon</span>
        </div>
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm">
            <LogOut className="w-4 h-4 mr-1 sm:mr-2" /> Logout
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Welcome */}
        <motion.div
          className="p-5 sm:p-6 border border-border/40 rounded bg-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-serif text-base sm:text-lg">
            Welcome. You have been approved as a <span className="font-bold">Layperson</span>.
          </p>
          <p className="text-foreground/60 font-body mt-1 text-sm sm:text-base">
            Influence begins with discipline.
          </p>
        </motion.div>

        {/* Entitlements */}
        <motion.div
          className="mt-8 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-serif text-xl sm:text-2xl gold-gradient-text font-bold mb-5 sm:mb-6">Entitlements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {entitlements.map((item, i) => (
              <motion.div
                key={i}
                className="p-4 sm:p-5 border border-border/30 rounded bg-secondary/50 flex items-start gap-3 group hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <item.icon className="w-5 h-5 text-primary/50 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                <span className="text-foreground/80 font-body text-sm sm:text-base">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Silent Communications */}
        <motion.div
          className="mt-8 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-serif text-xl sm:text-2xl gold-gradient-text font-bold mb-5 sm:mb-6">
            Silent Communications
          </h2>
          <div className="border border-border/30 rounded bg-card min-h-[180px] sm:min-h-[200px] p-6 flex items-center justify-center">
            <p className="text-muted-foreground font-body italic text-sm sm:text-base">
              No communications at this time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
