import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const entitlements = [
  "Strategic Insight Briefings",
  "Measured Recognition Access",
  "Financial Support Review Eligibility",
  "Direct Agent Communication Channel",
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/sigil.png" alt="Sigil" className="w-8 h-8 opacity-60" />
          <span className="font-serif text-primary text-sm tracking-[0.2em] uppercase">The Circle</span>
        </div>
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Welcome */}
        <motion.div
          className="p-6 border border-border/40 rounded bg-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-serif text-lg">
            Welcome. You have been approved as a <span className="font-bold">Layperson</span>.
          </p>
          <p className="text-foreground/60 font-body mt-1">
            Influence begins with discipline.
          </p>
        </motion.div>

        {/* Entitlements */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-serif text-2xl gold-gradient-text font-bold mb-6">Entitlements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entitlements.map((item, i) => (
              <div
                key={i}
                className="p-4 border border-border/30 rounded bg-secondary/50 text-foreground/80 font-body"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Silent Communications */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-serif text-2xl gold-gradient-text font-bold mb-6">
            Silent Communications
          </h2>
          <div className="border border-border/30 rounded bg-card min-h-[200px] p-6 flex items-center justify-center">
            <p className="text-muted-foreground font-body italic">
              No communications at this time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
