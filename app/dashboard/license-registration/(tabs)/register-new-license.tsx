"use client";
import { RegistterNewLicenseForm } from "@/app/lib/module/dashboard/license-registration/register-new-license/formdata-type";
import { schema } from "@/app/lib/module/dashboard/license-registration/register-new-license/schema";
import { Button } from "@/app/ui/button/button";
import DatePickerRHF from "@/app/ui/form/datepicker-rhf";
import DropFileRHF from "@/app/ui/form/dropfile-rhf";
import FormGroup from "@/app/ui/form/form-group";
import SelectRHF from "@/app/ui/form/select-rhf";
import TextFieldRHF from "@/app/ui/form/textfield-rhf";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ModalConfirmSaveNewLicense from "./_modal-confirm-save-new-license";
import ModalConfirmDeleteLicense from "./_modal_confirm-delete-license";
import ModalApproveNewLicense from "./_modal-approve-new-license";

function RegisterNewLicenseTab() {
  const stateModalConfirmSaveNewLicense = useState(false);
  const stateModalConfirmDeleteLicense = useState(false);
  const stateModalConfirmApproveLicense = useState(false);

  const methods = useForm<RegistterNewLicenseForm>({
    defaultValues: {
      originalLaw: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegistterNewLicenseForm) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col gap-4">
          <header>
            <h1 className="text-xl ">ขึ้นทะเบียนใบอนุญาต</h1>
          </header>
          <main>
            <div className="card border border-whitegreen p-4">
              <div className="grid grid-cols-2  gap-4">
                <FormGroup
                  label="เลขทะเบียนใบอนุญาต"
                  errorMessage={methods.formState.errors.licenseNumber?.message}
                >
                  <TextFieldRHF
                    name="licenseNumber"
                    placeholder="ใส่เลขทะเบียนใบอนุญาต"
                  />
                </FormGroup>
                <FormGroup
                  label="ชื่อใบอนุญาติ"
                  errorMessage={methods.formState.errors.licenseName?.message}
                >
                  <TextFieldRHF
                    name="licenseName"
                    placeholder="ระบุชื่อใบอนุญาต"
                  />
                </FormGroup>
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup
                    label="วันที่ใบอนุญาตเริ่มมีผล"
                    errorMessage={
                      methods.formState.errors.effectiveDate?.message
                    }
                  >
                    <DatePickerRHF name="effectiveDate" />
                  </FormGroup>
                  <FormGroup
                    label="วันที่ใบอนุญาตหมดอายุ"
                    errorMessage={
                      methods.formState.errors.expirationDate?.message
                    }
                  >
                    <DatePickerRHF name="expirationDate" />
                  </FormGroup>
                </div>
                <FormGroup
                  label="หน่วยงานที่ออกใบอนุญาต"
                  errorMessage={methods.formState.errors.organization?.message}
                >
                  <TextFieldRHF
                    name="organization"
                    placeholder="ระบุหน่วยงาน"
                  />
                </FormGroup>
                <FormGroup
                  label="กระทรวงที่ออกใบอนุญาต"
                  errorMessage={methods.formState.errors.ministry?.message}
                >
                  <SelectRHF
                    className="w-full"
                    name="ministry"
                    placeholder="เลือกกระทรวงที่ออกใบอนุญาต"
                    options={[]}
                  />
                </FormGroup>
                <FormGroup
                  label="กฎหมายต้นฉบับ"
                  className="col-start-1 col-span-2"
                  textHelp="(รองรับไฟล์ pdf, jpeg, jpg, png ขนาดไม่เกิน 5 MB.)"
                  errorMessage={methods.formState.errors.originalLaw?.message}
                >
                  <DropFileRHF
                    onSuccess={() => {}}
                    onUploading={() => {}}
                    name="originalLaw"
                  />
                </FormGroup>
                <FormGroup
                  label="ชื่อผู้รับผิดชอบ"
                  errorMessage={
                    methods.formState.errors.responsiblePerson?.message
                  }
                >
                  <TextFieldRHF
                    name="responsiblePerson"
                    placeholder="ระบุชื่อผู้รับผิดชอบ"
                  />
                </FormGroup>
                <FormGroup
                  label="อีเมลผู้รับผิดชอบ"
                  errorMessage={
                    methods.formState.errors.responsibleEmail?.message
                  }
                >
                  <TextFieldRHF
                    name="responsibleEmail"
                    placeholder="ระบุอีเมลผู้รับผิดชอบ"
                  />
                </FormGroup>
              </div>{" "}
              {/* end grid */}
            </div>
          </main>
          <footer>
            <div className="flex w-full justify-between">
              <div className="left flex gap-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    stateModalConfirmSaveNewLicense[1](true);
                  }}
                >
                  บันทึก
                </Button>
                <Button variant="primary">ส่งอนุมัติ</Button>
              </div>
              <div className="right left flex gap-2">
                <Button type="button" variant="primary" className="btn-outline">
                  ส่งกลับแก้ไข
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => {
                    stateModalConfirmApproveLicense[1](true);
                  }}
                >
                  อนุมัติ
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </form>
      {stateModalConfirmSaveNewLicense[0] && (
        <ModalConfirmSaveNewLicense
          manageModalState={stateModalConfirmSaveNewLicense}
          onConfirm={() => {
            //TODO: ทำการบันทึกรายการ
          }}
        />
      )}
      {stateModalConfirmApproveLicense[0] && (
        <ModalApproveNewLicense
          manageModalState={stateModalConfirmApproveLicense}
        />
      )}
    </FormProvider>
  );
}

export default RegisterNewLicenseTab;
