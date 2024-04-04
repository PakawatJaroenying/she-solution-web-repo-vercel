"use client";
import { Session } from "next-auth";
import React, { createContext, useEffect } from "react";
import LoadingScreen from "../loading/loading-screen";

const SessionProviderContext = createContext<Session | null>(null);

function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProviderContext.Provider value={session}>
      {children}
    </SessionProviderContext.Provider>
  );
}

export default SessionProvider;

const useSession = () => {
  return React.useContext(SessionProviderContext);
};

export { useSession };
