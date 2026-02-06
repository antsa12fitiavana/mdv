import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDate, lotStatusLabels, lotStatusColors, type Lot } from "@/data/mockData";
import { lotPierreStatusLabels, lotPierreStatusColors, stoneFamilyLabels, type LotPierre } from "@/data/mockDataPierre";
import { lotBoisStatusLabels, lotBoisStatusColors, woodCategoryLabels, type LotBois } from "@/data/mockDataBois";
import { Package, QrCode, MapPin } from "lucide-react";

export default function MesLots() {
  const { user, filiere } = useAuth();
  const { t } = useLanguage();
  const { lotsOr, lotsPierre, lotsBois } = useData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  // Get lots based on filiere
  const allLots = filiere === "or" ? lotsOr : filiere === "pierre" ? lotsPierre : lotsBois;
  
  const lots = allLots.filter((l: any) => {
    const ownerMatch = l.currentOwner === user?.id;
    const statusMatch = statusFilter === "all" || l.status === statusFilter;
    const searchMatch = !search || l.id.toLowerCase().includes(search.toLowerCase()) || 
      (filiere === "or" ? (l as Lot).productType : filiere === "pierre" ? (l as LotPierre).stoneType : (l as LotBois).essence)
        .toLowerCase().includes(search.toLowerCase());
    return ownerMatch && statusMatch && searchMatch;
  });

  const detail = selectedLot ? allLots.find((l: any) => l.id === selectedLot) : null;

  const getStatusLabel = (status: string) => {
    if (filiere === "or") return lotStatusLabels[status as keyof typeof lotStatusLabels] || status;
    if (filiere === "pierre") return lotPierreStatusLabels[status as keyof typeof lotPierreStatusLabels] || status;
    return lotBoisStatusLabels[status as keyof typeof lotBoisStatusLabels] || status;
  };
  const getStatusColor = (status: string) => {
    if (filiere === "or") return lotStatusColors[status as keyof typeof lotStatusColors] || "";
    if (filiere === "pierre") return lotPierreStatusColors[status as keyof typeof lotPierreStatusColors] || "";
    return lotBoisStatusColors[status as keyof typeof lotBoisStatusColors] || "";
  };
  const getLotDescription = (lot: any) => {
    if (filiere === "or") return `${lot.productType} • ${lot.quantity} ${lot.unit}`;
    if (filiere === "pierre") return `${lot.stoneType} (${stoneFamilyLabels[lot.family]}) • ${lot.quantity} ${lot.unit}`;
    return `${lot.essence} [${woodCategoryLabels[lot.category]}] • ${lot.volume} ${lot.unit}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("myLots")}</h1>

      <div className="flex gap-3 flex-wrap">
        <Input
          placeholder={t("searchLot")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="available">{t("available")}</SelectItem>
            <SelectItem value="blocked">{t("lotBlocked")}</SelectItem>
            <SelectItem value="export_ready">{t("exportReady")}</SelectItem>
            <SelectItem value="transformed">{t("transformed")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {lots.map((lot: any) => (
          <Card key={lot.id} className="shadow-sm cursor-pointer hover:shadow-md transition-shadow border-slate-200" onClick={() => setSelectedLot(lot.id)}>
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <Package className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{lot.id}</p>
                  <p className="text-xs text-slate-500">{getLotDescription(lot)} • {formatDate(lot.declaredAt)}</p>
                </div>
              </div>
              <Badge className={getStatusColor(lot.status)} variant="secondary">
                {getStatusLabel(lot.status)}
              </Badge>
            </CardContent>
          </Card>
        ))}
        {lots.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            {t("noLotFound")}
          </div>
        )}
      </div>

      <Dialog open={!!detail} onOpenChange={() => setSelectedLot(null)}>
        {detail && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-bold">{(detail as any).id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
                <div className="w-24 h-24 mx-auto bg-slate-200 rounded-lg flex items-center justify-center mb-2">
                  <QrCode className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">{t("qrCode")}: {(detail as any).qrCode}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div><span className="text-slate-500 text-xs">{t("type")}</span><p className="font-medium">{filiere === "or" ? (detail as Lot).productType : filiere === "pierre" ? (detail as LotPierre).stoneType : (detail as LotBois).essence}</p></div>
                <div><span className="text-slate-500 text-xs">{t("quantity")}</span><p className="font-medium">{filiere === "bois" ? (detail as LotBois).volume : (detail as any).quantity} {(detail as any).unit}</p></div>
                <div><span className="text-slate-500 text-xs">{t("declaredOn")}</span><p className="font-medium">{formatDate((detail as any).declaredAt)}</p></div>
                <div><span className="text-slate-500 text-xs">{t("status")}</span><Badge className={getStatusColor((detail as any).status)} variant="secondary">{getStatusLabel((detail as any).status)}</Badge></div>
                <div className="col-span-2">
                  <span className="text-slate-500 text-xs">{t("gps")}</span>
                  <p className="font-mono text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{(detail as any).gpsLat}, {(detail as any).gpsLon}</p>
                </div>
                {(detail as any).notes && <div className="col-span-2"><span className="text-slate-500 text-xs">{t("notes")}</span><p>{(detail as any).notes}</p></div>}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={(detail as any).status !== "available"}>
                  {t("sell")}
                </Button>
                <Button variant="outline" className="flex-1">
                  {t("history")}
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}