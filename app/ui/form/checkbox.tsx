import clsx from "clsx";
import React, { forwardRef } from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef(
  (props: CheckboxProps, ref: React.Ref<HTMLInputElement>) => (
    <>
      <input
        ref={ref}
        {...props}
        className={clsx(
          "h-4 w-4 rounded border-none border-teal bg-teal text-teal  accent-teal  outline-none",
          props.className,
        )}
        type="checkbox"
        checked={props.checked}
      ></input>
    </>
  ),
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
