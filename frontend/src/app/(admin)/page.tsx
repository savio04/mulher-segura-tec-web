import type { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { MdWifiOff } from 'react-icons/md'
import Button from "@/components/ui/button/Button";

export const metadata: Metadata = {
  title:
    "Home | Mulher segura",
};

export default async function Home() {
  return (
    <div className="flex w-full h-full items-center justify-center p-4">
      <div className="rounded-lg p-8 max-w-sm w-full text-center">
        <MdWifiOff className="mx-auto mb-4 text-red-500" size={72} />

        <h1 className="mb-2 text-2xl font-semibold text-white">
          Dispositivo Desconectado
        </h1>

        <p className="mb-6 text-gray-600">
          Não foi possível conectar ao dispositivo. Verifique a conexão e tente novamente.
        </p>

        <Button
          className="inline-block rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          Tentar Reconectar
        </Button>
      </div>
    </div>
  );
}
