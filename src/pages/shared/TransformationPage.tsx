import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scissors, Camera, CheckCircle, Package } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function TransformationPage() {
  const { t } = useLanguage();
  const { user, filiere } = useAuth();
  const { lotsPierre, lotsBois, updateLotPierre, updateLotBois } = useData();
  const [selectedLot, setSelectedLot] = useState("");
  const [operation, setOperation] = useState("");

  const lots = filiere === "pierre"
    ? lotsPierre.filter(l => l.currentOwner === user?.id && l.status === "available")
    : lotsBois.filter(l => l.currentOwner === user?.id && l.status === "available");

  const operations = filiere === "pierre"
    ? [t("sorting"), t("cutting"), t("polishing"), t("certification")]
    : [t("sawing"), t("shaping"), t("assembly"), t("sorting")];

  const handleTransform = () => {
    if (!selectedLot) return;
    if (filiere === "pierre") updateLotPierre(selectedLot, { status: "transformed" });
    else updateLotBois(selectedLot, { status: "transformed" });
    toast.success(t("transformationRegistered"));
    setSelectedLot("");
    setOperation("");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("transform")}</h1>
      
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            {t("declareTransformation")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">{t("transformSelectLot")}</p>

          <div>
            <label className="text-xs text-slate-500">{t("selectALot")}</label>
            <Select value={selectedLot} onValueChange={setSelectedLot}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t("chooseLot")} /></SelectTrigger>
              <SelectContent>
                {lots.map((l: any) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.id} — {filiere === "pierre" ? l.stoneType : l.essence}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {lots.length === 0 && (
            <div className="text-center py-4 text-slate-400 text-sm flex items-center justify-center gap-2">
              <Package className="w-4 h-4" /> {t("noAvailableLot")}
            </div>
          )}
          
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm font-medium">{t("availableOperations")}:</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {operations.map(op => <li key={op}>• {op}</li>)}
            </ul>
          </div>
          
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
            <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500">{t("photosRequired")}</p>
          </div>
          
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleTransform}
            disabled={!selectedLot}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {t("registerTransformation")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}