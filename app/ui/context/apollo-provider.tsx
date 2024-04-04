"use client";

import { HttpLink, useApolloClient } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";
import { useRef } from "react";
import { useSession } from "./session-provider";

declare module "@apollo/client" {
  export interface DefaultContext {
    token?: string;
  }
}

function makeClient() {
  const authLink = setContext(async (_, { headers, token }) => {
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(
      new HttpLink({ uri: process.env.NEXT_PUBLIC_BACKEND_URL })
    ),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <UpdateAuth>{children}</UpdateAuth>
    </ApolloNextAppProvider>
  );
}

function UpdateAuth({ children }: { children: React.ReactNode }) {
  const token = useSession()?.accessToken;
  const apolloClient = useApolloClient();
  if (token) {
    apolloClient.defaultContext.token = token;
  }
  return <>{children}</>;
}
