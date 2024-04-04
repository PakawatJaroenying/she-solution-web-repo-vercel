import Image from 'next/image'
const Footer = () => {
  return (
    <footer className="flex  justify-center text-black pb-4 text-sm ">
      <div className="container">
        <div className="flex justify-between">
          <div className="flex gap-4">
            {/* Logo and tagline */}
            <Image
              width={178}
              height={37}
              src="/dashboard/she-logo.svg"
              alt="Footer Logo"
              className="mx-auto  h-12"
            />
            <div className="flex flex-col gap-4">
              <span className="text-sm h-[48px] flex items-center">
                ผู้ให้บริการผลิตภัณฑ์การบริการจัดการสิ่งแวดล้อม ความปลอดภัย
                สุขภาพ <br />
                และส่งเสริมองค์กร
              </span>
              {/* Contact */}
              <span className="mr-2 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span className="text-lg">086 625 5288</span>
              </span>
            </div>
          </div>
          {/* Navigation links */}
          <div className="text-end text-sm">
            © 2023 SHE Solution
            <nav className="mt-2 text-forest">
              <a href="#" className="px-2 hover:underline">
                Terms of Use
              </a>
              |
              <a href="#" className="px-2 hover:underline">
                Privacy Policy
              </a>
              |
              <a href="#" className="px-2 hover:underline">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
