"use client";
import {
  GetLawMasterGQL,
  GetLawMasterResponse,
} from "@/app/api/module/register-law-regulation";
import React, { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import LoadingScreen from "@/app/ui/loading/loading-screen";
import { TabType } from "../_interfaces";

interface ClientProviderProps {
  data: GetLawMasterResponse;
  refetchMasterData: () => Promise<GetLawMasterResponse>;
  setDirtyForm: (dirty: boolean) => void;
  setActiveTab: (tab: TabType) => void;
  dirtyForm: boolean;
  activeTab: TabType;
}

const ClientProviderContext = createContext<ClientProviderProps | null>(null);

function ClientProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ClientProviderProps;
}) {
  return (
    <ClientProviderContext.Provider value={{ ...value }}>
      {children}
    </ClientProviderContext.Provider>
  );
}

export function useClientProivder() {
  return useContext(ClientProviderContext)!;
}

export default ClientProvider;
