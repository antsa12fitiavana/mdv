import type { Filiere } from "./mockData";

export type PierreRole = 
  | "exploitant_pierre"
  | "collecteur_pierre"
  | "lapidaire"
  | "exportateur_pierre"
  | "commune_pierre"
  | "controleur_pierre";

export interface DemoUserPierre {
  id: string;
  nom: string;
  prenom: string;
  role: PierreRole;
  label: string;
  description: string;
  commune: string;
  region: string;
  telephone: string;
  email: string;
  status: "active" | "pending" | "suspended" | "blocked";
  cin?: string;
  nif?: string;
}

export const demoUsersPierre: DemoUserPierre[] = [
  {
    id: "P001",
    nom: "Randrianasolo",
    prenom: "Fidy",
    role: "exploitant_pierre",
    label: "Exploitant Pierres",
    description: "Exploitant de saphirs – Ilakaka",
    commune: "Ilakaka",
    region: "Ihorombe",
    telephone: "034 56 789 01",
    email: "fidy.randria@demo.mg",
    status: "active",
    cin: "201 012 345 678",
  },
  {
    id: "P002",
    nom: "Rasoanaivo",
    prenom: "Bako",
    role: "collecteur_pierre",
    label: "Collecteur Pierres",
    description: "Négociant agréé – Ihorombe",
    commune: "Ilakaka",
    region: "Ihorombe",
    telephone: "033 45 678 90",
    email: "bako.raso@demo.mg",
    status: "active",
    cin: "201 022 345 679",
    nif: "2024-P-00456",
  },
  {
    id: "P003",
    nom: "Gems Madagascar",
    prenom: "",
    role: "lapidaire",
    label: "Lapidaire",
    description: "Atelier de taille – Antsirabe",
    commune: "Antsirabe",
    region: "Vakinankaratra",
    telephone: "020 44 567 89",
    email: "contact@gemsmada.mg",
    status: "active",
    nif: "NIF-2024-P-00123",
  },
  {
    id: "P004",
    nom: "Madagascar Gems Export",
    prenom: "",
    role: "exportateur_pierre",
    label: "Exportateur Pierres",
    description: "Exportateur agréé – Antananarivo",
    commune: "Antananarivo",
    region: "Analamanga",
    telephone: "020 22 890 12",
    email: "export@madagems.mg",
    status: "active",
    nif: "NIF-2024-EXP-001",
  },
  {
    id: "P005",
    nom: "Andriamihaja",
    prenom: "Zo",
    role: "commune_pierre",
    label: "Agent Commune",
    description: "Agent communal – Ilakaka",
    commune: "Ilakaka",
    region: "Ihorombe",
    telephone: "032 12 345 67",
    email: "zo.andria@commune.mg",
    status: "active",
  },
  {
    id: "P006",
    nom: "Rakotonirina",
    prenom: "Haja",
    role: "controleur_pierre",
    label: "Contrôleur Mines",
    description: "Contrôleur BCMM – Ihorombe",
    commune: "Ilakaka",
    region: "Ihorombe",
    telephone: "034 67 890 12",
    email: "haja.rakoto@mines.mg",
    status: "active",
  },
];

export type StoneFamily = "precious" | "semi_precious" | "industrial" | "crystal";

export type LotPierreStatus =
  | "declared"
  | "available"
  | "reserved"
  | "in_transfer"
  | "blocked"
  | "seized"
  | "transformed"
  | "export_ready"
  | "exported"
  | "closed";

export interface LotPierre {
  id: string;
  filiere: "pierre";
  stoneType: string;
  family: StoneFamily;
  quantity: number;
  unit: "carat" | "gram" | "piece";
  declaredAt: string;
  declaredBy: string;
  currentOwner: string;
  status: LotPierreStatus;
  qrCode: string;
  gpsLat: number;
  gpsLon: number;
  color?: string;
  clarity?: string;
  shape?: string;
  photos?: string[];
  parentLotId?: string;
  notes?: string;
}

