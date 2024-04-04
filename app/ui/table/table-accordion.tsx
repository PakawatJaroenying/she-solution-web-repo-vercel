import {
  BasePropsTabular,
  FieldDefinition,
} from "@/app/lib/interfaces/tabular";
import React, { useState } from "react";
import { Button } from "../button/button";
import clsx from "clsx";

//props
type TableAccordionProps<I> = BasePropsTabular<I> & {
  header?: React.ReactNode;
  maxHeight?: number;
};

//parent Item
type ExtendedTableAccordion<I> = {
  isExpand: boolean;
  children: Array<ChildItem<Omit<I, "isExpand" | "children">>>;
};

//child Item
type ChildItem<I> = {
  key: string;
  title: string;
  content: (it: I) => React.ReactNode;
};

function TableAccordion<I extends ExtendedTableAccordion<I>>({
  header,
  fields,
  items: initialItems,
  maxHeight,
  renderers,
  handleSortChange,
}: TableAccordionProps<I>) {
  const [items, setItems] = useState<I[]>(initialItems);
  const thClass = "font-bold text-sm px-6 py-4";
  const tdClass = "text-sm px-6 py-4  whitespace-pre-wrap text-darkgreen";
  const trClass = "bg-white border  border-whitegreen";
  return (
    <div className="flex flex-col gap-4 mt-8">
      {header && <div className="text-xl"> {header}</div>}
      <div
        className="relative overflow-x-auto  sm:rounded-lg"
        style={{ maxHeight: maxHeight ? maxHeight + "px" : "auto" }}
      >
        <table className="w-full  text-sm text-left rtl:text-right">
          <thead className="sticky top-0 text-xs text-darkgreen uppercase bg-[#FBFBFB] border  border-whitegreen  ">
            <tr>
              {fields?.map((field, index) => (
                <th key={index} className={clsx(thClass, field.thClass)}>
                  {field.label}
                  {field.sortable && (
                    <button
                      className="ml-1   hover:bg-gray-200 active:bg-gray-300"
                      onClick={() => {
                        handleSortChange?.(field.key);
                      }}
                    >
                      ⬆⬇
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((row: I, rowIndex: number) => (
              <>
                {/* Parent  row */}
                <tr
                  key={"row" + rowIndex}
                  className={clsx(trClass, {
                    "bg-whitegreen !border-b-0": row.isExpand,
                  })}
                >
                  {
                    fields.map((col, colIndex: number) => {
                      if (col.key !== "manage") {
                        return (
                          <td
                            key={"col" + colIndex}
                            className={clsx(tdClass, col.tdClass)}
                          >
                            {
                              (renderers?.[col.key] &&
                              typeof renderers[col.key] === "function"
                                ? renderers[col.key]!(row)
                                : row[col.key as keyof I]) as React.ReactNode
                            }
                          </td>
                        );
                      } else {
                        /* manage */
                        return (
                          <td
                            className={clsx(
                              tdClass,
                              "flex justify-end items-center",
                              col.tdClass
                            )}
                            key={"col" + colIndex}
                          >
                            <div className="flex gap-2">
                              {renderers?.["manage"] &&
                                renderers!["manage"]!(row)}
                              <Button
                                variant="primary"
                                className={clsx(
                                  "btn-outline p-3 rounded-lg border-graygreen hover:!bg-[#D9D9D9] hover:!text-forest  hover:!border-transparent",
                                  {
                                    "bg-[#D9D9D9] text-forest border-transparent":
                                      row.isExpand,
                                  }
                                )}
                                onClick={() => {
                                  setItems((prev) =>
                                    prev.map((it, idx) =>
                                      idx === rowIndex
                                        ? { ...it, isExpand: !it.isExpand }
                                        : it
                                    )
                                  );
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={3}
                                  stroke="currentColor"
                                  className={clsx(
                                    "w-5 h-5 text-inherit duration-100",
                                    {
                                      "rotate-90": row.isExpand,
                                      "rotate-0": !row.isExpand,
                                    }
                                  )}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </td>
                        );
                      }
                    }) //map col
                  }
                  {/*parent row*/}
                </tr>
                {/* Child row */}
                {row.isExpand && (
                  <tr className={clsx(trClass, "border-t-0")}>
                    {row.children.map((col, colIndex: number) => {
                      return (
                        <td
                          key={"subCol" + colIndex}
                          className={clsx(tdClass, {
                            "flex items-center justify-end":
                              colIndex === fields.length - 1,
                          })}
                        >
                          {col.title && (
                            <>
                              <span className="text-xs text-dustygreen ">
                                {col.title}
                              </span>
                              <br />
                            </>
                          )}
                          <span className="text-sm text-darkgreen">
                            {col.content(row)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableAccordion;
