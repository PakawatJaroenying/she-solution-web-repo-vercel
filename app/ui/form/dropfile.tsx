import clsx from "clsx";
import React, { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

export type DropFileProps = {
  multiple?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  allowExtensions?: string[];
};

const DropFile = forwardRef(
  ({ allowExtensions, multiple = false, ...props }: DropFileProps, ref) => (
    <div className="flex w-full items-center justify-center">
      <label
        className={clsx(
          "flex w-full cursor-pointer flex-col items-center justify-center  rounded-lg border-2   border-dashed border-graygreen bg-[#FAFAFA]",
          {
            "!cursor-not-allowed": props.disabled,
          },
        )}
      >
        <div className="flex  items-baseline p-3 text-forest">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 
                self-center
              "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
          เลือกไฟล์
          <span className="ms-1 text-sm text-graygreen">
            หรือลากวางไฟล์ลงที่นี่
          </span>
        </div>
        {/* {render} */}
        <input
          multiple={multiple}
          {...props}
          accept={allowExtensions && allowExtensions?.join(",")}
          type="file"
          className="hidden"
        />
      </label>
    </div>
  ),
);

DropFile.displayName = "DropFile";

export default DropFile;
