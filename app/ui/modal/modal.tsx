"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";
import LoadingScreen from "../loading/loading-screen";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  width: string;
}

const Modal: React.FC<ModalProps> = ({ open, children, width }) => {
  const [domReady, setDomReady] = useState(false);

  React.useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ open:", open);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {domReady &&
        createPortal(
          <div
            tabIndex={-1}
            className={clsx(
              "fixed bottom-0 left-0 right-0 top-0 z-50 h-screen  w-screen  bg-gray-900 bg-opacity-50 md:inset-0 dark:bg-gray-900 dark:bg-opacity-50",
              {
                hidden: !open,
              },
            )}
          >
            <div className="relative h-screen w-screen">
              <div
                className="absolute left-1/2 top-1/2 max-h-[80vh] max-w-[50vw] translate-x-[-50%] translate-y-[-50%]  rounded-lg bg-white shadow"
                style={{ width: width }}
              >
                {children}
              </div>
            </div>
          </div>,
          document.getElementById("loading-backdrop-container")!,
        )}
    </>
  );
};

export default Modal;
