import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: "primary" | "secondary";
};

export const Button = ({
  children,
  variant,
  disabled,
  ...rest
}: ButtonProps) => {
  const baseStyle = "";

  const styles = {
    primary: `${baseStyle} btn btn-primary`,
    secondary: `${baseStyle} btn btn-secondary`,
  };

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(styles[variant], rest.className)}
    >
      {disabled ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        children
      )}
    </button>
  );
};
