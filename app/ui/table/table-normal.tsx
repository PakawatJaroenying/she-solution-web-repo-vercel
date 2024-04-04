import {
  BasePropsTabular,
  FieldDefinition,
} from "@/app/lib/interfaces/tabular";
import clsx from "clsx";
import React from "react";
import { Loader2 } from "lucide-react";

type TableNormalProps<ItemType> = React.HTMLAttributes<HTMLDivElement> &
  BasePropsTabular<ItemType> & {
    header?: React.ReactNode;
    maxHeight?: number;
  };

function TableNormal<ItemType>({
  header,
  items,
  fields,
  maxHeight,
  className,
  renderers,
  handleSortChange,
  loading,
}: TableNormalProps<ItemType>) {
  const thClass = "p-2 font-medium dark:text-gray-400";
  const tdClass = "p-2 whitespace-pre-wrap  font-medium text-darkgreen";
  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <div>{header}</div>
      {/* <pre>{JSON.stringify(fields,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(items, null, 2)}</pre>  */}

      <div
        className="relative overflow-x-auto  sm:rounded-lg"
        style={{ maxHeight: maxHeight ? maxHeight + "px" : "auto" }}
      >
        <table className="w-full  text-left text-sm rtl:text-right">
          <thead className="sticky top-0 border border-whitegreen bg-[#FBFBFB] text-xs uppercase  text-darkgreen  ">
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
            {items.map((row: ItemType, rowIndex) => {
              return (
                <tr
                  key={rowIndex}
                  className="border border-whitegreen  bg-white"
                >
                  {fields.map((col, colIndex) => (
                    <td key={colIndex} className={clsx(tdClass, col.tdClass)}>
                      {renderers?.[col.key]
                        ? renderers[col.key]!(row)
                        : (row[col.key as keyof ItemType] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })}
            {items.length === 0 && !loading && (
              <tr className="border border-whitegreen  bg-white">
                <td
                  colSpan={fields.length}
                  className={clsx(tdClass, "text-center")}
                >
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {loading && (
        <Loader2 className="my-4 min-w-full animate-spin text-center text-darkgreen" />
      )}
    </div>
  );
}

export default TableNormal;
