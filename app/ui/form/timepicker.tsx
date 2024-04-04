import React, { useEffect, useState } from 'react'

type TimePickerProps = {
  defaultHour: string
  defaultMinute: string
  onChangeHour: (hour: string) => void
  onChangeMinute: (minute: string) => void
}

function TimePicker({
  defaultHour,
  defaultMinute,
  onChangeHour,
  onChangeMinute,
}: TimePickerProps) {
  return (
    <div className="p-[12px] m-0  bg-gray-50 border border-graygreen  text-sm rounded-lg focus:ring-aqua focus:border-aqua block w-full    outline-none focus:shadow-sm focus:shadow-aqua text-teal focus:text-darkgreen relative">
      <div className="flex h-[23.969px]">
        <select
          defaultValue={defaultHour}
          onChange={(val) => {
            onChangeHour(val.target.value)
          }}
          className="overflow-auto text-[18px] bg-transparent  appearance-none outline-none focus:outline-teal shadow-teal"
        >
          {Array.from(Array(24).keys()).map((i) => (
            <option key={i} value={i}>
              {i < 10 ? '0' + i.toString() : i}
            </option>
          ))}
        </select>
        <span className="text-[18px] text-teal mx-3">:</span>
        <select
          defaultValue={defaultMinute}
          onChange={(val) => {
            onChangeMinute(val.target.value)
          }}
          className="text-[18px] text-teal bg-transparent  appearance-none outline-none mr-4 focus:outline-teal "
        >
          {Array.from(Array(60).keys()).map((i) => (
            <option key={i} value={i} className="px-4">
              {i < 10 ? '0' + i.toString() : i}
            </option>
          ))}
        </select>
      </div>
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <path
          d="M7.12485 11.8655C7.36995 11.8655 7.5755 11.7826 7.74152 11.6168C7.90754 11.451 7.99055 11.2456 7.99055 11.0005C7.99055 10.7554 7.90765 10.5499 7.74185 10.3838C7.57605 10.2178 7.37061 10.1348 7.12552 10.1348C6.88042 10.1348 6.67486 10.2177 6.50885 10.3835C6.34281 10.5493 6.2598 10.7547 6.2598 10.9998C6.2598 11.2449 6.3427 11.4505 6.5085 11.6165C6.6743 11.7825 6.87975 11.8655 7.12485 11.8655ZM10.9998 11.8655C11.2449 11.8655 11.4505 11.7826 11.6165 11.6168C11.7825 11.451 11.8655 11.2456 11.8655 11.0005C11.8655 10.7554 11.7826 10.5499 11.6168 10.3838C11.451 10.2178 11.2456 10.1348 11.0005 10.1348C10.7554 10.1348 10.5499 10.2177 10.3838 10.3835C10.2178 10.5493 10.1348 10.7547 10.1348 10.9998C10.1348 11.2449 10.2177 11.4505 10.3835 11.6165C10.5493 11.7825 10.7547 11.8655 10.9998 11.8655ZM14.8748 11.8655C15.1199 11.8655 15.3255 11.7826 15.4915 11.6168C15.6575 11.451 15.7405 11.2456 15.7405 11.0005C15.7405 10.7554 15.6576 10.5499 15.4918 10.3838C15.326 10.2178 15.1206 10.1348 14.8755 10.1348C14.6304 10.1348 14.4248 10.2177 14.2588 10.3835C14.0928 10.5493 14.0098 10.7547 14.0098 10.9998C14.0098 11.2449 14.0927 11.4505 14.2585 11.6165C14.4243 11.7825 14.6297 11.8655 14.8748 11.8655ZM11.0007 19.5001C9.82087 19.5001 8.71556 19.2771 7.6848 18.8309C6.65403 18.3847 5.75531 17.7783 4.98865 17.0117C4.222 16.245 3.6156 15.3465 3.16945 14.3161C2.72328 13.2857 2.5002 12.1806 2.5002 11.0007C2.5002 9.82087 2.72328 8.71556 3.16945 7.6848C3.6156 6.65403 4.222 5.75531 4.98865 4.98865C5.75531 4.222 6.65385 3.6156 7.68425 3.16945C8.71465 2.72328 9.81977 2.5002 10.9996 2.5002C12.1795 2.5002 13.2848 2.72328 14.3155 3.16945C15.3463 3.6156 16.245 4.222 17.0117 4.98865C17.7783 5.75531 18.3847 6.65385 18.8309 7.68425C19.2771 8.71465 19.5001 9.81977 19.5001 10.9996C19.5001 12.1795 19.2771 13.2848 18.8309 14.3155C18.3847 15.3463 17.7783 16.245 17.0117 17.0117C16.245 17.7783 15.3465 18.3847 14.3161 18.8309C13.2857 19.2771 12.1806 19.5001 11.0007 19.5001ZM4.75402 0.888672L5.80785 1.9425L1.9425 5.80785L0.888672 4.75402L4.75402 0.888672ZM17.2463 0.888672L21.1117 4.75402L20.0578 5.80785L16.1925 1.9425L17.2463 0.888672ZM11.0002 18.0002C12.9438 18.0002 14.5963 17.3194 15.9579 15.9579C17.3194 14.5963 18.0002 12.9438 18.0002 11.0002C18.0002 9.05659 17.3194 7.40402 15.9579 6.04247C14.5963 4.68094 12.9438 4.00017 11.0002 4.00017C9.05659 4.00017 7.40402 4.68094 6.04247 6.04247C4.68094 7.40402 4.00017 9.05659 4.00017 11.0002C4.00017 12.9438 4.68094 14.5963 6.04247 15.9579C7.40402 17.3194 9.05659 18.0002 11.0002 18.0002Z"
          fill="#C2CDC7"
        />
      </svg>
    </div>
  )
}

export default TimePicker
