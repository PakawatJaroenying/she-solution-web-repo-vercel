import clsx from "clsx";
import React from "react";

type DropFilePreview = React.HTMLProps<HTMLInputElement> & {
  file: File;
  onRemove: () => void;
  downloadProgress?: number; // 0 ถึง 100
  downloadStatus?: "Pending" | "Success" | "Error"; // สถานะการดาวน์โหลด
};

const DropFilePreview = ({
  file,
  onRemove,
  downloadProgress,
  downloadStatus,
  ...props
}: DropFilePreview) => (
  <div className="p-3 border-1 border-whitegreen">
    <div className="py-4 border-b border-whitegreen">
      <div className="flex flex-row justify-between items-center  space-x-5">
        {/*   --------------------------------------------------------------------------   */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        {/*   --------------------------------------------------------------------------   */}
        <div className="flex flex-col space-y-1 justify-between w-full">
          <div className="flex justify-between">
            <span className="text-sm text-forest">{file.name}</span>
            <span
              className={clsx("text-sm", {
                "text-forest": "Success",
                "text-darkred": "Error",
                "text-darkgreen": "Pending",
              })}
            >
              {downloadStatus}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-forest h-2.5 rounded-full "
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
        <button
          onClick={onRemove}
          type="button"
          className="text-darkgreen  p-2  bg-graygreen hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm  ms-auto inline-flex justify-center items-center "
          data-modal-hide="noti-modal"
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export default DropFilePreview;
