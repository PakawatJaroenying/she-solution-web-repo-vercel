import React from "react";
import FormGroupLayout from "../form-group-layout";
import TopicAnswer from "./register-corporation/topic-answer";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import Checkbox from "../form/checkbox-rhf";
import FormGroup from "../form/form-group";
import { PublicPackageGQL } from "@/app/api/module/package";
import { usePathname, useSearchParams } from "next/navigation";
import RadioRHF from "../form/radio-rhf";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

function RegisterPackageFormPackages() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: packages, loading } = useQuery(PublicPackageGQL);

  const isRegisterPaymentPage = pathname === "/register-payment";
  const titleText = isRegisterPaymentPage ? "แพ็คเกจที่เลือก" : "เลือกแพ็คเกจ";
  const packagesFiltered = isRegisterPaymentPage
    ? packages?.publicPackage.filter((item) =>
        searchParams.get("package")?.includes(item.id),
      ) || []
    : packages?.publicPackage || [];

  //type ที่มี package อยู่ใน form
  const methods = useFormContext<{ package: string }>();

  return (
    <FormGroupLayout Header={<TopicAnswer label={titleText} />}>
      <div className="mt-[1rem]">
        <div className="text-md mt-[1.5rem] w-full text-right !text-dustygreen ">
          ราคา(บาท)
        </div>
        {loading ? (
          <>
            <div className="shadow-primary mt-[2rem] flex items-center justify-between gap-[1rem] rounded-xl border border-gray-300 bg-gray-100 p-[1.8rem]">
              <div className="h-5 w-20 animate-pulse rounded-xl bg-gray-300"></div>
              <div className="h-5 w-20 animate-pulse rounded-xl bg-gray-300"></div>
            </div>
          </>
        ) : (
          packagesFiltered.map((item, index) => {
            return (
              <label
                key={index}
                className={clsx(
                  " shadow-primary mt-[2rem] flex items-center justify-between gap-[1rem] rounded-xl border border-gray-300 p-[1.5rem]",
                  {
                    "bg-aqua": methods.watch("package").includes(item.id),
                    "bg-white": !methods.watch("package").includes(item.id),
                  },
                )}
              >
                <FormGroup label="">
                  <RadioRHF
                    readOnly={isRegisterPaymentPage}
                    className="me-2  h-5 w-5 rounded-2xl  !border-graygreen  bg-teal !accent-teal"
                    name={`package` as const}
                    options={[
                      {
                        text: item.name,
                        value: item.id,
                      },
                    ]}
                  />
                </FormGroup>
                <span
                  className={clsx("text-xl  font-bold text-forest", {
                    "!text-darkgreen": !methods
                      .watch("package")
                      .includes(item.id),
                  })}
                >
                  {item.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </label>
            );
          })
        )}

        {methods.formState.errors.package?.message && (
          <div className="mt-[1rem] text-sm text-red-500">
            {methods.formState.errors.package?.message}
          </div>
        )}
        <div className="ms-auto mt-[1.5rem] w-[30rem] px-[2rem]">
          <div className="grid grid-cols-2 gap-y-4">
            <span className="text-md text-dustygreen">
              ภาษีมูลค่าเพิ่ม (บาท)
            </span>
            <span className="text-md text-right text-dustygreen">
              {(100 as number).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-md text-dustygreen">
              ภาษีหัก ณ ที่จ่าย (บาท)
            </span>
            <span className="text-md text-right text-dustygreen">
              {(100 as number).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-xl font-bold text-forest">
              ยอดสุทธิที่ชำระ (บาท)
            </span>
            <span className="text-right text-xl font-bold text-forest">
              {(100 as number).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </FormGroupLayout>
  );
}

export default RegisterPackageFormPackages;
