export type Filiere = "or" | "bois" | "pierre";

export type UserRole =
  | "orpailleur"
  | "collecteur"
  | "commune"
  | "controleur"
  | "comptoir"
  | "dirigeant"
  | "com";

export interface DemoUser {
  id: string;
  nom: string;
  prenom: string;
  role: UserRole;
  label: string;
  description: string;
  commune: string;
  region: string;
  telephone: string;
  email: string;
  status: "active" | "pending" | "suspended" | "blocked";
  cin?: string;
  nif?: string;
  avatar?: string;
}

export const demoUsers: DemoUser[] = [
  {
    id: "U001",
    nom: "Rakoto",
    prenom: "Jean",
    role: "orpailleur",
    label: "Orpailleur",
    description: "Orpailleur artisanal – Ambanja",
    commune: "Ambanja",
    region: "Diana",
    telephone: "034 12 345 67",
    email: "jean.rakoto@demo.mg",
    status: "active",
    cin: "101 012 345 678",
  },
  {
    id: "U008",
    nom: "Ramanampisoa",
    prenom: "Solo",
    role: "orpailleur",
    label: "Orpailleur",
    description: "Orpailleur artisanal – Maevatanana",
    commune: "Maevatanana",
    region: "Betsiboka",
    telephone: "034 23 456 78",
    email: "solo.rama@demo.mg",
    status: "active",
    cin: "102 012 345 679",
  },
  {
    id: "U009",
    nom: "Razafindrabe",
    prenom: "Feno",
    role: "orpailleur",
    label: "Orpailleur",
    description: "Orpailleur artisanal – Betsiaka",
    commune: "Betsiaka",
    region: "Diana",
    telephone: "034 34 567 89",
    email: "feno.razaf@demo.mg",
    status: "pending",
    cin: "101 023 456 780",
  },
  {
    id: "U002",
    nom: "Razafy",
    prenom: "Marie",
    role: "collecteur",
    label: "Collecteur",
    description: "Collectrice agréée – Diana",
    commune: "Ambanja",
    region: "Diana",
    telephone: "033 22 456 78",
    email: "marie.razafy@demo.mg",
    status: "active",
    cin: "101 022 345 679",
    nif: "2024-00456",
  },
  {
    id: "U010",
    nom: "Andriamampianina",
    prenom: "Rivo",
    role: "collecteur",
    label: "Collecteur",
    description: "Collecteur agréé – Betsiboka",
    commune: "Maevatanana",
    region: "Betsiboka",
    telephone: "033 45 678 90",
    email: "rivo.andria@demo.mg",
    status: "active",
    cin: "102 033 456 781",
    nif: "2024-00789",
  },
  {
    id: "U003",
    nom: "Andria",
    prenom: "Hery",
    role: "commune",
    label: "Agent Commune",
    description: "Agent communal – Commune Ambanja",
    commune: "Ambanja",
    region: "Diana",
    telephone: "032 11 789 01",
    email: "hery.andria@commune.mg",
    status: "active",
  },
  {
    id: "U004",
    nom: "Rabe",
    prenom: "Patrick",
    role: "controleur",
    label: "Contrôleur",
    description: "Contrôleur / Verbalisateur – Gendarmerie",
    commune: "Ambanja",
    region: "Diana",
    telephone: "034 55 123 45",
    email: "patrick.rabe@controle.mg",
    status: "active",
  },
  {
    id: "U005",
    nom: "Aurum SARL",
    prenom: "",
    role: "comptoir",
    label: "Comptoir",
    description: "Comptoir agréé – Antananarivo",
    commune: "Antananarivo",
    region: "Analamanga",
    telephone: "020 22 345 67",
    email: "contact@aurum.mg",
    status: "active",
    nif: "NIF-2024-00123",
  },
  {
    id: "U011",
    nom: "Gold Madagascar SARL",
    prenom: "",
    role: "comptoir",
    label: "Comptoir",
    description: "Comptoir agréé – Diego Suarez",
    commune: "Diego Suarez",
    region: "Diana",
    telephone: "020 82 456 78",
    email: "contact@goldmada.mg",
    status: "active",
    nif: "NIF-2024-00456",
  },
  {
    id: "U006",
    nom: "Nomena",
    prenom: "Lala",
    role: "dirigeant",
    label: "Dirigeant (MMRS)",
    description: "Ministre des Mines et Ressources Stratégiques",
    commune: "Antananarivo",
    region: "Analamanga",
    telephone: "020 22 000 01",
    email: "lala.nomena@mines.gov.mg",
    status: "active",
  },
  {
    id: "U007",
    nom: "Rasolofo",
    prenom: "Aina",
    role: "com",
    label: "COM",
    description: "Centrale de l'Or de Madagascar",
    commune: "Antananarivo",
    region: "Analamanga",
    telephone: "020 22 000 10",
    email: "aina.rasolofo@com.mg",
    status: "active",
  },
];

