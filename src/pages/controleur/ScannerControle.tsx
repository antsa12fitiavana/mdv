import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { lotStatusLabels, lotStatusColors, formatDate, demoUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ScanLine, Search, CheckCircle, AlertTriangle, XCircle, Camera, MapPin } from "lucide-react";

export default function ScannerControle() {
  const { t } = useLanguage();
  const { lotsOr, transactionsOr, addInspectionOr } = useData();
  const [lotId, setLotId] = useState("");
  const [scanned, setScanned] = useState(false);
  const [decision, setDecision] = useState<"" | "ok" | "suspect" | "infraction">("");
  const [pvStep, setPvStep] = useState(0);

  const lot = scanned ? lotsOr.find((l) => l.id === lotId) : null;
  const owner = lot ? demoUsers.find((u) => u.id === lot.currentOwner) : null;
  const txns = lot ? transactionsOr.filter((txn) => txn.lots.includes(lot.id)) : [];

  const handleScan = () => {
    if (!lotId) { setLotId("LOT-OR-2025-0001"); }
    setScanned(true);
  };

  const handleDecision = (d: "ok" | "suspect" | "infraction") => {
    setDecision(d);
    if (d === "ok") {
      toast.success(t("controlOkRegistered"));
    } else if (d === "infraction") {
      setPvStep(1);
    }
  };

  if (decision === "infraction" && pvStep > 0) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">{t("digitalPV")}</h1>
        <Card className="shadow-sm border-slate-200">
          <CardContent className="pt-6 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {t("lot")}: {lotId} • {t("owner")}: {owner?.prenom} {owner?.nom}
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-1">{t("infractionReason")}</p>
              <Select defaultValue="DOCS_MANQUANTS">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOCS_MANQUANTS">{t("missingDocs")}</SelectItem>
                  <SelectItem value="QUANTITE_INCOHERENTE">{t("inconsistentQuantity")}</SelectItem>
                  <SelectItem value="ACTEUR_NON_AUTORISE">{t("unauthorizedActor")}</SelectItem>
                  <SelectItem value="ZONE_INTERDITE">{t("forbiddenZone")}</SelectItem>
                  <SelectItem value="AUTRE">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea placeholder={t("description")} rows={2} />

            <div>
              <p className="text-xs text-slate-500 mb-2">{t("measures")}</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> {t("blockLot")}</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> {t("fine")}</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> {t("seize")}</label>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <Button variant="ghost" size="sm" onClick={() => toast.info(t("photoSimulated"))}>
                <Camera className="w-4 h-4 mr-1" /> {t("addProofs")}
              </Button>
            </div>

            <div className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <p className="text-xs text-slate-600">{t("gps")}: <span className="font-mono">-13.6833, 48.4500</span></p>
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => { toast.success(`${t("pvRegistered")} PV-2025-0099`); setDecision(""); setPvStep(0); setScanned(false); setLotId(""); }}
            >
              {t("recordPV")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("scanControl")}</h1>

      <Card className="shadow-sm border-slate-200">
        <CardContent className="pt-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-200">
            <ScanLine className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">{t("scanQRLotOrInvoice")}</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleScan}>{t("simulateScan")}</Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder={t("enterIdManually")} value={lotId} onChange={(e) => setLotId(e.target.value)} />
            <Button variant="outline" onClick={handleScan}>{t("verify")}</Button>
          </div>
        </CardContent>
      </Card>

      {lot && (
        <Card className="shadow-sm border-slate-200">
          <CardHeader><CardTitle className="text-base">{t("complianceSummary")}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">{t("lotValid")}</p>
                <p className={lot.status !== "blocked" ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {lot.status !== "blocked" ? `✓ ${t("yes")}` : `✗ ${t("lotBlocked")}`}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{t("owner")}</p>
                <p className="font-medium">{owner?.prenom} {owner?.nom}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{t("paymentOk")}</p>
                <p className="text-emerald-600 font-medium">✓ {t("yes")}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{t("invoiceOk")}</p>
                <p className="text-emerald-600 font-medium">✓ {t("yes")} ({txns.length} txn)</p>
              </div>
              <div><p className="text-xs text-slate-500">{t("product")}</p><p>{lot.productType} • {lot.quantity} {lot.unit}</p></div>
              <div>
                <p className="text-xs text-slate-500">{t("status")}</p>
                <Badge className={lotStatusColors[lot.status]} variant="secondary">{lotStatusLabels[lot.status]}</Badge>
              </div>
            </div>

            {!decision && (
              <div className="flex gap-3 pt-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleDecision("ok")}>
                  <CheckCircle className="w-4 h-4 mr-1" /> {t("ok")}
                </Button>
                <Button variant="outline" className="flex-1 text-amber-600 border-amber-300" onClick={() => handleDecision("suspect")}>
                  <AlertTriangle className="w-4 h-4 mr-1" /> {t("suspect")}
                </Button>
                <Button variant="outline" className="flex-1 text-red-600 border-red-300" onClick={() => handleDecision("infraction")}>
                  <XCircle className="w-4 h-4 mr-1" /> {t("infraction")}
                </Button>
              </div>
            )}

            {decision === "ok" && (
              <div className="bg-emerald-50 rounded-lg p-3 text-center text-sm text-emerald-700 font-medium border border-emerald-200">
                <CheckCircle className="w-5 h-5 mx-auto mb-1" /> {t("controlOkRegistered")}
              </div>
            )}
            {decision === "suspect" && (
              <div className="space-y-3">
                <Textarea placeholder={t("suspectReason")} rows={2} />
                <Button variant="outline" className="w-full" onClick={() => { toast.success(t("suspectControlRegistered")); setDecision(""); setScanned(false); }}>
                  {t("save")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}