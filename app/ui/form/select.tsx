import clsx from "clsx";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  Partial<ControllerRenderProps> & {
    options: { value: string; text: string }[];
    hasError?: boolean;
    placeholder: string;
  };

function Select<TValue>({
  options,
  hasError,
  placeholder,
  ...defaultSelectProps
}: SelectProps) {
  return (
    <select
      {...defaultSelectProps}
      className={clsx(
        "bg-gray-50 border border-gray-300 text-sm rounded-lg  block   p-2.5 focus:ring-aqua focus:border-aqua outline-none focus:shadow-md focus:shadow-aqua text-forest focus:text-darkgreen",
        defaultSelectProps.className,
        {
          "!border-red-500": hasError,
        }
      )}
    >
      <option value={""} disabled selected>
        {placeholder}
      </option>
      {options.map((option, idx) => (
        <option key={idx} value={option.value as number | string}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default Select;
