import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Mulher segura",
};

export default async function SignIn() {
  const cookiesData = await cookies()
  const token = cookiesData.get("@mulhersegura.token")?.value;

  if (token) {
    redirect("/");
  }

  return <SignInForm />;
}
