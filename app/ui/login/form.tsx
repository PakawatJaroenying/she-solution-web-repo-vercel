"use client";
import Link from "next/link";
import Checkbox from "../form/checkbox-rhf";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "../form/textfield-rhf";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "../form/form-group";
import { loginSchema } from "@/app/lib/module/login/login-schema";
import { useState } from "react";
import { Button } from "../button/button";
import createFormData from "@/app/lib/utils/create-formdata";
import { LoginServerAction } from "@/app/lib/server-action/authen";

//type ของข้อมูลที่จะส่งไปยัง server
type LoginFormType = {
  username: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const [errorMessages, setErrorMessage] = useState<string[]>([]);

  const methods = useForm<LoginFormType>({
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (
    query: LoginFormType,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    if (query.remember) {
      //TODO: บันทึกข้อมูลลง local storage
    }
    const formData = createFormData({
      username: query.username,
      password: query.password,
    });
    const res = await LoginServerAction(formData);
    if (typeof res === "string") {
      setErrorMessage(res.split("\n"));
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormGroup
          label="ผู้ใช้งาน"
          errorMessage={methods.formState.errors.username?.message}
        >
          <TextField name="username" type="text" placeholder="ป้อนผู้ใช้งาน" />
        </FormGroup>

        <FormGroup
          errorMessage={methods.formState.errors.password?.message}
          label="รหัสผ่าน"
          rightSlot={
            <Link
              href="#"
              className="font-medium text-sm text-teal hover:underline"
            >
              ลืมรหัสผ่าน?
            </Link>
          }
        >
          <div className="flex justify-between">
            <TextField name="password" type="password" placeholder="รหัสผ่าน" />
          </div>
        </FormGroup>

        <FormGroup label="">
          <Checkbox name="remember" text="จดจำรหัสผ่าน" value={"true"} />
        </FormGroup>

        <Button
          variant="primary"
          disabled={
            methods.formState.isLoading ||
            methods.formState.isValidating ||
            methods.formState.isSubmitting
          }
          type="submit"
          className="w-full"
        >
          เข้าสู่ระบบ
        </Button>

        {errorMessages.length > 0 && (
          <div className="text-red-500 text-sm mt-3">
            {errorMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center justify-center mt-4 gap-4 ">
          <div className="flex items-center gap-2 w-full">
            <div className="w-[40%] h-0.5 bg-gray-300"></div>
            <div className="text-center text-sm text-gray-600 shrink-0 flex-grow">
              หรือ เป็นผู้ใช้ใหม่ SHE Solution?
            </div>
            <div className="w-[40%] h-0.5 bg-gray-300"></div>
          </div>
          <Link
            href="/register-userpassword"
            className="btn btn-accent btn-outline  text-sm rounded-full px-6 py-2 "
          >
            สร้างบัญชีผู้ใช้งานใหม่
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
