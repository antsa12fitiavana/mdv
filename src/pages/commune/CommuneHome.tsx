import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatDate, formatAriary } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Users, DollarSign, AlertCircle, Package } from "lucide-react";

export default function CommuneHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { registrationsOr } = useData();
  const pendingCount = registrationsOr.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("communeLabel")} Ambanja</h1>
        <p className="text-sm text-slate-500 mt-1">{t("communeDashboard")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100"><ClipboardList className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("monthRegistrations")}</p>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <p className="text-xs text-emerald-600">+3 {t("thisWeek")}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100"><DollarSign className="w-5 h-5 text-emerald-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("revenueLabel")}</p>
              <p className="text-2xl font-bold text-slate-900">{formatAriary(120000)}</p>
              <p className="text-xs text-slate-500">12 {t("payments").toLowerCase()}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100"><Package className="w-5 h-5 text-amber-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("declaredLots")}</p>
              <p className="text-2xl font-bold text-slate-900">45</p>
              <p className="text-xs text-slate-500">350.2 g {t("total").toLowerCase()}</p>
            </div>
          </div>
        </CardContent></Card>
        <Card className="border-slate-200 shadow-sm border-amber-200"><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100"><AlertCircle className="w-5 h-5 text-amber-600" /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{t("pendingRequests")}</p>
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
              <p className="text-xs text-amber-600">{t("requestsToProcess")}</p>
            </div>
          </div>
        </CardContent></Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/dashboard/registrations")} className="bg-amber-500 hover:bg-amber-600 text-white">
          <ClipboardList className="w-4 h-4 mr-2" /> {t("requests")} ({pendingCount})
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/commune-payments")}>
          <DollarSign className="w-4 h-4 mr-2" /> {t("payments")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/accounts")}>
          <Users className="w-4 h-4 mr-2" /> {t("accounts")}
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader><CardTitle className="text-base font-semibold">{t("alerts")}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <ClipboardList className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-sm text-slate-700">{pendingCount} {t("pendingRegistrations")}</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-slate-700">1 {t("blockedLotInCommune")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}