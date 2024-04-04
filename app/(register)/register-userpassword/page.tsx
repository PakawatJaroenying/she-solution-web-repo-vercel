import LayoutRegisterUserPasswordAndPackage from '@/app/ui/register/layout-register-userpassword-package'
import RegisterUserPasswordForm from '@/app/ui/register/register-userpassword/form'
import React, { Suspense } from 'react'

function Page() {
  return (
    <LayoutRegisterUserPasswordAndPackage>
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-2xl font-bold">ตารางค่าบริการแต่ละแพ็คเกจ</h1>
          <RegisterUserPasswordForm />
      </div>
    </LayoutRegisterUserPasswordAndPackage>
  )
}

export default Page
