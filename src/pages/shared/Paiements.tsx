import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatAriary, formatDate, demoUsers } from "@/data/mockData";
import { demoUsersPierre } from "@/data/mockDataPierre";
import { demoUsersBois } from "@/data/mockDataBois";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const statusColors: Record<string, string> = {
  success: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
  reversed: "bg-slate-100 text-slate-500",
};

export default function Paiements() {
  const { user, filiere } = useAuth();
  const { t } = useLanguage();
  const { paymentsOr } = useData();

  // Payments are currently only in Or mock data; for Pierre/Bois we show OR payments related to user
  const allUsers = filiere === "or" ? demoUsers : filiere === "pierre" ? demoUsersPierre : demoUsersBois;
  const payments = paymentsOr.filter((p) => p.payerActorId === user?.id || p.payeeActorId === user?.id);

  const getPayStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      success: t("paySuccess"), pending: t("payPending"), failed: t("payFailed"),
    };
    return map[status] || status;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("payments")}</h1>
      <div className="space-y-3">
        {payments.map((p) => {
          const isIncoming = p.payeeActorId === user?.id;
          const other = demoUsers.find((u) => u.id === (isIncoming ? p.payerActorId : p.payeeActorId));
          return (
            <Card key={p.id} className="shadow-sm border-slate-200">
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncoming ? "bg-emerald-50" : "bg-red-50"}`}>
                    {isIncoming ? <ArrowDownLeft className="w-5 h-5 text-emerald-500" /> : <ArrowUpRight className="w-5 h-5 text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {isIncoming ? t("receivedFrom") : t("paidTo")} {other ? `${other.prenom} ${other.nom}` : p.payeeActorId}
                    </p>
                    <p className="text-xs text-slate-500">
                      {p.channel === "mobile_money" ? `${t("mobileMoney")} (${p.operator})` : p.channel} • {p.externalRef}
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(p.initiatedAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${isIncoming ? "text-emerald-600" : "text-slate-900"}`}>
                    {isIncoming ? "+" : "-"}{formatAriary(p.amount)}
                  </p>
                  <Badge className={statusColors[p.status]} variant="secondary">
                    {getPayStatusLabel(p.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {payments.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">{t("noPayment")}</div>
        )}
      </div>
    </div>
  );
}