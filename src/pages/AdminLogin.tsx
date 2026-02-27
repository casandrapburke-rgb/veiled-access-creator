import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("validate-admin-key", {
        body: { admin_key: key.trim() },
      });

      if (fnError || !data?.success) {
        setError(data?.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("ie_admin_authenticated", "true");
      navigate("/admin");
    } catch {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Shield className="w-12 h-12 text-primary/60 mx-auto mb-6" />
        <h1 className="font-serif text-2xl sm:text-3xl gold-gradient-text font-bold mb-2">
          Administration
        </h1>
        <p className="text-muted-foreground text-sm font-body mb-8">Authorized personnel only</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Admin Key"
            className="bg-secondary border-border text-foreground"
            required
          />

          {error && (
            <motion.p className="text-destructive text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {error}
            </motion.p>
          )}

          <Button variant="hero" size="lg" type="submit" className="w-full" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <Link to="/" className="mt-8 block text-muted-foreground text-sm hover:text-primary transition-colors tracking-widest uppercase">
          ← Return
        </Link>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
