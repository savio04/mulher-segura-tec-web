import { HomeComponent } from "@/components/home/Home";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Home | Mulher segura",
};

export default async function Home() {
  return <HomeComponent />
}
