import React from "react";
import Image from "next/image";
import LoginForm from "../ui/login/form";
function LeftPanel() {
  return (
    <>
      <div className="container mx-auto flex max-w-md  flex-col  gap-[2rem] p-4 md:max-w-2xl lg:p-2">
        <Image
          src="/login/she-logo.svg"
          width={300}
          height={58}
          alt="logo"
          className="h-1/1 xl:w-1/1 md:h-1/2 md:w-1/2"
        />
        {/* Login container */}
        <div className="relative mb-4 mt-6 min-w-full rounded-lg border border-white bg-white  p-8 shadow-lg md:mb-0">
          <div className="absolute -top-32 right-0 ">
            <Image
              src="/login/safety-first.svg"
              width={176.44}
              height={185}
              alt="logo"
            />
          </div>
          <h1 className="mt-2 text-2xl font-medium text-darkgreen ">
            เข้าสู่ระบบ
          </h1>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftPanel;
