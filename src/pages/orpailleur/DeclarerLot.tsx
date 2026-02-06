import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle, QrCode, Camera, MapPin, FileText } from "lucide-react";

export default function DeclarerLot() {
  const { user, filiere } = useAuth();
  const { t } = useLanguage();
  const { addLotOr, addLotPierre, addLotBois } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    productType: "",
    quantity: "",
    unit: filiere === "or" ? "g" : filiere === "pierre" ? "carat" : "m3",
    notes: "",
    // Pierre specific
    family: "precious",
    color: "",
    clarity: "",
    // Bois specific
    category: "C",
    forestLocation: "",
  });

  const handleSubmit = () => {
    if (!form.productType || !form.quantity) {
      toast.error(t("fillRequired"));
      return;
    }
    
    const now = new Date().toISOString();
    const id = `LOT-${filiere === "or" ? "OR" : filiere === "pierre" ? "PIE" : "BOI"}-${Date.now()}`;
    
    if (filiere === "or") {
      addLotOr({
        id, filiere: "or", productType: form.productType, quantity: parseFloat(form.quantity),
        unit: form.unit, declaredAt: now, declaredBy: user?.id || "", currentOwner: user?.id || "",
        status: "available", qrCode: `QR-${id}`, gpsLat: -13.6833, gpsLon: 48.4500,
        notes: form.notes || undefined,
      });
    } else if (filiere === "pierre") {
      addLotPierre({
        id, filiere: "pierre", stoneType: form.productType, family: form.family as any,
        quantity: parseFloat(form.quantity), unit: form.unit as any,
        declaredAt: now, declaredBy: user?.id || "", currentOwner: user?.id || "",
        status: "available", qrCode: `QR-${id}`, gpsLat: -22.6752, gpsLon: 45.3567,
        color: form.color || undefined, clarity: form.clarity || undefined,
        notes: form.notes || undefined,
      });
    } else {
      addLotBois({
        id, filiere: "bois", essence: form.productType, category: form.category as any,
        volume: parseFloat(form.quantity), unit: form.unit as any,
        declaredAt: now, declaredBy: user?.id || "", currentOwner: user?.id || "",
        status: form.category === "A" ? "blocked" : "available",
        qrCode: `QR-${id}`, gpsLat: -18.9470, gpsLon: 48.4270,
        forestLocation: form.forestLocation || undefined, notes: form.notes || undefined,
      });
    }
    
    setSubmitted(true);
    toast.success(t("lotDeclaredSuccess"));
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <Card className="shadow-sm border-emerald-200">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t("lotDeclared")}</h2>
            <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
              <QrCode className="w-16 h-16 mx-auto text-slate-300 mb-2" />
              <p className="text-xs text-slate-500">{t("lotQrCode")}</p>
            </div>
            <div className="mt-4 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">{t("type")}:</span><span>{form.productType}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{t("quantity")}:</span><span>{form.quantity} {form.unit}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{t("gps")}:</span><span className="font-mono text-xs">-13.6833, 48.4500</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{t("status")}:</span>
                <span className="text-emerald-600 font-medium">{t("available")}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => { setSubmitted(false); setForm({...form, productType: "", quantity: "", notes: ""}); }}>
                {t("newLot")}
              </Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                {t("sellThisLot")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("declareProduction")}</h1>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-base">{t("lotInfo")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-slate-500">{filiere === "or" ? t("productType") : filiere === "pierre" ? t("stoneType") : t("woodEssence")}</Label>
            <Select value={form.productType} onValueChange={(v) => setForm({ ...form, productType: v })}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t("chooseOption")} /></SelectTrigger>
              <SelectContent>
                {filiere === "or" && <>
                  <SelectItem value="Or brut">{t("rawGold")}</SelectItem>
                  <SelectItem value="Pépites">{t("nuggets")}</SelectItem>
                  <SelectItem value="Concentré">{t("concentrate")}</SelectItem>
                  <SelectItem value="Raffiné">{t("refined")}</SelectItem>
                </>}
                {filiere === "pierre" && <>
                  <SelectItem value="Saphir bleu">Saphir bleu</SelectItem>
                  <SelectItem value="Rubis">Rubis</SelectItem>
                  <SelectItem value="Tourmaline">Tourmaline</SelectItem>
                  <SelectItem value="Émeraude">Émeraude</SelectItem>
                  <SelectItem value="Quartz">Quartz</SelectItem>
                  <SelectItem value="Améthyste">Améthyste</SelectItem>
                </>}
                {filiere === "bois" && <>
                  <SelectItem value="Palissandre">Palissandre</SelectItem>
                  <SelectItem value="Eucalyptus">Eucalyptus</SelectItem>
                  <SelectItem value="Bois de rose">Bois de rose</SelectItem>
                  <SelectItem value="Teck">Teck</SelectItem>
                  <SelectItem value="Ébène">Ébène</SelectItem>
                  <SelectItem value="Pin">Pin</SelectItem>
                </>}
              </SelectContent>
            </Select>
          </div>

          {filiere === "pierre" && (
            <div>
              <Label className="text-xs text-slate-500">{t("stoneFamily")}</Label>
              <Select value={form.family} onValueChange={(v) => setForm({ ...form, family: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="precious">{t("precious")}</SelectItem>
                  <SelectItem value="semi_precious">{t("semiPrecious")}</SelectItem>
                  <SelectItem value="industrial">{t("industrial")}</SelectItem>
                  <SelectItem value="crystal">{t("crystal")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {filiere === "bois" && (
            <>
              <div>
                <Label className="text-xs text-slate-500">{t("category")}</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">{t("categoryA")}</SelectItem>
                    <SelectItem value="B">{t("categoryB")}</SelectItem>
                    <SelectItem value="C">{t("categoryC")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-slate-500">{t("forestLocation")}</Label>
                <Input value={form.forestLocation} onChange={(e) => setForm({...form, forestLocation: e.target.value})} placeholder="Forêt Ankeniheny" className="mt-1" />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-500">{t("quantity")}</Label>
              <Input type="number" step="0.1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="15.5" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-slate-500">{t("unit")}</Label>
              <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {filiere === "or" && <>
                    <SelectItem value="g">{t("grams")}</SelectItem>
                    <SelectItem value="kg">{t("kilograms")}</SelectItem>
                    <SelectItem value="akotry">{t("akotry")}</SelectItem>
                  </>}
                  {filiere === "pierre" && <>
                    <SelectItem value="carat">{t("carat")}</SelectItem>
                    <SelectItem value="gram">{t("grams")}</SelectItem>
                    <SelectItem value="piece">Pièce</SelectItem>
                  </>}
                  {filiere === "bois" && <>
                    <SelectItem value="m3">m³</SelectItem>
                    <SelectItem value="piece">Pièce</SelectItem>
                    <SelectItem value="bille">Bille</SelectItem>
                  </>}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filiere === "pierre" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-slate-500">{t("color")}</Label>
                <Input value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} placeholder="Bleu royal" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-slate-500">{t("clarity")}</Label>
                <Input value={form.clarity} onChange={(e) => setForm({...form, clarity: e.target.value})} placeholder="VVS" className="mt-1" />
              </div>
            </div>
          )}

          <div>
            <Label className="text-xs text-slate-500">{t("photoOptional")}</Label>
            <div className="mt-1 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <Button variant="ghost" size="sm" onClick={() => toast.info(t("photoSimulated"))}>
                <Camera className="w-4 h-4 mr-1" /> {t("addPhoto")}
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-xs text-slate-500">{t("notes")}</Label>
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder={t("notesPlaceholder")} className="mt-1" rows={2} />
          </div>

          <div className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <p className="text-xs text-slate-600">{t("gpsAuto")}: <span className="font-mono">-13.6833, 48.4500 ±8m</span></p>
          </div>

          <Button onClick={handleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
            {t("submitDeclaration")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}