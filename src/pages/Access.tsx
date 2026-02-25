import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const Access = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 8 || code.length > 12) {
      setError("Access Code must be 8–12 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Access Denied.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6">
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/images/sigil.png" alt="Illumi Echelon" className="w-14 h-14 sm:w-16 sm:h-16 mx-auto sigil-glow mb-6" />
        
        <p className="text-primary/50 text-xs tracking-[0.3em] uppercase font-body mb-4">Illumi Echelon</p>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl gold-gradient-text font-bold">
          Enter the Circle
        </h1>

        <div className="mt-2 flex justify-center">
          <Lock className="w-4 h-4 text-primary/30" />
        </div>

        <form onSubmit={handleAuth} className="mt-8 sm:mt-10 space-y-5">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access Code"
            className="bg-secondary border-border text-foreground text-center tracking-[0.3em] text-lg placeholder:text-muted-foreground"
            maxLength={12}
          />

          {error && (
            <motion.p
              className="text-destructive text-sm tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <Button variant="hero" size="lg" type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Authenticate"}
          </Button>
        </form>

        <Link to="/" className="mt-8 block text-muted-foreground text-sm hover:text-primary transition-colors tracking-widest uppercase">
          ← Return
        </Link>
      </motion.div>
    </div>
  );
};

export default Access;
