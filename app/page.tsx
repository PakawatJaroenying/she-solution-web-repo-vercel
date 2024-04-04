"use client";
import FormGroup from "./ui/form/form-group";
import CheckboxRHF from "./ui/form/checkbox-rhf";
import { Form, FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TextfieldRhf from "./ui/form/textfield-rhf";
import TextFieldRHF from "./ui/form/textfield-rhf";
import RadioRHF from "./ui/form/radio-rhf";
import SelectRHF from "./ui/form/select-rhf";
import TableAccordion from "./ui/table/table-accordion";
import { Button } from "./ui/button/button";
import SelectAutocomplete from "./ui/form/select-autocomplete";

import Link from "next/link";
import SelectAutoCompleteRHF from "./ui/form/select-autocomplete-rhf";
import SelectCheckBox from "./ui/form/select-checkbox";
import SelectCheckboxRHF from "./ui/form/select-checkbox-rhf";
import TextFieldWithButton from "./ui/form/textfield-with-button";
import TextFieldWithButtonRHF from "./ui/form/textfield-with-button-rhf";

enum Package {
  BASIS = "Basis",
  MEDIUM = "Medium",
  PREMIUM = "Premium",
}

export type Form = {
  username: string;
  isRemember: boolean;
  favoriteColors: string[];
  package: Package;
  favoriteColor: string;
};

export default function Home() {
  const methods = useForm<Form>({
    defaultValues: {
      isRemember: true,
      favoriteColors: ["red", "blue"],
    },
  });
  const options = [
    {
      text: "red",
      value: "red",
    },
    {
      text: "blue",
      value: "blue",
    },
    {
      text: "green",
      value: "green",
    },
  ];
  const { handleSubmit, control } = methods;

  const onSubmit = (data: Form) => {
    // onSubmitLogin(data)
  };

  if (process.env.NODE_ENV === "production") {
    <Link href={"/login"}></Link>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-[2rem]">
        <FormGroup label="isRemember" tooltipTextHelp="ช่วยด้วย">
          <CheckboxRHF name="isRemember" text="Remember me" />
        </FormGroup>

        <FormGroup label="favoriteColors">
          <CheckboxRHF
            name="favoriteColors"
            options={[
              {
                text: "red",
                value: "red",
              },
              {
                text: "blue",
                value: "blue",
              },
              {
                text: "green",
                value: "green",
              },
            ]}
          />
        </FormGroup>

        <FormGroup label="username">
          <TextFieldRHF name="username" />
        </FormGroup>

        <FormGroup label="package">
          <RadioRHF name="package" text="Basis" value={Package.BASIS} />
          <RadioRHF name="package" text="Medium" value={Package.MEDIUM} />
        </FormGroup>

        <FormGroup label="package">
          <RadioRHF
            name="package"
            options={[
              {
                text: "Basis",
                value: Package.BASIS,
              },
              {
                text: "Medium",
                value: Package.MEDIUM,
              },
              {
                text: "Premium",
                value: Package.PREMIUM,
              },
            ]}
          />
        </FormGroup>

        <FormGroup label="package">
          <SelectRHF
            placeholder="Select package"
            name="package"
            options={[
              {
                text: "Basis",
                value: Package.BASIS,
              },
              {
                text: "Medium",
                value: Package.MEDIUM,
              },
              {
                text: "Premium",
                value: Package.PREMIUM,
              },
            ]}
          />
        </FormGroup>
        <button className=" mt-[1rem] bg-teal p-[1rem]" type="submit">
          Submit form
        </button>
        <div className="p-4">
          <TableAccordion
            fields={[
              { key: "id", label: "order_number", thClass: "min-w-[70%]" },
              { key: "name", label: "Name", thClass: "min-w-[70%]" },
              { key: "age", label: "Age" },
              { key: "manage", label: "จัดการ" },
            ]}
            items={[
              {
                id: 1,
                name: "John",
                age: 23,
                isExpand: true,
                children: [
                  {
                    key: "id",
                    title: "ทดสอบหัวข้อ id",
                    content: (it: any) => <span>{it.id}</span>,
                  },
                  {
                    key: "name",
                    title: "ทดสอบหัวข้อ name",
                    content: (it: any) => <span>{it.id}</span>,
                  },
                  {
                    key: "age",
                    title: "ทดสอบหัวข้อ age",
                    content: (it: any) => <span>{it.id}</span>,
                  },
                  {
                    key: "manageg",
                    title: "",
                    content: (it: any) => (
                      <Button variant="primary">{it.id}</Button>
                    ),
                  },
                ],
              },
            ]}
            renderers={{
              manage: (row) => (
                <>
                  <Button variant="primary">{row.age}</Button>
                </>
              ),
            }}
          />
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Click me to show/hide content
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <FormGroup label="favoriteColor" className="mt-10">
            <SelectAutoCompleteRHF name="favoriteColor" options={options} />
          </FormGroup>

          <FormGroup label="favoriteColors" className="mt-10 w-1/2">
            <SelectCheckboxRHF
              placeholder="พิมพ์ชื่อธุรกิจที่ต้องการค้นหา..."
              name="favoriteColors"
              options={options}
            />
          </FormGroup>
          <FormGroup label="favoriteColors" className="my-10 w-1/2">
            <TextFieldWithButtonRHF
              name="favoriteColor"
              textFieldProps={{
                placeholder: "ใส่คำที่ต้องการค้นหา...",
              }}
            />
            {methods.watch("favoriteColor")}
          </FormGroup>
        </div>
      </form>

      <DevTool control={control} />
    </FormProvider>
  );
}
