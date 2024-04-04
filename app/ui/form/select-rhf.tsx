import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import Select from "./select";
import React from "react";
import { TextValue } from "@/app/lib/interfaces/option";
type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  label?: string;
  options: TextValue[];
  placeholder: string;
  disabled?: boolean;
  onChanged?: (val: string) => void;
};

export default function SelectRHF<TValue>({
  name,
  options,
  placeholder,
  disabled,
  onChanged,
  ...rest
}: SelectProps) {
  const { control, getFieldState } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChanged && onChanged(e.target.value);
              }}
              className={rest.className}
              defaultValue={field.value}
              value={field.value}
              disabled={disabled}
              options={options}
              placeholder={placeholder}
              hasError={!!error}
            />
          </>
        )}
      />
    </>
  );
}
