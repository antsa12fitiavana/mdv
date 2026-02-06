import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatAriary, formatDate, lotStatusLabels, lotStatusColors, demoUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ScanLine, Search, Package, CreditCard } from "lucide-react";

export default function ScannerAcheter() {
  const { t } = useLanguage();
  const { lotsOr } = useData();
  const [scannedLotId, setScannedLotId] = useState("");
  const [scanned, setScanned] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [amount, setAmount] = useState("");

  const lot = scanned ? lotsOr.find((l) => l.id === scannedLotId || l.qrCode === scannedLotId) : null;
  const owner = lot ? demoUsers.find((u) => u.id === lot.declaredBy) : null;

  const handleScan = () => {
    if (!scannedLotId) {
      toast.info(`${t("simulation")}: LOT-OR-2025-0001`);
      setScannedLotId("LOT-OR-2025-0001");
    }
    setScanned(true);
  };

  const handlePropose = () => {
    if (!amount) { toast.error(t("enterAmount")); return; }
    toast.success(t("buyProposalSent"));
    setProposalSent(true);
  };

  if (proposalSent) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-sm border-blue-200">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t("proposalSent")}</h2>
            <p className="text-sm text-slate-500">{t("waitingSellerConfirm")}</p>
            <p className="text-xs text-slate-400">{t("lot")}: {lot?.id} • {t("amount")}: {amount} Ar</p>
            <Button variant="outline" onClick={() => { setScanned(false); setProposalSent(false); setScannedLotId(""); setAmount(""); }}>
              {t("scanAnother")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("scanBuy")}</h1>

      <Card className="shadow-sm border-slate-200">
        <CardContent className="pt-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-200">
            <ScanLine className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">{t("scanQRLotOrInvoice")}</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleScan}>
              {t("simulateScan")}
            </Button>
          </div>

          <div className="flex gap-2">
            <Input placeholder={t("enterIdManually")} value={scannedLotId} onChange={(e) => setScannedLotId(e.target.value)} />
            <Button variant="outline" onClick={handleScan}><Search className="w-4 h-4 mr-1" />{t("verify")}</Button>
          </div>
        </CardContent>
      </Card>

      {lot && (
        <Card className="shadow-sm border-slate-200">
          <CardHeader><CardTitle className="text-base">{t("result")}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {lot.status === "blocked" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2">
                <Package className="w-4 h-4" /> {t("lotBlockedBuy")}
              </div>
            )}
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div><span className="text-slate-500 text-xs">{t("lot")}</span><p className="font-medium">{lot.id}</p></div>
              <div><span className="text-slate-500 text-xs">{t("status")}</span><Badge className={lotStatusColors[lot.status]} variant="secondary">{lotStatusLabels[lot.status]}</Badge></div>
              <div><span className="text-slate-500 text-xs">{t("owner")}</span><p className="font-medium">{owner?.prenom} {owner?.nom}</p></div>
              <div><span className="text-slate-500 text-xs">{t("product")}</span><p>{lot.productType} • {lot.quantity} {lot.unit}</p></div>
              <div><span className="text-slate-500 text-xs">{t("declaredOn")}</span><p>{formatDate(lot.declaredAt)}</p></div>
            </div>

            {lot.status === "available" && (
              <div className="border-t pt-4 space-y-3">
                <Input type="number" placeholder={t("proposedAmount")} value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Button onClick={handlePropose} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  {t("proposeBuy")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}