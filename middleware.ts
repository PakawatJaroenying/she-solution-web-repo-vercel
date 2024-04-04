import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// ฟังก์ชันนี้เป็นตัวอย่าง คุณอาจจะต้องปรับแต่งให้เหมาะสมกับโครงสร้างข้อมูลของคุณ
async function middleware(request: NextRequest) {
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
    salt: process.env.NEXT_PUBLIC_AUTH_SALT as string,
  })

  
  if (process.env.NODE_ENV === 'production') {
    if (!token) {
      if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register-userpassword') {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } else if (token.activatedPackages && token.activatedPackages.length > 0) {
      if (!request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } else {
      if (
        !request.nextUrl.pathname.startsWith('/register') ||
        request.nextUrl.pathname === '/register-userpassword'
      ) {
        return NextResponse.redirect(new URL('/register-package', request.url),)
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)'],
}

/*
  /((?!api|_next/static|_next/image|.*\\.png$).*): ส่วนนี้เป็น Regular Expression (RegExp) ที่ใช้เพื่อกำหนดเส้นทาง (paths) ที่ middleware นี้จะถูกใช้งานกับหรือไม่ถูกใช้งานกับ โดยมีรายละเอียดดังนี้:
  /?: หมายถึงเส้นทางที่ตรวจสอบจะเริ่มต้นด้วย /.
  (?! ... ): เป็น Negative Lookahead ที่ใช้เพื่อกำหนดเงื่อนไขที่ไม่ต้องการให้ตรงกับ pattern ที่อยู่ข้างในคำว่า (?! ...).
  api|_next/static|_next/image|.*\\.png$: หมายถึงเส้นทางที่ไม่ต้องการให้ middleware นี้ทำงานด้วย ได้แก่:
  เส้นทางที่เริ่มต้นด้วย api
  เส้นทางที่เริ่มต้นด้วย _next/static
  เส้นทางที่เริ่มต้นด้วย _next/image
  ไฟล์ที่มีนามสกุล .png
  .*: หมายถึงอะไรก็ได้ตามมาหลังจาก pattern ที่กำหนดไว้ใน Negative Lookahead.
  .*\\.png$: หมายถึงไฟล์ที่มีนามสกุลเป็น .png ที่อยู่ท้ายสุดของเส้นทาง (สังเกตุได้จาก $ ที่หมายถึงจบเส้นทาง).
  ดังนั้น, การเขียน matcher แบบนี้หมายความว่า middleware นี้จะถูกใช้กับทุกเส้นทาง ยกเว้น:

  เส้นทางที่เริ่มต้นด้วย /api
  เส้นทางที่เริ่มต้นด้วย /_next/static
  เส้นทางที่เริ่มต้นด้วย /_next/image
  ไฟล์ที่มีนามสกุล .png
  นี่เป็นวิธีการใช้ Regular Expression ในการกำหนดเงื่อนไขที่ซับซ้อนสำหรับการตัดสินใจว่า middleware ควรจะถูกใช้กับเส้นทางใดบ้างในแอปพลิเคชัน Next.js ของคุณ.
*/

export default middleware
