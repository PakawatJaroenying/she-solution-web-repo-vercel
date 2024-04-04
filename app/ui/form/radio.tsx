import React, { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

type RadioProps = ControllerRenderProps &
  React.InputHTMLAttributes<HTMLInputElement> & {};

const Radio = forwardRef(({ ...defaultRadioProps }: RadioProps, ref) => {
  return (
    <input
      {...defaultRadioProps}
      readOnly={defaultRadioProps.disabled}
      type="radio"
      className="h-5 w-5 border-teal bg-teal accent-teal"
    />
  );
});

Radio.displayName = "Radio";

export default Radio;
