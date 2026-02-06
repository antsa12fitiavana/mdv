import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, CheckCircle, Package } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { formatDate } from "@/data/mockData";

export default function TransportPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { lotsBois, transportBons, addTransportBon } = useData();
  const [selectedLot, setSelectedLot] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [originVal, setOriginVal] = useState("");
  const [destVal, setDestVal] = useState("");

  const myLots = lotsBois.filter(l => l.currentOwner === user?.id && l.status === "available");

  const handleGenerate = () => {
    if (!selectedLot || !vehicleNum || !originVal || !destVal) return;
    const newBon = {
      id: `BON-T-${Date.now()}`,
      lotId: selectedLot,
      vehicleNumber: vehicleNum,
      driver: user?.prenom ? `${user.prenom} ${user.nom}` : user?.nom || "",
      origin: originVal,
      destination: destVal,
      departureDate: new Date().toISOString(),
      status: "active" as const,
      qrCode: `QR-BON-${Date.now()}`,
    };
    addTransportBon(newBon);
    toast.success(`${t("transportBonGenerated")}: ${newBon.id}`);
    setSelectedLot(""); setVehicleNum(""); setOriginVal(""); setDestVal("");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("transport")}</h1>
      
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="w-5 h-5" />
            {t("transportDeclaration")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-slate-500">{t("lotToTransport")}</Label>
            <Select value={selectedLot} onValueChange={setSelectedLot}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t("chooseLot")} /></SelectTrigger>
              <SelectContent>
                {myLots.map(l => (
                  <SelectItem key={l.id} value={l.id}>{l.id} — {l.essence} ({l.volume} {l.unit})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {myLots.length === 0 && (
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Package className="w-3 h-3" /> {t("noAvailableLot")}</p>
            )}
          </div>
          
          <div>
            <Label className="text-xs text-slate-500">{t("vehicle")}</Label>
            <Input placeholder="1234 TAB" className="mt-1" value={vehicleNum} onChange={e => setVehicleNum(e.target.value)} />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-500">{t("originLabel")}</Label>
              <Input placeholder="Moramanga" className="mt-1" value={originVal} onChange={e => setOriginVal(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-slate-500">{t("destinationLabel")}</Label>
              <Input placeholder="Antananarivo" className="mt-1" value={destVal} onChange={e => setDestVal(e.target.value)} />
            </div>
          </div>
          
          <div className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <p className="text-xs text-slate-600">{t("gpsDepart")}: -18.9470, 48.4270</p>
          </div>
          
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleGenerate}
            disabled={!selectedLot || !vehicleNum || !originVal || !destVal}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {t("generateTransportBon")}
          </Button>
        </CardContent>
      </Card>

      {/* Existing transport bons */}
      {transportBons.length > 0 && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-base">{t("transportBon")}s</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {transportBons.map(bon => (
              <div key={bon.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">{bon.id}</p>
                  <p className="text-xs text-slate-500">{bon.origin} → {bon.destination} • {bon.vehicleNumber}</p>
                  <p className="text-xs text-slate-400">{formatDate(bon.departureDate)}</p>
                </div>
                <Badge className={bon.status === "completed" ? "bg-emerald-100 text-emerald-700" : bon.status === "active" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"} variant="secondary">
                  {bon.status === "completed" ? t("confirmed") : bon.status === "active" ? t("inTransfer") : t("txnCancelled")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
