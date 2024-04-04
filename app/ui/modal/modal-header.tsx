import React from "react";

interface ModalHeaderProps {
  title: string;
  setOpenModal: (open: boolean) => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, setOpenModal }) => {
  return (
    <div className="flex items-center justify-between p-4  rounded-t dark:border-gray-600 bg-whitegreen">
      <h3 className="text-xl text-darkgreen font-bold">{title}</h3>
      <button
        onClick={() => {
          setOpenModal(false);
        }}
        type="button"
        className="text-darkgreen w-17 h-17 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center"
      >
        <svg
          className="w-3 h-3"
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
        <span className="sr-only">Close modal</span>
      </button>
    </div>
  );
};

export default ModalHeader;
