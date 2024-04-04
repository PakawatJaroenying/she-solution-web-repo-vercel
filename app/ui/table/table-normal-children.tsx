import {
  BasePropsTabular,
  FieldDefinition,
} from "@/app/lib/interfaces/tabular";
import clsx from "clsx";
import React from "react";

type TableNormalWithChildrenProps<ItemType> =
  React.HTMLAttributes<HTMLDivElement> &
    BasePropsTabular<ItemType> & {
      header?: React.ReactNode;
      maxHeight?: number;
    };

type ExtendedTableNormalWithChildren<I> = {
  children: Array<ChildItem<Omit<I, "children">>>;
};

//child Item
type ChildItem<I> = {
  key: string;
  title: string;
  content: (it: I) => React.ReactNode;
};

function TableNormalWithChildren<I extends ExtendedTableNormalWithChildren<I>>({
  header,
  items,
  fields,
  maxHeight,
  className,
  renderers,
  handleSortChange,
}: TableNormalWithChildrenProps<I>) {
  const tdClass = "px-6 py-4 font-medium    whitespace-pre-wrap text-darkgreen";
  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <div>{header}</div>
      {/* <pre>{JSON.stringify(fields,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(items, null, 2)}</pre>  */}

      <div
        className="relative overflow-x-auto  sm:rounded-lg"
        style={{ maxHeight: maxHeight ? maxHeight + "px" : "auto" }}
      >
        <table className="w-full  text-sm text-left rtl:text-right">
          <thead className="sticky top-0 text-xs text-darkgreen uppercase bg-[#FBFBFB] border  border-whitegreen  ">
            <tr>
              {fields?.map((field, index) => (
                <th key={index} className="font-medium p-2 dark:text-gray-400">
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
            {items.map((row: I, rowIndex) => {
              return (
                //    Parent row
                <>
                  <tr
                    key={rowIndex}
                    className="bg-white border  border-whitegreen  border-b-0"
                  >
                    {fields.map((col, idxTd) => (
                      <td key={idxTd} className={clsx(tdClass)}>
                        {renderers?.[col.key]
                          ? renderers[col.key]!(row)
                          : (row[col.key as keyof I] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                  {/* Children row */}
                  <tr
                    className={clsx(
                      "bg-white border  border-whitegreen border-t-0"
                    )}
                  >
                    {row.children.map((col, colIndex: number) => {
                      return (
                        <td key={"subCol" + colIndex} className={clsx(tdClass)}>
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
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableNormalWithChildren;
