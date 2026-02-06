export type BoisRole = 
  | "exploitant_bois"
  | "collecteur_bois"
  | "transformateur_bois"
  | "exportateur_bois"
  | "commune_bois"
  | "controleur_bois";

export interface DemoUserBois {
  id: string;
  nom: string;
  prenom: string;
  role: BoisRole;
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

export const demoUsersBois: DemoUserBois[] = [
  {
    id: "B001",
    nom: "Ramaroson",
    prenom: "Tiana",
    role: "exploitant_bois",
    label: "Exploitant Bois",
    description: "Exploitant forestier – Moramanga",
    commune: "Moramanga",
    region: "Alaotra-Mangoro",
    telephone: "034 78 901 23",
    email: "tiana.ramaro@demo.mg",
    status: "active",
    cin: "301 012 345 678",
  },
  {
    id: "B002",
    nom: "Razafindrakoto",
    prenom: "Lova",
    role: "collecteur_bois",
    label: "Collecteur Bois",
    description: "Négociant agréé – Alaotra-Mangoro",
    commune: "Moramanga",
    region: "Alaotra-Mangoro",
    telephone: "033 56 789 01",
    email: "lova.razafin@demo.mg",
    status: "active",
    cin: "301 022 345 679",
    nif: "2024-B-00456",
  },
  {
    id: "B003",
    nom: "Menuiserie Mada",
    prenom: "",
    role: "transformateur_bois",
    label: "Transformateur",
    description: "Scierie & Menuiserie – Antsirabe",
    commune: "Antsirabe",
    region: "Vakinankaratra",
    telephone: "020 44 890 12",
    email: "contact@menuismada.mg",
    status: "active",
    nif: "NIF-2024-B-00123",
  },
  {
    id: "B004",
    nom: "Madagascar Wood Export",
    prenom: "",
    role: "exportateur_bois",
    label: "Exportateur Bois",
    description: "Exportateur agréé – Toamasina",
    commune: "Toamasina",
    region: "Atsinanana",
    telephone: "020 53 456 78",
    email: "export@madawood.mg",
    status: "active",
    nif: "NIF-2024-EXP-B01",
  },
  {
    id: "B005",
    nom: "Andrianjafy",
    prenom: "Noro",
    role: "commune_bois",
    label: "Agent Commune",
    description: "Agent communal – Moramanga",
    commune: "Moramanga",
    region: "Alaotra-Mangoro",
    telephone: "032 23 456 78",
    email: "noro.andria@commune.mg",
    status: "active",
  },
  {
    id: "B006",
    nom: "Rabemananjara",
    prenom: "Solo",
    role: "controleur_bois",
    label: "Contrôleur Forêts",
    description: "Agent DREDD – Alaotra-Mangoro",
    commune: "Moramanga",
    region: "Alaotra-Mangoro",
    telephone: "034 89 012 34",
    email: "solo.rabema@forets.mg",
    status: "active",
  },
];

export type WoodCategory = "A" | "B" | "C";

export type LotBoisStatus =
  | "declared"
  | "available"
  | "reserved"
  | "in_transfer"
  | "in_transport"
  | "blocked"
  | "seized"
  | "transformed"
  | "export_ready"
  | "exported"
  | "closed";

export interface LotBois {
  id: string;
  filiere: "bois";
  essence: string;
  category: WoodCategory;
  volume: number;
  unit: "m3" | "piece" | "bille";
  declaredAt: string;
  declaredBy: string;
  currentOwner: string;
  status: LotBoisStatus;
  qrCode: string;
  gpsLat: number;
  gpsLon: number;
  forestLocation?: string;
  photos?: string[];
  parentLotId?: string;
  notes?: string;
  transportBon?: string;
}

export const mockLotsBois: LotBois[] = [
  {
    id: "LOT-BOI-2025-0001",
    filiere: "bois",
    essence: "Palissandre",
    category: "B",
    volume: 2.5,
    unit: "m3",
    declaredAt: "2025-12-01T08:00:00",
    declaredBy: "B001",
    currentOwner: "B001",
    status: "available",
    qrCode: "QR-BOI-0001",
    gpsLat: -18.9470,
    gpsLon: 48.4270,
    forestLocation: "Forêt Ankeniheny-Zahamena",
    notes: "Coupe autorisée",
  },
  {
    id: "LOT-BOI-2025-0002",
    filiere: "bois",
    essence: "Eucalyptus",
    category: "C",
    volume: 8,
    unit: "m3",
    declaredAt: "2025-12-02T09:30:00",
    declaredBy: "B001",
    currentOwner: "B001",
    status: "available",
    qrCode: "QR-BOI-0002",
    gpsLat: -18.9500,
    gpsLon: 48.4300,
    forestLocation: "Plantation Moramanga",
  },
  {
    id: "LOT-BOI-2025-0003",
    filiere: "bois",
    essence: "Bois de rose",
    category: "A",
    volume: 0.5,
    unit: "m3",
    declaredAt: "2025-11-28T14:00:00",
    declaredBy: "B001",
    currentOwner: "B001",
    status: "blocked",
    qrCode: "QR-BOI-0003",
    gpsLat: -18.9480,
    gpsLon: 48.4280,
    notes: "Catégorie A - Export interdit",
  },
  {
    id: "LOT-BOI-2025-0004",
    filiere: "bois",
    essence: "Palissandre",
    category: "B",
    volume: 5,
    unit: "m3",
    declaredAt: "2025-11-25T10:00:00",
    declaredBy: "B001",
    currentOwner: "B002",
    status: "available",
    qrCode: "QR-BOI-0004",
    gpsLat: -18.9460,
    gpsLon: 48.4260,
    transportBon: "BON-T-2025-001",
  },
  {
    id: "LOT-BOI-2025-0005",
    filiere: "bois",
    essence: "Eucalyptus",
    category: "C",
    volume: 15,
    unit: "m3",
    declaredAt: "2025-11-20T08:00:00",
    declaredBy: "B002",
    currentOwner: "B003",
    status: "transformed",
    qrCode: "QR-BOI-0005",
    gpsLat: -19.8658,
    gpsLon: 47.0333,
    notes: "Scié en planches",
  },
  {
    id: "LOT-BOI-2025-0006",
    filiere: "bois",
    essence: "Teck",
    category: "B",
    volume: 10,
    unit: "m3",
    declaredAt: "2025-11-18T09:00:00",
    declaredBy: "B002",
    currentOwner: "B004",
    status: "export_ready",
    qrCode: "QR-BOI-0006",
    gpsLat: -18.1492,
    gpsLon: 49.4022,
    notes: "Prêt pour export Toamasina",
  },
  {
    id: "LOT-BOI-2025-0007",
    filiere: "bois",
    essence: "Pin",
    category: "C",
    volume: 20,
    unit: "m3",
    declaredAt: "2025-12-03T07:00:00",
    declaredBy: "B001",
    currentOwner: "B001",
    status: "available",
    qrCode: "QR-BOI-0007",
    gpsLat: -18.9510,
    gpsLon: 48.4310,
    forestLocation: "Plantation Andasibe",
  },
  {
    id: "LOT-BOI-2025-0008",
    filiere: "bois",
    essence: "Acacia",
    category: "C",
    volume: 12,
    unit: "m3",
    declaredAt: "2025-12-04T10:00:00",
    declaredBy: "B001",
    currentOwner: "B002",
    status: "in_transport",
    qrCode: "QR-BOI-0008",
    gpsLat: -18.9520,
    gpsLon: 48.4320,
    transportBon: "BON-T-2025-002",
  },
  {
    id: "LOT-BOI-2025-0009",
    filiere: "bois",
    essence: "Noyer de Madagascar",
    category: "B",
    volume: 3.5,
    unit: "m3",
    declaredAt: "2025-12-05T08:30:00",
    declaredBy: "B002",
    currentOwner: "B003",
    status: "transformed",
    qrCode: "QR-BOI-0009",
    gpsLat: -19.8665,
    gpsLon: 47.0345,
    notes: "Menuiserie fine",
  },
  {
    id: "LOT-BOI-2025-0010",
    filiere: "bois",
    essence: "Teck",
    category: "B",
    volume: 25,
    unit: "m3",
    declaredAt: "2025-11-15T09:00:00",
    declaredBy: "B002",
    currentOwner: "B004",
    status: "exported",
    qrCode: "QR-BOI-0010",
    gpsLat: -18.1495,
    gpsLon: 49.4025,
    notes: "Exporté vers Maurice",
  },
  {
    id: "LOT-BOI-2025-0011",
    filiere: "bois",
    essence: "Ravintsara",
    category: "C",
    volume: 6,
    unit: "m3",
    declaredAt: "2025-12-06T11:00:00",
    declaredBy: "B001",
    currentOwner: "B001",
    status: "declared",
    qrCode: "QR-BOI-0011",
    gpsLat: -18.9530,
    gpsLon: 48.4330,
    notes: "En attente validation",
  },
];

export interface TransactionBois {
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

export const mockTransactionsBois: TransactionBois[] = [
  {
    id: "TXN-BOI-2025-0001",
    sellerId: "B001",
    buyerId: "B002",
    status: "paid",
    totalAmount: 4500000,
    currency: "Ar",
    createdAt: "2025-11-26T10:00:00",
    confirmedAt: "2025-11-26T10:05:00",
    lots: ["LOT-BOI-2025-0004"],
  },
  {
    id: "TXN-BOI-2025-0002",
    sellerId: "B002",
    buyerId: "B003",
    status: "paid",
    totalAmount: 12000000,
    currency: "Ar",
    createdAt: "2025-11-21T14:30:00",
    confirmedAt: "2025-11-21T14:35:00",
    lots: ["LOT-BOI-2025-0005"],
  },
  {
    id: "TXN-BOI-2025-0003",
    sellerId: "B001",
    buyerId: "B002",
    status: "paid",
    totalAmount: 8400000,
    currency: "Ar",
    createdAt: "2025-12-04T10:30:00",
    confirmedAt: "2025-12-04T10:35:00",
    lots: ["LOT-BOI-2025-0008"],
  },
  {
    id: "TXN-BOI-2025-0004",
    sellerId: "B002",
    buyerId: "B003",
    status: "paid",
    totalAmount: 5600000,
    currency: "Ar",
    createdAt: "2025-12-05T09:00:00",
    confirmedAt: "2025-12-05T09:05:00",
    lots: ["LOT-BOI-2025-0009"],
  },
  {
    id: "TXN-BOI-2025-0005",
    sellerId: "B002",
    buyerId: "B004",
    status: "paid",
    totalAmount: 35000000,
    currency: "Ar",
    createdAt: "2025-11-16T08:00:00",
    confirmedAt: "2025-11-16T08:10:00",
    lots: ["LOT-BOI-2025-0010"],
  },
  {
    id: "TXN-BOI-2025-0006",
    sellerId: "B003",
    buyerId: "B004",
    status: "pending_payment",
    totalAmount: 18000000,
    currency: "Ar",
    createdAt: "2025-12-06T11:00:00",
    lots: ["LOT-BOI-2025-0006"],
  },
];

export interface TransportBon {
  id: string;
  lotId: string;
  vehicleNumber: string;
  driver: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate?: string;
  status: "active" | "completed" | "cancelled";
  qrCode: string;
}

export const mockTransportBons: TransportBon[] = [
  {
    id: "BON-T-2025-001",
    lotId: "LOT-BOI-2025-0004",
    vehicleNumber: "1234 TAB",
    driver: "Jean Rakoto",
    origin: "Moramanga",
    destination: "Antsirabe",
    departureDate: "2025-11-26T06:00:00",
    arrivalDate: "2025-11-26T14:00:00",
    status: "completed",
    qrCode: "QR-BON-T-001",
  },
  {
    id: "BON-T-2025-002",
    lotId: "LOT-BOI-2025-0008",
    vehicleNumber: "5678 TAC",
    driver: "Paul Randria",
    origin: "Moramanga",
    destination: "Antsirabe",
    departureDate: "2025-12-04T07:00:00",
    status: "active",
    qrCode: "QR-BON-T-002",
  },
  {
    id: "BON-T-2025-003",
    lotId: "LOT-BOI-2025-0006",
    vehicleNumber: "9012 TAD",
    driver: "Luc Rabe",
    origin: "Moramanga",
    destination: "Toamasina",
    departureDate: "2025-11-18T05:00:00",
    arrivalDate: "2025-11-18T12:00:00",
    status: "completed",
    qrCode: "QR-BON-T-003",
  },
];

export const woodCategoryLabels: Record<WoodCategory, string> = {
  A: "Catégorie A (Protégé)",
  B: "Catégorie B (Réglementé)",
  C: "Catégorie C (Libre)",
};

export const woodCategoryColors: Record<WoodCategory, string> = {
  A: "bg-destructive/10 text-destructive",
  B: "bg-primary/10 text-primary",
  C: "bg-emerald-brand/10 text-emerald-brand",
};

export const lotBoisStatusLabels: Record<LotBoisStatus, string> = {
  declared: "Déclaré",
  available: "Disponible",
  reserved: "Réservé",
  in_transfer: "En transfert",
  in_transport: "En transport",
  blocked: "Bloqué",
  seized: "Saisi",
  transformed: "Transformé",
  export_ready: "Prêt export",
  exported: "Exporté",
  closed: "Clôturé",
};

export const lotBoisStatusColors: Record<LotBoisStatus, string> = {
  declared: "bg-muted text-muted-foreground",
  available: "bg-emerald-brand/10 text-emerald-brand",
  reserved: "bg-sapphire/10 text-sapphire",
  in_transfer: "bg-primary/10 text-primary",
  in_transport: "bg-timber/10 text-timber",
  blocked: "bg-destructive/10 text-destructive",
  seized: "bg-destructive/15 text-destructive",
  transformed: "bg-timber/10 text-timber",
  export_ready: "bg-primary/10 text-primary",
  exported: "bg-emerald-brand/10 text-emerald-brand",
  closed: "bg-muted text-muted-foreground",
};

export const essencesByCategory: Record<WoodCategory, string[]> = {
  A: ["Bois de rose", "Ébène", "Palissandre noir"],
  B: ["Palissandre", "Teck", "Noyer de Madagascar"],
  C: ["Eucalyptus", "Pin", "Acacia", "Ravintsara"],
};
