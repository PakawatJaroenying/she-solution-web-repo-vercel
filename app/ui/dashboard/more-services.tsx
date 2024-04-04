import React from 'react'
import Image from 'next/image'
function MoreServices() {
  return (
    <div className="text-forest bg-aqua rounded-lg p-4 flex flex-col justify-center gap-3 items-center   w-full">
      <span className="font-normal">
        Have you tried new <br />{' '}
        <span className="font-bold">SHE Solution app ?</span>
      </span>
      {/* <div className='min-h-[200px]'> */}
      <Image
        loading="eager"
        src="/dashboard/havetry-new-app.svg"
        width={200}
        height={200}
        alt="havetry images min"
        className="min-w-full"
      />
      {/* </div> */}
      <button className="px-4 py-2 mt-3 btn btn-outline btn-primary text-teal bg-white border-0 font-semibold">
        More Services
      </button>
    </div>
  )
}

export default MoreServices
