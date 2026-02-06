import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, ChevronRight, Phone, Lock, 
  Pickaxe, Package, Building2, Search, Store, BarChart3, Award,
  Gem, Trees, Scissors, Truck, Shield
} from "lucide-react";
import madavolaLogo from "@/assets/madavola-logo.png";

const roleIconsOr: Record<string, React.ComponentType<{ className?: string }>> = {
  orpailleur: Pickaxe,
  collecteur: Package,
  commune: Building2,
  controleur: Search,
  comptoir: Store,
  dirigeant: BarChart3,
  com: Award,
};

const roleIconsPierre: Record<string, React.ComponentType<{ className?: string }>> = {
  exploitant_pierre: Gem,
  collecteur_pierre: Package,
  lapidaire: Scissors,
  exportateur_pierre: Truck,
  commune_pierre: Building2,
  controleur_pierre: Shield,
};

const roleIconsBois: Record<string, React.ComponentType<{ className?: string }>> = {
  exploitant_bois: Trees,
  collecteur_bois: Package,
  transformateur_bois: Scissors,
  exportateur_bois: Truck,
  commune_bois: Building2,
  controleur_bois: Shield,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, filiere, getDemoUsers } = useAuth();
  const { t } = useLanguage();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const filiereLabels = { or: t("filiereOr"), pierre: t("filierePierre"), bois: t("filiereBois") };
  const filiereColors = { or: "text-amber-500", pierre: "text-blue-500", bois: "text-emerald-500" };
  
  const roleIcons = filiere === "or" ? roleIconsOr : filiere === "pierre" ? roleIconsPierre : roleIconsBois;
  const demoUsers = getDemoUsers();

  const handleDemoLogin = (userId: string) => {
    login(userId);
    navigate("/dashboard");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const firstUser = demoUsers[0];
    if (firstUser) {
      login(firstUser.id);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Language Switch */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitch variant="minimal" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-slate-500 text-sm hover:text-slate-300 transition-colors mb-4 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("changeFiliere")}
          </button>
          
          <img src={madavolaLogo} alt="MADAVOLA" className="h-20 mx-auto mb-2" />
          
          <p className={`text-sm mt-1 font-medium ${filiereColors[filiere]}`}>
            {filiereLabels[filiere]}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-6">{t("login")}</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-sm text-slate-400">
                {t("phone")}
              </Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="034 12 345 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pin" className="text-sm text-slate-400">
                {t("pinCode")}
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="pin"
                  type="password"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold">
              {t("connect")}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <button
              onClick={() => navigate("/register")}
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              {t("register")}
            </button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              {t("forgotPassword")}
            </button>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Separator className="flex-1 bg-slate-700" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
              {t("demoAccounts")}
            </span>
            <Separator className="flex-1 bg-slate-700" />
          </div>

          <div className="grid grid-cols-1 gap-2">
            {demoUsers.map((user) => {
              const IconComponent = roleIcons[user.role] || Package;
              return (
                <motion.button
                  key={user.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDemoLogin(user.id)}
                  className="flex items-center gap-3 w-full p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-left group border border-transparent hover:border-slate-600"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.label}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-500 transition-colors shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
