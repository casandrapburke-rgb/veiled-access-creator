import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="py-12 sm:py-16 bg-background border-t border-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src="/images/sigil.png" alt="Illumi Echelon" className="w-8 h-8 opacity-30" />
            <span className="font-serif text-primary/40 text-sm tracking-[0.2em] uppercase">Illumi Echelon</span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground tracking-widest uppercase">
            <Link to="/apply" className="hover:text-primary transition-colors">Apply</Link>
            <Link to="/access" className="hover:text-primary transition-colors">Access</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground tracking-[0.15em] uppercase font-body">
            Those who know do not speak. Those who speak do not know.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Illumi Echelon — All communications are monitored.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
