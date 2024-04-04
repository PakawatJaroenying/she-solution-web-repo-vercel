"use client";
import clsx from "clsx";
import React, { forwardRef } from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelclassname?: string;
  hasError?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export const baseClassTextField =
  "bg-gray-50 border border-graygreen  text-sm rounded-lg focus:ring-aqua focus:border-aqua block w-full p-2.5 outline-none focus:shadow-sm focus:shadow-aqua text-forest focus:text-darkgreen";

const TextField = forwardRef(
  ({ hasError, iconPosition, ...defaultProps }: TextFieldProps, ref) => {
    const [showPassword, setShow] = React.useState(false);
    const [type, setType] = React.useState(defaultProps.type);
    const inputRef = React.useRef<HTMLInputElement>(null);

    //password
    if (defaultProps.type === "password") {
      return (
        <div className="relative w-full">
          {/* show / hide password */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <label>
              <input
                {...defaultProps}
                autoComplete="off"
                onChange={() => {
                  setShow(!showPassword);
                  setType(showPassword ? "password" : "text");
                  inputRef.current?.focus();
                }}
                className="hidden"
                type="checkbox"
              />
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </label>
          </div>
          {/* input */}
          <input
            {...defaultProps}
            ref={inputRef}
            className={clsx(
              "block w-full rounded-lg  border border-graygreen bg-gray-50 p-2.5 text-sm text-forest outline-none focus:border-aqua focus:text-darkgreen focus:shadow-sm focus:shadow-aqua focus:ring-aqua",
              {
                "!border-red-500 !text-red-500": hasError,
              },
            )}
            type={type || "password"}
          />
        </div>
      );
    } else {
      //text
      return (
        <label className={clsx("relative block", defaultProps.labelclassname)}>
          <input
            {...defaultProps}
            type="text"
            className={clsx(
              baseClassTextField,
              defaultProps.className,
              {
                "ps-10": defaultProps.icon && iconPosition === "left",
              },
              {
                "pe-10": defaultProps.icon && iconPosition === "right",
              },
              {
                "!border-red-500 !text-red-500": hasError,
              },
            )}
          />
          {defaultProps.icon && (
            <div
              className={clsx(
                "absolute inset-y-0",
                {
                  "  rtl:inset-r-0 pointer-events-none start-0 flex items-center ps-3":
                    iconPosition === "left",
                },
                {
                  "  rtl:inset-l-0 pointer-events-none end-0 flex items-center pe-3":
                    iconPosition === "right",
                },
              )}
            >
              {defaultProps.icon}
            </div>
          )}
        </label>
      );
    }
  },
);

TextField.displayName = "TextField";

export default TextField;