export type LotStatus =
  | "declared"
  | "available"
  | "reserved"
  | "in_transfer"
  | "blocked"
  | "seized"
  | "export_ready"
  | "exported"
  | "closed";

export interface Lot {
  id: string;
  filiere: Filiere;
  productType: string;
  quantity: number;
  unit: string;
  declaredAt: string;
  declaredBy: string;
  currentOwner: string;
  status: LotStatus;
  qrCode: string;
  gpsLat: number;
  gpsLon: number;
  parentLotId?: string;
  notes?: string;
}

export const mockLots: Lot[] = [
  {
    id: "LOT-OR-2025-0001",
    filiere: "or",
    productType: "Or brut",
    quantity: 15.5,
    unit: "g",
    declaredAt: "2025-12-01T08:30:00",
    declaredBy: "U001",
    currentOwner: "U001",
    status: "available",
    qrCode: "QR-LOT-0001",
    gpsLat: -13.6833,
    gpsLon: 48.4500,
    notes: "Zone Ambanja nord",
  },
  {
    id: "LOT-OR-2025-0002",
    filiere: "or",
    productType: "Pépites",
    quantity: 8.2,
    unit: "g",
    declaredAt: "2025-12-03T10:15:00",
    declaredBy: "U001",
    currentOwner: "U001",
    status: "available",
    qrCode: "QR-LOT-0002",
    gpsLat: -13.6900,
    gpsLon: 48.4550,
  },
  {
    id: "LOT-OR-2025-0003",
    filiere: "or",
    productType: "Or brut",
    quantity: 22.0,
    unit: "g",
    declaredAt: "2025-11-28T14:00:00",
    declaredBy: "U001",
    currentOwner: "U002",
    status: "available",
    qrCode: "QR-LOT-0003",
    gpsLat: -13.6850,
    gpsLon: 48.4480,
  },
  {
    id: "LOT-OR-2025-0004",
    filiere: "or",
    productType: "Concentré",
    quantity: 45.0,
    unit: "g",
    declaredAt: "2025-11-25T09:00:00",
    declaredBy: "U001",
    currentOwner: "U002",
    status: "available",
    qrCode: "QR-LOT-0004",
    gpsLat: -13.6800,
    gpsLon: 48.4520,
  },
  {
    id: "LOT-OR-2025-0005",
    filiere: "or",
    productType: "Or brut",
    quantity: 120.0,
    unit: "g",
    declaredAt: "2025-11-20T11:30:00",
    declaredBy: "U002",
    currentOwner: "U005",
    status: "export_ready",
    qrCode: "QR-LOT-0005",
    gpsLat: -18.9137,
    gpsLon: 47.5361,
    parentLotId: "LOT-OR-2025-CONS-01",
  },
  {
    id: "LOT-OR-2025-0006",
    filiere: "or",
    productType: "Or brut",
    quantity: 5.0,
    unit: "g",
    declaredAt: "2025-12-05T07:00:00",
    declaredBy: "U001",
    currentOwner: "U001",
    status: "blocked",
    qrCode: "QR-LOT-0006",
    gpsLat: -13.6870,
    gpsLon: 48.4490,
    notes: "Lot bloqué suite contrôle",
  },
  {
    id: "LOT-OR-2025-0007",
    filiere: "or",
    productType: "Pépites",
    quantity: 12.8,
    unit: "g",
    declaredAt: "2025-12-06T09:00:00",
    declaredBy: "U008",
    currentOwner: "U008",
    status: "available",
    qrCode: "QR-LOT-0007",
    gpsLat: -16.9400,
    gpsLon: 46.8333,
    notes: "Zone Maevatanana",
  },
  {
    id: "LOT-OR-2025-0008",
    filiere: "or",
    productType: "Or brut",
    quantity: 35.5,
    unit: "g",
    declaredAt: "2025-12-04T15:30:00",
    declaredBy: "U008",
    currentOwner: "U010",
    status: "available",
    qrCode: "QR-LOT-0008",
    gpsLat: -16.9450,
    gpsLon: 46.8380,
  },
  {
    id: "LOT-OR-2025-0009",
    filiere: "or",
    productType: "Concentré",
    quantity: 78.0,
    unit: "g",
    declaredAt: "2025-12-02T11:00:00",
    declaredBy: "U010",
    currentOwner: "U005",
    status: "available",
    qrCode: "QR-LOT-0009",
    gpsLat: -18.9140,
    gpsLon: 47.5365,
    notes: "Consolidé depuis Betsiboka",
  },
  {
    id: "LOT-OR-2025-0010",
    filiere: "or",
    productType: "Or brut",
    quantity: 18.3,
    unit: "g",
    declaredAt: "2025-12-07T08:00:00",
    declaredBy: "U009",
    currentOwner: "U009",
    status: "declared",
    qrCode: "QR-LOT-0010",
    gpsLat: -13.7100,
    gpsLon: 48.4600,
    notes: "En attente de validation",
  },
  {
    id: "LOT-OR-2025-0011",
    filiere: "or",
    productType: "Pépites",
    quantity: 6.5,
    unit: "g",
    declaredAt: "2025-11-30T14:00:00",
    declaredBy: "U001",
    currentOwner: "U002",
    status: "reserved",
    qrCode: "QR-LOT-0011",
    gpsLat: -13.6820,
    gpsLon: 48.4510,
    notes: "Réservé pour comptoir",
  },
  {
    id: "LOT-OR-2025-0012",
    filiere: "or",
    productType: "Or brut",
    quantity: 250.0,
    unit: "g",
    declaredAt: "2025-11-15T10:00:00",
    declaredBy: "U005",
    currentOwner: "U005",
    status: "exported",
    qrCode: "QR-LOT-0012",
    gpsLat: -18.9137,
    gpsLon: 47.5361,
    notes: "Exporté vers Dubaï",
  },
];

