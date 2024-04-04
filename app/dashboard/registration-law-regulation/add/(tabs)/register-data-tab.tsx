import { CreateLawMasterGQL } from "@/app/api/module/register-law-regulation";
import { Button } from "@/app/ui/button/button";
import { useSession } from "@/app/ui/context/session-provider";
import FormGroupLayout from "@/app/ui/form-group-layout";
import RegistrationInformationForm, {
  RegistrationInformationFormType,
  schema,
} from "@/app/ui/form-ui/registration-information";
import LoadingBackDrop from "@/app/ui/loading/loading-backdrop";
import TopicAnswer from "@/app/ui/register/register-corporation/topic-answer";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function RegisterDataTab() {
  const router = useRouter();
  const user = useSession();
  const methods = useForm<RegistrationInformationFormType>({
    defaultValues: {
      files: [],
      originalFilePath: [],
      lawTypeDetail: [],
      relatedSystem: [],
    },
    resolver: yupResolver(schema),
  });

  const [mutateCreateLawMaster, { data, loading: loadingCreateLawMaster }] =
    useMutation(CreateLawMasterGQL, {
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: (data) => {
        alert("บันทึกข้อมูลสำเร็จ");
        router.push(
          `/dashboard/registration-law-regulation/edit/${data.createLawMaster.id}`,
        );
      },
    });

  const onSubmit = async (submitData: RegistrationInformationFormType) => {
    await mutateCreateLawMaster({
      variables: {
        input: {
          category: submitData.category,
          // lawId: submitData.lawId,
          name: submitData.name,
          department: submitData.department,
          ministry: submitData.ministry,
          lawType: submitData.lawType,
          lawTypeDetail: submitData.lawTypeDetail,
          relatedSystem: submitData.relatedSystem,
          announcementDate:
            submitData.announcementDate + "T" + "00:00:00+07:00",
          effectiveDate: submitData.effectiveDate + "T" + "00:00:00+07:00",
          motherLaw:
            submitData.motherLaw === "รัฐธรรมนูญ" ? "" : submitData.motherLaw,
          originalFilePath: submitData.originalFilePath.map((it) => it.path),
        },
      },
    });
  };
  return (
    <>
      <LoadingBackDrop open={loadingCreateLawMaster} />
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
                  <div className="mt-8  flex items-center justify-end">
                    <Button variant="primary" type="submit">
                      บันทึกข้อมูล
                    </Button>
                  </div>
                </FormGroupLayout>
              </div>
            </main>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default RegisterDataTab;
