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
import madavolaLogo from "@/assets/madavola-logo.png";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

const menusOrByRole: Record<string, MenuItem[]> = {
  orpailleur: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Déclarer un lot", icon: FileText, path: "/dashboard/declare" },
    { label: "Mes lots", icon: Package, path: "/dashboard/lots" },
    { label: "Vendre", icon: HandCoins, path: "/dashboard/sell" },
    { label: "Paiements", icon: CreditCard, path: "/dashboard/payments" },
    { label: "Factures", icon: FileStack, path: "/dashboard/invoices" },
  ],
  collecteur: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Scanner / Acheter", icon: ScanLine, path: "/dashboard/scan-buy" },
    { label: "Mes lots", icon: Package, path: "/dashboard/lots" },
    { label: "Consolider lots", icon: Link2, path: "/dashboard/consolidate" },
    { label: "Vendre au comptoir", icon: HandCoins, path: "/dashboard/sell" },
    { label: "Transactions", icon: ArrowRightLeft, path: "/dashboard/transactions" },
    { label: "Paiements", icon: CreditCard, path: "/dashboard/payments" },
  ],
  commune: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Demandes inscription", icon: ClipboardList, path: "/dashboard/registrations" },
    { label: "Comptes", icon: Users, path: "/dashboard/accounts" },
    { label: "Paiements communaux", icon: DollarSign, path: "/dashboard/commune-payments" },
    { label: "Activité locale", icon: Activity, path: "/dashboard/activity" },
    { label: "Paramètres", icon: Settings, path: "/dashboard/settings" },
  ],
  controleur: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Scanner contrôle", icon: Search, path: "/dashboard/scan-control" },
    { label: "Historique contrôles", icon: History, path: "/dashboard/history" },
    { label: "PV / Infractions", icon: AlertTriangle, path: "/dashboard/violations" },
    { label: "Saisies", icon: Lock, path: "/dashboard/seizures" },
  ],
  comptoir: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Achats", icon: ScanLine, path: "/dashboard/purchases" },
    { label: "Stock lots", icon: Package, path: "/dashboard/lots" },
    { label: "Consolidation export", icon: Link2, path: "/dashboard/consolidate" },
    { label: "Dossiers export", icon: Plane, path: "/dashboard/exports" },
    { label: "Factures", icon: FileStack, path: "/dashboard/invoices" },
    { label: "Paiements", icon: CreditCard, path: "/dashboard/payments" },
  ],
  dirigeant: [
    { label: "Vue nationale", icon: MapPin, path: "/dashboard" },
    { label: "Régions / Districts", icon: MapPin, path: "/dashboard/regions" },
    { label: "Recettes", icon: DollarSign, path: "/dashboard/revenue" },
    { label: "Exportations", icon: Plane, path: "/dashboard/exports" },
    { label: "Risques & anomalies", icon: ShieldAlert, path: "/dashboard/risks" },
  ],
  com: [
    { label: "Dashboard COM", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Acteurs OR", icon: Users, path: "/dashboard/actors" },
    { label: "Validations", icon: ClipboardList, path: "/dashboard/validations" },
    { label: "Dossiers export", icon: Plane, path: "/dashboard/exports" },
    { label: "Conformité", icon: Lock, path: "/dashboard/compliance" },
  ],
};

