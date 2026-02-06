import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Link2, CheckCircle, Package } from "lucide-react";

export default function ConsoliderLots() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { lotsOr } = useData();
  const [selected, setSelected] = useState<string[]>([]);
  const [consolidated, setConsolidated] = useState(false);

  const lots = lotsOr.filter((l) => l.currentOwner === user?.id && l.status === "available");

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const totalQty = lots.filter((l) => selected.includes(l.id)).reduce((s, l) => s + l.quantity, 0);

  const handleConsolidate = () => {
    if (selected.length < 2) { toast.error(t("selectAtLeast2")); return; }
    toast.success(`${t("consolidatedCreated")} LOT-OR-2025-CONS-99`);
    setConsolidated(true);
  };

  if (consolidated) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-sm border-emerald-200">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
              <Link2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t("consolidated")}</h2>
            <p className="text-sm text-slate-500">ID: LOT-OR-2025-CONS-99</p>
            <p className="text-lg font-bold">{totalQty.toFixed(1)} g</p>
            <p className="text-xs text-slate-500">{selected.length} {t("parentLots")}</p>
            <Button variant="outline" onClick={() => { setConsolidated(false); setSelected([]); }}>{t("ok")}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("consolidateLots")}</h1>

      <Card className="shadow-sm border-slate-200">
        <CardHeader><CardTitle className="text-base">{t("selectLotsToConsolidate")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {lots.map((lot) => (
            <label key={lot.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
              ${selected.includes(lot.id) ? "border-amber-400 bg-amber-50" : "border-slate-200"}`}>
              <Checkbox checked={selected.includes(lot.id)} onCheckedChange={() => toggle(lot.id)} />
              <div className="flex-1">
                <p className="text-sm font-medium">{lot.id}</p>
                <p className="text-xs text-slate-500">{lot.productType} • {lot.quantity} {lot.unit}</p>
              </div>
            </label>
          ))}
          {lots.length === 0 && <p className="text-sm text-slate-500 text-center py-4 flex items-center justify-center gap-1"><Package className="w-4 h-4" /> {t("noAvailableLot")}</p>}
        </CardContent>
      </Card>

      {selected.length > 0 && (
        <Card className="shadow-sm border-slate-200">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm mb-4">
              <span className="text-slate-500">{t("selectedLots")}:</span>
              <span className="font-bold">{selected.length}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-slate-500">{t("totalQuantity")}:</span>
              <span className="font-bold">{totalQty.toFixed(1)} g</span>
            </div>
            <Button onClick={handleConsolidate} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
              {t("createConsolidated")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}