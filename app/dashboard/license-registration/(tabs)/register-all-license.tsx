'use client'
import { FieldDefinition } from "@/app/lib/interfaces/tabular";
import { Button } from "@/app/ui/button/button";
import Select from "@/app/ui/form/select";
import SelectRHF from "@/app/ui/form/select-rhf";
import TextField from "@/app/ui/form/textfield";
import TextFieldRHF from "@/app/ui/form/textfield-rhf";
import TableAccordion from "@/app/ui/table/table-accordion";
import clsx from "clsx";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import LicenseStatus from "../../../ui/licnese-status";
import Image from "next/image";
import Pagination from "@/app/ui/pagination/pagination";
type SearchType = {
  search: string;
  status: string;
  time: string;
};

function RegisterAllLicenseTab() {
  const methods = useForm<SearchType>();

  const fields: FieldDefinition[] = [
    {
      key: "number",
      label: "เลขทะเบียน",
    },
    {
      key: "name",
      label: "ชื่อใบอนุญาต",
    },
    {
      key: "effectiveDate",
      label: "วันที่มีผล",
    },
    {
      key: "expirationDate",
      label: "วันที่หมดอายุ",
    },
    {
      key: "status",
      label: "สถานะ",
    },
    {
      key: "manage",
      label: "",
    },
  ];

  const onSubmit = (data: SearchType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* SEARCH */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex justify-between w-full mt-4 items-center">
            <h1 className="text-xl ">ทะเบียนใบอนุญาต</h1>
            <div className="flex items-center gap-3">
              <TextFieldRHF
                name="search"
                placeholder="ค้นหา"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                }
                iconPosition="right"
              />
              <SelectRHF
                name="status"
                placeholder="สถานะ"
                options={[{ text: "อยู่ระหว่างดำเนินการ", value: "1" }]}
              />
              <SelectRHF
                name="time"
                placeholder="เหลือเวลา"
                options={[{ text: "อยู่ระหว่างดำเนินการ", value: "1" }]}
              />
            </div>
          </div>
        </form>
      </FormProvider>
      {/* TABLE */}
      <TableAccordion
        fields={fields}
        items={[
          {
            number: "MM999009",
            name: "ใบอนุญาตการสร้าง (Construction Permit)",
            effectiveDate: "20/08/2564",
            expirationDate: "25/08/2564",
            status: 2,
            isExpand: true,
            children: [
              {
                key: "number",
                title: "เลขทะเบียน",
                content: (row: any) => row.number,
              },
              {
                key: "name",
                title: "ชื่อใบอนุญาต",
                content: (row: any) => row.name,
              },
              {
                key: "effectiveDate",
                title: "วันที่มีผล",
                content: (row: any) => row.effectiveDate,
              },
              {
                key: "expirationDate",
                title: "วันที่หมดอายุ",
                content: (row: any) => row.expirationDate,
              },
              {
                key: "status",
                title: "สถานะ",
                content: (row: any) => row.status,
              },
              {
                key: "manage",
                title: "",
                content: (row: any) => (
                  <Button variant="secondary">ดาวน์โหลด</Button>
                ),
              },
            ],
          },
          {
            number: "MM999009",
            name: "ใบอนุญาตการสร้าง (Construction Permit)",
            effectiveDate: "20/08/2564",
            expirationDate: "25/08/2564",
            status: 18,
            isExpand: false,
            children: [
              {
                key: "number",
                title: "เลขทะเบียน",
                content: (row: any) => row.number,
              },
              {
                key: "name",
                title: "ชื่อใบอนุญาต",
                content: (row: any) => row.name,
              },
              {
                key: "effectiveDate",
                title: "วันที่มีผล",
                content: (row: any) => row.effectiveDate,
              },
              {
                key: "expirationDate",
                title: "วันที่หมดอายุ",
                content: (row: any) => row.expirationDate,
              },
              {
                key: "status",
                title: "สถานะ",
                content: (row: any) => row.status,
              },
              {
                key: "manage",
                title: "",
                content: (row: any) => (
                  <Button variant="secondary">ดาวน์โหลด</Button>
                ),
              },
            ],
          },
        ]}
        renderers={{
          number: (row) => <span className="text-teal">{row.number}</span>,
          effectiveDate: (row) => (
            <span className="text-dustygreen">{row.effectiveDate}</span>
          ),
          expirationDate: (row) => (
            <span className="text-dustygreen">{row.expirationDate}</span>
          ),
          status: (row) => <LicenseStatus status={row.status} />,
          manage: (row) => (
            <>
              <Button
                variant="primary"
                className=" flex items-center justify-center bg-white btn-outline p-3 rounded-lg text-dustygreen border-graygreen hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Button>
              <Button
                variant="primary"
                className="flex items-center justify-center bg-white btn-outline p-3 rounded-lg text-dustygreen border-graygreen hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Button>
              <Button
                variant="primary"
                className="flex items-center justify-center bg-white btn-outline p-3 rounded-lg text-dustygreen border-graygreen hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-inherit"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </>
          ),
        }}
      />
      <div className="text-right">
        <Pagination
          totalPages={1}
          onChange={(page) => {
            console.log(page);
          }}
        />
      </div>
    </div>
  );
}

export default RegisterAllLicenseTab;
