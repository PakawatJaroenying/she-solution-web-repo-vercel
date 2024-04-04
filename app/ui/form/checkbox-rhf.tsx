import React, { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "./checkbox";
import { convertStringToBoolean, isBooleanString } from "./_utils";

interface CheckboxProps<valueType>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  text?: React.ReactNode;
  options?: { value: valueType; text: React.ReactNode }[];
  direction?: "row" | "column";
}

function CheckboxRHF({
  name,
  text,
  value,
  options,
  direction = "row",
  ...defaultCheckboxProps
}: CheckboxProps<string | number>) {
  const { control } = useFormContext();

  return (
    <>
      {!options ? (
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => {
            return (
              <div className="flex">
                <label className="m-0 flex items-center gap-[0.5rem]">
                  <Checkbox
                    {...field}
                    {...defaultCheckboxProps}
                    value={value}
                    checked={
                      typeof value === "string" &&
                      isBooleanString(value as string)
                        ? convertStringToBoolean(value) == field.value
                        : field.value
                    }
                  />
                  {text}
                </label>
              </div>
            );
          }}
        />
      ) : (
        <div
          className={`flex ${
            direction === "row" ? "flex-row" : "flex-col"
          } gap-[0.5rem]`}
        >
          {options.map((option, idx) => (
            <Controller
              key={idx}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <>
                    <label className="flex items-center">
                      <Checkbox
                        {...field}
                        checked={field.value.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, option.value]);
                          } else {
                            field.onChange(
                              field.value.filter(
                                (v: string) => v !== option.value,
                              ),
                            );
                          }
                        }}
                      />
                      <span className="ml-2">{option.text}</span>
                    </label>
                  </>
                );
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CheckboxRHF;
