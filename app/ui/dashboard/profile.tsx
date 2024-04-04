"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "../context/session-provider";
import { LogoutServerAction } from "@/app/lib/server-action/authen";
import ModalConfirmLogOut from "./modal_confirm_logout";

function Profile() {
  const session = useSession();
  const modalConfirmLogoutState = useState(false);

  return (
    <>
      <div className="overflow-hidden rounded-xl  flex flex-col items-center justify-between border border-whitegreen shadow-primary shrink-0">
        <main className="flex items-center w-full gap-3  p-4 bg-white">
          <Image
            loading="eager"
            width={50}
            height={50}
            src="/dashboard/photo-1633332755192-727a05c4013d.avif"
            alt="profile"
            className="rounded-full self-baseline mt-2"
          />
          <div className="flex flex-col gap-1">
            <div className="text-darkgreen  text-xl ">
              {session?.user.username || ""}
            </div>

            <div className="text-white text-sm bg-forest text-center rounded-lg w-fit p-1 px-2">
              Premium User
            </div>
            <div className="text-sm">
              <nav className="mt-2 text-teal">
                <Link href="#" className="px-2  underline">
                  แก้ไขข้อมูลส่วนตัว
                </Link>
                <span className="text-black">|</span>
                <button
                  onClick={() => {
                    // await LogoutServerAction();
                    modalConfirmLogoutState[1](true);
                  }}
                  className="px-2  underline"
                >
                  ออกจากระบบ
                </button>
              </nav>
            </div>
          </div>
        </main>
        <footer className="bg-aqua flex justify-between w-full p-2 text-sm text-darkgreen">
          <span>ใช้งานล่าสุด</span>
          <span>
            <span>12 มิถุนายน 2566, 14:52 น.</span>
            {/* {moment(expires).format('DD MMMM YYYY, HH:mm น.')} */}
          </span>
        </footer>
      </div>
      <ModalConfirmLogOut manageModalState={modalConfirmLogoutState} />
    </>
  );
}

export default Profile;
