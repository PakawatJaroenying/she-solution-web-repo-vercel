import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import { baseClassTextField } from "./textfield";
import { Button } from "../button/button";
import { ControllerRenderProps } from "react-hook-form";

export type TextFieldWithButtonProps = {
  hasError?: boolean;
  textFieldProps?: Partial<ControllerRenderProps> &
    React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
  };
};

function TextFieldWithButton(props: TextFieldWithButtonProps) {
  const { textFieldProps, buttonProps } = props;
  return (
    <div className={clsx("relative pe-[5.5rem]")}>
      <input
        {...textFieldProps}
        className={clsx(baseClassTextField, {
          "border-red-500": props.hasError,
        })}
        autoComplete="off"
        placeholder={textFieldProps?.placeholder || ""}
      />
      <Button
        {...buttonProps}
        className={clsx(
          "flex justify-center items-center gap-1 absolute top-0 bottom-0 right-0 !h-[2.7rem] !min-h-[2.7rem] !max-h-[2.7rem]",
          buttonProps?.className
        )}
        disabled={buttonProps?.disabled}
        variant="primary"
      >
        {buttonProps?.loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_584_4078"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_584_4078)">
                <path
                  d="M2.5 18.4807V16.9808H12.2789V18.4807H2.5ZM2.5 13.5865V12.0865H7.23075V13.5865H2.5ZM2.5 8.69225V7.1923H7.23075V8.69225H2.5ZM20.4461 18.5L16.5769 14.6596C16.1961 14.9365 15.7811 15.1474 15.3317 15.2923C14.8823 15.4371 14.4256 15.5096 13.9615 15.5096C12.7085 15.5096 11.6405 15.0717 10.7574 14.1961C9.87426 13.3205 9.4327 12.2567 9.4327 11.0048C9.4327 9.75288 9.87448 8.6891 10.7581 7.81345C11.6416 6.93782 12.7102 6.5 13.9638 6.5C15.2174 6.5 16.2852 6.93782 17.1673 7.81345C18.0493 8.6891 18.4903 9.75128 18.4903 11C18.4903 11.4641 18.4179 11.9208 18.273 12.3702C18.1281 12.8195 17.914 13.2314 17.6307 13.6057L21.5 17.4461L20.4461 18.5ZM13.9615 14.0096C14.8029 14.0096 15.518 13.7179 16.107 13.1346C16.6959 12.5513 16.9904 11.8413 16.9904 11.0048C16.9904 10.1682 16.6959 9.45831 16.107 8.87498C15.518 8.29164 14.8029 7.99998 13.9615 7.99998C13.1202 7.99998 12.405 8.29164 11.8161 8.87498C11.2271 9.45831 10.9327 10.1682 10.9327 11.0048C10.9327 11.8413 11.2271 12.5513 11.8161 13.1346C12.405 13.7179 13.1202 14.0096 13.9615 14.0096Z"
                  fill="white"
                />
              </g>
            </svg>
            <span>ค้นหา</span>
          </>
        )}
      </Button>
    </div>
  );
}

export default TextFieldWithButton;
