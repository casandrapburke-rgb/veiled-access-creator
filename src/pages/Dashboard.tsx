import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield, Eye, DollarSign, MessageSquare, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

interface Message {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

const entitlements = [
  { icon: Shield, title: "Strategic Insight Briefings" },
  { icon: Eye, title: "Measured Recognition Access" },
  { icon: DollarSign, title: "Financial Support Review Eligibility" },
  { icon: MessageSquare, title: "Direct Agent Communication Channel" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const accessKey = sessionStorage.getItem("ie_access_key");
  const role = sessionStorage.getItem("ie_role") || "layperson";
  const userName = sessionStorage.getItem("ie_user_name") || "Member";

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("ie_access_key");
    sessionStorage.removeItem("ie_role");
    sessionStorage.removeItem("ie_user_name");
    sessionStorage.removeItem("ie_last_activity");
    navigate("/access");
  }, [navigate]);

  // Session timeout
  useEffect(() => {
    if (!accessKey) {
      navigate("/access");
      return;
    }

    const checkTimeout = () => {
      const lastActivity = parseInt(sessionStorage.getItem("ie_last_activity") || "0");
      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        handleLogout();
      }
    };

    const resetActivity = () => {
      sessionStorage.setItem("ie_last_activity", Date.now().toString());
    };

    resetActivity();
    const interval = setInterval(checkTimeout, 30000);
    window.addEventListener("mousemove", resetActivity);
    window.addEventListener("keydown", resetActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetActivity);
      window.removeEventListener("keydown", resetActivity);
    };
  }, [accessKey, navigate, handleLogout]);

  // Fetch messages
  useEffect(() => {
    if (!accessKey) return;
    const fetchMessages = async () => {
      try {
        const { data } = await supabase.functions.invoke("get-messages", {
          body: { access_key: accessKey },
        });
        if (data?.messages) setMessages(data.messages);
      } catch {
        // silent
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [accessKey]);

  if (!accessKey) return null;

  const roleLabel = role === "agent" ? "Agent" : "Layperson";

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/images/sigil.png" alt="Illumi Echelon" className="w-7 h-7 sm:w-8 sm:h-8 opacity-60" />
          <span className="font-serif text-primary text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">Illumi Echelon</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground text-xs sm:text-sm">
          <LogOut className="w-4 h-4 mr-1 sm:mr-2" /> Logout
        </Button>
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
            Welcome, <span className="font-bold">{userName}</span>. Your access has been authenticated.
          </p>
          <p className="text-foreground/60 font-body mt-1 text-sm sm:text-base">
            You have been approved as a <span className="text-primary font-semibold">{roleLabel}</span>. Influence begins with discipline.
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
          <div className="border border-border/30 rounded bg-card min-h-[180px] sm:min-h-[200px]">
            {loadingMessages ? (
              <div className="p-6 flex items-center justify-center h-[180px]">
                <p className="text-muted-foreground font-body italic text-sm animate-pulse">Loading...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-6 flex items-center justify-center h-[180px]">
                <p className="text-muted-foreground font-body italic text-sm sm:text-base">
                  No communications at this time.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/20">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-body">
                        {new Date(msg.created_at).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-primary font-serif text-sm sm:text-base font-semibold">{msg.title}</h3>
                    <p className="text-foreground/70 font-body text-sm mt-1">{msg.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
