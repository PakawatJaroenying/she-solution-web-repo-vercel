import {
  getDistricts,
  getProvinces,
  getSubDistricts,
} from "@/app/api/thai-province-data";
import ThaiProvinceDataProvider from "@/app/ui/context/thai-province-data-provider";
import RegisterCorporationForm from "@/app/ui/register/register-corporation/form";
import Head from "next/head";
import Image from "next/image";

async function RegisterCompany() {
  const [provinces, districts, subDistricts] = await Promise.all([
    getProvinces(),
    getDistricts(),
    getSubDistricts(),
  ]);

  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>
      <div className="flex flex-col flex-wrap lg:flex-row ">
        <div className="w-full">
          <div className="flex min-h-screen flex-col items-start  justify-start  bg-mint p-12 md:p-20 ">
            <div className="flex min-h-screen  w-full  flex-col  gap-[2rem]">
              <Image
                src="/login/she-logo.svg"
                width={300}
                height={58}
                alt="logo"
                className="mt-4 md:mt-0"
              />
              <div className="shadow-primary relative mb-4 w-full rounded-lg border  border-white bg-white p-8 md:mb-0">
                <div className="absolute right-0 top-0 -mt-32  ml-3">
                  <Image
                    src="/login/safety-first.svg"
                    width={176.44}
                    height={185}
                    alt="logo"
                  />
                </div>

                <span className="text-xl font-bold text-gray-900 ">
                  ลงทะเบียนใหม่สำหรับ
                  <br />
                  SHE Solution
                </span>
                <ThaiProvinceDataProvider
                  provinces={provinces}
                  districts={districts}
                  subDistricts={subDistricts}
                >
                  <RegisterCorporationForm />
                </ThaiProvinceDataProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterCompany;
