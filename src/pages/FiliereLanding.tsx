import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Gem, Trees, Coins, ArrowRight } from "lucide-react";
import type { Filiere } from "@/data/mockData";

const filiereConfigs = {
  or: {
    icon: Coins,
    colorClass: "bg-gold text-white",
    borderClass: "border-gold/30 hover:border-gold/60",
  },
  pierre: {
    icon: Gem,
    colorClass: "bg-sapphire text-white",
    borderClass: "border-sapphire/30 hover:border-sapphire/60",
  },
  bois: {
    icon: Trees,
    colorClass: "bg-emerald-brand text-white",
    borderClass: "border-emerald-brand/30 hover:border-emerald-brand/60",
  },
};

export default function FiliereLanding() {
  const navigate = useNavigate();
  const { setFiliere } = useAuth();
  const { t } = useLanguage();

  const filieres: { id: Filiere; labelKey: "filiereOr" | "filierePierre" | "filiereBois"; descKey: "filiereOrDesc" | "filierePierreDesc" | "filiereBoisDesc" }[] = [
    { id: "or", labelKey: "filiereOr", descKey: "filiereOrDesc" },
    { id: "pierre", labelKey: "filierePierre", descKey: "filierePierreDesc" },
    { id: "bois", labelKey: "filiereBois", descKey: "filiereBoisDesc" },
  ];

  const handleSelect = (f: Filiere) => {
    setFiliere(f);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with flag stripe */}
      <header className="bg-navy">
        <div className="h-1 mada-stripe" aria-hidden="true" />
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gold">MADAVOLA</span>
          </div>
          <LanguageSwitch variant="minimal" />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-secondary mb-4">
            <div className="flex gap-1" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-mada-green" />
              <span className="w-2 h-2 rounded-full bg-white border border-border" />
              <span className="w-2 h-2 rounded-full bg-mada-red" />
            </div>
            <span className="text-sm font-medium text-foreground">{t("nationalPlatform")}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("tagline")}
          </h1>
          
          <p className="text-muted-foreground leading-relaxed">
            Système national de traçabilité des ressources naturelles de Madagascar
          </p>
        </div>

        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
          {t("selectFiliere")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
          {filieres.map((f) => {
            const config = filiereConfigs[f.id];
            const Icon = config.icon;
            
            return (
              <button
                key={f.id}
                onClick={() => handleSelect(f.id)}
                className={`group relative bg-card border-2 ${config.borderClass} rounded-lg p-6 text-left transition-all duration-200 hover:shadow-gov-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                aria-label={`${t("access")} ${t(f.labelKey)}`}
              >
                <div className={`w-12 h-12 rounded-lg ${config.colorClass} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {t(f.labelKey)}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t(f.descKey)}
                </p>
                
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  {t("access")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-12 text-xs text-muted-foreground text-center max-w-md">
          {t("ministry")}
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-navy py-4">
        <div className="h-1 mada-stripe" aria-hidden="true" />
      </footer>
    </div>
  );
}
