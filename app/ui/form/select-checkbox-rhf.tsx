import { TextValue } from "@/app/lib/interfaces/option";
import { HTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SelectCheckbox from "./select-checkbox";
import { SelectAutocompleteProps } from "./select-autocomplete";

type SelectCheckboxRHFProps = SelectAutocompleteProps & {
  name: string;
};

function SelectCheckboxRHF(props: SelectCheckboxRHFProps) {
  const { name } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <SelectCheckbox
          {...field}
          placeholder={props.placeholder || ""}
          hasError={!!error}
          options={props.options}
          disabled={props.disabled}
        />
      )}
    />
  );
}

export default SelectCheckboxRHF;
