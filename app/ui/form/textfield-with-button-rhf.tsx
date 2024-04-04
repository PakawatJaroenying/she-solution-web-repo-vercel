import React from "react";
import TextFieldWithButton, {
  TextFieldWithButtonProps,
} from "./textfield-with-button";
import { Controller, useFormContext } from "react-hook-form";

type TextFieldWithButtonRHFProps = TextFieldWithButtonProps & {
  name: string;
};

function TextFieldWithButtonRHF({
  name,
  ...props
}: TextFieldWithButtonRHFProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextFieldWithButton
          {...props}
          textFieldProps={{ ...field, ...props.textFieldProps }}
          hasError={!!error}
        />
      )}
    />
  );
}

export default TextFieldWithButtonRHF;
