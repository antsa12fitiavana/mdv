import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { demoUsers, formatAriary } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ScanLine, Package, HandCoins, TrendingUp, AlertCircle, ArrowRightLeft } from "lucide-react";

export default function CollecteurHome() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { lotsOr, transactionsOr } = useData();
  const navigate = useNavigate();
  const myLots = lotsOr.filter((l) => l.currentOwner === user?.id);
  const totalWeight = myLots.reduce((s, l) => s + l.quantity, 0);
  const myPurchases = transactionsOr.filter(tx => tx.buyerId === user?.id && tx.status === "paid");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("welcome")}, {user?.prenom}</h1>
        <p className="text-sm text-slate-500 mt-1">{t("collecteurDashboard")}</p>
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
              <p className="text-xs text-slate-500 uppercase">{t("purchasesToday")}</p>
              <p className="text-2xl font-bold text-slate-900">{myPurchases.length}</p>
              <p className="text-xs text-slate-500">{formatAriary(myPurchases.reduce((s, tx) => s + tx.totalAmount, 0))}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100"><ArrowRightLeft className="w-5 h-5 text-emerald-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("salesComptoir")}</p>
              <p className="text-2xl font-bold text-slate-900">{transactionsOr.filter(tx => tx.sellerId === user?.id && tx.status === "paid").length}</p>
              <p className="text-xs text-emerald-600 font-medium">{t("confirmed")}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100"><AlertCircle className="w-5 h-5 text-red-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("alerts")}</p>
              <p className="text-2xl font-bold text-red-600">{myLots.filter(l => l.status === "blocked").length}</p>
              <p className="text-xs text-slate-500">{t("suspectBlocked")}</p>
            </div>
          </div>
        </CardContent></Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/dashboard/scan-buy")} className="bg-amber-500 hover:bg-amber-600 text-white">
          <ScanLine className="w-4 h-4 mr-2" />{t("scanBuyAction")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/lots")}>
          <Package className="w-4 h-4 mr-2" />{t("stock")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/sell")}>
          <HandCoins className="w-4 h-4 mr-2" />{t("sellAction")}
        </Button>
      </div>
    </div>
  );
}