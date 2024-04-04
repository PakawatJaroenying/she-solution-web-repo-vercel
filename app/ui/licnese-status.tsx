import React from "react";
import clsx from "clsx";

interface LicenseStatusProps {
  status: number;
}

const LicenseStatus: React.FC<LicenseStatusProps> = ({ status }) => {
  let backgroundColor = "";
  if (status <= 14) {
    backgroundColor = "#F54D4D";
  } else if (status >= 15 && status <= 30) {
    backgroundColor = "#F89E5D";
  } else {
    backgroundColor = "#FFEEB2";
  }

  return (
    <span
      className={clsx(
        "text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded",
        {
          "bg-[#F54D4D]": backgroundColor === "#F54D4D",
        },
        {
          "bg-[#F89E5D]": backgroundColor === "#F89E5D",
        },
        {
          "bg-[#FFEEB2]": backgroundColor === "#FFEEB2",
        }
      )}
    >
      เหลือ {status} สัปดาห์
    </span>
  );
};

export default LicenseStatus;
