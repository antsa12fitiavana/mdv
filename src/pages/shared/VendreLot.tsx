import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { demoUsers, formatAriary } from "@/data/mockData";
import { demoUsersPierre } from "@/data/mockDataPierre";
import { demoUsersBois } from "@/data/mockDataBois";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle, CreditCard } from "lucide-react";

export default function VendreLot() {
  const { user, filiere } = useAuth();
  const { t } = useLanguage();
  const { lotsOr, lotsPierre, lotsBois } = useData();
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");
  const [selectedLotId, setSelectedLotId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [price, setPrice] = useState("");

  const allLots = filiere === "or" ? lotsOr : filiere === "pierre" ? lotsPierre : lotsBois;
  const availableLots = allLots.filter((l: any) => l.currentOwner === user?.id && l.status === "available");
  const selectedLot = allLots.find((l: any) => l.id === selectedLotId) as any;

  const allUsers = filiere === "or" ? demoUsers : filiere === "pierre" ? demoUsersPierre : demoUsersBois;
  const buyers = allUsers.filter((u: any) => u.id !== user?.id);
  const buyer = allUsers.find((u: any) => u.id === buyerId) as any;

  const getLotLabel = (l: any) => {
    if (filiere === "or") return `${l.id} — ${l.productType} • ${l.quantity} ${l.unit}`;
    if (filiere === "pierre") return `${l.id} — ${l.stoneType} • ${l.quantity} ${l.unit}`;
    return `${l.id} — ${l.essence} • ${l.volume} ${l.unit}`;
  };

  const handleConfirm = () => {
    toast.success(t("paymentConfirmed"));
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-sm border-emerald-200">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t("transferDone")}</h2>
            <p className="text-sm text-slate-500">
              {t("lotTransferred")} {buyer?.prenom} {buyer?.nom}
            </p>
            <p className="text-lg font-bold text-emerald-600">{formatAriary(Number(price))}</p>
            <p className="text-xs text-slate-500">{t("invoiceGenerated")} • Réf: FAC-2025-0099</p>
            <Button variant="outline" onClick={() => { setStep("select"); setSelectedLotId(""); setPrice(""); }}>
              {t("newSale")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">{t("confirmSale")}</h1>
        <Card className="shadow-sm border-slate-200">
          <CardContent className="pt-6 space-y-4">
            <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm border border-slate-200">
              <div className="flex justify-between"><span className="text-slate-500">{t("lot")}:</span><span className="font-medium">{selectedLotId}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{t("buyer")}:</span><span>{buyer?.prenom} {buyer?.nom}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{t("amount")}:</span><span className="font-bold text-emerald-600">{formatAriary(Number(price))}</span></div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-blue-700">{t("paymentVia")}</p>
                <p className="text-xs text-blue-600 mt-0.5">{t("paymentStatus")}: <span className="font-medium">{t("waitingConfirm")}</span></p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep("select")}>{t("cancelAction")}</Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleConfirm}>
                {t("confirmPayment")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("sellALot")}</h1>

      <Card className="shadow-sm border-slate-200">
        <CardHeader><CardTitle className="text-base">{t("saleDetails")}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-slate-500">{t("selectALot")}</Label>
            <Select value={selectedLotId} onValueChange={setSelectedLotId}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t("chooseLot")} /></SelectTrigger>
              <SelectContent>
                {availableLots.map((l: any) => (
                  <SelectItem key={l.id} value={l.id}>{getLotLabel(l)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-slate-500">{t("buyer")}</Label>
            <Select value={buyerId} onValueChange={setBuyerId}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t("choose")} /></SelectTrigger>
              <SelectContent>
                {buyers.map((b: any) => (
                  <SelectItem key={b.id} value={b.id}>{b.prenom} {b.nom} ({b.label})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-slate-500">{t("price")}</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1 500 000" className="mt-1" />
          </div>
          <Button
            onClick={() => setStep("confirm")}
            disabled={!selectedLotId || !buyerId || !price}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            {t("proceed")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}