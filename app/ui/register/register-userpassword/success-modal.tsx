"use client";
import { LoginServerAction } from "@/app/lib/server-action/authen";
import createFormData from "@/app/lib/utils/create-formdata";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormStep1SuccessModalProps {
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function VerficationSuccessModal({ modalState }: FormStep1SuccessModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { getValues } = useFormContext();
  const [open, setOpenModal] = modalState;
  return (
    <div
      className={clsx(
        "fixed  top-0 right-0 left-0 z-50    w-full  overflow-x-hidden overflow-y-auto md:inset-0 h-screenbg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50",
        {
          hidden: !open,
        }
      )}
    >
      <div className={clsx("relative w-screen h-screen")}>
        <div
          className="absolute bg-white rounded-lg shadow left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[20vw] max-w-[50vw] 
                p-[3rem]
        "
        >
          {" "}
          <div className=" flex flex-col w-100 justify-center items-center gap-[1rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 text-forest"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            <h1 className="text-xl font-bold text-forest">ยืนยันตัวตนสำเร็จ</h1>
          </div>
          <div className="mt-[2rem] w-[100%]">
            <button
              aria-disabled={loading}
              disabled={loading}
              onClick={async () => {
                const [username, password] = getValues([
                  "username",
                  "password",
                ]);
                const formData = createFormData({
                  username,
                  password,
                });
                await LoginServerAction(formData);
                setLoading(false);
              }}
              type="button"
              className="p-4 bg-forest text-white rounded-md px-8 font-bold w-full"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerficationSuccessModal;
