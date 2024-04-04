"use client";
import { FieldDefinition } from "@/app/lib/interfaces/tabular";
import { SearchLawForm } from "@/app/lib/module/dashboard/search-law/formdata-type";
import {
  fields,
  items,
} from "@/app/lib/module/dashboard/search-law/tableDefination";
import { Button } from "@/app/ui/button/button";
import FormGroupLayout from "@/app/ui/form-group-layout";
import DatePickerRHF from "@/app/ui/form/datepicker-rhf";
import FormGroup from "@/app/ui/form/form-group";
import SelectAutoCompleteRHF from "@/app/ui/form/select-autocomplete-rhf";
import SelectCheckboxRHF from "@/app/ui/form/select-checkbox-rhf";
import TextFieldRHF from "@/app/ui/form/textfield-rhf";
import TextFieldWithButtonRHF from "@/app/ui/form/textfield-with-button-rhf";
import Pagination from "@/app/ui/pagination/pagination";
import TopicAnswer from "@/app/ui/register/register-corporation/topic-answer";
import TableAccordion from "@/app/ui/table/table-accordion";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

function Page() {
  /* -------------------------------------------------------------------------- */
  const methods = useForm<SearchLawForm>();
  /* -------------------------------------------------------------------------- */

  const onSubmit = (data: SearchLawForm) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <header>
            <h1 className="text-xl ">สืบค้นกฏหมายและข้อกำหนดที่เกี่ยวข้อง</h1>
          </header>
          <main>
            <div className="card border border-whitegreen p-8 shadow-xl">
              <TextFieldWithButtonRHF
                name="search"
                buttonProps={{
                  type: "button",
                  className: "px-8",
                  onClick: () => {
                    const value = methods.getValues("search");
                    console.log("click", value);
                  },
                }}
                textFieldProps={{
                  placeholder: "ใส่คำที่ต้องการค้นหา...",
                }}
              />

              <FormGroupLayout
                Header={
                  <TopicAnswer
                    label="ค้นหาอย่างละเอียด"
                    otherClass="mt-4 mb-2"
                  />
                }
              >
                <div className="grid grid-cols-1 gap-4  md:grid-cols-2 xl:grid-cols-4 ">
                  <FormGroup label="เลขทะเบียนกฎหมาย">
                    <TextFieldRHF
                      name="lawNumber"
                      placeholder="ใส่เลขทะเบียนกฏหมาย"
                    />
                  </FormGroup>
                  <FormGroup label="ชื่อกฎหมาย">
                    <TextFieldRHF name="lawName" placeholder="ระบุชื่อกฎหมาย" />
                  </FormGroup>
                  <FormGroup label="วันที่ประกาศใช้">
                    <DatePickerRHF name="effectiveDate" />
                  </FormGroup>
                  <FormGroup label="วันที่มีผลบังคับใช้">
                    <DatePickerRHF name="effectiveDateEnforce" />
                  </FormGroup>
                </div>
                <div className="grid grid-cols-1  gap-4 md:grid-cols-2">
                  <FormGroup
                    label="กฎหมายแม่"
                    errorMessage={methods.formState.errors.ministry?.message}
                  >
                    <SelectAutoCompleteRHF
                      name="lawMother"
                      placeholder="เลือกกฎหมายแม่"
                      options={[]}
                    />
                  </FormGroup>
                  <FormGroup
                    label="หน่วยงานที่ออก"
                    errorMessage={methods.formState.errors.ministry?.message}
                  >
                    <SelectAutoCompleteRHF
                      name="department"
                      placeholder="ระบุหน่วยงาน"
                      options={[]}
                    />
                  </FormGroup>
                  <FormGroup
                    label="กระทรวงที่ออกกฎหมาย"
                    errorMessage={methods.formState.errors.ministry?.message}
                  >
                    <SelectAutoCompleteRHF
                      name="ministry"
                      placeholder="ระบุกระทรวง"
                      options={[]}
                    />
                  </FormGroup>
                  <FormGroup
                    label="หัวข้อประเภทกฎหมายและข้อกำหนด"
                    errorMessage={methods.formState.errors.ministry?.message}
                  >
                    <SelectCheckboxRHF
                      name="lawType"
                      placeholder="ระบุกระทรวง"
                      options={[]}
                    />
                  </FormGroup>
                  <FormGroup
                    label="ประเภทกฎหมาย"
                    errorMessage={methods.formState.errors.ministry?.message}
                  >
                    <SelectAutoCompleteRHF
                      name="lawCategory"
                      placeholder="ระบุประเภทกฎหมาย"
                      options={[]}
                    />
                  </FormGroup>
                  <FormGroup
                    label="ระบบการจัดการที่เกี่ยวข้อง"
                    errorMessage={methods.formState.errors.ministry?.message}
                  >
                    <SelectCheckboxRHF
                      name="managementSystem"
                      placeholder="ระบุระบบการจัดการที่เกี่ยวข้อง"
                      options={[]}
                    />
                  </FormGroup>
                </div>
                <div className="mt-8">
                  <Button
                    variant="primary"
                    className="flex items-center justify-center px-6"
                    type="submit"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_584_4078"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_584_4078)">
                        <path
                          d="M2.5 18.4807V16.9808H12.2789V18.4807H2.5ZM2.5 13.5865V12.0865H7.23075V13.5865H2.5ZM2.5 8.69225V7.1923H7.23075V8.69225H2.5ZM20.4461 18.5L16.5769 14.6596C16.1961 14.9365 15.7811 15.1474 15.3317 15.2923C14.8823 15.4371 14.4256 15.5096 13.9615 15.5096C12.7085 15.5096 11.6405 15.0717 10.7574 14.1961C9.87426 13.3205 9.4327 12.2567 9.4327 11.0048C9.4327 9.75288 9.87448 8.6891 10.7581 7.81345C11.6416 6.93782 12.7102 6.5 13.9638 6.5C15.2174 6.5 16.2852 6.93782 17.1673 7.81345C18.0493 8.6891 18.4903 9.75128 18.4903 11C18.4903 11.4641 18.4179 11.9208 18.273 12.3702C18.1281 12.8195 17.914 13.2314 17.6307 13.6057L21.5 17.4461L20.4461 18.5ZM13.9615 14.0096C14.8029 14.0096 15.518 13.7179 16.107 13.1346C16.6959 12.5513 16.9904 11.8413 16.9904 11.0048C16.9904 10.1682 16.6959 9.45831 16.107 8.87498C15.518 8.29164 14.8029 7.99998 13.9615 7.99998C13.1202 7.99998 12.405 8.29164 11.8161 8.87498C11.2271 9.45831 10.9327 10.1682 10.9327 11.0048C10.9327 11.8413 11.2271 12.5513 11.8161 13.1346C12.405 13.7179 13.1202 14.0096 13.9615 14.0096Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    <span>ค้นหา</span>
                  </Button>
                </div>
              </FormGroupLayout>
            </div>
          </main>
        </div>
      </form>

      <TableAccordion header="ผลการค้นหา" fields={fields} items={items} />
      <div className="mt-4 text-right">
        <Pagination
          totalPages={1}
          onChange={(page) => {
            console.log(page);
          }}
        />
      </div>
    </FormProvider>
  );
}

export default Page;
