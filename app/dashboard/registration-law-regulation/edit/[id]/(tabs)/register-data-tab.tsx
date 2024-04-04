import { Button } from "@/app/ui/button/button";
import FormGroupLayout from "@/app/ui/form-group-layout";
import RegistrationInformationForm, {
  RegistrationInformationFormType,
  schema,
} from "@/app/ui/form-ui/registration-information";

import TopicAnswer from "@/app/ui/register/register-corporation/topic-answer";
import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useParams } from "next/navigation";
import LoadingBackDrop from "@/app/ui/loading/loading-backdrop";
import { UpdateLawMasterInformationGQL } from "@/app/api/module/register-law-regulation";
import { useClientProivder } from "../client-provider";
import { TabType } from "../../_interfaces";

function RegisterDataTab() {
  const [loadingSettingForm, setLoadingSettingForm] = useState(true);

  const {
    data: {
      getLawMaster: { lawInformation },
    },
    refetchMasterData,
    setDirtyForm,
    activeTab,
  } = useClientProivder();

  const { id: idGetLawMaster } = useParams();

  const [mutateUpdateLawMasterInfomation] = useMutation(
    UpdateLawMasterInformationGQL,
    {
      onCompleted: async () => {
        //TODO: ต้งอ refetch ยังไง
        alert("แก้ไขสำเร็จ");
        setDirtyForm(false);
        await refetchMasterData();
      },
      onError: (error) => {
        alert(error.message);
      },
    },
  );

  const methods = useForm<RegistrationInformationFormType>({
    defaultValues: {
      files: [],
      originalFilePath: [],
      lawTypeDetail: [],
      relatedSystem: [],
    },
    resolver: yupResolver(schema),
  });

  async function setFormValues() {
    let files = null;
    if (
      lawInformation.originalFilePath &&
      lawInformation.originalFilePath.length > 0
    ) {
      const blobs = lawInformation.originalFilePath.map((it) => {
        return fetch(it.url).then((res) => res.blob());
      });
      files = await Promise.all(blobs);
    }
    methods.reset({
      ...lawInformation,
      effectiveDate: lawInformation.effectiveDate.split("T")[0],
      announcementDate: lawInformation.announcementDate.split("T")[0],
      motherLaw:
        lawInformation.motherLaw === ""
          ? "รัฐธรรมนูญ"
          : lawInformation.motherLaw,
      files:
        (files &&
          files.map(
            (it, idx) =>
              new File(
                [it],
                lawInformation.originalFilePath[idx].path
                  .split("/")
                  .toReversed()[0],
              ),
          )) ||
        [],
      originalFilePath: lawInformation.originalFilePath,
    });
    setLoadingSettingForm(false);
  }

  useEffect(() => {
    if (lawInformation) {
      (async () => {
        await setFormValues();
      })();
    }
  }, []);

  //dirty form
  useEffect(() => {
    if (activeTab !== TabType.REGISTER_DATA && methods.formState.isDirty) {
      setFormValues();
    }
  }, [activeTab, methods.formState.isDirty]);

  React.useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      console.log("🚀 ~ subscription ~ type:", type);
      if (type === "change") {
        setDirtyForm(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const onSubmit = async (submitData: RegistrationInformationFormType) => {
    //TODO: รอ confirm ว่าจะต้องส่งข้อมูลเพื่อ แก้ไข ไปอย่างไร
    await mutateUpdateLawMasterInfomation({
      variables: {
        updateLawMasterId: idGetLawMaster as string,
        input: {
          lawInformation: {
            category: submitData.category,
            announcementDate:
              submitData.announcementDate + "T" + "00:00:00+07:00",
            relatedSystem: submitData.relatedSystem,
            lawType: submitData.lawType,
            lawTypeDetail: submitData.lawTypeDetail,
            ministry: submitData.ministry,
            motherLaw: submitData.motherLaw,
            name: submitData.name,
            effectiveDate: submitData.effectiveDate + "T" + "00:00:00+07:00",
            originalFilePath: submitData.originalFilePath.map((it) => it.path),
            department: submitData.department,
          },
        },
      },
    });
  };

  if (loadingSettingForm || !lawInformation) {
    return <LoadingBackDrop open={loadingSettingForm} />;
  }

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
      {/* <pre>{JSON.stringify(methods.watch(), null, 2)}</pre> */}
    </FormProvider>
  );
}

export default RegisterDataTab;
