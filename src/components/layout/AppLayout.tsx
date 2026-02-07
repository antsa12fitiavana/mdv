import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { 
  Home, FileText, Package, HandCoins, CreditCard, FileStack,
  ScanLine, Link2, ArrowRightLeft, LayoutDashboard, Users, ClipboardList,
  Activity, Settings, Search, History, AlertTriangle, Lock,
  Plane, MapPin, DollarSign, ShieldAlert, Menu, X, LogOut,
  Scissors, Truck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TranslationKey } from "@/lib/i18n";

interface MenuItem {
  labelKey: TranslationKey;
  icon: LucideIcon;
  path: string;
}

const menusOrByRole: Record<string, MenuItem[]> = {
  orpailleur: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "declareLot", icon: FileText, path: "/dashboard/declare" },
    { labelKey: "myLots", icon: Package, path: "/dashboard/lots" },
    { labelKey: "sell", icon: HandCoins, path: "/dashboard/sell" },
    { labelKey: "payments", icon: CreditCard, path: "/dashboard/payments" },
    { labelKey: "invoices", icon: FileStack, path: "/dashboard/invoices" },
  ],
  collecteur: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "scanBuy", icon: ScanLine, path: "/dashboard/scan-buy" },
    { labelKey: "myLots", icon: Package, path: "/dashboard/lots" },
    { labelKey: "consolidate", icon: Link2, path: "/dashboard/consolidate" },
    { labelKey: "sellToComptoir", icon: HandCoins, path: "/dashboard/sell" },
    { labelKey: "transactions", icon: ArrowRightLeft, path: "/dashboard/transactions" },
    { labelKey: "payments", icon: CreditCard, path: "/dashboard/payments" },
  ],
  commune: [
    { labelKey: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { labelKey: "registrations", icon: ClipboardList, path: "/dashboard/registrations" },
    { labelKey: "accounts", icon: Users, path: "/dashboard/accounts" },
    { labelKey: "payments", icon: DollarSign, path: "/dashboard/commune-payments" },
    { labelKey: "localActivity", icon: Activity, path: "/dashboard/activity" },
    { labelKey: "settings", icon: Settings, path: "/dashboard/settings" },
  ],
  controleur: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "scanControl", icon: Search, path: "/dashboard/scan-control" },
    { labelKey: "history", icon: History, path: "/dashboard/history" },
    { labelKey: "violations", icon: AlertTriangle, path: "/dashboard/violations" },
    { labelKey: "seizures", icon: Lock, path: "/dashboard/seizures" },
  ],
  comptoir: [
    { labelKey: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { labelKey: "purchases", icon: ScanLine, path: "/dashboard/purchases" },
    { labelKey: "stock", icon: Package, path: "/dashboard/lots" },
    { labelKey: "consolidate", icon: Link2, path: "/dashboard/consolidate" },
    { labelKey: "exports", icon: Plane, path: "/dashboard/exports" },
    { labelKey: "invoices", icon: FileStack, path: "/dashboard/invoices" },
    { labelKey: "payments", icon: CreditCard, path: "/dashboard/payments" },
  ],
  dirigeant: [
    { labelKey: "nationalView", icon: MapPin, path: "/dashboard" },
    { labelKey: "regions", icon: MapPin, path: "/dashboard/regions" },
    { labelKey: "revenue", icon: DollarSign, path: "/dashboard/revenue" },
    { labelKey: "exports", icon: Plane, path: "/dashboard/exports" },
    { labelKey: "risks", icon: ShieldAlert, path: "/dashboard/risks" },
  ],
  com: [
    { labelKey: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { labelKey: "accounts", icon: Users, path: "/dashboard/actors" },
    { labelKey: "registrations", icon: ClipboardList, path: "/dashboard/validations" },
    { labelKey: "exports", icon: Plane, path: "/dashboard/exports" },
    { labelKey: "compliance", icon: Lock, path: "/dashboard/compliance" },
  ],
};

const menusPierreByRole: Record<string, MenuItem[]> = {
  exploitant_pierre: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "declareProduction", icon: FileText, path: "/dashboard/declare" },
    { labelKey: "myLots", icon: Package, path: "/dashboard/lots" },
    { labelKey: "sell", icon: HandCoins, path: "/dashboard/sell" },
    { labelKey: "payments", icon: CreditCard, path: "/dashboard/payments" },
  ],
  collecteur_pierre: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "scanBuy", icon: ScanLine, path: "/dashboard/scan-buy" },
    { labelKey: "myLots", icon: Package, path: "/dashboard/lots" },
    { labelKey: "consolidate", icon: Link2, path: "/dashboard/consolidate" },
    { labelKey: "sell", icon: HandCoins, path: "/dashboard/sell" },
    { labelKey: "transactions", icon: ArrowRightLeft, path: "/dashboard/transactions" },
  ],
  lapidaire: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "purchases", icon: ScanLine, path: "/dashboard/scan-buy" },
    { labelKey: "stock", icon: Package, path: "/dashboard/lots" },
    { labelKey: "transform", icon: Scissors, path: "/dashboard/transform" },
    { labelKey: "sell", icon: HandCoins, path: "/dashboard/sell" },
  ],
  exportateur_pierre: [
    { labelKey: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { labelKey: "purchases", icon: ScanLine, path: "/dashboard/purchases" },
    { labelKey: "stock", icon: Package, path: "/dashboard/lots" },
    { labelKey: "exports", icon: Plane, path: "/dashboard/exports" },
    { labelKey: "payments", icon: CreditCard, path: "/dashboard/payments" },
  ],
  commune_pierre: [
    { labelKey: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { labelKey: "registrations", icon: ClipboardList, path: "/dashboard/registrations" },
    { labelKey: "accounts", icon: Users, path: "/dashboard/accounts" },
    { labelKey: "payments", icon: DollarSign, path: "/dashboard/commune-payments" },
  ],
  controleur_pierre: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "scanControl", icon: Search, path: "/dashboard/scan-control" },
    { labelKey: "history", icon: History, path: "/dashboard/history" },
    { labelKey: "violations", icon: AlertTriangle, path: "/dashboard/violations" },
  ],
};