const menusPierreByRole: Record<string, MenuItem[]> = {
  exploitant_pierre: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Déclarer production", icon: FileText, path: "/dashboard/declare" },
    { label: "Mes lots", icon: Package, path: "/dashboard/lots" },
    { label: "Vendre", icon: HandCoins, path: "/dashboard/sell" },
    { label: "Paiements", icon: CreditCard, path: "/dashboard/payments" },
  ],
  collecteur_pierre: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Scanner / Acheter", icon: ScanLine, path: "/dashboard/scan-buy" },
    { label: "Mes lots", icon: Package, path: "/dashboard/lots" },
    { label: "Regrouper", icon: Link2, path: "/dashboard/consolidate" },
    { label: "Vendre", icon: HandCoins, path: "/dashboard/sell" },
    { label: "Transactions", icon: ArrowRightLeft, path: "/dashboard/transactions" },
  ],
  lapidaire: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Réception lots", icon: ScanLine, path: "/dashboard/scan-buy" },
    { label: "Stock", icon: Package, path: "/dashboard/lots" },
    { label: "Transformation", icon: Scissors, path: "/dashboard/transform" },
    { label: "Vendre", icon: HandCoins, path: "/dashboard/sell" },
  ],
  exportateur_pierre: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Achats", icon: ScanLine, path: "/dashboard/purchases" },
    { label: "Stock", icon: Package, path: "/dashboard/lots" },
    { label: "Dossiers export", icon: Plane, path: "/dashboard/exports" },
    { label: "Paiements", icon: CreditCard, path: "/dashboard/payments" },
  ],
  commune_pierre: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Inscriptions", icon: ClipboardList, path: "/dashboard/registrations" },
    { label: "Comptes", icon: Users, path: "/dashboard/accounts" },
    { label: "Paiements", icon: DollarSign, path: "/dashboard/commune-payments" },
  ],
  controleur_pierre: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Scanner contrôle", icon: Search, path: "/dashboard/scan-control" },
    { label: "Historique", icon: History, path: "/dashboard/history" },
    { label: "PV", icon: AlertTriangle, path: "/dashboard/violations" },
  ],
};

const menusBoisByRole: Record<string, MenuItem[]> = {
  exploitant_bois: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Déclarer coupe", icon: FileText, path: "/dashboard/declare" },
    { label: "Mes lots", icon: Package, path: "/dashboard/lots" },
    { label: "Vendre", icon: HandCoins, path: "/dashboard/sell" },
    { label: "Paiements", icon: CreditCard, path: "/dashboard/payments" },
  ],
  collecteur_bois: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Scanner / Acheter", icon: ScanLine, path: "/dashboard/scan-buy" },
    { label: "Stock", icon: Package, path: "/dashboard/lots" },
    { label: "Transport", icon: Truck, path: "/dashboard/transport" },
    { label: "Vendre", icon: HandCoins, path: "/dashboard/sell" },
    { label: "Transactions", icon: ArrowRightLeft, path: "/dashboard/transactions" },
  ],
  transformateur_bois: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Réception", icon: ScanLine, path: "/dashboard/scan-buy" },
    { label: "Stock", icon: Package, path: "/dashboard/lots" },
    { label: "Transformation", icon: Scissors, path: "/dashboard/transform" },
    { label: "Vendre", icon: HandCoins, path: "/dashboard/sell" },
  ],
  exportateur_bois: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Achats", icon: ScanLine, path: "/dashboard/purchases" },
    { label: "Stock", icon: Package, path: "/dashboard/lots" },
    { label: "Dossiers export", icon: Plane, path: "/dashboard/exports" },
  ],
  commune_bois: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Inscriptions", icon: ClipboardList, path: "/dashboard/registrations" },
    { label: "Comptes", icon: Users, path: "/dashboard/accounts" },
    { label: "Paiements", icon: DollarSign, path: "/dashboard/commune-payments" },
  ],
  controleur_bois: [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Scanner contrôle", icon: Search, path: "/dashboard/scan-control" },
    { label: "Historique", icon: History, path: "/dashboard/history" },
    { label: "PV", icon: AlertTriangle, path: "/dashboard/violations" },
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
    <div className="min-h-screen bg-slate-50 flex w-full">
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
            className="w-64 bg-slate-900 text-slate-100 flex flex-col fixed h-full z-30 lg:relative pt-1"
          >
            <div className="p-5 border-b border-slate-800">
              <img src={madavolaLogo} alt="MADAVOLA" className="h-10 mb-2" />
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
                    {item.label}
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
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden pt-1">
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
