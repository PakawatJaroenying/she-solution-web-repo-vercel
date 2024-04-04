"use client";
import Head from "next/head";
import Image from "next/image";
import LeftPanel from "./_left-panel";
import RightPanel from "./_right_panel";

function Login() {
  console.log(
    "process.env.NEXT_PUBLIC_BACKEND_URL",
    process.env.NEXT_PUBLIC_BACKEND_URL,
  );
  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ</title>
      </Head>
      <div className="flex flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <div
          className="relative flex  min-h-screen  
                     basis-full  flex-col  justify-center
                     bg-mint
                     p-4
                     xl:basis-[45%]
            "
        >
          <LeftPanel />
          {/* Background RIGHT TOP*/}
          <div
            className="absolute right-0 top-0 
            h-[200px] w-[250px]
            
        "
          >
            <Image
              src="/login/background-login-left.svg"
              fill
              alt="background"
              className="object-cover"
            />
          </div>
        </div>
        <div
          className="relative hidden 
                        min-h-full basis-[55%] flex-col  items-center
                        justify-center
                        bg-aqua
                        p-4
                        xl:flex
                        "
        >
          <RightPanel />
          {/* Background RIGHT BOTTOM*/}
          <div
            className="absolute bottom-0 right-0 
            h-[200px] w-[400px]"
          >
            <Image
              src="/login/background-login-right.svg"
              fill
              alt="background"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
