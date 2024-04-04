import React, { useState } from "react";
import FormGroup from "../form/form-group";
import SelectAutoCompleteRHF from "../form/select-autocomplete-rhf";
import TextFieldRHF from "../form/textfield-rhf";
import DatePickerRHF from "../form/datepicker-rhf";
import SelectCheckboxRHF from "../form/select-checkbox-rhf";
import DropFileRHF from "../form/dropfile-rhf";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import { filesSchema, originalFilePathSchema } from "@/app/lib/files-schema";
import {
  lawTypeOptions,
  legalCategoryOptions,
  managementSystemOptions,
  ministryOptions,
} from "@/app/lib/master";
import { TextValue } from "@/app/lib/interfaces/option";
import { SearchLawMastersGQL } from "@/app/api/module/register-law-regulation";
import { useLazyQuery } from "@apollo/client";
import { useDebouncedCallback } from "use-debounce";
import { OriginalFilePath } from "@/app/lib/interfaces/file";
import { LawMasterStatus } from "@/app/lib/interfaces/register-law-regulation";

export type RegistrationInformationFormType = {
  //เลือกหมวดหมู่กฏหมาย
  category: string;
  //เลขทะเบียนกฏหมาย
  lawId?: string;
  // ชื่อกฎหมาย
  name: string;
  // วันเดือนปีที่ประกาศ
  effectiveDate: string;
  // วันที่มีผลบังคับใช้
  announcementDate: string;
  // กฎหมายแม่
  motherLaw: string;
  // หน่วยงานที่ออก
  department: string;
  // กระทรวงที่ออกกฎหมาย
  ministry: string;
  // หัวข้อประเภทกฎหมายและข้อกำหนด
  lawTypeDetail: string[];
  // ประเภทกฎหมาย
  lawType: string;
  // ระบบการจัดการที่เกี่ยวข้อง
  relatedSystem: string[];
  // กฎหมายต้นฉบับ
  files: File[];
  originalFilePath: OriginalFilePath[];
};

