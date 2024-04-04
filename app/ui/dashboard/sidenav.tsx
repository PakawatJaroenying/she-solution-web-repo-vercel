"use client";
import { DocumentTextIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const sidebarNavigation = [
  {
    title: "ทะเบียนกฎหมายและข้อกำหนด",
    route: "/dashboard/registration-law-regulation",
    subRoute: ["/add", "/edit"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-forest  "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
    ),
  },
  {
    title: "ประเมินความสอดคล้อง ตามกฎหมาย",
    route: "/dashboard/access-compliance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6  text-forest  "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    title: "สืบค้นกฎหมายและข้อกำหนดที่เกี่ยวข้อง",
    route: "/dashboard/search-law",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-forest  "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
  },
  {
    title: "ทะเบียนใบอนุญาต",
    route: "/dashboard/license-registration",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-forest "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    ),
  },
  {
    title: "แดชบอร์ด",
    route: "/dashboard",
    subRoute: ["/new-law", "/legal-status", "/license-status"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-forest"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
        />
      </svg>
    ),
  },
];

function Sidenav() {
  return (
    <div className="shadow-primary  flex flex-col  items-start rounded-2xl border bg-white ">
      {sidebarNavigation.map((item, index) => (
        <div
          key={index}
          className={clsx("w-full p-4", {
            "border-b": index !== sidebarNavigation.length - 1,
          })}
        >
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.title}
            href={item.route}
            subRoute={item.subRoute}
          />
        </div>
      ))}
    </div>
  );
}

function SidebarItem({
  icon,
  text,
  href,
  subRoute,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  subRoute?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const conditionedIsCurrentPahname =
    pathname === href ||
    (subRoute &&
      subRoute
        .map((sub) => href + sub + (params.id ? "/" + params.id : ""))
        .includes(pathname));
  return (
    <button
      className={clsx(
        "flex w-full items-center rounded-lg p-3 text-left text-gray-700 hover:bg-aqua",
        {
          "bg-aqua  font-bold": conditionedIsCurrentPahname,
        },
      )}
      onClick={() => router.push(href)}
    >
      <span className={clsx("flex-shrink-0 rounded-lg bg-aqua p-2", {})}>
        {icon}
      </span>
      <span
        className={clsx("ml-4", {
          "text-forest": conditionedIsCurrentPahname,
        })}
      >
        {text}
      </span>
    </button>
  );
}

export default Sidenav;
