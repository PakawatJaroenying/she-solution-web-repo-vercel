import clsx from "clsx";
import React, { LegacyRef, forwardRef, useEffect } from "react";

type DropdownProps = {
  className?: string;
  children: React.ReactNode;
};

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  props: DropdownProps,
  ref,
) {
  return (
    <div className={clsx("dropdown  w-full", props.className)} ref={ref}>
      {props.children}
    </div> //end of dropdown container
  );
});

Dropdown.displayName = "Dropdown"; // Add display name to the component

export default Dropdown;
