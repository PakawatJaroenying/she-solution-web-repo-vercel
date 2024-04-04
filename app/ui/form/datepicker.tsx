//@ts-ignore
import React, { forwardRef, useState } from "react";
import { ThaiDatePicker } from "thaidatepicker-react";
import "./datepicker.css.css";
import { ControllerProps } from "react-hook-form";

type DatePickerProps = Partial<ControllerProps> & {
  hasError: boolean;
  value: string;
  onChange: (christDate: string, buddhistDate: string) => void;
  rest: Record<string, any>;
};

const DatePicker = forwardRef(
  ({ hasError, value, onChange, rest }: DatePickerProps, ref) => (
    <ThaiDatePicker
      inputProps={{
        displayFormat: "DD/MM/YYYY",
        className: `input ${hasError ? "error" : ""}`,
      }}
      id="date-picker"
      clearable={false}
      value={value}
      onChange={onChange}
      {...rest}
    />
  ),
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
