"use client";

import {
  GetPublicPackageResponse,
  PublicPackageGQL,
} from "@/app/api/module/package";
import { useSuspenseQuery } from "@apollo/client";

import React from "react";

function CardPackageList() {
  const packages =
    useSuspenseQuery(PublicPackageGQL)?.data?.publicPackage || [];

  return (
    <>
      {packages.map((item, index) => (
        <CardPackageItem
          key={index}
          packageName={item.name}
          packageDescription={item.description}
        />
      ))}
    </>
  );
}

interface CardPackageItemProps {
  packageName: string;
  packageDescription: string;
}

function CardPackageItem({
  packageName,
  packageDescription,
}: CardPackageItemProps) {
  return (
    <div className="border border-aqua p-4  rounded-md shadow-primary  flex flex-col gap-2  bg-white ">
      <h1 className="text-forest text-xl font-font-[700]">{packageName}</h1>
      <p className="text-dustygreen font-normal text-xs">
        {packageDescription}
      </p>
    </div>
  );
}

export default CardPackageList;