export interface Transaction {
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

export const mockTransactions: Transaction[] = [
  {
    id: "TXN-2025-0001",
    sellerId: "U001",
    buyerId: "U002",
    status: "paid",
    totalAmount: 1550000,
    currency: "Ar",
    createdAt: "2025-11-29T10:00:00",
    confirmedAt: "2025-11-29T10:05:00",
    lots: ["LOT-OR-2025-0003"],
  },
  {
    id: "TXN-2025-0002",
    sellerId: "U001",
    buyerId: "U002",
    status: "paid",
    totalAmount: 3150000,
    currency: "Ar",
    createdAt: "2025-11-26T14:30:00",
    confirmedAt: "2025-11-26T14:35:00",
    lots: ["LOT-OR-2025-0004"],
  },
  {
    id: "TXN-2025-0003",
    sellerId: "U002",
    buyerId: "U005",
    status: "paid",
    totalAmount: 12000000,
    currency: "Ar",
    createdAt: "2025-11-21T09:00:00",
    confirmedAt: "2025-11-21T09:10:00",
    lots: ["LOT-OR-2025-0005"],
  },
  {
    id: "TXN-2025-0004",
    sellerId: "U001",
    buyerId: "U002",
    status: "pending_payment",
    totalAmount: 820000,
    currency: "Ar",
    createdAt: "2025-12-05T11:00:00",
    lots: ["LOT-OR-2025-0002"],
  },
  {
    id: "TXN-2025-0005",
    sellerId: "U008",
    buyerId: "U010",
    status: "paid",
    totalAmount: 2485000,
    currency: "Ar",
    createdAt: "2025-12-04T16:00:00",
    confirmedAt: "2025-12-04T16:05:00",
    lots: ["LOT-OR-2025-0008"],
  },
  {
    id: "TXN-2025-0006",
    sellerId: "U010",
    buyerId: "U005",
    status: "paid",
    totalAmount: 5460000,
    currency: "Ar",
    createdAt: "2025-12-02T11:30:00",
    confirmedAt: "2025-12-02T11:35:00",
    lots: ["LOT-OR-2025-0009"],
  },
  {
    id: "TXN-2025-0007",
    sellerId: "U001",
    buyerId: "U002",
    status: "paid",
    totalAmount: 455000,
    currency: "Ar",
    createdAt: "2025-11-30T14:30:00",
    confirmedAt: "2025-11-30T14:35:00",
    lots: ["LOT-OR-2025-0011"],
  },
  {
    id: "TXN-2025-0008",
    sellerId: "U002",
    buyerId: "U011",
    status: "draft",
    totalAmount: 0,
    currency: "Ar",
    createdAt: "2025-12-07T08:00:00",
    lots: [],
  },
];

export interface Payment {
  id: string;
  transactionId?: string;
  feeId?: string;
  payerActorId: string;
  payeeActorId: string;
  channel: "mobile_money" | "card" | "bank" | "cash_declared";
  operator?: string;
  externalRef?: string;
  amount: number;
  status: "pending" | "success" | "failed" | "reversed";
  initiatedAt: string;
  confirmedAt?: string;
}

export const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    feeId: "FEE-001",
    payerActorId: "U001",
    payeeActorId: "COMMUNE-AMBANJA",
    channel: "mobile_money",
    operator: "mVola",
    externalRef: "MVOLA-2025-XYZ1",
    amount: 10000,
    status: "success",
    initiatedAt: "2025-10-15T08:00:00",
    confirmedAt: "2025-10-15T08:01:00",
  },
  {
    id: "PAY-002",
    transactionId: "TXN-2025-0001",
    payerActorId: "U002",
    payeeActorId: "U001",
    channel: "mobile_money",
    operator: "Orange Money",
    externalRef: "OM-2025-ABC2",
    amount: 1550000,
    status: "success",
    initiatedAt: "2025-11-29T10:02:00",
    confirmedAt: "2025-11-29T10:05:00",
  },
  {
    id: "PAY-003",
    transactionId: "TXN-2025-0003",
    payerActorId: "U005",
    payeeActorId: "U002",
    channel: "bank",
    externalRef: "BK-2025-DEF3",
    amount: 12000000,
    status: "success",
    initiatedAt: "2025-11-21T09:05:00",
    confirmedAt: "2025-11-21T09:10:00",
  },
  {
    id: "PAY-004",
    transactionId: "TXN-2025-0002",
    payerActorId: "U002",
    payeeActorId: "U001",
    channel: "mobile_money",
    operator: "mVola",
    externalRef: "MVOLA-2025-GHI4",
    amount: 3150000,
    status: "success",
    initiatedAt: "2025-11-26T14:32:00",
    confirmedAt: "2025-11-26T14:35:00",
  },
  {
    id: "PAY-005",
    transactionId: "TXN-2025-0005",
    payerActorId: "U010",
    payeeActorId: "U008",
    channel: "mobile_money",
    operator: "Airtel Money",
    externalRef: "AM-2025-JKL5",
    amount: 2485000,
    status: "success",
    initiatedAt: "2025-12-04T16:02:00",
    confirmedAt: "2025-12-04T16:05:00",
  },
  {
    id: "PAY-006",
    transactionId: "TXN-2025-0006",
    payerActorId: "U005",
    payeeActorId: "U010",
    channel: "bank",
    externalRef: "BK-2025-MNO6",
    amount: 5460000,
    status: "success",
    initiatedAt: "2025-12-02T11:32:00",
    confirmedAt: "2025-12-02T11:35:00",
  },
  {
    id: "PAY-007",
    feeId: "FEE-002",
    payerActorId: "U008",
    payeeActorId: "COMMUNE-MAEVATANANA",
    channel: "mobile_money",
    operator: "mVola",
    externalRef: "MVOLA-2025-PQR7",
    amount: 10000,
    status: "success",
    initiatedAt: "2025-12-01T07:30:00",
    confirmedAt: "2025-12-01T07:31:00",
  },
  {
    id: "PAY-008",
    transactionId: "TXN-2025-0004",
    payerActorId: "U002",
    payeeActorId: "U001",
    channel: "mobile_money",
    operator: "Orange Money",
    externalRef: "OM-2025-STU8",
    amount: 820000,
    status: "pending",
    initiatedAt: "2025-12-05T11:02:00",
  },
];


