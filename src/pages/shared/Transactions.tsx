import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatAriary, formatDate, demoUsers } from "@/data/mockData";
import { demoUsersPierre } from "@/data/mockDataPierre";
import { demoUsersBois } from "@/data/mockDataBois";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft } from "lucide-react";

const txnStatusColors: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending_payment: "bg-amber-100 text-amber-700",
  cancelled: "bg-slate-100 text-slate-500",
  failed: "bg-red-100 text-red-700",
  draft: "bg-slate-100 text-slate-500",
};

export default function Transactions() {
  const { user, filiere } = useAuth();
  const { t } = useLanguage();
  const { transactionsOr, transactionsPierre, transactionsBois } = useData();

  const transactions = filiere === "or" ? transactionsOr : filiere === "pierre" ? transactionsPierre : transactionsBois;
  const allUsers = filiere === "or" ? demoUsers : filiere === "pierre" ? demoUsersPierre : demoUsersBois;
  
  const myTxns = transactions.filter((txn: any) => txn.sellerId === user?.id || txn.buyerId === user?.id);

  const getTxnStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      paid: t("txnPaid"), pending_payment: t("txnPending"),
      cancelled: t("txnCancelled"), failed: t("txnFailed"), draft: t("txnDraft"),
    };
    return map[status] || status;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("transactions")}</h1>
      <div className="space-y-3">
        {myTxns.map((txn: any) => {
          const isSeller = txn.sellerId === user?.id;
          const other = allUsers.find((u: any) => u.id === (isSeller ? txn.buyerId : txn.sellerId));
          return (
            <Card key={txn.id} className="shadow-sm border-slate-200">
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSeller ? "bg-red-50" : "bg-emerald-50"}`}>
                    <ArrowRightLeft className={`w-5 h-5 ${isSeller ? "text-red-500" : "text-emerald-500"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{txn.id}</p>
                    <p className="text-xs text-slate-500">
                      {isSeller ? t("soldTo") : t("boughtFrom")} {other ? `${other.prenom} ${other.nom}` : "—"} • {txn.lots.join(", ")}
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(txn.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{formatAriary(txn.totalAmount)}</p>
                  <Badge className={txnStatusColors[txn.status]} variant="secondary">
                    {getTxnStatusLabel(txn.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {myTxns.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">{t("noData")}</div>
        )}
      </div>
    </div>
  );
}