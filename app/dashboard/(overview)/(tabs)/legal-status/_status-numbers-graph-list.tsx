"use client";
import { DEFAULT_GRAPH_HEIGHT, DEFAULT_PAGE_SIZE } from "@/app/lib/constant";
import {
  FieldDefinition,
  PaginatedResult,
  TabularState,
} from "@/app/lib/interfaces/tabular";
import { handleSortChange } from "@/app/lib/utils/handle-sort-column";
import Select from "@/app/ui/form/select";
import Pagination from "@/app/ui/pagination/pagination";
import TableNormal from "@/app/ui/table/table-normal";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Chart, { GoogleChartOptions } from "react-google-charts";

type StatusNumberGraphListProps = React.HtmlHTMLAttributes<HTMLDivElement>;
function StatusNumberGraphList({ ...rest }: StatusNumberGraphListProps) {
  const dataList = [
    {
      title: "กราฟแสดงสถานะดำเนินการทางกฏหมาย",
      data: [
        ["อยู่ระหว่างดำเนินการ", "hour per day"],
        ["อยู่ระหว่างดำเนินการ", 2],
        ["ดำเนินการสอดคล้อง", 9],
        ["ยังไม่ดำเนินการ", 12],
      ],
    },
    {
      title: "กราฟแสดงจำนวนกฏหมาย",
      data: [
        ["ใบอนุญาตหมดอายุ", "hour per day"],
        ["อยู่ระหว่างดำเนินการ", 2],
        ["ดำเนินการสอดคล้อง", 9],
        ["ยังไม่ดำเนินการ", 12],
      ],
    },
  ];
  const option: GoogleChartOptions = {
    //เปลื่ยนสี xaxis และ yaxis
    vAxis: {
      textStyle: {
        color: "#06120E",
        fontSize: 20,
      },
      titleTextStyle: {
        color: "#06120E",
        fontSize: 20,
      },
    },
    hAxis: {
      textStyle: {
        color: "#06120E",
        fontSize: 20,
      },
      titleTextStyle: {
        color: "#06120E",
        fontSize: 20,
      },
    },
    titleTextStyle: { color: "#a34f8b" },
    backgroundColor: "#FFF",
    fontSize: 20,
    pieHole: 0.4,
    is3D: false,
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
    colors: ["#F9EBC8", "#BAF2D4", "#FFD9D9"],
    slices: Array.from({ length: 3 }).map((_, index) => ({
      textStyle: { color: "#06120E" },
    })),
  };

  return (
    <div
      className={clsx("grid  grid-cols-1 lg:grid-cols-2 gap-4", rest.className)}
    >
      {dataList.map((item, index) => (
        <StatusNumberGraphItem
          key={index}
          title={item.title}
          data={item.data}
          option={option}
        />
      ))}
    </div>
  );
}

const fields: FieldDefinition[] = [
  {
    key: "order",
    label: "ลำดับ",
    sortable: true,
  },
  {
    key: "name",
    label: "ชื่อกฏหมาย",
  },
] satisfies FieldDefinition[];

interface StatusNumberGraphItemProps {
  title: string;
  data: (string | number)[][];
  option: GoogleChartOptions;
}

interface Item {
  order: string;
  name: string;
}

function StatusNumberGraphItem({
  title,
  data,
  option,
}: StatusNumberGraphItemProps) {
  // const [rawData, setRawData] = useState<PaginatedResult<Item>>()

  const [tableState, setTableState] = useState<TabularState<Item>>({
    data: [
      {
        order: "1",
        name: "สรุปสาระสำคัญพระราชบัญญัติคุ้มครองความลับในราชการ",
      },
      {
        order: "2",
        name: "สรุปสาระสำคัญพระราชบัญญัติคุ้มครองความลับในราชการ",
      },
    ],
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    rowCount: 2,
    sortColumn: "",
    sortDirection: "asc",
    search: {},
  });

  useEffect(() => {
    // fetch data
  }, [tableState.pageIndex, tableState.sortColumn, tableState.sortDirection]);

  const handleSortButtonClick = (columnName: string) => {
    setTableState((prevState) => handleSortChange(prevState, columnName));
  };

  const height = DEFAULT_GRAPH_HEIGHT;

  return (
    <div className="border border-gray-300 rounded-md shadow-primary p-4">
      {/* {JSON.stringify(tableState)} */}
      <div className="flex flex-col gap-4">
        <h1 className="text-md font-bold ">{title}</h1>
        <Select
          onChange={() => {}}
          name="category"
          placeholder="หมวดหมู่กฏหมาย"
          options={[]}
          className="w-1/3 mb-6"
        />
        <Chart
          loader={
            <div
              className="skeleton  w-full"
              style={{ height: height + "px" }}
            ></div>
          }
          chartType="PieChart"
          width="100%"
          height={`${height}px`}
          className="mx-auto"
          data={data}
          options={option}
        />
        <div className="flex  flex-row flex-wrap gap-8 lg:gap-2 lg:flex-col mt-8 ">
          {data.slice(1).map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-darkgreen">
              <div
                className="w-6 h-4 rounded-md"
                style={{ backgroundColor: option.colors[index] }}
              ></div>
              <h1>{item[0]}</h1>
              <h2 className="text-sm  text-gr">({item[1]})</h2>
            </div>
          ))}
        </div>
        <TableNormal
          className="mt-4"
          maxHeight={300}
          handleSortChange={handleSortButtonClick}
          header={
            <div className="flex items-baseline gap-2   ">
              <span className="text-base font-bold pb-2 border-b-4 border-whitegreen">
                อยู่ระหว่างดำเนินการ
              </span>{" "}
              <span className="text-sm text-gray-400 font-bold">
                (20 รายการ)
              </span>
            </div>
          }
          fields={fields}
          items={tableState.data}
          renderers={{}}
        />
        <div className="text-right">
          <Pagination
            totalPages={Math.ceil(tableState.rowCount / tableState.pageSize)}
            onChange={(page) => {
              setTableState((prev) => ({ ...prev, pageIndex: page }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatusNumberGraphList;
