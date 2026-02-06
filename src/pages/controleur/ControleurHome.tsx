import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatDate, lotStatusLabels, lotStatusColors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Search, History, AlertTriangle, Shield, Package } from "lucide-react";

export default function ControleurHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { lotsOr, inspectionsOr } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("scanControl")}</h1>
        <p className="text-sm text-slate-500 mt-1">{t("controlModule")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100"><Shield className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("controlsDone")}</p>
              <p className="text-2xl font-bold text-slate-900">{inspectionsOr.length}</p>
              <p className="text-xs text-slate-500">{t("total")}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("infractions")}</p>
              <p className="text-2xl font-bold text-red-600">{inspectionsOr.filter((i) => i.result === "infraction").length}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100"><Package className="w-5 h-5 text-amber-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("lotsBlocked")}</p>
              <p className="text-2xl font-bold text-amber-600">{lotsOr.filter((l) => l.status === "blocked").length}</p>
            </div>
          </div>
        </CardContent></Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/dashboard/scan-control")} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Search className="w-4 h-4 mr-2" /> {t("scanALot")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/history")}>
          <History className="w-4 h-4 mr-2" /> {t("history")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/violations")}>
          <AlertTriangle className="w-4 h-4 mr-2" /> {t("violations")}
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader><CardTitle className="text-base font-semibold">{t("lastControls")}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inspectionsOr.map((insp) => {
              const resultColors = { ok: "bg-emerald-100 text-emerald-700", suspect: "bg-amber-100 text-amber-700", infraction: "bg-red-100 text-red-700" };
              const resultLabels = { ok: t("ok"), suspect: t("suspect"), infraction: t("infraction") };
              return (
                <div key={insp.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{insp.id}</p>
                    <p className="text-xs text-slate-500">{t("lot")}: {insp.inspectedLotId} • {formatDate(insp.createdAt)}</p>
                  </div>
                  <Badge className={resultColors[insp.result]} variant="secondary">{resultLabels[insp.result]}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}