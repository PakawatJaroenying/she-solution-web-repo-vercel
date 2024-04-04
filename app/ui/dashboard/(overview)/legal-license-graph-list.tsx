"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

type LegalLicenseGraphListProps = React.HtmlHTMLAttributes<HTMLDivElement>;

function LegalLicenseGraphList({ ...rest }: LegalLicenseGraphListProps) {
  const dataList = [
    {
      title: "กราฟแสดงสถานะกฎหมาย",
      count: 64,
      data: [
        ["ใบอนุญาตหมดอายุ", "hour per day"],
        ["ใบอนุญาตหมดอายุ", 2],
        ["อยู่ระหว่างดำเนินการ", 9],
        ["ดำเนินการสอดคล้อง", 12],
        ["เหลือเวลา 2 อาทิตย์", 24],
        ["เหลือเวลา 1 เดือน", 24],
        ["เหลือเวลา 3 เดือน", 34], // CSS-style declaration
      ],
    },
    {
      title: "กราฟแสดงสถานะใบอนุญาต",
      count: 23,
      data: [
        ["ใบอนุญาตหมดอายุ", "hour per day"],
        ["ใบอนุญาตหมดอายุ", 2],
        ["อยู่ระหว่างดำเนินการ", 9],
        ["ดำเนินการสอดคล้อง", 12],
        ["เหลือเวลา 2 อาทิตย์", 24],
        ["เหลือเวลา 1 เดือน", 24],
        ["เหลือเวลา 3 เดือน", 34], // CSS-style declaration
      ],
    },
  ];
  const option = {
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
    // backgroundColor: "#F5F5F5",
    fontSize: 20,
    pieHole: 0.4,
    is3D: false,
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
    colors: ["#06120E", "#87908D", "#C2CDC7", "#F54D4D", "#F89E5D", "#FFEEB2"],
    /*slices: [
      {
        textStyle: { color: "#F54D4D" },
      },
      {
        textStyle: { color: "#F54D4D" },
      },
    ],*/
  };

  return (
    <div
      className={clsx("grid grid-cols-1 lg:grid-cols-2 gap-4", rest.className)}
    >
      {dataList.map((item, index) => (
        <GraphItem
          key={index}
          title={item.title}
          count={item.count}
          data={item.data}
          option={option}
        />
      ))}
    </div>
  );
}

type GraphItemProps = {
  title: string;
  count: number;
  data: any;
  option: any;
};
function GraphItem({ title, count, data, option }: GraphItemProps) {
  const height = 300;
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-primary">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl text-darkgreen font-bold ">{title}</h1>
        <div className="flex items-baseline gap-2">
          <h1 className="text-4xl text-darkgreen font-bold ">{count}</h1>
          <h1 className="text-base text-darkgreen">ทั้งหมด</h1>
        </div>
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
      </div>
      <div className="flex  flex-row flex-wrap gap-8 lg:gap-2 lg:flex-col  mt-16 ">
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
    </div>
  );
}

export default LegalLicenseGraphList;
