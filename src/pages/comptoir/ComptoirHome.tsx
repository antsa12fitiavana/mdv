import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatAriary, formatDate, lotStatusLabels, lotStatusColors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScanLine, Package, Plane, FileStack, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

export default function ComptoirHome() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { lotsOr, exportsOr } = useData();
  const navigate = useNavigate();
  const myLots = lotsOr.filter((l) => l.currentOwner === user?.id);
  const totalWeight = myLots.reduce((s, l) => s + l.quantity, 0);
  const exports = exportsOr.filter((e) => e.comptoirId === user?.id);

  const statusLabels: Record<string, string> = {
    draft: t("draftStatus"), ready_control: t("readyControl"), controlled: t("controlled"),
    sealed: t("sealed"), declared_customs: t("declaredCustoms"), exported: t("exported"), closed: t("closedStatus")
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{user?.nom}</h1>
        <p className="text-sm text-slate-500 mt-1">{t("comptoirDashboard")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100"><Package className="w-5 h-5 text-amber-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("totalStock")}</p>
              <p className="text-2xl font-bold text-slate-900">{totalWeight.toFixed(1)} g</p>
              <p className="text-xs text-slate-500">{myLots.length} lot(s)</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100"><TrendingUp className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("purchasesMonth")}</p>
              <p className="text-2xl font-bold text-slate-900">{formatAriary(12000000)}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100"><Plane className="w-5 h-5 text-emerald-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("exportDossiers")}</p>
              <p className="text-2xl font-bold text-slate-900">{exports.length}</p>
              <p className="text-xs text-slate-500">{exports.filter((e) => e.status !== "draft").length} {t("inProgress")}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100"><AlertCircle className="w-5 h-5 text-red-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("anomalies")}</p>
              <p className="text-2xl font-bold text-red-600">0</p>
            </div>
          </div>
        </CardContent></Card>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button onClick={() => navigate("/dashboard/purchases")} className="bg-amber-500 hover:bg-amber-600 text-white">
          <ScanLine className="w-4 h-4 mr-2" /> {t("purchases")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/lots")}>
          <Package className="w-4 h-4 mr-2" /> {t("stock")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/exports")}>
          <Plane className="w-4 h-4 mr-2" /> {t("exports")}
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader><CardTitle className="text-base font-semibold">{t("exportDossiers")}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exports.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">{exp.id}</p>
                  <p className="text-xs text-slate-500">{exp.destination} • {exp.totalWeight}g • {formatAriary(exp.declaredValue)}</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">{statusLabels[exp.status]}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}