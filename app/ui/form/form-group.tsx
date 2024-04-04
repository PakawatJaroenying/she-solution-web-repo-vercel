import clsx from "clsx";
import React from "react";

type FormGroupProps = React.InputHTMLAttributes<HTMLDivElement> & {
  label: string;
  rightSlot?: React.ReactNode;
  labelClass?: string;
  errorMessage?: string;
  tooltipTextHelp?: string;
  textHelp?: string;
  children: React.ReactNode;
};

function FormGroup({
  label,
  rightSlot,
  labelClass,
  errorMessage,
  textHelp,
  tooltipTextHelp,
  children,
  ...defaultProps
}: FormGroupProps) {
  if (!labelClass) labelClass = "";
  return (
    <div className={defaultProps.className}>
      {(label || rightSlot) && (
        <div className="flex items-baseline gap-[0.2rem] py-2">
          <label
            className={clsx("label label-text p-0", {
              [labelClass]: !!labelClass,
            })}
          >
            {label}
          </label>
          {textHelp && (
            <span className="ps-1 text-xs text-gray-400 ">{textHelp}</span>
          )}
          {tooltipTextHelp && (
            <div className=" tooltip tooltip-info " data-tip={tooltipTextHelp}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4  text-[#10684A]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 4.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
          )}
          <div className="ms-auto">{rightSlot}</div>
        </div>
      )}

      {children}

      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}

export default FormGroup;
