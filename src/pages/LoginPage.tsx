import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, ChevronRight, Phone, Lock, 
  Pickaxe, Package, Building2, Search, Store, BarChart3, Award,
  Gem, Trees, Scissors, Truck, Shield
} from "lucide-react";

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

  const filiereLabels: Record<string, string> = { or: t("filiereOr"), pierre: t("filierePierre"), bois: t("filiereBois") };
  const filiereColors: Record<string, string> = { or: "text-gold", pierre: "text-sapphire", bois: "text-emerald-brand" };
  
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-navy">
        <div className="h-1 mada-stripe" aria-hidden="true" />
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gold">MADAVOLA</span>
            <span className={`text-sm font-medium ${filiereColors[filiere]}`}>
              {filiereLabels[filiere]}
            </span>
          </div>
          <LanguageSwitch variant="minimal" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t("changeFiliere")}
          </button>

          {/* Login Form Card */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-gov mb-6">
            <h1 className="text-xl font-bold text-foreground mb-6">{t("login")}</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  {t("phone")}
                </Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="034 12 345 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    aria-describedby="phone-hint"
                  />
                </div>
                <p id="phone-hint" className="sr-only">Entrez votre numéro de téléphone</p>
              </div>
              
              <div>
                <Label htmlFor="pin" className="text-sm font-medium text-foreground">
                  {t("pinCode")}
                </Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="pin"
                    type="password"
                    placeholder="••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="pl-10"
                    aria-describedby="pin-hint"
                  />
                </div>
                <p id="pin-hint" className="sr-only">Entrez votre code PIN à 4 chiffres</p>
              </div>
              
              <Button type="submit" className="w-full">
                {t("connect")}
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                onClick={() => navigate("/register")}
                className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {t("register")}
              </button>
              <button className="text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                {t("forgotPassword")}
              </button>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-gov">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              {t("demoAccounts")}
            </h2>

            <ul className="space-y-2" role="list" aria-label="Liste des comptes de démonstration">
              {demoUsers.map((user) => {
                const IconComponent = roleIcons[user.role] || Package;
                return (
                  <li key={user.id}>
                    <button
                      onClick={() => handleDemoLogin(user.id)}
                      className="flex items-center gap-3 w-full p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Se connecter en tant que ${user.label}`}
                    >
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.label}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy py-4">
        <div className="h-1 mada-stripe" aria-hidden="true" />
      </footer>
    </div>
  );
}
