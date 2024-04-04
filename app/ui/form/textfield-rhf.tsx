import clsx from "clsx";
import React from "react";
import { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "./textfield";

type TextFieldRHFProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  name: string;
  iconPosition?: "left" | "right";
};

function TextFieldRHF({ name, ...defaultTextFieldProps }: TextFieldRHFProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <TextField
              {...field}
              {...defaultTextFieldProps}
              hasError={!!error}
            />
          </>
        );
      }}
    />
  );
}

export default TextFieldRHF;
