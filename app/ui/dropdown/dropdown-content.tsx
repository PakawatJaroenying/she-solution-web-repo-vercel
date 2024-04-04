import clsx from "clsx";
import React, { forwardRef } from "react";

type DropdownContentProps = {
  className?: string;
  children: React.ReactNode;
};
const DropdownContent = forwardRef((props: DropdownContentProps, ref) => (
  <div
    className={clsx(
      "dropdown-content top-14 !z-[500] max-h-96 flex-col overflow-auto overflow-x-hidden rounded-md bg-gray-50",
      props.className,
    )}
  >
    {props.children}
  </div>
));

DropdownContent.displayName = "DropdownContent";

export default DropdownContent;
