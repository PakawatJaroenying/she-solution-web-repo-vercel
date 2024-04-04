import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const steps = [
  {
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-forest"
        >
          <path
            fillRule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </>
    ),
    title: 'Create Detail',
    description: 'กรอกรายละเอียดให้ครบถ้วน ชื่อ นามสกุล ชื่อ email รหัสผ่าน',
  },
  {
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-forest"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </>
    ),
    title: 'Create Password',
    description:
      'กรอกเบอร์โทร อันนี้เราแนะนำให้กรอก เพราะกรณีถ้าเราลืมรหัส เราสามารถกดลืมรหัสแล้วจะมีรหัสให้เราในการเข้าไปกรอก และเปลี่ยน รหัสใหม่ได้',
  },
  {
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-forest"
        >
          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
          <path
            fillRule="evenodd"
            d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </>
    ),
    title: 'Choose Package',
    description:
      'กรอกเพียงเท่านี้เราก็จะได้ email เพื่อเข้าสู่บริการต่างๆ ของทางเราแล้ว',
  },
]

function StepRegisterPackageWrapper() {
  return (
    <>
      <ol className="ms-4 relative  border-s border-dashed   border-teal">
        {steps.map((item, index) => (
          <StepRegisterPackageItem
            index={index}
            icon={item.icon}
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </ol>
    </>
  )
}

function StepRegisterPackageItem({
  index,
  icon,
  title,
  description,
}: {
  index: number
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <>
      <li
        className={clsx('mb-10 ms-9', {
          'mb-0': index === steps.length - 1,
        })}
      >
        <span
          className={clsx(
            'absolute flex items-center justify-center p-2 bg-white rounded-xl -start-5',
            {
              // "bottom-0" : index === steps.length-1,
            },
          )}
        >
          {icon}
          {index === steps.length - 1 && (
            <>
              <span
                className={clsx(
                  'absolute w-10 h-20 block p-2 bg-aqua   top-10 ',
                  {
                  },
                )}
              >
              </span>
            </>
          )}
        </span>

        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-teal">
          {title}
        </h3>
        <p className="text-base font-normal text-gray-500 dark:text-darkgreen">
          {description}
        </p>
      </li>
    </>
  )
}

export default StepRegisterPackageWrapper