import clsx from "clsx";

type DropdownMenuProps = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const DropdownMenu = ({ className, children, style }: DropdownMenuProps) => {
  return (
    <div
      className={clsx(
        "menu-compact menu  flex !flex-col flex-nowrap  whitespace-nowrap",
        className,
      )}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
