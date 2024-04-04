"use server";
import { APIResult } from "@/app/api/miscellaneous";
import {
  LoginResponse,
  RefreshAccessTokenResponse,
} from "@/app/api/module/authen";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function LoginServerAction(formData: FormData) {
  try {
    await signIn("credentials", {
      redirect: true,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return `${error.cause?.err?.message}`;
      }
    }
    throw error;
  }
}

export const LogoutServerAction = async () => {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });
};

export async function getUserFormBackendAsync(
  username: string,
  password: string
): Promise<LoginResponse | undefined> {
  const SIGNIN_GQL = `
  mutation Mutation($input: SignInInput!) {
    signIn(input: $input) {
      token {
        accessToken
        refreshToken
      }
      user {
        id
        email
        username
        role
      }
      activatedPackages {
        activatedAt
        description
        expiredAt
        id
        name
      }
    }
  }
`;
  const body = JSON.stringify({
    query: SIGNIN_GQL,
    variables: {
      input: {
        username,
        password,
      },
    },
  });
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const response = await fetch(backendURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  if (response.ok) {
    const json: APIResult<LoginResponse> = await response.json();
    if (json.errors && json.errors.length > 0)
      throw new Error(`${json.errors.map((e) => e.message).join("\n")}`);
    return json.data!;
  } else {
    throw new Error("Network response was not ok.");
  }
}

export const refreshToken = async (
  refreshToken: string
): Promise<RefreshAccessTokenResponse | null> => {
  const RefreshAccessTokenGQL = `
  mutation RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const body = JSON.stringify({
    query: RefreshAccessTokenGQL,
    variables: {
      refreshToken,
    },
  });
  const response = await fetch(backendURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  if (response.ok) {
    const json = await response.json();
    console.log("🚀==== ~ refreshToken:=====", json?.data?.refreshAccessToken);
    return json?.data?.refreshAccessToken;
  }
  return null;
};
