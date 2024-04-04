import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import SelectAutocomplete, {
  SelectAutocompleteProps,
} from "./select-autocomplete";

type SelectAutoCompleteRHFProps = SelectAutocompleteProps & {
  name: string;
};

function SelectAutoCompleteRHF(props: SelectAutoCompleteRHFProps) {
  const { name } = props;
  const { control, getFieldState } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <SelectAutocomplete
            disabled={props.disabled}
            hasError={!!error}
            {...field}
            options={props.options}
            placeholder={props.placeholder}
            onChangeTextSearch={props.onChangeTextSearch}
          />
        </>
      )}
    />
  );
}

export default SelectAutoCompleteRHF;
