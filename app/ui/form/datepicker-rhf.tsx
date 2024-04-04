import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "./datepicker";

type DatePickerRHFProps = {
  name: string;
  placeholder?: string;
};

function DatePickerRHF({ name, placeholder }: DatePickerRHFProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            <DatePicker
              {...field}
              hasError={!!fieldState.error?.message}
              rest={{
                placeholder: `${placeholder || "วันที่"}`,
              }}
              value={field.value}
              onChange={(christDate: string, buddhistDate: string) => {
                field.onChange(christDate);
              }}
            />
          </>
        );
      }}
    />
  );
}

export default DatePickerRHF;
