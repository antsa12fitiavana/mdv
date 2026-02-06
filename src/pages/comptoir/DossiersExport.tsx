import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatAriary, formatDate } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, FileText, Plane } from "lucide-react";

export default function DossiersExport() {
  const { t } = useLanguage();
  const { exportsOr, lotsOr } = useData();
  const [selected, setSelected] = useState<string | null>(null);
  const dossier = selected ? exportsOr.find((d) => d.id === selected) : null;
  const lots = dossier ? lotsOr.filter((l) => dossier.lots.includes(l.id)) : [];

  const statusLabels: Record<string, string> = {
    draft: t("draftStatus"), ready_control: t("readyControl"), controlled: t("controlled"),
    sealed: t("sealed"), declared_customs: t("declaredCustoms"), exported: t("exported"), closed: t("closedStatus")
  };
  const statusColors: Record<string, string> = {
    draft: "bg-slate-100 text-slate-500", ready_control: "bg-blue-100 text-blue-700",
    controlled: "bg-blue-100 text-blue-700", sealed: "bg-emerald-100 text-emerald-700",
    declared_customs: "bg-amber-100 text-amber-700", exported: "bg-emerald-100 text-emerald-700",
    closed: "bg-slate-100 text-slate-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{t("exportDossiers")}</h1>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => toast.info(t("dossierCreated"))}>
          <Plus className="w-4 h-4 mr-1" /> {t("newDossier")}
        </Button>
      </div>

      <div className="space-y-3">
        {exportsOr.map((exp) => (
          <Card key={exp.id} className="shadow-sm cursor-pointer hover:shadow-md transition-shadow border-slate-200" onClick={() => setSelected(exp.id)}>
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50"><Plane className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{exp.id}</p>
                  <p className="text-xs text-slate-500">{exp.destination} • {exp.totalWeight}g • {formatAriary(exp.declaredValue)}</p>
                  <p className="text-xs text-slate-400">{formatDate(exp.createdAt)}</p>
                </div>
              </div>
              <Badge className={statusColors[exp.status]} variant="secondary">{statusLabels[exp.status]}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!dossier} onOpenChange={() => setSelected(null)}>
        {dossier && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-bold">{dossier.id}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="lots">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lots">{t("lots")}</TabsTrigger>
                <TabsTrigger value="docs">{t("documents")}</TabsTrigger>
                <TabsTrigger value="timeline">{t("timeline")}</TabsTrigger>
              </TabsList>
              <TabsContent value="lots" className="space-y-3 mt-4">
                {lots.length > 0 ? lots.map((l) => (
                  <div key={l.id} className="flex justify-between p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                    <span>{l.id} — {l.productType}</span>
                    <span className="font-medium">{l.quantity} {l.unit}</span>
                  </div>
                )) : <p className="text-sm text-slate-500 text-center py-4">{t("noLotAdded")}</p>}
              </TabsContent>
              <TabsContent value="docs" className="mt-4">
                <div className="space-y-2 text-sm">
                  <p className="text-slate-500 flex items-center gap-1"><FileText className="w-3 h-3" /> {t("inventoryPdf")}</p>
                  <p className="text-slate-500 flex items-center gap-1"><FileText className="w-3 h-3" /> {t("consolidatedInvoices")}</p>
                  <p className="text-slate-500 flex items-center gap-1"><FileText className="w-3 h-3" /> {t("traceabilityCerts")}</p>
                </div>
              </TabsContent>
              <TabsContent value="timeline" className="mt-4">
                <div className="space-y-3">
                  <div className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div><p className="font-medium">{t("dossierCreatedLabel")}</p><p className="text-xs text-slate-500">{formatDate(dossier.createdAt)}</p></div>
                  </div>
                  {dossier.status !== "draft" && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div><p className="font-medium">{t("submittedControl")}</p><p className="text-xs text-slate-500">{t("pending")}</p></div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4" onClick={() => toast.success(t("dossierSubmitted"))}>
              {t("submitToControl")}
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}