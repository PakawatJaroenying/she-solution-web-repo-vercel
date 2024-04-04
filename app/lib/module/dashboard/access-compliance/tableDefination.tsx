import { FieldDefinition } from "@/app/lib/interfaces/tabular";
import { Button } from "@/app/ui/button/button";

enum Fields {
  //ลำดับ
  order = "order",
  //สาระสำคัญของกฏหมาย
  lawContent = "lawContent",
  //   ประเมินความสอดคล้อง
  assess = "assess",
  //   มอบหมาย
  assign = "assign",
  //   กำหนดเสร็จ
  complete = "complete",
  //   วันที่ดำเนินการแล้วเสร็จ
  completeDate = "completeDate",
}

export const fields: FieldDefinition[] = [
  {
    key: Fields.order,
    label: "ลำดับ",
  },
  {
    key: Fields.lawContent,
    label: "สาระสำคัญของกฏหมาย",
  },
  {
    key: Fields.assess,
    label: "ประเมินความสอดคล้อง",
  },
  {
    key: Fields.assign,
    label: "มอบหมาย",
  },
  {
    key: Fields.complete,
    label: "กำหนดเสร็จ",
  },
  {
    key: Fields.completeDate,
    label: "วันที่ดำเนินการแล้วเสร็จ",
  },
];

export const items = [
  {
    order: "1",
    lawContent: "การประเมินความสอดคล้องกฎหมาย",
    assess: "ประเมินความสอดคล้องกฎหมาย",
    assign: "นาย สมชาย ใจดี",
    complete: "20/08/2564",
    completeDate: "25/08/2564",
    isExpand: true,
    children: [
      {
        key: Fields.order,
        title: "",
        content: (row: any) => '',
      },
      {
        key: Fields.lawContent,
        title: "แนวทางแก้ไข",
        content: (row: any) => "รายละเอียดแนวทางแก้ไข ฯลฯ",
      },
      {
        key: Fields.assess,
        title: "ผลการดำเนินการแก้ไข",
        content: (row: any) => "-",
      },
      {
        key: Fields.assign,
        title: "ผู้ตรวจสอบ",
        content: (row: any) => row.assign,
      },
      {
        key: Fields.complete,
        title: "เอกสารแนบเอกสารแนบ",
        content: (row: any) => "-",
      },
      {
        key: Fields.completeDate,
        title: "วันที่ดำเนินการแล้วเสร็จ",
        content: (row: any) => row.completeDate,
      },
    ],
  },
];
