"use client";
import { FormDataType } from "@/app/lib/module/register/register-payment/formdata-type";
import { schema } from "@/app/lib/module/register/register-payment/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { Suspense, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RegisterPackageFormPackages from "../form-packages";
import FormGroupLayout from "../../form-group-layout";
import TopicAnswer from "../register-corporation/topic-answer";
import FormGroup from "../../form/form-group";
import TextFieldRHF from "../../form/textfield-rhf";
import SelectRHF from "../../form/select-rhf";
import Image from "next/image";
import { useThaiProvinceDataProvider } from "../../context/thai-province-data-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { GetPrompPayQRPaymentImageGQL } from "@/app/api/module/register-payment";
import ModalAttachPayment from "./modal";
import { useQuery } from "@apollo/client";

function RegisterPaymentForm({ packageId }: { packageId: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!packageId && router) router.replace("/register-package");
  }, [packageId, router]);

  const { data } = useQuery(GetPrompPayQRPaymentImageGQL, {
    variables: {
      packageId: packageId!,
    },
  });

  const { provinces, districts, subDistricts } = useThaiProvinceDataProvider();

  const methods = useForm<FormDataType>({
    defaultValues: {
      package: packageId!,
      companyName: "",
      companyAddress: "",
      companyProvinceId: "",
      companyProvince: "",
      companyDistrictId: "",
      companyDistrict: "",
      companySubDistrictId: "",
      companySubDistrict: "",
      companyPhoneNumber: "",
    },
    resolver: yupResolver(schema),
  });

  const modalAttachPaymentState = React.useState(false);

  const onSubmit = (data: FormDataType) => {
    //เปิด Modal จ่ายเงิน
    modalAttachPaymentState[1](true);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="shadow-primary  w-full rounded-md border border-gray-200 p-[2rem]">
              <RegisterPackageFormPackages />
            </div>
          </div>
          <div className="mt-[1rem] flex flex-col items-center gap-[0.5rem] p-[1rem] lg:flex-row lg:items-start">
            <div className="order-2 w-[100%] flex-grow lg:order-1">
              <FormGroupLayout
                Header={
                  <TopicAnswer
                    label="ที่อยู่สำหรับออกใบเสร็จ"
                    otherClass="mt-7 mb-2"
                  />
                }
              >
                <div className=" order-2 grid w-[100%] grid-cols-2  gap-2 lg:order-1 ">
                  <FormGroup
                    label="ชื่อบริษัท"
                    errorMessage={methods.formState.errors.companyName?.message}
                    className="col-start-1"
                  >
                    <TextFieldRHF
                      name={`companyName` as const}
                      type="text"
                      placeholder="ชื่อบริษัท"
                    />
                  </FormGroup>

                  <FormGroup
                    label="ที่ตั้ง"
                    className="col-start-1"
                    errorMessage={
                      methods.formState.errors.companyAddress?.message
                    }
                  >
                    <TextFieldRHF
                      name={`companyAddress` as const}
                      type="text"
                      placeholder="เช่น เลขที่ตั้ง อาคาร ชั้น"
                    />
                  </FormGroup>

                  <FormGroup
                    label="จังหวัด"
                    errorMessage={
                      methods.formState.errors.companyProvinceId?.message
                    }
                  >
                    <SelectRHF
                      name={`companyProvinceId` as const}
                      placeholder="เลือกจังหวัด"
                      options={
                        provinces.map((province) => ({
                          text: province.name_th,
                          value: String(province.id),
                        })) || []
                      }
                      onChanged={() => {
                        //clear district and subdistrict and postal code
                        methods.setValue("companyDistrictId", "");
                        methods.setValue("companySubDistrictId", "");
                        methods.setValue("companyPostalCode", "");
                        methods.setValue(
                          "companyProvince",
                          provinces.find(
                            (province) =>
                              province.id ===
                              Number(
                                methods.watch(`companyProvinceId` as const),
                              ),
                          )?.name_th || "",
                        );
                      }}
                      className="w-full"
                    />
                  </FormGroup>

                  <FormGroup
                    label="อำเภอ/เขต"
                    errorMessage={
                      methods.formState.errors.companyDistrictId?.message
                    }
                  >
                    <SelectRHF
                      name={`companyDistrictId` as const}
                      placeholder="เลือกอำเภอ/เขต"
                      options={
                        districts
                          .filter(
                            (district) =>
                              district.province_id ===
                              Number(
                                methods.watch(`companyProvinceId` as const),
                              ),
                          )
                          .map((district) => ({
                            text: district.name_th,
                            value: String(district.id),
                          })) || []
                      }
                      onChanged={() => {
                        //clear subdistrict and postal code
                        methods.setValue("companySubDistrictId", "");
                        methods.setValue("companyPostalCode", "");
                        methods.setValue(
                          "companyDistrict",
                          districts.find(
                            (district) =>
                              district.id ===
                              Number(methods.watch(`companyDistrictId`)),
                          )?.name_th || "",
                        );
                      }}
                      className="w-full"
                    />
                  </FormGroup>

                  <FormGroup
                    label="ตำบล/แขวง"
                    errorMessage={
                      methods.formState.errors.companySubDistrictId?.message
                    }
                  >
                    <SelectRHF
                      name={`companySubDistrictId` as const}
                      placeholder="เลือกตำบล/แขวง"
                      options={
                        subDistricts
                          .filter(
                            (subDistrict) =>
                              subDistrict.amphure_id ===
                              Number(methods.watch(`companyDistrictId`)),
                          )
                          .map((subDistrict) => ({
                            text: subDistrict.name_th,
                            value: String(subDistrict.id),
                          })) || []
                      }
                      onChanged={() => {
                        methods.setValue(
                          "companyPostalCode",
                          subDistricts
                            .find(
                              (subDistrict) =>
                                subDistrict.id ===
                                Number(methods.watch(`companySubDistrictId`)),
                            )
                            ?.zip_code?.toString() || "",
                        );
                        methods.trigger("companyPostalCode");
                        methods.setValue(
                          "companySubDistrict",
                          subDistricts.find(
                            (subDistrict) =>
                              subDistrict.id ===
                              Number(methods.watch(`companySubDistrictId`)),
                          )?.name_th || "",
                        );
                      }}
                      className="w-full"
                    />
                  </FormGroup>

                  <FormGroup
                    label="รหัสไปรษณีย์"
                    errorMessage={
                      methods.formState.errors.companyPostalCode?.message
                    }
                  >
                    <SelectRHF
                      disabled
                      name={`companyPostalCode` as const}
                      placeholder={`${
                        methods.watch(`companyPostalCode` as const) || ""
                      }`}
                      className="w-full"
                      options={[]}
                    />
                  </FormGroup>

                  <FormGroup
                    label="เบอร์โทรศัพท์"
                    errorMessage={
                      methods.formState.errors.companyPhoneNumber?.message
                    }
                  >
                    <TextFieldRHF
                      name={`companyPhoneNumber` as const}
                      type="text"
                      placeholder="เบอร์โทรศัพท์"
                    />
                  </FormGroup>
                </div>
              </FormGroupLayout>
            </div>
            <div className="order-1 mt-[1rem] min-w-[450px] lg:order-2 lg:mt-0">
              <div className="flex h-[100%] flex-col justify-between overflow-hidden rounded-lg border border-gray-200">
                <header className="text-md bg-whitegreen p-[1rem] font-bold">
                  ชำระค่าบริการ
                </header>
                <div className="p-[2rem]">
                  <main className="flex flex-col items-center space-y-[0.5rem] py-3">
                    {data?.promptPayQRPayment?.qrBase64Image ? (
                      <>
                        <Image
                          src={
                            data?.promptPayQRPayment?.qrBase64Image
                              ? `${data.promptPayQRPayment.qrBase64Image}`
                              : "/path/to/default/image.png"
                          }
                          width={191}
                          height={191}
                          alt="qr-code-payment"
                        />
                        <span className="text-sm text-gray-400">
                          ยอดทั้งหมดที่ต้องชำระ
                        </span>
                        <span className="text-3xl font-bold text-forest ">
                          {data?.promptPayQRPayment?.amount.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </span>
                      </>
                    ) : (
                      //blurred div
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="h-[180px] w-[191px] rounded-[10px] bg-gray-200 blur-[5px] filter"></div>
                        <span className="text-sm text-gray-400">
                          ยอดทั้งหมดที่ต้องชำระ
                        </span>

                        <span className="text-3xl font-bold text-forest ">
                          0.00
                        </span>
                      </div>
                    )}
                  </main>
                  <footer className="flex flex-col space-y-[1rem] text-center">
                    <span className="text-sm text-darkgreen">
                      เมื่อชำระแล้วโปรดแนบหลักฐานการชำระเงิน กดปุ่มด้านล่างนี้
                    </span>
                    <button type="submit" className="btn bg-forest text-white">
                      แนบหลักฐานการชำระเงิน
                    </button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </form>
        {methods.formState.isSubmitSuccessful && (
          <ModalAttachPayment manageModalState={modalAttachPaymentState} />
        )}
      </FormProvider>
    </>
  );
}

export default RegisterPaymentForm;