const menusBoisByRole: Record<string, MenuItem[]> = {
  exploitant_bois: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "declareLot", icon: FileText, path: "/dashboard/declare" },
    { labelKey: "myLots", icon: Package, path: "/dashboard/lots" },
    { labelKey: "sell", icon: HandCoins, path: "/dashboard/sell" },
    { labelKey: "payments", icon: CreditCard, path: "/dashboard/payments" },
  ],
  collecteur_bois: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "scanBuy", icon: ScanLine, path: "/dashboard/scan-buy" },
    { labelKey: "stock", icon: Package, path: "/dashboard/lots" },
    { labelKey: "transport", icon: Truck, path: "/dashboard/transport" },
    { labelKey: "sell", icon: HandCoins, path: "/dashboard/sell" },
    { labelKey: "transactions", icon: ArrowRightLeft, path: "/dashboard/transactions" },
  ],
  transformateur_bois: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "purchases", icon: ScanLine, path: "/dashboard/scan-buy" },
    { labelKey: "stock", icon: Package, path: "/dashboard/lots" },
    { labelKey: "transform", icon: Scissors, path: "/dashboard/transform" },
    { labelKey: "sell", icon: HandCoins, path: "/dashboard/sell" },
  ],
  exportateur_bois: [
    { labelKey: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { labelKey: "purchases", icon: ScanLine, path: "/dashboard/purchases" },
    { labelKey: "stock", icon: Package, path: "/dashboard/lots" },
    { labelKey: "exports", icon: Plane, path: "/dashboard/exports" },
  ],
  commune_bois: [
    { labelKey: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { labelKey: "registrations", icon: ClipboardList, path: "/dashboard/registrations" },
    { labelKey: "accounts", icon: Users, path: "/dashboard/accounts" },
    { labelKey: "payments", icon: DollarSign, path: "/dashboard/commune-payments" },
  ],
  controleur_bois: [
    { labelKey: "home", icon: Home, path: "/dashboard" },
    { labelKey: "scanControl", icon: Search, path: "/dashboard/scan-control" },
    { labelKey: "history", icon: History, path: "/dashboard/history" },
    { labelKey: "violations", icon: AlertTriangle, path: "/dashboard/violations" },
  ],
};

export default function AppLayout() {
  const { user, logout, filiere } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const menusByFiliere = filiere === "or" ? menusOrByRole : filiere === "pierre" ? menusPierreByRole : menusBoisByRole;
  const menu = menusByFiliere[user.role] || menusByFiliere[Object.keys(menusByFiliere)[0]];
  
  const filiereLabels: Record<string, string> = { or: t("filiereOr"), pierre: t("filierePierre"), bois: t("filiereBois") };
  const filiereColors: Record<string, string> = { or: "text-gold", pierre: "text-sapphire", bois: "text-emerald-brand" };
  const statusColors: Record<string, string> = { active: "bg-accent text-accent-foreground", pending: "bg-gold/20 text-gold-dark" };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Flag stripe */}
      <div className="h-1 mada-stripe" aria-hidden="true" />

      {/* Header */}
      <header className="bg-navy sticky top-0 z-40">
        <div className="flex items-center h-14 px-4 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gold">MADAVOLA</span>
            <span className={`text-xs font-medium ${filiereColors[filiere]} hidden sm:inline`}>
              {filiereLabels[filiere]}
            </span>
          </div>

          <div className="flex-1" />

          <LanguageSwitch variant="minimal" />
          
          <span className={`text-xs px-2 py-1 rounded ${statusColors[user.status || "active"]} font-medium`}>
            {user.status === "active" ? t("active") : t("pending")}
          </span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-navy flex flex-col transform transition-transform duration-200 lg:relative lg:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          style={{ top: "calc(0.25rem + 3.5rem)" }}
          aria-label="Navigation principale"
        >
          <nav className="flex-1 overflow-y-auto py-4 px-3" role="navigation">
            <ul className="space-y-1" role="list">
              {menu?.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring
                        ${isActive
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span>{t(item.labelKey)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-md bg-sidebar-accent flex items-center justify-center text-sm font-semibold text-sidebar-foreground flex-shrink-0">
                {user.prenom?.[0] || user.nom[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.prenom ? `${user.prenom} ${user.nom}` : user.nom}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{user.commune}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="w-full flex items-center gap-2 text-left text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              {t("logout")}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
