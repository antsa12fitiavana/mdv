import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, TrendingUp, Plane, ScanLine, FileText, Gem } from "lucide-react";

export default function PierreExportateurHome() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { lotsPierre, transactionsPierre } = useData();
    const navigate = useNavigate();

    const myLots = lotsPierre.filter((l) => l.currentOwner === user?.id);
    const totalWeight = myLots.reduce((s, l) => s + l.quantity, 0);
    const myPurchases = transactionsPierre.filter(t => t.buyerId === user?.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{t("welcome")}, {user?.prenom || user?.nom}</h1>
                <p className="text-sm text-slate-500 mt-1">{t("dashboard")} - Exportateur {t("filierePierre")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                                <Gem className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">{t("totalStock")}</p>
                                <p className="text-2xl font-bold text-slate-900">{totalWeight.toFixed(1)} ct</p>
                                <p className="text-xs text-slate-500">{myLots.length} lot(s)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-100">
                                <Plane className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Exportés</p>
                                <p className="text-2xl font-bold text-slate-900">{myLots.filter(l => l.status === "exported").length}</p>
                                <p className="text-xs text-slate-500">Lots</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigate("/dashboard/scan-buy")} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <ScanLine className="w-4 h-4 mr-2" />{t("scanBuy")}
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard/lots")}>
                    <Package className="w-4 h-4 mr-2" />{t("myLots")}
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard/exports")}>
                    <FileText className="w-4 h-4 mr-2" />Déclarer Export
                </Button>
            </div>
        </div>
    );
}
