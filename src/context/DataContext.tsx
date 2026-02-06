import React, { createContext, useContext, useState, useCallback } from "react";
import { Lot, Transaction, Payment, RegistrationRequest, ExportDossier, Inspection } from "@/data/mockData";
import { mockLots, mockTransactions, mockPayments, mockRegistrationRequests, mockExportDossiers, mockInspections } from "@/data/mockData";
import { LotPierre, TransactionPierre, mockLotsPierre, mockTransactionsPierre } from "@/data/mockDataPierre";
import { LotBois, TransactionBois, TransportBon, mockLotsBois, mockTransactionsBois, mockTransportBons } from "@/data/mockDataBois";

interface DataContextType {
  // OR data
  lotsOr: Lot[];
  transactionsOr: Transaction[];
  paymentsOr: Payment[];
  registrationsOr: RegistrationRequest[];
  exportsOr: ExportDossier[];
  inspectionsOr: Inspection[];
  
  // Pierre data
  lotsPierre: LotPierre[];
  transactionsPierre: TransactionPierre[];
  
  // Bois data
  lotsBois: LotBois[];
  transactionsBois: TransactionBois[];
  transportBons: TransportBon[];
  
  // CRUD OR
  addLotOr: (lot: Lot) => void;
  updateLotOr: (id: string, updates: Partial<Lot>) => void;
  addTransactionOr: (txn: Transaction) => void;
  addRegistrationOr: (reg: RegistrationRequest) => void;
  updateRegistrationOr: (id: string, updates: Partial<RegistrationRequest>) => void;
  addInspectionOr: (insp: Inspection) => void;
  
  // CRUD Pierre
  addLotPierre: (lot: LotPierre) => void;
  updateLotPierre: (id: string, updates: Partial<LotPierre>) => void;
  addTransactionPierre: (txn: TransactionPierre) => void;
  
  // CRUD Bois
  addLotBois: (lot: LotBois) => void;
  updateLotBois: (id: string, updates: Partial<LotBois>) => void;
  addTransactionBois: (txn: TransactionBois) => void;
  addTransportBon: (bon: TransportBon) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  // OR state
  const [lotsOr, setLotsOr] = useState<Lot[]>(mockLots);
  const [transactionsOr, setTransactionsOr] = useState<Transaction[]>(mockTransactions);
  const [paymentsOr, setPaymentsOr] = useState<Payment[]>(mockPayments);
  const [registrationsOr, setRegistrationsOr] = useState<RegistrationRequest[]>(mockRegistrationRequests);
  const [exportsOr, setExportsOr] = useState<ExportDossier[]>(mockExportDossiers);
  const [inspectionsOr, setInspectionsOr] = useState<Inspection[]>(mockInspections);
  
  // Pierre state
  const [lotsPierre, setLotsPierre] = useState<LotPierre[]>(mockLotsPierre);
  const [transactionsPierre, setTransactionsPierre] = useState<TransactionPierre[]>(mockTransactionsPierre);
  
  // Bois state
  const [lotsBois, setLotsBois] = useState<LotBois[]>(mockLotsBois);
  const [transactionsBois, setTransactionsBois] = useState<TransactionBois[]>(mockTransactionsBois);
  const [transportBons, setTransportBons] = useState<TransportBon[]>(mockTransportBons);

  // CRUD OR
  const addLotOr = useCallback((lot: Lot) => setLotsOr(prev => [lot, ...prev]), []);
  const updateLotOr = useCallback((id: string, updates: Partial<Lot>) => 
    setLotsOr(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l)), []);
  const addTransactionOr = useCallback((txn: Transaction) => setTransactionsOr(prev => [txn, ...prev]), []);
  const addRegistrationOr = useCallback((reg: RegistrationRequest) => setRegistrationsOr(prev => [reg, ...prev]), []);
  const updateRegistrationOr = useCallback((id: string, updates: Partial<RegistrationRequest>) =>
    setRegistrationsOr(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r)), []);
  const addInspectionOr = useCallback((insp: Inspection) => setInspectionsOr(prev => [insp, ...prev]), []);

  // CRUD Pierre
  const addLotPierre = useCallback((lot: LotPierre) => setLotsPierre(prev => [lot, ...prev]), []);
  const updateLotPierre = useCallback((id: string, updates: Partial<LotPierre>) =>
    setLotsPierre(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l)), []);
  const addTransactionPierre = useCallback((txn: TransactionPierre) => setTransactionsPierre(prev => [txn, ...prev]), []);

  // CRUD Bois
  const addLotBois = useCallback((lot: LotBois) => setLotsBois(prev => [lot, ...prev]), []);
  const updateLotBois = useCallback((id: string, updates: Partial<LotBois>) =>
    setLotsBois(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l)), []);
  const addTransactionBois = useCallback((txn: TransactionBois) => setTransactionsBois(prev => [txn, ...prev]), []);
  const addTransportBon = useCallback((bon: TransportBon) => setTransportBons(prev => [bon, ...prev]), []);

  return (
    <DataContext.Provider value={{
      lotsOr, transactionsOr, paymentsOr, registrationsOr, exportsOr, inspectionsOr,
      lotsPierre, transactionsPierre,
      lotsBois, transactionsBois, transportBons,
      addLotOr, updateLotOr, addTransactionOr, addRegistrationOr, updateRegistrationOr, addInspectionOr,
      addLotPierre, updateLotPierre, addTransactionPierre,
      addLotBois, updateLotBois, addTransactionBois, addTransportBon,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
