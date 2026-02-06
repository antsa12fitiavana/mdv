import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, FileText, Package, HandCoins, CreditCard, FileStack,
  ScanLine, Link2, ArrowRightLeft, LayoutDashboard, Users, ClipboardList,
  Activity, Settings, Search, History, AlertTriangle, Lock,
  Plane, MapPin, DollarSign, ShieldAlert, Menu, ChevronLeft, LogOut,
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    navigate("/login");
    return null;
  }

  const menusByFiliere = filiere === "or" ? menusOrByRole : filiere === "pierre" ? menusPierreByRole : menusBoisByRole;
  const menu = menusByFiliere[user.role] || menusByFiliere[Object.keys(menusByFiliere)[0]];
  
  const filiereLabels: Record<string, string> = { or: t("filiereOr"), pierre: t("filierePierre"), bois: t("filiereBois") };
  const filiereColors: Record<string, string> = { or: "text-amber-500", pierre: "text-blue-500", bois: "text-emerald-500" };
  const filiereBgColors: Record<string, string> = { or: "bg-amber-500", pierre: "bg-blue-500", bois: "bg-emerald-500" };

  return (
    <div className="h-screen bg-slate-50 flex w-full overflow-hidden">
      {/* Malagasy flag stripe */}
      <div className="fixed top-0 left-0 right-0 h-1 mada-stripe z-50" />

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="w-64 bg-slate-900 text-slate-100 flex flex-col fixed inset-y-0 left-0 z-30 lg:relative pt-1"
          >
            <div className="p-5 border-b border-slate-800">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-1">
                MADAVOLA
              </h1>
              <p className={`text-xs font-medium ${filiereColors[filiere]}`}>
                {filiereLabels[filiere]}
              </p>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {menu?.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                      ${isActive
                        ? `bg-slate-800 ${filiereColors[filiere]} font-medium`
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {t(item.labelKey)}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-full ${filiereBgColors[filiere]} flex items-center justify-center text-sm font-bold text-white`}>
                  {user.prenom?.[0] || user.nom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">
                    {user.prenom ? `${user.prenom} ${user.nom}` : user.nom}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">{user.label}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="w-full flex items-center gap-2 text-left text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("logout")}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className={`flex-1 flex flex-col h-screen overflow-hidden pt-1 ${sidebarOpen ? 'lg:ml-0' : ''}`}>
        <header className="h-14 border-b border-slate-200 flex items-center px-4 gap-3 bg-white shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1" />
          <LanguageSwitch variant="minimal" />
          <span className={`text-xs px-2 py-1 rounded-full ${user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"} font-medium`}>
            {user.status === "active" ? t("active") : t("pending")}
          </span>
          <span className="text-xs text-slate-500">{user.commune}</span>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
