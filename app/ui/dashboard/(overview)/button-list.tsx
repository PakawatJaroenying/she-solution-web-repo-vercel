'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";

type ButtonListProps = HTMLAttributes<HTMLDivElement>;

function ButtonList({ ...props }: ButtonListProps) {
  const buttons = [
    {
      title: "กฎหมายใหม่",
      to: "new-law",
    },
    {
      title: "สถานะการดำเนินตามกฎหมาย",
      to: "legal-status",
    },
    {
      title: "สถานะใบอนุญาตทั้งหมดที่เกี่ยวข้อง",
      to: "license-status",
    },
  ];
  return (
    <div
      className={clsx(
        "w-[100%]   grid grid-cols-3 space-x-4",
        props.className
      )}
    >
      {buttons.map((button, index) => (
        <ButtonItem key={index} title={button.title} to={button.to} />
      ))}
    </div>
  );
}

type ButtonItemProps = {
  title: string;
  to: string;
};

function ButtonItem({ title, to }: ButtonItemProps) {
  const lastPathname = usePathname().split("/").pop();
  return (
    <Link
      href={"/dashboard/" + to}
      className={clsx(
        "cursor-pointer text-forest shadow-primary border rounded-xl min-h-[74px] text-center flex justify-center items-center hover:shadow-none hover:bg-aqua hover:text-teal transition-all duration-300 ease-in-out",
        { "bg-teal text-white": lastPathname === to }
      )}
    >
      {title}
    </Link>
  );
}

export default ButtonList;
