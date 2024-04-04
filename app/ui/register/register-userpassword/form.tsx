"use client";
import React, { useState } from "react";
import FormGroupLayout from "../../form-group-layout";
import TopicAnswer from "../register-corporation/topic-answer";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "../../form/textfield-rhf";

import { useRouter } from "next/navigation";
import Radio from "../../form/radio-rhf";
import FormGroup from "../../form/form-group";
import { FormDataType } from "@/app/lib/module/register/register-userpassword/formdata-type";
import {
  UserType,
  UserTypeLabel,
} from "@/app/lib/module/register/register-userpassword/user-type";
import { schema } from "@/app/lib/module/register/register-userpassword/schema";
import VerificationModal from "./modal";
import { useMutation } from "@apollo/client";
import {
  RegisterUserGQL,
  RegisterUserInput,
} from "@/app/api/module/register-userpassword";
import VerficationSuccessModal from "./success-modal";

function RegisterUserPasswordForm() {
  const router = useRouter();
  const [
    mutationRegister,
    { data, loading: loadingMutationRegister, error: errorMutationRegister },
  ] = useMutation<any, RegisterUserInput>(RegisterUserGQL, {
    errorPolicy: "all",
  });

  const stateModalVerification = useState(false);
  const stateModalVerificationSuccess = useState(false);
  const methods = useForm<FormDataType>({
    defaultValues: {
      userType: UserType.JURISTIC_PERSON,
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormDataType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const res = await mutationRegister({
      variables: {
        input: {
          userType: data.userType,
          username: data.username,
          password: data.password,
          email: data.email,
        },
      },
    });

    if (res.errors) return;
    //เปิด modal ยืนยันตัวตน
    stateModalVerification[1](true);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="shadow-primary  w-full rounded-md border border-gray-200 p-[2rem]">
          <FormGroupLayout
            Header={<TopicAnswer label="เลือกประเภทการสมัคร" otherClass="" />}
          >
            <FormGroup
              label=""
              className="mt-[2rem]"
              errorMessage={methods.formState.errors.userType?.message}
            >
              <Radio
                name={`userType` as const}
                options={[
                  {
                    text: UserTypeLabel[UserType.PERSON],
                    value: UserType.PERSON,
                  },
                  {
                    text: UserTypeLabel[UserType.JURISTIC_PERSON],
                    value: UserType.JURISTIC_PERSON,
                  },
                  {
                    text: UserTypeLabel[UserType.STATE_ENTERPRISE],
                    value: UserType.STATE_ENTERPRISE,
                  },
                ]}
              />
            </FormGroup>
          </FormGroupLayout>
          <FormGroupLayout
            Header={
              <TopicAnswer
                label="กรอกข้อมูลที่ต้องการใช้เข้าระบบ"
                otherClass="mt-[1rem]"
              />
            }
          >
            <div
              className="mt-[1rem] grid grid-cols-3 
                !gap-y-0 gap-x-[1rem]
              "
            >
              <FormGroup
                label="Username"
                errorMessage={methods.formState.errors.username?.message}
              >
                <TextField
                  name={`username` as const}
                  type="text"
                  placeholder="Username"
                />
                <ol className="ms-5 mt-1 list-disc  text-sm text-dustygreen">
                  <li>Username ต้องเป็นภาษาอังกฤษเท่านั้น</li>
                </ol>
              </FormGroup>

              <FormGroup
                label="Password"
                errorMessage={methods.formState.errors.password?.message}
              >
                <TextField
                  name={`password` as const}
                  type="password"
                  placeholder="Password"
                />
                <ol className="ms-5 mt-1 list-disc  text-sm text-dustygreen">
                  <li>
                    รหัสผ่านไม่ต่ำกว่า 8 ตัวอักษร และต้องประกอบไปด้วย
                    ภาษาอังกฤษตัวใหญ่ ตัวเล็ก ตัวเลขและอักขระพิเศษ อย่างละ 1 ตัว
                  </li>
                </ol>
              </FormGroup>

              <FormGroup
                label="Re-try Password"
                errorMessage={methods.formState.errors.confirmPassword?.message}
              >
                <TextField
                  name={`confirmPassword` as const}
                  type="password"
                  placeholder="Re-try Password"
                />
              </FormGroup>

              <FormGroup
                label="Email"
                errorMessage={methods.formState.errors.email?.message}
              >
                <TextField
                  name={`email` as const}
                  type="Email"
                  placeholder="Email"
                />
              </FormGroup>
            </div>
            {errorMutationRegister && (
              <div className="text-md ms-auto mt-6  text-red-500">
                {errorMutationRegister.message}
              </div>
            )}
          </FormGroupLayout>
        </div>
        <div className="mt-[2rem] flex w-full items-center justify-end gap-[1.5rem]">
          <div className="me-auto flex flex-col">
            <span className="text-md font-bold  text-darkgreen">หมายเหตุ</span>
            <ol className="ms-5 mt-1 list-disc  text-sm text-dustygreen">
              <li>
                ข้อความที่วางอยู่ที่ตำแหน่งล่างสุดของหน้าในหนังสือหรือเอกสาร
              </li>
              <li>ข้อความทั้งหมด เนื้อหาของหมายเหตุสามารถใส่ความเห็น</li>
            </ol>
          </div>

          <button
            aria-disabled={loadingMutationRegister}
            type="submit"
            className="rounded-md bg-forest p-4 px-8 font-bold text-white"
          >
            สมัครสมาชิก
          </button>
        </div>
      </form>

      {stateModalVerification[0] && (
        <VerificationModal
          modalState={stateModalVerification}
          onVerifySuccess={() => {
            stateModalVerificationSuccess[1](true);
          }}
        />
      )}
      <VerficationSuccessModal modalState={stateModalVerificationSuccess} />
    </FormProvider>
  );
}

export default RegisterUserPasswordForm;
