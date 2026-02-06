import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatDate, type RegistrationRequest } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileText, MapPin } from "lucide-react";

export default function DemandesInscription() {
  const { t } = useLanguage();
  const { registrationsOr, updateRegistrationOr } = useData();
  const [selected, setSelected] = useState<RegistrationRequest | null>(null);
  const [justification, setJustification] = useState("");

  const handleAction = (id: string, action: "approved" | "rejected") => {
    updateRegistrationOr(id, { status: action });
    setSelected(null);
    setJustification("");
    toast.success(action === "approved" ? t("registrationValidated") : t("registrationRefused"));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("registrationRequests")}</h1>

      <div className="space-y-3">
        {registrationsOr.map((req) => (
          <Card key={req.id} className="shadow-sm cursor-pointer hover:shadow-md transition-shadow border-slate-200" onClick={() => setSelected(req)}>
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                  {req.prenom[0]}{req.nom[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{req.prenom} {req.nom}</p>
                  <p className="text-xs text-slate-500 capitalize">{req.role} • {req.fokontany} • {formatDate(req.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={
                  req.paymentStatus === "paid" ? "bg-emerald-100 text-emerald-700" :
                  req.paymentStatus === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                }>
                  {req.paymentStatus === "paid" ? t("paid") : req.paymentStatus === "pending" ? t("unpaid") : t("exception")}
                </Badge>
                <Badge variant="secondary" className={
                  req.status === "pending" ? "bg-amber-100 text-amber-700" :
                  req.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }>
                  {req.status === "pending" ? t("pending") : req.status === "approved" ? t("validated") : t("rejected")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-bold">{t("request")}: {selected.prenom} {selected.nom}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div><span className="text-slate-500 text-xs">{t("cin")}</span><p className="font-medium">{selected.cin}</p></div>
                <div><span className="text-slate-500 text-xs">{t("telephone")}</span><p className="font-medium">{selected.telephone}</p></div>
                <div><span className="text-slate-500 text-xs">{t("roleLabel")}</span><p className="font-medium capitalize">{selected.role}</p></div>
                <div><span className="text-slate-500 text-xs">{t("fokontanyField")}</span><p className="font-medium">{selected.fokontany}</p></div>
                <div><span className="text-slate-500 text-xs">{t("gps")}</span><p className="font-mono text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{selected.gpsLat}, {selected.gpsLon}</p></div>
                <div><span className="text-slate-500 text-xs">{t("paymentOf")} 10 000 Ar</span>
                  <Badge variant="secondary" className={
                    selected.paymentStatus === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }>
                    {selected.paymentStatus === "paid" ? t("paid") : t("pending")}
                  </Badge>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> {t("attachments")}</p>
                <p className="text-xs text-slate-600">{t("cinPhoto")}</p>
              </div>

              {selected.status === "pending" && (
                <>
                  <Textarea
                    placeholder={t("justificationRequired")}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    rows={2}
                  />
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleAction(selected.id, "rejected")}
                      disabled={!justification}
                    >
                      {t("refuse")}
                    </Button>
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleAction(selected.id, "approved")}
                    >
                      {t("validate")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}