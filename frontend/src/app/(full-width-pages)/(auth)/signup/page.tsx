import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cadastro | Mulher segura",
};

export default async function SignUp() {
  const cookiesData = await cookies()
  const token = cookiesData.get("@mulhersegura.token")?.value;

  if (token) {
    redirect("/");
  }

  return <SignUpForm />;
}
