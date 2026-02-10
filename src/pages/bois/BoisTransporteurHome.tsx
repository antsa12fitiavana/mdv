import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Truck, MapPin, History, QrCode } from "lucide-react";

export default function BoisTransporteurHome() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{t("welcome")}, {user?.prenom || user?.nom}</h1>
                <p className="text-sm text-slate-500 mt-1">{t("dashboard")} - Transporteur {t("filiereBois")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-100">
                                <Truck className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Véhicules</p>
                                <p className="text-2xl font-bold text-slate-900">5</p>
                                <p className="text-xs text-slate-500">Actifs</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Trajets</p>
                                <p className="text-2xl font-bold text-slate-900">24</p>
                                <p className="text-xs text-slate-500">Ce mois</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigate("/dashboard/transport")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <QrCode className="w-4 h-4 mr-2" />Scan Bon de Transport
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard/history")}>
                    <History className="w-4 h-4 mr-2" />Historique
                </Button>
            </div>
        </div>
    );
}
