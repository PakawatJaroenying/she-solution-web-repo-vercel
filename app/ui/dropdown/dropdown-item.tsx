import clsx from "clsx";

type DropdownItemProps = {
  item: { text: string; value: string };
  index: number;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
const DropdownItem = ({
  item,
  index,
  children,
  className,
  onClick,
}: DropdownItemProps) => {
  return (
    <li
      onClick={onClick}
      key={item.text + index}
      tabIndex={index + 1}
      role="button"
      className={clsx(
        "border-b border-b-base-content/10 w-full hover:text-forest  ",
        className
      )}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
