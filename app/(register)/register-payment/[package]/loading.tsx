import LayoutRegisterUserPasswordAndPackage from "@/app/ui/register/layout-register-userpassword-package";
import React from "react";

function Loading() {
  return (
    <LayoutRegisterUserPasswordAndPackage>
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-2xl font-bold">ชำระค่าบริการ</h1>
        <div className="flex items-center justify-center w-full border h-[300px]  border-gray-200 shadow-primary p-[2rem] rounded-md">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
    </LayoutRegisterUserPasswordAndPackage>
  );
}

export default Loading;
