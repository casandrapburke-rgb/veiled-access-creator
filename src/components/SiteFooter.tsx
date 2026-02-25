const SiteFooter = () => {
  return (
    <footer className="py-16 bg-background border-t border-border/30">
      <div className="max-w-4xl mx-auto text-center px-6">
        <img
          src="/images/sigil.png"
          alt="Sigil"
          className="w-10 h-10 mx-auto opacity-30"
        />
        <p className="mt-6 text-sm text-muted-foreground tracking-[0.15em] uppercase">
          Those who know do not speak. Those who speak do not know.
        </p>
        <p className="mt-4 text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} — All communications are monitored.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
