"use client";
import { FormDataTypes } from "@/app/lib/module/register/register-userpassword/modal-formdata-type";
import { schema } from "@/app/lib/module/register/register-userpassword/modal-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import FormGroup from "../../form/form-group";
import { useMutation } from "@apollo/client";
import {
  ConfirmUserGQL,
  ConfirmUserInput,
} from "@/app/api/module/register-userpassword";
import OTPInput from "react-otp-input";

type VerificationModalProps = {
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  onVerifySuccess: () => void;
};

function VerificationModal({
  modalState,
  onVerifySuccess,
}: VerificationModalProps) {
  const [mutationConfirm, { data, loading: loadingMutationConfirm, error }] =
    useMutation<any, ConfirmUserInput>(ConfirmUserGQL, {
      errorPolicy: "all",
    });

  const [otp, setOtp] = useState("");

  const { watch } = useFormContext();
  const [open, setOpenModal] = modalState;
  const [errorMutationConfirm, setErrorMutationConfirm] = useState<string>("");

  const methods = useForm<FormDataTypes>({
    defaultValues: {
      otp: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (open && window) {
      document.body.style.overflow = "hidden";
      //clear otp
      methods.setValue("otp", "");
    }
    setErrorMutationConfirm("");
  }, [open, methods]);

  useEffect(() => {
    methods.setValue("otp", otp);
    setErrorMutationConfirm("");
    //ถ้าเคย validate แล้ว
    if (methods.formState.isSubmitted) {
      methods.trigger("otp");
    }
  }, [otp, methods]);

  const onSubmit = async (data: FormDataTypes) => {
    const otp = data.otp;
    const res = await mutationConfirm({
      variables: {
        input: {
          code: otp,
          username: watch("username"),
        },
      },
    });

    if (res.errors) {
      setErrorMutationConfirm(error?.message || "เกิดข้อผิดพลาด");
      return;
    }
    onVerifySuccess();
    setOpenModal(false);
  };

  if (!open) return null;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
      <div
        tabIndex={-1}
        id="noti-modal"
        className={clsx(
          "h-screenbg-gray-900  fixed left-0 right-0 top-0    z-50  w-full overflow-y-auto overflow-x-hidden bg-opacity-50 md:inset-0 dark:bg-gray-900 dark:bg-opacity-50",
          {
            hidden: !open,
          },
        )}
      >
        <div className="relative h-screen w-screen ">
          <div className="absolute left-[50%] top-[50%] min-w-[40vw] max-w-[50vw] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow">
            <div className="flex items-center justify-between rounded-t bg-whitegreen  p-4 md:p-5 dark:border-gray-600 ">
              <h3 className="text-xl   font-bold text-darkgreen">
                ยืนยันตัวตน
              </h3>
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                type="button"
                className="w-17 h-17 ms-auto inline-flex items-center justify-center rounded-lg bg-transparent  text-sm text-darkgreen hover:bg-gray-200 hover:text-gray-900 "
                data-modal-hide="noti-modal"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-8">
              <div className="w-100 flex flex-col items-center justify-center gap-10">
                <h1 className="text-xl font-bold text-darkgreen">
                  กรุณายืนยันตัวตน
                </h1>
                <h2 className="text-md text-darkgreen">
                  รหัส 6 หลักได้ส่งไปที่ Email : {watch("email")}
                </h2>
                <FormGroup label="">
                  <div className="flex flex-col gap-[1rem]">
                    <div>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={() => <span className="w-5"></span>}
                        renderInput={(props) => (
                          <input
                            {...props}
                            className="!h-[50px] !w-[40px] border-b-4 border-darkgreen  text-center  text-3xl  focus-visible:outline focus-visible:outline-4 focus-visible:outline-teal"
                          />
                        )}
                      />
                    </div>
                    <div className="text-center">
                      {methods.formState.errors.otp?.message && (
                        <span className="text-md mt-4 text-red-500">
                          {methods.formState.errors.otp?.message}
                        </span>
                      )}
                      {!!errorMutationConfirm && (
                        <span className="text-md mt-4 text-red-500">
                          {errorMutationConfirm}
                        </span>
                      )}
                    </div>
                  </div>
                </FormGroup>
                <button
                  type="submit"
                  className="w-[100%] rounded-md bg-forest p-3 px-8 font-bold text-white"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default VerificationModal;
