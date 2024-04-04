'use client'
import {
  BellIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'แพ็คเกจ', href: '/dashboard', icon: 'home' },
  { name: 'คู่มือการใช้งาน', href: '/manager', icon: 'users' },
  { name: 'สมัครใช้งาน', href: '/manager', icon: 'users' },
  // ใส่เมนูอื่นๆ ตามที่ต้องการ
]

const Header = () => {
  const pathname = usePathname()
  return (
    <header className="bg-white p-4 flex items-center justify-center h-[100px]">
      <div className="container flex justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <Image
            src="/dashboard/she-logo.svg"
            alt="Logo"
            width={178}
            height={37}
          />
          <div className="hidden lg:flex ms-[2rem]">
            <ul className="menu menu-horizontal px-1 space-x-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'px-3 py-2 rounded-md text-sm font-medium',
                      {
                        'text-teal': pathname === item.href,
                        'text-black': pathname !== item.href,
                      },
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Search bar */}
          <div className="flex items-center border-2 rounded overflow-hidden">
            <input
              className="px-4 py-2 input input-bordered w-full max-w-xs border-0 !outline-0 shadow-none"
              type="search"
              placeholder="ค้นหารายการ..."
            />
            <button className="flex items-center justify-center px-4 border-l">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button>
              <BellIcon className="h-6 w-6 text-darkgreen" />
            </button>
            <button>
              <ShoppingCartIcon className="h-6 w-6 text-darkgreen" />
            </button>
            <button>
              <UserCircleIcon className="h-6 w-6 text-darkgreen" />
            </button>
          </div>

          <Image
            width={60}
            height={60}
            src={'/dashboard/photo-1633332755192-727a05c4013d.avif'}
            alt="Profile Picture"
            className="rounded-full  object-cover overflow-hidden"
            layout="fixed"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
