import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import SigilSection from "@/components/SigilSection";
import PowerSection from "@/components/PowerSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <HeroSection />
        <SigilSection />
        <PowerSection />
        <SiteFooter />
      </div>
    </>
  );
};

export default Index;
