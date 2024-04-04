import { NextAuthConfig  } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { refreshToken } from './app/lib/server-action/authen'



export const authConfig: NextAuthConfig = {
  trustHost: true,
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  // cookies: {
  //   sessionToken: {
  //     name: '__Secure-authjs.session-token',
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       secure: true,
  //     },
  //   }
  // },
  callbacks: {
    jwt: async ({ token, user , account ,session,profile ,trigger }) => {
      const jwtExpireInTime = 60 * 45 * 1000
      console.log('Date.now()',Date.now())
      console.log('token.expiresAt',token.expiresAt)
      // console.log('session',session)
      // console.log('user',user)
      // console.log('account',account)
      // console.log('profile',profile)
      //first login
      if (user && user !== undefined) {
        return {
          id: user.id!,
          username: user.username,
          email: user.email!,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: Date.now() + jwtExpireInTime,
          activatedPackages: user.activatedPackages,  
          role: user.role,
        } satisfies JWT
      } else if (Date.now() < token.expiresAt) {
        // Return previous token if the access token has not expired yet
        console.log("🚀 ~ jwt: ~  // Return previous token if the access token has not expired yet:", )
        return token
      } else {
        // Access token has expired, try to update it
        console.log("🚀 ~ jwt: ~ Access token has expired, try to update it:")
        const newTokenAndRefreshToken = await refreshToken(token.refreshToken)
        if (newTokenAndRefreshToken) {
          return {
            ...token,
            ...newTokenAndRefreshToken,
            expiresAt: Date.now() + jwtExpireInTime, //1 hour,
          } satisfies JWT
        } else {
          return {
            ...token,
            error: 'RefreshAccessTokenError',
            expiresAt: 0,
          } satisfies JWT
        }
      }
    },
    session: async ({ session, token, user }) => {
      if (!token) return session
      session.user.id = token.id as string
      session.user.email = token.email as string
      session.user.username = token.username as string
      session.user.activatedPackages = token.activatedPackages
      session.user.role = token.role
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.expiresAt = token.expiresAt
      session.activatedPackages = token.activatedPackages
      if(token.error === 'RefreshAccessTokenError'){
        session.error = 'RefreshAccessTokenError'
      }
      return session
    },
    /* note ไปใช้ที่ middleware แทน
    authorized: ({ auth, request: { nextUrl   } }) => {
      const isLoggedIn = !!auth?.user

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnRegisterPackage = nextUrl.pathname.startsWith('/register-package') || nextUrl.pathname.startsWith('/register-payment')
      const userHasAnyPackage = (auth?.user?.activatedPackages || []).length > 0

      if (isOnDashboard) {
        if (isLoggedIn && userHasAnyPackage) return NextResponse.next()
        return false
      }else if(isOnRegisterPackage){
        if (isLoggedIn && !userHasAnyPackage) return NextResponse.next()
        return false
      }else if (isLoggedIn) {
        if (!userHasAnyPackage){
          //!note จะเรียก function authorized อีกครั้ง
          // return NextResponse.next()
          // return NextResponse.rewrite(new URL('/register-package', nextUrl))
          return Response.redirect(new URL('/register-package', nextUrl))
        }else{
          //!note จะเรียก function authorized อีกครั้ง
          // return NextResponse.rewrite(new URL('/dashboard', nextUrl))
          return Response.redirect(new URL('/dashboard', nextUrl))
        }
      }else{
        return true
      }
    },
    */
  },
  providers: [Credentials({})], //google , oauth , facebook , etc
}
