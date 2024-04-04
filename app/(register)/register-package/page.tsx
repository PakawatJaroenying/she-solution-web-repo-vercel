import ThaiProvinceDataProvider from "@/app/ui/context/thai-province-data-provider";
import LayoutRegisterUserPasswordAndPackage from "@/app/ui/register/layout-register-userpassword-package";
import RegisterPackage from "@/app/ui/register/register-package/form";
import React, { Suspense } from "react";

async function Page() {
  return (
    <LayoutRegisterUserPasswordAndPackage>
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-2xl font-bold">เลือกแพ็คเกจ</h1>
        <RegisterPackage />
      </div>
    </LayoutRegisterUserPasswordAndPackage>
  );
}

export default Page;
