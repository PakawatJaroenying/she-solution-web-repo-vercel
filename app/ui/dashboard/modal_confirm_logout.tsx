import React from "react";
import Modal from "@/app/ui/modal/modal";
import { Button } from "../button/button";
import { LogoutServerAction } from "@/app/lib/server-action/authen";

type ModalConfirmLogOutProps = {
  manageModalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

function ModalConfirmLogOut(props: ModalConfirmLogOutProps) {
  const [open, setOpenModal] = props.manageModalState;
  return (
    <Modal open={open} width="20%">
      <div className="p-4 flex flex-col items-center justify-center gap-4">
        <div className="pt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[100px] h-[100px] text-teal"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span>ต้องการออกจากระบบ หรือไม่?</span>
        </div>
        <div className="flex gap-2  w-full flex-col items-center justify-center">
          <Button
            variant="primary"
            className="w-full"
            onClick={async () => {
              await LogoutServerAction();
            }}
          >
            ออกจากระบบ
          </Button>
          <Button
            variant="primary"
            className="bg-[#F6F6F6] grow text-darkgreen border-0
        hover:bg-[#E5E5E5] hover:text-darkgreen
        w-full
        "
            type="button"
            onClick={() => setOpenModal(false)}
          >
            ยกเลิก
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalConfirmLogOut;
