import Location from "@/components/location/Location";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Localização | Mulher segura",
};
export default async function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Localização" />
      <Location />
    </div>
  );
}