export interface Inspection {
  id: string;
  inspectorId: string;
  inspectedActorId: string;
  inspectedLotId: string;
  result: "ok" | "suspect" | "infraction";
  reasonCode?: string;
  notes?: string;
  gpsLat: number;
  gpsLon: number;
  createdAt: string;
}

export const mockInspections: Inspection[] = [
  {
    id: "CTRL-001",
    inspectorId: "U004",
    inspectedActorId: "U001",
    inspectedLotId: "LOT-OR-2025-0001",
    result: "ok",
    notes: "Lot conforme, documents en ordre",
    gpsLat: -13.6830,
    gpsLon: 48.4510,
    createdAt: "2025-12-02T14:00:00",
  },
  {
    id: "CTRL-002",
    inspectorId: "U004",
    inspectedActorId: "U001",
    inspectedLotId: "LOT-OR-2025-0006",
    result: "infraction",
    reasonCode: "DOCS_MANQUANTS",
    notes: "Facture absente, lot bloqué en attente vérification",
    gpsLat: -13.6870,
    gpsLon: 48.4490,
    createdAt: "2025-12-05T09:30:00",
  },
];

export interface RegistrationRequest {
  id: string;
  nom: string;
  prenom: string;
  cin: string;
  telephone: string;
  role: UserRole;
  commune: string;
  fokontany: string;
  gpsLat: number;
  gpsLon: number;
  paymentStatus: "paid" | "pending" | "exception";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const mockRegistrationRequests: RegistrationRequest[] = [
  {
    id: "REQ-001",
    nom: "Tsiry",
    prenom: "Fanilo",
    cin: "101 033 456 789",
    telephone: "034 56 789 01",
    role: "orpailleur",
    commune: "Ambanja",
    fokontany: "Ambatoharanana",
    gpsLat: -13.6855,
    gpsLon: 48.4512,
    paymentStatus: "paid",
    status: "pending",
    createdAt: "2025-12-06T07:30:00",
  },
  {
    id: "REQ-002",
    nom: "Bema",
    prenom: "Soa",
    cin: "101 044 567 890",
    telephone: "033 78 901 23",
    role: "orpailleur",
    commune: "Ambanja",
    fokontany: "Ambanja Centre",
    gpsLat: -13.6840,
    gpsLon: 48.4505,
    paymentStatus: "pending",
    status: "pending",
    createdAt: "2025-12-06T09:00:00",
  },
  {
    id: "REQ-003",
    nom: "Randria",
    prenom: "Haja",
    cin: "101 055 678 901",
    telephone: "034 89 012 34",
    role: "collecteur",
    commune: "Ambanja",
    fokontany: "Ambanja Centre",
    gpsLat: -13.6835,
    gpsLon: 48.4508,
    paymentStatus: "paid",
    status: "pending",
    createdAt: "2025-12-05T15:00:00",
  },
  {
    id: "REQ-004",
    nom: "Rasoamanana",
    prenom: "Voahirana",
    cin: "102 066 789 012",
    telephone: "034 90 123 45",
    role: "orpailleur",
    commune: "Maevatanana",
    fokontany: "Antanetibe",
    gpsLat: -16.9420,
    gpsLon: 46.8340,
    paymentStatus: "paid",
    status: "pending",
    createdAt: "2025-12-07T06:00:00",
  },
  {
    id: "REQ-005",
    nom: "Rakotoarisoa",
    prenom: "Nirina",
    cin: "101 077 890 123",
    telephone: "033 01 234 56",
    role: "orpailleur",
    commune: "Ambanja",
    fokontany: "Benavony",
    gpsLat: -13.6880,
    gpsLon: 48.4530,
    paymentStatus: "paid",
    status: "approved",
    createdAt: "2025-12-01T08:00:00",
  },
  {
    id: "REQ-006",
    nom: "Razafimahefa",
    prenom: "Toky",
    cin: "101 088 901 234",
    telephone: "034 12 345 67",
    role: "collecteur",
    commune: "Ambanja",
    fokontany: "Ambanja Centre",
    gpsLat: -13.6845,
    gpsLon: 48.4515,
    paymentStatus: "exception",
    status: "pending",
    createdAt: "2025-12-06T14:00:00",
  },
];

export interface ExportDossier {
  id: string;
  comptoirId: string;
  destination: string;
  lots: string[];
  totalWeight: number;
  declaredValue: number;
  status: "draft" | "ready_control" | "controlled" | "sealed" | "declared_customs" | "exported" | "closed";
  createdAt: string;
}

export const mockExportDossiers: ExportDossier[] = [
  {
    id: "EXP-2025-001",
    comptoirId: "U005",
    destination: "Dubaï, UAE",
    lots: ["LOT-OR-2025-0005"],
    totalWeight: 120.0,
    declaredValue: 48000000,
    status: "ready_control",
    createdAt: "2025-11-22T10:00:00",
  },
  {
    id: "EXP-2025-002",
    comptoirId: "U005",
    destination: "Genève, Suisse",
    lots: [],
    totalWeight: 0,
    declaredValue: 0,
    status: "draft",
    createdAt: "2025-12-01T08:00:00",
  },
  {
    id: "EXP-2025-003",
    comptoirId: "U005",
    destination: "Hong Kong",
    lots: ["LOT-OR-2025-0012"],
    totalWeight: 250.0,
    declaredValue: 100000000,
    status: "exported",
    createdAt: "2025-11-10T09:00:00",
  },
  {
    id: "EXP-2025-004",
    comptoirId: "U011",
    destination: "Singapour",
    lots: ["LOT-OR-2025-0009"],
    totalWeight: 78.0,
    declaredValue: 31200000,
    status: "controlled",
    createdAt: "2025-12-03T10:00:00",
  },
];

export const lotStatusLabels: Record<LotStatus, string> = {
  declared: "Déclaré",
  available: "Disponible",
  reserved: "Réservé",
  in_transfer: "En transfert",
  blocked: "Bloqué",
  seized: "Saisi",
  export_ready: "Prêt export",
  exported: "Exporté",
  closed: "Clôturé",
};

export const lotStatusColors: Record<LotStatus, string> = {
  declared: "bg-muted text-muted-foreground",
  available: "bg-emerald-brand/10 text-emerald-brand",
  reserved: "bg-sapphire/10 text-sapphire",
  in_transfer: "bg-primary/10 text-primary",
  blocked: "bg-destructive/10 text-destructive",
  seized: "bg-destructive/15 text-destructive",
  export_ready: "bg-primary/10 text-primary",
  exported: "bg-emerald-brand/10 text-emerald-brand",
  closed: "bg-muted text-muted-foreground",
};

export function formatAriary(amount: number): string {
  return new Intl.NumberFormat("fr-MG").format(amount) + " Ar";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