export const mockLotsPierre: LotPierre[] = [
  {
    id: "LOT-PIE-2025-0001",
    filiere: "pierre",
    stoneType: "Saphir bleu",
    family: "precious",
    quantity: 45.5,
    unit: "carat",
    declaredAt: "2025-12-01T09:00:00",
    declaredBy: "P001",
    currentOwner: "P001",
    status: "available",
    qrCode: "QR-PIE-0001",
    gpsLat: -22.6752,
    gpsLon: 45.3567,
    color: "Bleu royal",
    clarity: "VVS",
    notes: "Zone Ilakaka nord",
  },
  {
    id: "LOT-PIE-2025-0002",
    filiere: "pierre",
    stoneType: "Tourmaline",
    family: "semi_precious",
    quantity: 120,
    unit: "gram",
    declaredAt: "2025-12-02T10:30:00",
    declaredBy: "P001",
    currentOwner: "P001",
    status: "available",
    qrCode: "QR-PIE-0002",
    gpsLat: -22.6800,
    gpsLon: 45.3600,
    color: "Vert",
  },
  {
    id: "LOT-PIE-2025-0003",
    filiere: "pierre",
    stoneType: "Rubis",
    family: "precious",
    quantity: 22.3,
    unit: "carat",
    declaredAt: "2025-11-28T14:00:00",
    declaredBy: "P001",
    currentOwner: "P002",
    status: "available",
    qrCode: "QR-PIE-0003",
    gpsLat: -22.6780,
    gpsLon: 45.3580,
    color: "Rouge pigeon",
    clarity: "VS",
  },
  {
    id: "LOT-PIE-2025-0004",
    filiere: "pierre",
    stoneType: "Saphir rose",
    family: "precious",
    quantity: 85,
    unit: "carat",
    declaredAt: "2025-11-25T11:00:00",
    declaredBy: "P002",
    currentOwner: "P003",
    status: "transformed",
    qrCode: "QR-PIE-0004",
    gpsLat: -19.8658,
    gpsLon: 47.0333,
    notes: "Taillé et poli",
  },
  {
    id: "LOT-PIE-2025-0005",
    filiere: "pierre",
    stoneType: "Saphir bleu",
    family: "precious",
    quantity: 150,
    unit: "carat",
    declaredAt: "2025-11-20T09:00:00",
    declaredBy: "P003",
    currentOwner: "P004",
    status: "export_ready",
    qrCode: "QR-PIE-0005",
    gpsLat: -18.9137,
    gpsLon: 47.5361,
    clarity: "IF",
    notes: "Lot consolidé prêt export",
  },
];

export interface TransactionPierre {
  id: string;
  sellerId: string;
  buyerId: string;
  status: "draft" | "pending_payment" | "paid" | "cancelled" | "failed";
  totalAmount: number;
  currency: string;
  createdAt: string;
  confirmedAt?: string;
  lots: string[];
}

export const mockTransactionsPierre: TransactionPierre[] = [
  {
    id: "TXN-PIE-2025-0001",
    sellerId: "P001",
    buyerId: "P002",
    status: "paid",
    totalAmount: 8500000,
    currency: "Ar",
    createdAt: "2025-11-29T10:00:00",
    confirmedAt: "2025-11-29T10:05:00",
    lots: ["LOT-PIE-2025-0003"],
  },
  {
    id: "TXN-PIE-2025-0002",
    sellerId: "P002",
    buyerId: "P003",
    status: "paid",
    totalAmount: 25000000,
    currency: "Ar",
    createdAt: "2025-11-26T14:30:00",
    confirmedAt: "2025-11-26T14:35:00",
    lots: ["LOT-PIE-2025-0004"],
  },
];

export const stoneFamilyLabels: Record<StoneFamily, string> = {
  precious: "Précieuse",
  semi_precious: "Semi-précieuse",
  industrial: "Industrielle",
  crystal: "Cristal",
};

export const lotPierreStatusLabels: Record<LotPierreStatus, string> = {
  declared: "Déclaré",
  available: "Disponible",
  reserved: "Réservé",
  in_transfer: "En transfert",
  blocked: "Bloqué",
  seized: "Saisi",
  transformed: "Transformé",
  export_ready: "Prêt export",
  exported: "Exporté",
  closed: "Clôturé",
};

export const lotPierreStatusColors: Record<LotPierreStatus, string> = {
  declared: "bg-muted text-muted-foreground",
  available: "bg-emerald-brand/10 text-emerald-brand",
  reserved: "bg-sapphire/10 text-sapphire",
  in_transfer: "bg-primary/10 text-primary",
  blocked: "bg-destructive/10 text-destructive",
  seized: "bg-destructive/15 text-destructive",
  transformed: "bg-sapphire/10 text-sapphire",
  export_ready: "bg-primary/10 text-primary",
  exported: "bg-emerald-brand/10 text-emerald-brand",
  closed: "bg-muted text-muted-foreground",
};
