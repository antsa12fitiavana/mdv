import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Gem, Trees, Coins, ArrowRight } from "lucide-react";
import type { Filiere } from "@/data/mockData";
import madavolaLogo from "@/assets/madavola-logo.png";

const filiereConfigs = {
  or: {
    icon: Coins,
    gradient: "from-amber-500 to-yellow-600",
    hoverGlow: "group-hover:shadow-amber-500/25",
  },
  pierre: {
    icon: Gem,
    gradient: "from-blue-500 to-indigo-600",
    hoverGlow: "group-hover:shadow-blue-500/25",
  },
  bois: {
    icon: Trees,
    gradient: "from-emerald-600 to-green-700",
    hoverGlow: "group-hover:shadow-emerald-500/25",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Malagasy flag stripe at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 mada-stripe" />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Language Switch */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitch variant="minimal" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        {/* Logo */}
        <motion.img
          src={madavolaLogo}
          alt="MADAVOLA"
          className="h-32 md:h-40 mx-auto mb-6 object-contain"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-mada-green" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-mada-red" />
          </div>
          <span className="text-amber-400 text-sm font-medium tracking-wide">{t("nationalPlatform")}</span>
        </div>
        
        <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t("tagline")}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-8 relative z-10"
      >
        {t("selectFiliere")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full relative z-10">
        {filieres.map((f, i) => {
          const config = filiereConfigs[f.id];
          const Icon = config.icon;
          
          return (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(f.id)}
              className={`group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-left cursor-pointer transition-all duration-300 hover:border-slate-600 hover:shadow-2xl ${config.hoverGlow}`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                {t(f.labelKey)}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t(f.descKey)}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                {t("access")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-16 text-slate-600 text-xs text-center relative z-10"
      >
        {t("ministry")}
      </motion.p>

      {/* Malagasy flag stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 mada-stripe" />
    </div>
  );
}
