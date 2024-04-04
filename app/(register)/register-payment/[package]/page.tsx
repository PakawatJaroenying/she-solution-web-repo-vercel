export const dynamicParams = true; //accept dynamic params
import { APIResult } from "@/app/api/miscellaneous";
import {
  GetPublicPackageResponse,
  PublicPackageGQL,
} from "@/app/api/module/package";
import {
  getDistricts,
  getProvinces,
  getSubDistricts,
} from "@/app/api/thai-province-data";
import ThaiProvinceDataProvider from "@/app/ui/context/thai-province-data-provider";
import LayoutRegisterUserPasswordAndPackage from "@/app/ui/register/layout-register-userpassword-package";
import RegisterPaymentForm from "@/app/ui/register/register-payment/form";
import React, { Suspense } from "react";

type Param = {
  package: string;
};

export async function generateStaticParams() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const packages = await fetch(backendURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query PublicPackage {
        publicPackage {
          description
          duration
          durationUnit
          id
          name
          price
        }
      }`,
    }),
  });
  const json: APIResult<GetPublicPackageResponse> = await packages.json();

  return (
    json?.data?.publicPackage.map(({ id }) => ({
      package: id,
    })) || []
  );
}

type Props = {
  params: Param;
};

async function Page(props: Props) {
  const [provinces, districts, subDistricts] = await Promise.all([
    getProvinces(),
    getDistricts(),
    getSubDistricts(),
  ]);
  return (
    <LayoutRegisterUserPasswordAndPackage>
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-2xl font-bold">ชำระค่าบริการ</h1>
        <ThaiProvinceDataProvider
          provinces={provinces}
          districts={districts}
          subDistricts={subDistricts}
        >
          <RegisterPaymentForm packageId={props.params.package} />
        </ThaiProvinceDataProvider>
      </div>
    </LayoutRegisterUserPasswordAndPackage>
  );
}

export default Page;
