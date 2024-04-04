"use client";

import {
  fields,
  items,
} from "@/app/lib/module/dashboard/access-compliance/tableDefination";
import { Button } from "@/app/ui/button/button";
import FormGroupLayout from "@/app/ui/form-group-layout";
import RegistrationInformationForm, {
  RegistrationInformationFormType,
  schema,
} from "@/app/ui/form-ui/registration-information";
import Pagination from "@/app/ui/pagination/pagination";
import TopicAnswer from "@/app/ui/register/register-corporation/topic-answer";
import TableNormalWithChildren from "@/app/ui/table/table-normal-children";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

function Page() {
  const methods = useForm<RegistrationInformationFormType>({
    defaultValues: {
      originalFilePath: [],
      files: [],
      lawTypeDetail: [],
      relatedSystem: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegistrationInformationFormType) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <header>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl ">ประเมินความสอดคล้อง ตามกฎหมาย</h1>
              <div className="badge badge-primary p-4">Admin ระบบ</div>
            </div>
          </header>
          <main>
            <div className="card border border-whitegreen p-8 shadow-xl">
              <FormGroupLayout
                Header={
                  <TopicAnswer
                    label="ข้อมูลที่ต้องลงทะเบียน"
                    otherClass="mb-2"
                  />
                }
              >
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  <RegistrationInformationForm />
                </div>
              </FormGroupLayout>

              <FormGroupLayout
                Header={
                  <TopicAnswer label="สาระสำคัญ" otherClass="mb-2 mt-4" />
                }
              >
                <TableNormalWithChildren fields={fields} items={items} />
                <div className="mt-4 text-right">
                  <Pagination
                    totalPages={1}
                    onChange={(page) => {
                      console.log(page);
                    }}
                  />
                </div>
              </FormGroupLayout>
            </div>
          </main>
          <footer>
            <div className="mt-4 flex items-center justify-end gap-4">
              <Button variant="secondary" className="btn-outline min-w-[140px]">
                ไม่อนุมัติ
              </Button>
              <Button type="submit" variant="primary" className="min-w-[180px]">
                อนุมัติ
              </Button>
            </div>
          </footer>
        </div>
      </form>
    </FormProvider>
  );
}

export default Page;
