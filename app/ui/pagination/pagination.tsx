"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../button/button";
import { useEffect, useState } from "react";

export default function Pagination({
  totalPages,
  onChange,
}: {
  totalPages: number;
  onChange: (page: number) => void;
}) {
  // NOTE: comment in this code when you get to this point in the course
  const [currentPage, setCurrentPage] = useState<number>(1);

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          isDisabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            onChange(currentPage - 1);
          }}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                page={page}
                position={position}
                isActive={currentPage === page}
                onClick={(page) => {
                  setCurrentPage(page);
                  onChange(page);
                }}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          isDisabled={currentPage >= totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            onChange(currentPage + 1);
          }}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  isActive,
  position,
  onClick,
}: {
  page: number | string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
  onClick: (page: number) => void;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-teal border-teal text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button
      type="button"
      className={className}
      onClick={() => typeof page === "number" && onClick(page)}
    >
      {page}
    </button>
  );
}

function PaginationArrow({
  direction,
  isDisabled,
  onClick,
}: {
  direction: "left" | "right";
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {icon}
    </button>
  );
}

const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
