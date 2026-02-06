import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// OR
import OrpailleurHome from "./orpailleur/OrpailleurHome";
import DeclarerLot from "./orpailleur/DeclarerLot";
import CollecteurHome from "./collecteur/CollecteurHome";
import ScannerAcheter from "./collecteur/ScannerAcheter";
import ConsoliderLots from "./collecteur/ConsoliderLots";
import CommuneHome from "./commune/CommuneHome";
import DemandesInscription from "./commune/DemandesInscription";
import ComptesCommunaux from "./commune/ComptesCommunaux";
import ControleurHome from "./controleur/ControleurHome";
import ScannerControle from "./controleur/ScannerControle";
import ComptoirHome from "./comptoir/ComptoirHome";
import DossiersExport from "./comptoir/DossiersExport";
import DirigeantHome from "./dirigeant/DirigeantHome";

// Shared
import MesLots from "./shared/MesLots";
import VendreLot from "./shared/VendreLot";
import Paiements from "./shared/Paiements";
import Transactions from "./shared/Transactions";

// Generic pages for Pierre/Bois
import PierreExploitantHome from "./pierre/PierreExploitantHome";
import BoisExploitantHome from "./bois/BoisExploitantHome";
import TransformationPage from "./shared/TransformationPage";
import TransportPage from "./shared/TransportPage";

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center py-20">
    <p className="text-slate-500 text-sm">{title} — à implémenter</p>
  </div>
);

export default function DashboardRouter() {
  const { user, filiere } = useAuth();
  if (!user) return null;

  const role = user.role;

  // Determine home component based on filiere and role
  const getHomeComponent = () => {
    if (filiere === "or") {
      switch (role) {
        case "orpailleur": return <OrpailleurHome />;
        case "collecteur": return <CollecteurHome />;
        case "commune": return <CommuneHome />;
        case "controleur": return <ControleurHome />;
        case "comptoir": return <ComptoirHome />;
        case "dirigeant":
        case "com": return <DirigeantHome />;
        default: return <OrpailleurHome />;
      }
    } else if (filiere === "pierre") {
      if (role.includes("exploitant") || role.includes("collecteur") || role === "lapidaire" || role.includes("exportateur")) {
        return <PierreExploitantHome />;
      }
      if (role.includes("commune")) return <CommuneHome />;
      if (role.includes("controleur")) return <ControleurHome />;
      return <PierreExploitantHome />;
    } else {
      if (role.includes("exploitant") || role.includes("collecteur") || role.includes("transformateur") || role.includes("exportateur")) {
        return <BoisExploitantHome />;
      }
      if (role.includes("commune")) return <CommuneHome />;
      if (role.includes("controleur")) return <ControleurHome />;
      return <BoisExploitantHome />;
    }
  };

  return (
    <Routes>
      {/* Home per role */}
      <Route index element={getHomeComponent()} />

      {/* Shared */}
      <Route path="lots" element={<MesLots />} />
      <Route path="sell" element={<VendreLot />} />
      <Route path="payments" element={<Paiements />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="invoices" element={<Placeholder title="Factures" />} />

      {/* Declaration - works for all filieres */}
      <Route path="declare" element={<DeclarerLot />} />

      {/* Scanning/Buying */}
      <Route path="scan-buy" element={<ScannerAcheter />} />
      <Route path="purchases" element={<ScannerAcheter />} />
      <Route path="consolidate" element={<ConsoliderLots />} />

      {/* Transformation (Pierre & Bois) */}
      <Route path="transform" element={<TransformationPage />} />

      {/* Transport (Bois) */}
      <Route path="transport" element={<TransportPage />} />

      {/* Commune */}
      <Route path="registrations" element={<DemandesInscription />} />
      <Route path="accounts" element={<ComptesCommunaux />} />
      <Route path="commune-payments" element={<Paiements />} />
      <Route path="activity" element={<Placeholder title="Activité locale" />} />
      <Route path="settings" element={<Placeholder title="Paramètres" />} />

      {/* Controleur */}
      <Route path="scan-control" element={<ScannerControle />} />
      <Route path="history" element={<Placeholder title="Historique contrôles" />} />
      <Route path="violations" element={<Placeholder title="PV / Infractions" />} />
      <Route path="seizures" element={<Placeholder title="Saisies" />} />

      {/* Comptoir/Exportateur */}
      <Route path="exports" element={<DossiersExport />} />

      {/* Dirigeant */}
      <Route path="regions" element={<Placeholder title="Régions / Districts" />} />
      <Route path="revenue" element={<Placeholder title="Recettes" />} />
      <Route path="risks" element={<Placeholder title="Risques & anomalies" />} />

      {/* COM */}
      <Route path="actors" element={<ComptesCommunaux />} />
      <Route path="validations" element={<DemandesInscription />} />
      <Route path="compliance" element={<Placeholder title="Conformité" />} />

      <Route path="*" element={<Placeholder title="Page non trouvée" />} />
    </Routes>
  );
}
