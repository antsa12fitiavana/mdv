import { QRCodeSVG } from "qrcode.react";
import { UserRole } from "@/data/mockData";
import { Coins, Leaf, Diamond, MapPin } from "lucide-react";

interface KarabolamenaCardProps {
    user: {
        id: string;
        nom: string;
        prenom?: string;
        role: UserRole;
        cin?: string;
        commune: string;
        filiere?: "or" | "bois" | "pierre";
    };
}

export function KarabolamenaCard({ user }: KarabolamenaCardProps) {
    const qrData = JSON.stringify({
        id: user.id,
        name: `${user.prenom} ${user.nom}`,
        role: user.role,
        cin: user.cin,
        commune: user.commune,
        valid: true,
    });

    const getFiliereIcon = () => {
        switch (user.filiere) {
            case "or": return <Coins className="w-6 h-6 text-amber-500" />;
            case "bois": return <Leaf className="w-6 h-6 text-emerald-500" />;
            case "pierre": return <Diamond className="w-6 h-6 text-blue-500" />;
            default: return <Coins className="w-6 h-6 text-slate-500" />;
        }
    };

    const getFiliereLabel = () => {
        switch (user.filiere) {
            case "or": return "ORPAILLEUR AGRÉÉ";
            case "bois": return "EXPLOITANT FORESTIER";
            case "pierre": return "ARTISAN MINIER";
            default: return user.role.toUpperCase().replace("_", " ");
        }
    };

    const getBackgroundColor = () => {
        switch (user.filiere) {
            case "or": return "from-amber-500 to-amber-700";
            case "bois": return "from-emerald-500 to-emerald-700";
            case "pierre": return "from-blue-500 to-blue-700";
            default: return "from-slate-700 to-slate-900";
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-2xl relative bg-white dark:bg-slate-900 group transition-transform hover:scale-[1.02]">
            {/* Header */}
            <div className={`h-24 bg-gradient-to-r ${getBackgroundColor()} p-4 relative`}>
                <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    {getFiliereIcon()}
                </div>
                <div className="text-white">
                    <h3 className="font-bold text-lg tracking-wider">KARABOLAMENA</h3>
                    <p className="text-xs opacity-90 font-medium">Carte Professionnelle Numérique</p>
                </div>

                {/* Strip */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 mada-stripe" />
            </div>

            {/* Content */}
            <div className="p-6 pt-12 relative">
                {/* Photo placeholder */}
                <div className="absolute -top-10 left-6 w-20 h-20 rounded-xl bg-slate-200 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-2xl font-bold text-slate-400">
                    {user.prenom?.[0] || user.nom[0]}
                </div>

                <div className="mt-2 space-y-4">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold">Titulaire</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                            {user.prenom} {user.nom}
                        </p>
                        {user.cin && <p className="text-sm text-slate-500 font-mono">CIN: {user.cin}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold">Statut</p>
                            <p className="font-medium text-amber-600 dark:text-amber-400 text-sm">
                                {getFiliereLabel()}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold">Validité</p>
                            <p className="font-medium text-slate-700 dark:text-slate-300 text-sm">12/2026</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 uppercase font-semibold mb-1">
                            <MapPin className="w-3 h-3" /> Zone autorisée
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.commune}</p>
                    </div>
                </div>

                {/* QR Code */}
                <div className="mt-6 flex justify-center">
                    <div className="p-2 bg-white rounded-lg shadow-inner border border-slate-100">
                        <QRCodeSVG value={qrData} size={100} />
                    </div>
                </div>

                <p className="text-center text-[10px] text-slate-400 mt-4">
                    Cette carte est personnelle et incessible. Scannez pour vérifier la validité.
                </p>
            </div>
        </div>
    );
}
