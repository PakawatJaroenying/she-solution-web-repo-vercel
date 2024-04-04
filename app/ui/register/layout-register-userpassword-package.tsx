import React from 'react'
import Image from 'next/image'

async function LayoutRegisterUserPasswordAndPackage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-aqua  flex flex-col">
      <Image
        src={'/register/she-logo.svg'}
        width={300}
        height={58}
        alt="logo"
        className="p-[2rem]"
      />
      <div className="w-full bg-white border border-gray-200 shadow-primary p-4 my-[1rem] flex-grow">
        {children}
      </div>
      <div className="mt-auto p-[2rem]">
        <span className="text-sm text-black">
          SHE Solution © 2023 All rights reserved.{' '}
        </span>
        <br />
        <span className="text-sm text-teal">
          Privacy Policy | System Status
        </span>
      </div>
    </div>
  )
}

export default LayoutRegisterUserPasswordAndPackage
