import React, { useEffect, useState } from "react";
import FormGroup from "../../form/form-group";
import DropFileRHF from "../../form/dropfile-rhf";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import DatePickerRHF from "../../form/datepicker-rhf";

import { yupResolver } from "@hookform/resolvers/yup";
import { TimePickerDefaultValues } from "../../form/timepicker-schema";
import TimePickerRHF from "../../form/timepicker-rhf";
import { FormDataTypes } from "@/app/lib/module/register/register-payment/modal-formdata-type";
import { schema } from "@/app/lib/module/register/register-payment/modal-shema";
import { FormDataType as FormDataTypeParent } from "@/app/lib/module/register/register-payment/formdata-type";
import { CreatePaymentGQL } from "@/app/api/module/register-payment";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button } from "../../button/button";
import Modal from "../../modal/modal";
import ModalHeader from "../../modal/modal-header";
import { useSession } from "../../context/session-provider";

function ModalAttachPayment({
  manageModalState,
}: {
  manageModalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const [errorMessage, setErrorMesaage] = useState<string>("");
  const [open, setOpenModal] = manageModalState;

  const [mutateCreatePayment] = useMutation(CreatePaymentGQL, {
    onError: (error) => setErrorMesaage(error.message), //เอาไว้แสดง error จาก server
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  //พาเเลนต์เม็ดแต๊ด
  const parentMethods = useFormContext<FormDataTypeParent>();
  const methods = useForm<FormDataTypes>({
    defaultValues: {
      transferDate: new Date().toISOString().split("T")[0],
      transferTime: TimePickerDefaultValues,
      files: [],
    },
    resolver: yupResolver(schema),
  });

  const ownerId = useSession()?.user.id!;

  const [paymentImageKey, setPaymentImageKey] = useState<string>("");

  const onSubmit = async (data: FormDataTypes) => {
    setLoadingSubmit(true);

    const { hour, minute } = data.transferTime;

    const time = `${hour}:${minute}:00`;
    const utc = `+07:00`;

    const promises = await Promise.allSettled([
      //save to database
      mutateCreatePayment({
        variables: {
          ownerId: ownerId,
          input: {
            address: parentMethods.watch("companyAddress"),
            companyName: parentMethods.watch("companyName"),
            district: parentMethods.watch("companyDistrict")!,
            packageId: parentMethods.watch("package"),
            paymentDateTime: `${data.transferDate}T${time}${utc}`,
            paymentImageKey: paymentImageKey,
            phoneNumber: parentMethods.watch("companyPhoneNumber"),
            postalCode: parentMethods.watch("companyPostalCode"),
            province: parentMethods.watch("companyProvince")!,
            subDistrict: parentMethods.watch("companySubDistrict")!,
          },
        },
      }),
    ]);

    setLoadingSubmit(false);
    //set Error ถ้ามีการ upload หรือ save ไม่สำเร็จ
    if (promises.some((p) => p.status === "rejected")) {
      setErrorMesaage("ไม่สามารถบันทึกข้อมูลได้");
      return;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal open={open} width="40vw">
          <>
            <ModalHeader setOpenModal={setOpenModal} title="แจ้งการชำระเงิน" />
            <div className="space-y-4 p-4 md:p-5">
              <span className="text-base leading-relaxed text-darkgreen">
                แนบหลักฐานการจ่ายเงิน
              </span>
              <FormGroup
                label=""
                errorMessage={methods.formState.errors.files?.message}
              >
                <DropFileRHF
                  multiple={false}
                  // png และ jpg
                  onSuccess={(response) => {
                    setPaymentImageKey(response[0].key);
                    setLoadingSubmit(false);
                  }}
                  onUploading={() => {
                    setLoadingSubmit(true);
                  }}
                  allowExtensions={["image/png", "image/jpg", "image/jpeg"]}
                  disabled={methods.watch("files").length === 1}
                  name="files"
                />
              </FormGroup>
              <div className="mt-0 grid w-full grid-cols-1 space-x-1 md:grid-cols-2">
                <FormGroup
                  label="วันที่โอน"
                  errorMessage={methods.formState.errors.transferDate?.message}
                >
                  <DatePickerRHF name="transferDate" />
                </FormGroup>
                <FormGroup
                  label="เวลาที่โอน"
                  errorMessage={methods.formState.errors.transferTime?.message}
                >
                  <TimePickerRHF name="transferTime" />
                </FormGroup>
              </div>

              {/* SHOW ERROR MESSAGE */}
              {errorMessage && (
                <div className="text-md rounded-lg bg-red-500 p-4 px-5 py-3 text-center text-white">
                  {errorMessage}
                </div>
              )}

              <Button
                variant="primary"
                className="w-full"
                aria-disabled={loadingSubmit}
                disabled={loadingSubmit}
                type="submit"
              >
                ส่งหลักฐานการชำระเงิน
              </Button>
            </div>
          </>
        </Modal>
      </form>
    </FormProvider>
  );
}

export default ModalAttachPayment;
