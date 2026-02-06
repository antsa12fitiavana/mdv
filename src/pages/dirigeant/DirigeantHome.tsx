import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAriary } from "@/data/mockData";
import { TrendingUp, DollarSign, Plane, AlertTriangle, MapPin, Users } from "lucide-react";

export default function DirigeantHome() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("nationalView")}</h1>
        <p className="text-sm text-slate-500 mt-1">{t("macroIndicators")} – {t("filiereOr")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100"><TrendingUp className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase">{t("declaredProduction")}</p>
                <p className="text-2xl font-bold text-slate-900">1 245 g</p>
                <p className="text-xs text-emerald-600">↑ +12% {t("vsLastMonth")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100"><DollarSign className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase">{t("communeRevenue")}</p>
                <p className="text-2xl font-bold text-slate-900">{formatAriary(2450000)}</p>
                <p className="text-xs text-slate-500">245 {t("registrations").toLowerCase()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100"><Plane className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase">{t("exportedVolume")}</p>
                <p className="text-2xl font-bold text-slate-900">520 g</p>
                <p className="text-xs text-slate-500">4 {t("dossiers")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase">{t("anomaliesPV")}</p>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-xs text-slate-500">2 {t("blockedLotsSeized")}, 1 {t("seizedCount")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-base font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" />{t("topRegions")}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: "Diana", lots: 45, weight: "350.2g" },
                { region: "Analamanga", lots: 32, weight: "280.0g" },
                { region: "Alaotra-Mangoro", lots: 28, weight: "210.5g" },
                { region: "Vakinankaratra", lots: 15, weight: "120.0g" },
                { region: "Sava", lots: 12, weight: "95.3g" },
              ].map((r, i) => (
                <div key={r.region} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-900">{r.region}</span>
                      <span className="text-slate-500">{r.lots} lots • {r.weight}</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(r.lots / 45) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-base font-semibold flex items-center gap-2"><Users className="w-4 h-4" />{t("adoption")}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-slate-900">245</p>
                <p className="text-xs text-slate-500">{t("activeAccounts")}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-slate-900">18</p>
                <p className="text-xs text-slate-500">{t("activeCommunities")}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-xs text-slate-500">{t("collectors")}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-xs text-slate-500">{t("certifiedComptoirs")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader><CardTitle className="text-base font-semibold">{t("flowTitle")}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4 gap-2">
            {[
              { label: t("declaredLabel"), value: "1 245g", bg: "bg-amber-500" },
              { label: `→ ${t("soldCollectors")}`, value: "980g", bg: "bg-amber-400" },
              { label: `→ ${t("soldComptoirs")}`, value: "720g", bg: "bg-emerald-500" },
              { label: `→ ${t("exportedLabel")}`, value: "520g", bg: "bg-blue-500" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-1 flex-1">
                <div className={`${step.bg} rounded-lg px-3 py-2 text-center flex-1`}>
                  <p className="text-xs text-white/80">{step.label}</p>
                  <p className="text-sm font-bold text-white">{step.value}</p>
                </div>
                {i < 3 && <span className="text-slate-300 shrink-0">→</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}