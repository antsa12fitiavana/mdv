import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatAriary, formatDate, lotStatusLabels, lotStatusColors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, TrendingUp, AlertCircle, FileText, HandCoins } from "lucide-react";

export default function OrpailleurHome() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { lotsOr, transactionsOr } = useData();
  const navigate = useNavigate();
  
  const myLots = lotsOr.filter((l) => l.currentOwner === user?.id);
  const totalWeight = myLots.reduce((s, l) => s + l.quantity, 0);
  const myTransactions = transactionsOr.filter((t) => t.sellerId === user?.id);
  const blockedLots = myLots.filter((l) => l.status === "blocked");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("welcome")}, {user?.prenom}</h1>
        <p className="text-sm text-slate-500 mt-1">{t("dashboard")} {user?.label}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Package className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{t("totalStock")}</p>
                <p className="text-2xl font-bold text-slate-900">{totalWeight.toFixed(1)} g</p>
                <p className="text-xs text-slate-500">{myLots.length} lot(s)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{t("lastSale")}</p>
                <p className="text-2xl font-bold text-slate-900">
                  {myTransactions[0] ? formatAriary(myTransactions[0].totalAmount) : "—"}
                </p>
                <p className="text-xs text-slate-500">
                  {myTransactions[0] ? formatDate(myTransactions[0].createdAt) : t("noData")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{t("alerts")}</p>
                <p className="text-2xl font-bold text-red-600">{blockedLots.length}</p>
                <p className="text-xs text-slate-500">{t("blockedLots")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate("/dashboard/declare")} className="bg-amber-500 hover:bg-amber-600 text-white">
          <FileText className="w-4 h-4 mr-2" />
          {t("declareLot")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/lots")}>
          <Package className="w-4 h-4 mr-2" />
          {t("myLots")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/sell")}>
          <HandCoins className="w-4 h-4 mr-2" />
          {t("sell")}
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-900">{t("recentLots")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myLots.slice(0, 5).map((lot) => (
              <div key={lot.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200">
                    <Package className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{lot.id}</p>
                    <p className="text-xs text-slate-500">{lot.productType} • {lot.quantity} {lot.unit}</p>
                  </div>
                </div>
                <Badge className={lotStatusColors[lot.status]} variant="secondary">
                  {lotStatusLabels[lot.status]}
                </Badge>
              </div>
            ))}
            {myLots.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-4">{t("noData")}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
