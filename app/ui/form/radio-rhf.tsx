import clsx from "clsx";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Radio from "./radio";
import { convertStringToBoolean, isBooleanString } from "./_utils";

interface RadioProps<valueType>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  text?: string;
  value?: number | string;
  options?: { value: valueType; text: string }[];
  direction?: "row" | "column";
}

function RadioRHF({
  name,
  text,
  value,
  options,
  direction = "row",
  ...defaultRadioProps
}: RadioProps<string | number>) {
  const { control } = useFormContext();

  return options ? (
    <div
      className={clsx("flex gap-2", {
        "flex-row": direction === "row",
        "flex-col": direction === "column",
      })}
    >
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            {/* {JSON.stringify(field)} */}
            {options.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <Radio
                  {...defaultRadioProps}
                  {...field}
                  value={option.value}
                  defaultChecked={
                    typeof value === "string" &&
                    isBooleanString(value as string)
                      ? convertStringToBoolean(value) == field.value
                      : field.value
                  }
                />
                {option.text}
              </label>
            ))}
          </>
        )}
      />
    </div>
  ) : (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <label className="flex items-center gap-2">
            <Radio
              {...defaultRadioProps}
              {...field}
              defaultChecked={
                typeof value === "string" && isBooleanString(value as string)
                  ? convertStringToBoolean(value) == field.value
                  : field.value
              }
              value={value}
              onChange={(e) => {
                if (e.target.value === "true" || e.target.value === "false") {
                  field.onChange(e.target.value == "true");
                }
              }}
            />
            {text}
          </label>
        </>
      )}
    />
  );
}

export default RadioRHF;
