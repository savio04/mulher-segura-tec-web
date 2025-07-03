'use client'
import { signInUser, SignInUserProps } from "@/services/user";
import { destroyCookie, setCookie } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface AuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  signIn: (params: SignInUserProps) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  async function signIn({ email, password }: SignInUserProps) {
    const data = await signInUser({
      email,
      password,
    });

    setCookie(undefined, "@mulhersegura.token", data.token, {
      maxAge: 60 * 60 * 48, // 48 horas
      path: "/",
    });

    router.push("/");
  }

  function signOut() {
    destroyCookie(null, "@mulhersegura.token", { path: "/" });

    router.push("/signin");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
