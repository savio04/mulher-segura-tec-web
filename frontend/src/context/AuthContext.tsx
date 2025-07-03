'use client'
import { getMyProfile, signInUser, SignInUserProps } from "@/services/user";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface UserProps {
  id: string
  full_name: string
  email: string
  role: string
}


interface AuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  signIn: (params: SignInUserProps) => Promise<void>;
  signOut: () => void;
  user?: UserProps
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | undefined>(undefined)

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

    const userData = await getMyProfile()

    setUser(userData)

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

  useEffect(() => {
    (async () => {
      const cookies = parseCookies();
      const token = cookies["@mulhersegura.token"]

      if (token) {
        try {
          const data = await getMyProfile()

          setUser(data)
        } catch { }
      }
    })()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        signIn,
        signOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
