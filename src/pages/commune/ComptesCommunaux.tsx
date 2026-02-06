import { useLanguage } from "@/context/LanguageContext";
import { demoUsers } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";

export default function ComptesCommunaux() {
  const { t } = useLanguage();
  const accounts = demoUsers.filter((u) => ["orpailleur", "collecteur"].includes(u.role) && u.commune === "Ambanja");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("localAccounts")}</h1>
      <div className="space-y-3">
        {accounts.map((u) => (
          <Card key={u.id} className="shadow-sm border-slate-200">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-sm font-bold text-white">
                  {u.prenom[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{u.prenom} {u.nom}</p>
                  <p className="text-xs text-slate-500 capitalize">{u.role} • {u.telephone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">{t("active")}</Badge>
                <Button variant="ghost" size="sm" onClick={() => toast.info(t("suspendAction"))}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}