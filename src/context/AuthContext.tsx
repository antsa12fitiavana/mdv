import React, { createContext, useContext, useState, useCallback } from "react";
import { DemoUser, Filiere, demoUsers } from "@/data/mockData";
import { DemoUserPierre, demoUsersPierre } from "@/data/mockDataPierre";
import { DemoUserBois, demoUsersBois } from "@/data/mockDataBois";

type AnyUser = DemoUser | DemoUserPierre | DemoUserBois;

interface AuthContextType {
  user: AnyUser | null;
  filiere: Filiere;
  setFiliere: (f: Filiere) => void;
  login: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  getDemoUsers: () => AnyUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AnyUser | null>(null);
  const [filiere, setFiliereState] = useState<Filiere>("or");

  const setFiliere = useCallback((f: Filiere) => {
    setFiliereState(f);
    setUser(null); // Reset user when changing filiere
  }, []);

  const getDemoUsers = useCallback((): AnyUser[] => {
    switch (filiere) {
      case "or": return demoUsers;
      case "pierre": return demoUsersPierre;
      case "bois": return demoUsersBois;
      default: return demoUsers;
    }
  }, [filiere]);

  const login = useCallback((userId: string) => {
    const users = getDemoUsers();
    const found = users.find((u) => u.id === userId);
    if (found) setUser(found);
  }, [getDemoUsers]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        filiere,
        setFiliere,
        login,
        logout,
        isAuthenticated: !!user,
        getDemoUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
