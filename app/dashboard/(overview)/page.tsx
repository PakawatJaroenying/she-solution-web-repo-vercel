import React from "react";
import Image from "next/image";
import Head from "next/head";
import CardList from "@/app/ui/dashboard/(overview)/card-list";
import ButtonList from "@/app/ui/dashboard/(overview)/button-list";
import LegalLicenseGraphList from "@/app/ui/dashboard/(overview)/legal-license-graph-list";
function Page() {
  return (
    <>
      <h1 className="text-2xl">แดชบอร์ด</h1>
      <CardList className="mt-4" />

      <ButtonList className="mt-8" />

      <LegalLicenseGraphList className="mt-8" />
    </>
  );
}

export default Page;