function RegistrationInformationForm() {
  const [getSearchLawMastersLazy, { data }] = useLazyQuery(
    SearchLawMastersGQL,
    {
      fetchPolicy: "network-only",
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: (data) => {
        setMotherLawOptions(
          data.searchLawMasters.items.map((item) => ({
            value: item.lawInformation.lawId,
            text: item.lawInformation.name,
          })),
        );
      },
    },
  );
  const handleSearch = useDebouncedCallback(async (searchString) => {
    if (searchString) {
      await getSearchLawMastersLazy({
        variables: {
          input: {
            searchText: searchString,
            statues: [LawMasterStatus.broadcast],
            pagination: {
              pageNo: 1,
              pageSize: 10,
            },
          },
        },
      });
    } else {
      // setMotherLawOptions([]);
    }
  }, 300);

  const [motherLawOptions, setMotherLawOptions] = useState<TextValue[]>([]);

  const methods = useFormContext<RegistrationInformationFormType>();
  return (
    <>
      <FormGroup
        label="เลือกหมวดหมู่กฏหมาย"
        errorMessage={methods.formState.errors.category?.message}
      >
        <SelectAutoCompleteRHF
          name="category"
          placeholder="เลือกหมวดหมู่กฏหมาย"
          options={legalCategoryOptions}
        />
      </FormGroup>
      <FormGroup
        label="เลขทะเบียนกฏหมาย"
        errorMessage={methods.formState.errors.lawId?.message}
      >
        <TextFieldRHF name="lawId" disabled={true} placeholder="MM-XXXX-XXXX" />
      </FormGroup>
      <FormGroup
        label="ชื่อกฎหมาย"
        className="col-span-2"
        errorMessage={methods.formState.errors.name?.message}
      >
        <TextFieldRHF name="name" placeholder="ระบุชื่อกฎหมาย" />
      </FormGroup>
      <FormGroup
        label="วันที่ประกาศใช้"
        errorMessage={methods.formState.errors.effectiveDate?.message}
      >
        <DatePickerRHF name="effectiveDate" placeholder="วันที่ประกาศใช้" />
      </FormGroup>
      <FormGroup
        label="วันที่มีผลบังคับใช้"
        errorMessage={methods.formState.errors.announcementDate?.message}
      >
        <DatePickerRHF
          name="announcementDate"
          placeholder="วันที่มีผลบังคับใช้"
        />
      </FormGroup>
      <FormGroup
        label="กฎหมายแม่"
        errorMessage={methods.formState.errors.motherLaw?.message}
      >
        <SelectAutoCompleteRHF
          name="motherLaw"
          placeholder="ระบุกฎหมายแม่"
          onChangeTextSearch={(searchText) => {
            handleSearch(searchText);
          }}
          options={[
            {
              value: "รัฐธรรมนูญ",
              text: "รัฐธรรมนูญ",
            },
            ...motherLawOptions,
          ]}
        />
      </FormGroup>
      <FormGroup
        label="หน่วยงานที่ออก"
        errorMessage={methods.formState.errors.department?.message}
      >
        <TextFieldRHF name="department" placeholder="ระบุหน่วยงานที่ออก" />
      </FormGroup>
      <FormGroup
        label="กระทรวงที่ออกกฎหมาย"
        errorMessage={methods.formState.errors.ministry?.message}
      >
        <SelectAutoCompleteRHF
          name="ministry"
          placeholder="ระบุกระทรวงแรงงาน"
          options={ministryOptions}
        />
      </FormGroup>
      <FormGroup
        label="หัวข้อประเภทกฎหมายและข้อกำหนด"
        errorMessage={methods.formState.errors.lawTypeDetail?.message}
      >
        <SelectCheckboxRHF
          name="lawTypeDetail"
          placeholder="ระบุหัวข้อประเภทกฎหมายและข้อกำหนด"
          options={legalCategoryOptions}
        />
      </FormGroup>
      <FormGroup
        className=""
        label="ประเภทกฎหมาย"
        errorMessage={methods.formState.errors.lawType?.message}
      >
        <SelectAutoCompleteRHF
          name="lawType"
          placeholder="ระบุประเภทกฎหมาย"
          options={lawTypeOptions}
        />
      </FormGroup>
      <FormGroup
        label="ระบบการจัดการที่เกี่ยวข้อง"
        className=""
        errorMessage={methods.formState.errors.relatedSystem?.message}
      >
        <SelectCheckboxRHF
          name="relatedSystem"
          placeholder="ระบุระบบการจัดการที่เกี่ยวข้อง"
          options={managementSystemOptions}
        />
      </FormGroup>
      <FormGroup
        label="กฎหมายต้นฉบับ"
        className="col-span-2 col-start-1 mt-4"
        textHelp="(รองรับไฟล์ pdf, jpeg, jpg, png ขนาดไม่เกิน 5 MB.)"
        errorMessage={methods.formState.errors.files?.message}
      >
        <DropFileRHF
          onSuccess={(response) => {
            methods.setValue("originalFilePath", [
              ...methods.getValues("originalFilePath"),
              ...response.map((it) => ({ path: it.key, url: it.signedUrl })),
            ]);
          }}
          onUploading={() => {}}
          name="files"
          pairName="originalFilePath"
        />
      </FormGroup>
    </>
  );
}

export const schema: yup.ObjectSchema<RegistrationInformationFormType> = yup
  .object()
  .shape({
    category: yup.string().required("กรุณาเลือกหมวดหมู่กฏหมาย"),
    lawId: yup.string(),
    name: yup.string().required("กรุณากรอกชื่อกฎหมาย"),
    effectiveDate: yup.string().required("กรุณากรอกวันเดือนปีที่ประกาศ"),
    announcementDate: yup.string().required("กรุณากรอกวันที่มีผลบังคับใช้"),
    motherLaw: yup.string().required("กรุณากรอกกฎหมายแม่"),
    department: yup.string().required("กรุณากรอกหน่วยงานที่ออก"),
    ministry: yup.string().required("กรุณากรอกกระทรวงที่ออกกฎหมาย"),
    lawTypeDetail: yup
      .array()
      .of(yup.string().required())
      .required("กรุณาเลือกหัวข้อประเภทกฎหมายและข้อกำหนด")
      .min(1, "กรุณาเลือกหัวข้อประเภทกฎหมายและข้อกำหนด"),
    lawType: yup.string().required("กรุณาเลือกประเภทกฎหมาย"),
    relatedSystem: yup
      .array()
      .of(yup.string().required())
      .required("กรุณาเลือกระบบการจัดการที่เกี่ยวข้อง")
      .min(1, "กรุณาเลือกระบบการจัดการที่เกี่ยวข้อง"),
    files: filesSchema,
    originalFilePath: originalFilePathSchema,
  });

export default RegistrationInformationForm;
