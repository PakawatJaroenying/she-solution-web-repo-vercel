"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { Suspense, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RegisterPackageFormPackages from "../form-packages";
import { useRouter } from "next/navigation";
import { FormDataType } from "@/app/lib/module/register/register-package/formdata-type";
import { schema } from "@/app/lib/module/register/register-package/schema";
import { Button } from "../../button/button";

function RegisterPackage() {
  const router = useRouter();
  const methods = useForm<FormDataType>({
    defaultValues: {
      package: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormDataType) => {
    router.push("/register-payment" + "/" + data.package);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="w-full  border border-gray-200 shadow-primary p-[2rem] rounded-md">
            <RegisterPackageFormPackages />
          </div>
        </div>

        <div className="flex w-100 justify-end mt-[1.5rem]">
          <Button type="submit" variant="primary">
            ชำระค่าบริการ
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default RegisterPackage;
