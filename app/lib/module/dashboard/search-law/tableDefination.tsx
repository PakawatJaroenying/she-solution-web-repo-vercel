import { FieldDefinition } from "@/app/lib/interfaces/tabular";
import { Button } from "@/app/ui/button/button";

enum Fields {
  //เลขทะเบียน
  lawNumber = "lawNumber",
  //ชื่อกฎหมาย
  lawName = "lawName",
  //   วันที่ประกาศใช้
  effectiveDate = "effectiveDate",
  //   วันที่มีผลบังคับใช้
  effectiveDateEnforce = "effectiveDateEnforce",
  //กฎหมายแม่
  lawMother = "lawMother",
}

export const fields: FieldDefinition[] = [
  {
    key: Fields.lawNumber,
    label: "เลขทะเบียน",
  },
  {
    key: Fields.lawName,
    label: "ชื่อใบอนุญาต",
  },
  {
    key: Fields.effectiveDate,
    label: "วันที่มีผล",
  },
  {
    key: Fields.effectiveDateEnforce,
    label: "วันที่หมดอายุ",
  },
  {
    key: Fields.lawMother,
    label: "กฎหมายแม่",
  },
  {
    key: "manage",
    label: "",
  },
];

export const items = [
  {
    lawNumber: "MM999009",
    lawName: "ใบอนุญาตการสร้าง (Construction Permit)",
    effectiveDate: "20/08/2564",
    effectiveDateEnforce: "25/08/2564",
    lawMother: "18",
    isExpand: true,
    children: [
      {
        key: Fields.lawNumber,
        title: "เลขทะเบียน",
        content: (row: any) => row.lawNumber,
      },
      {
        key: Fields.lawName,
        title: "ชื่อใบอนุญาต",
        content: (row: any) => row.lawName,
      },
      {
        key: Fields.effectiveDate,
        title: "วันที่มีผล",
        content: (row: any) => row.effectiveDate,
      },
      {
        key: Fields.effectiveDateEnforce,
        title: "วันที่หมดอายุ",
        content: (row: any) => row.effectiveDateEnforce,
      },
      {
        key: Fields.lawMother,
        title: "กฎหมายแม่",
        content: (row: any) => row.lawMother,
      },
      {
        key: "manage",
        title: "",
        content: (row: any) => <Button variant="primary">ดาวน์โหลด</Button>,
      },
    ],
  },
];
