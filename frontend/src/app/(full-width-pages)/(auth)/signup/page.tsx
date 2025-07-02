import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro | Mulher segura",
  description: "Pagina de cadastro de usuario",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
