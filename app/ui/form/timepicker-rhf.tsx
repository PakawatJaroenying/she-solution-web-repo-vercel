import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TimePicker from "./timepicker";

type TimePickerRHFProps = {
  name: string;
};

function TimePickerRHF({ name }: TimePickerRHFProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TimePicker
          defaultHour={field.value.hour}
          defaultMinute={field.value.minute}
          onChangeHour={(hour) => {
            field.onChange({
              ...field.value,
              hour: hour.length === 1 ? `0${hour}` : hour,
            });
          }}
          onChangeMinute={(minute) => {
            field.onChange({
              ...field.value,
              minute: minute.length === 1 ? `0${minute}` : minute,
            });
          }}
        />
      )}
    />
  );
}

export default TimePickerRHF;
