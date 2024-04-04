import CardPackageList from '@/app/ui/register/before-register-userpassword/card-list'
import StepRegisterPackage from '@/app/ui/register/before-register-userpassword/sugguestion-step'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPagekage() {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="flex flex-col lg:flex-row flex-wrap">
        <div className="basis-[100%] lg:basis-[45%]">
          <div
            className="min-h-screen bg-mint flex flex-col  p-[4rem]
          "
          >
            <Image
              src="/register/she-logo.svg"
              width={300}
              height={58}
              alt="logo"
              className=""
            />
            <div className=" flex  flex-col  gap-[1rem]  p-4 lg:p-2 ">
              <h1 className="text-[28px] text-darkgreen font-bold mt-[3rem]">
                สมัครใช้บริการ
              </h1>
              <h2 className="text-[38px] text-forest font-bold ">SHE Expert</h2>
              <p className="font-[400] text-[14px]">
                ผู้ให้บริการซอฟแวร์ในการบริหารจัดการความมั่นคง ความปลอดภัย
                อาชีวอนามัย <br />
                และสิ่งแวดล้อมแบบ รวมศูนย์เพื่อสร้างสภาพแวดล้อมในการทำงาน
              </p>
              <CardPackageList />
              <Link
                href="#"
                className="btn bg-teal text-white text-[16px] font-bold w-100"
              >
                อัตราค่าบริการและเลือกแพ็คเกจ
              </Link>
              <hr className="border border-teal mt-4" />
              <div className="mt-4 flex gap-2">
                <div className="p-4 bg-aqua text-teal rounded-xl flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-forest"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col  gap-1">
                  <span className="text-teal font-bold">สอบถามข้อมูล</span>
                  <div className="flex  flex-col ">
                    <span className="text-darkgreen  text-[14px] font-normal">
                      คุณขจรศักดิ์ ประวิงสุขุมวิท
                    </span>
                    <span className="text-darkgreen  text-[14px] font-bold ">
                      Mobile: 091 234 5678
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[100%] lg:basis-[55%]">
          <div className="bg-aqua min-h-full p-[4rem] ">
            <div className="flex flex-col mt-[2rem] gap-[1rem]">
              <h1 className="font-bold text-forest text-4xl">
                ขั้นตอนการสมัคร
              </h1>
              <StepRegisterPackage />
              <Link
                href="/register-userpassword"
                className="mt-[1rem] btn bg-forest text-white text-[16px] font-bold self-auto border-0 px-5"
              >
                เริ่มสมัครใช้งาน
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
