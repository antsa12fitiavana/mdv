import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { territories, getDistrictsByRegion, getCommunesByDistrict, getFokontanyByCommune } from "@/data/territories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Camera, CheckCircle, Diamond, Leaf, Coins } from "lucide-react";
import madavolaLogo from "@/assets/madavola-logo.png";
import { Filiere, UserRole } from "@/data/mockData";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    filiere: "or" as Filiere,
    type: "physique" as "physique" | "morale",
    nom: "", prenom: "", cin: "", telephone: "",
    raisonSociale: "", nif: "", stat: "", representant: "",
    regionId: "", districtId: "", communeId: "", fokontanyId: "",
    gpsLat: -13.6833, gpsLon: 48.4500, gpsAccuracy: 8,
    role: "orpailleur" as UserRole,
    paymentMethod: "mobile_money",
  });

  const steps = [t("filiere"), t("identity"), t("territory"), t("roleLabel"), t("paymentLabel")];

  const districts = form.regionId ? getDistrictsByRegion(form.regionId) : [];
  const communes = form.districtId ? getCommunesByDistrict(form.districtId) : [];
  const fokontany = form.communeId ? getFokontanyByCommune(form.communeId) : [];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      toast.success(t("success") + " — Compte en attente de validation.");
      login("U001");
      navigate("/dashboard");
    }
  };

  const getFiliereRoles = (filiere: Filiere): { value: UserRole; label: string; desc: string }[] => {
    const commonRoles: { value: UserRole; label: string; desc: string }[] = [
      { value: "controleur", label: t("controleur"), desc: "Vérification, contrôle terrain" },
      { value: "commune", label: t("commune"), desc: "Validation inscriptions, suivi recettes" },
    ];

    if (filiere === "or") {
      return [
        { value: "orpailleur", label: t("orpailleur"), desc: "Exploitation artisanale, déclaration de production" },
        { value: "collecteur", label: t("collecteur"), desc: "Achat, regroupement et revente" },
        { value: "comptoir", label: "Comptoir", desc: "Achat formel, exportation, transformation" },
        ...commonRoles,
      ];
    } else if (filiere === "pierre") {
      return [
        { value: "pierre_artisan", label: "Artisan Minier (Pierres)", desc: "Exploitation artisanale de pierres" },
        { value: "pierre_collecteur", label: "Collecteur Pierres", desc: "Achat, regroupement, fractionnement" },
        { value: "pierre_negociant", label: "Négociant", desc: "Achat/Revente en volume, liaison export" },
        { value: "pierre_comptoir", label: "Comptoir Pierres", desc: "Contrôle qualité, exportation formelle" },
        { value: "pierre_transporteur", label: "Transporteur", desc: "Prise en charge logistique uniquement" },
        { value: "pierre_exportateur", label: "Exportateur", desc: "Consolidation et export" },
        ...commonRoles,
      ];
    } else if (filiere === "bois") {
      return [
        { value: "bois_exploitant", label: "Exploitant Forestier", desc: "Coupe autorisée, gestion de stock" },
        { value: "bois_collecteur", label: "Collecteur / Négociant", desc: "Achat, transport, revente locale" },
        { value: "bois_depot", label: "Dépôt / Scierie", desc: "Stockage, transformation, vente" },
        { value: "bois_transporteur", label: "Transporteur", desc: "Logistique bois uniquement" },
        { value: "bois_exportateur", label: "Exportateur", desc: "Exportation bois précieux ou ordinaires" },
        ...commonRoles,
      ];
    }
    return [];
  };

  const availableRoles = getFiliereRoles(form.filiere);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 mada-stripe" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-6">
          <button onClick={() => navigate("/login")} className="text-slate-500 text-sm hover:text-slate-300 mb-4 inline-flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </button>
          <img src={madavolaLogo} alt="MADAVOLA" className="h-16 mx-auto mb-2" />
          <h1 className="text-xl font-bold text-white">{t("register")}</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-6 px-4">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${i <= step ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg" : "bg-slate-700 text-slate-400"}`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i < 4 && <div className={`flex-1 h-0.5 ${i < step ? "bg-amber-500" : "bg-slate-700"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-base font-semibold text-white mb-6">{steps[step]}</h3>

          {step === 0 && (
            <div className="space-y-4">
              <Label className="text-xs text-slate-400">Choisissez votre filière</Label>
              <RadioGroup value={form.filiere} onValueChange={(v) => {
                const newFiliere = v as Filiere;
                setForm({
                  ...form,
                  filiere: newFiliere,
                  role: newFiliere === "or" ? "orpailleur" : newFiliere === "bois" ? "bois_exploitant" : "pierre_artisan"
                });
              }} className="grid gap-4">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                   ${form.filiere === "or" ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "border-slate-700 hover:border-slate-600"}`}>
                  <RadioGroupItem value="or" className="border-amber-500 text-amber-500" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">OR</p>
                      <p className="text-xs text-slate-400">Filière aurifère</p>
                    </div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                   ${form.filiere === "pierre" ? "border-blue-400 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.2)]" : "border-slate-700 hover:border-slate-600"}`}>
                  <RadioGroupItem value="pierre" className="border-blue-400 text-blue-400" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-400">
                      <Diamond className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">PIERRES PRÉCIEUSES</p>
                      <p className="text-xs text-slate-400">Gemmes et pierres fines</p>
                    </div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                   ${form.filiere === "bois" ? "border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : "border-slate-700 hover:border-slate-600"}`}>
                  <RadioGroupItem value="bois" className="border-green-500 text-green-500" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">BOIS PRÉCIEUX</p>
                      <p className="text-xs text-slate-400">Filière forestière</p>
                    </div>
                  </div>
                </label>
              </RadioGroup>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <RadioGroup value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "physique" | "morale" })} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="physique" id="physique" className="border-slate-500" />
                  <Label htmlFor="physique" className="text-slate-300">{t("naturalPerson")}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="morale" id="morale" className="border-slate-500" />
                  <Label htmlFor="morale" className="text-slate-300">{t("company")}</Label>
                </div>
              </RadioGroup>

              {form.type === "physique" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-slate-400">{t("lastName")}</Label>
                      <Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Rakoto" className="mt-1 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400">{t("firstName")}</Label>
                      <Input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Jean" className="mt-1 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-400">{t("cin")}</Label>
                    <Input value={form.cin} onChange={(e) => setForm({ ...form, cin: e.target.value })} placeholder="101 012 345 678" className="mt-1 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-xs text-slate-400">{t("companyName")}</Label>
                    <Input value={form.raisonSociale} onChange={(e) => setForm({ ...form, raisonSociale: e.target.value })} className="mt-1 bg-slate-900/50 border-slate-700 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-slate-400">{t("nif")}</Label>
                      <Input value={form.nif} onChange={(e) => setForm({ ...form, nif: e.target.value })} className="mt-1 bg-slate-900/50 border-slate-700 text-white" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400">{t("stat")}</Label>
                      <Input value={form.stat} onChange={(e) => setForm({ ...form, stat: e.target.value })} className="mt-1 bg-slate-900/50 border-slate-700 text-white" />
                    </div>
                  </div>
                </>
              )}
              <div>
                <Label className="text-xs text-slate-400">{t("phone")}</Label>
                <Input value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="034 12 345 67" className="mt-1 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-400">{t("regionLabel")}</Label>
                <Select value={form.regionId} onValueChange={(v) => setForm({ ...form, regionId: v, districtId: "", communeId: "", fokontanyId: "" })}>
                  <SelectTrigger className="mt-1 bg-slate-900/50 border-slate-700 text-white"><SelectValue placeholder="..." /></SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">{territories.regions.map((r) => <SelectItem key={r.id} value={r.id}>{r.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-slate-400">{t("districtLabel")}</Label>
                <Select value={form.districtId} onValueChange={(v) => setForm({ ...form, districtId: v, communeId: "", fokontanyId: "" })} disabled={!form.regionId}>
                  <SelectTrigger className="mt-1 bg-slate-900/50 border-slate-700 text-white"><SelectValue placeholder="..." /></SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">{districts.map((d) => <SelectItem key={d.id} value={d.id}>{d.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-slate-400">{t("communeLabel")}</Label>
                <Select value={form.communeId} onValueChange={(v) => setForm({ ...form, communeId: v, fokontanyId: "" })} disabled={!form.districtId}>
                  <SelectTrigger className="mt-1 bg-slate-900/50 border-slate-700 text-white"><SelectValue placeholder="..." /></SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">{communes.map((c) => <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-slate-400">{t("fokontanyLabel")}</Label>
                <Select value={form.fokontanyId} onValueChange={(v) => setForm({ ...form, fokontanyId: v })} disabled={!form.communeId}>
                  <SelectTrigger className="mt-1 bg-slate-900/50 border-slate-700 text-white"><SelectValue placeholder="..." /></SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">{fokontany.map((f) => <SelectItem key={f.id} value={f.id}>{f.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <p className="text-xs font-medium text-slate-400">{t("gpsPosition")}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                  <div>Lat: <span className="font-mono">{form.gpsLat}</span></div>
                  <div>Lon: <span className="font-mono">{form.gpsLon}</span></div>
                  <div>± <span className="font-mono">{form.gpsAccuracy}m</span></div>
                </div>
                <Button variant="outline" size="sm" className="mt-2 text-xs border-slate-600 text-slate-300" onClick={() => toast.info("GPS capturé !")}>
                  {t("captureGps")}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-xs text-slate-400">{t("roleLabel")} - Filière {form.filiere.toUpperCase()}</Label>
              <RadioGroup value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserRole })} className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {availableRoles.map((r) => (
                  <label key={r.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                    ${form.role === r.value ? "border-amber-500 bg-amber-500/10" : "border-slate-700 hover:border-slate-600"}`}>
                    <RadioGroupItem value={r.value} className="mt-0.5 border-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-white">{r.label}</p>
                      <p className="text-xs text-slate-400">{r.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div>
                <Label className="text-xs text-slate-400 mt-4 block">{t("documents")}</Label>
                <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Photo CIN / Documents</p>
                  <Button variant="outline" size="sm" className="mt-2 border-slate-600 text-slate-300" onClick={() => toast.info("Upload simulé !")}>
                    {t("addDocument")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm font-medium text-white">{t("openingFees")}</p>
                <p className="text-3xl font-bold text-amber-500 mt-1">10 000 Ar</p>
                <p className="text-xs text-slate-400 mt-1">
                  {t("beneficiary")} : Commune {form.communeId ? communes.find(c => c.id === form.communeId)?.nom : "..."}
                </p>
              </div>

              <RadioGroup value={form.paymentMethod} onValueChange={(v) => setForm({ ...form, paymentMethod: v })} className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600">
                  <RadioGroupItem value="mobile_money" className="border-slate-500" />
                  <span className="text-sm text-slate-300">Mobile Money (mVola / Orange Money / Airtel Money)</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600">
                  <RadioGroupItem value="paositra_money" className="border-slate-500" />
                  <span className="text-sm text-slate-300">Paositra Money</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600">
                  <RadioGroupItem value="especes" className="border-slate-500" />
                  <span className="text-sm text-slate-300">Espèces (Guichet)</span>
                </label>
              </RadioGroup>

              <div className="bg-mada-green/10 border border-mada-green/20 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-mada-green shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  Le paiement sera tracé. Votre compte sera activé après validation par l'agent communal.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
                {t("previous")}
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold">
              {step < 4 ? t("next") : t("confirm")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
