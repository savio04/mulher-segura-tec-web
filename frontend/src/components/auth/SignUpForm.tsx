"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useAuth } from "@/context/AuthContext";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { signUpUser, SignUpUserProps } from "@/services/user";
import Link from "next/link";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Bounce, toast } from "react-toastify";

export default function SignUpForm() {
  const [fullName, setFullName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth()

  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true)
    if (!fullName || !password || !email) {
      return;
    }

    const data: SignUpUserProps = {
      full_name: fullName,
      password,
      email
    }

    try {
      await signUpUser(data)

      await signIn({
        email,
        password
      })
    } catch (error) {
      toast.error('Falhar ao registrar usuário', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Cadastro
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Digite seu e-mail e senha para se cadastrar!
            </p>
          </div>
          <div>
            <form onSubmit={handleSignUp}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5">
                  {/* <!-- First Name --> */}
                  <div>
                    <Label>
                      Nome completo<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Digite seu nome"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Senha<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Digite sua senha"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button type="submit" className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    {loading
                      ? (<ClipLoader size={20} color="#fff" />)
                      : ("Cadastro")
                    }
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Ja possui uma conta?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Faze login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
