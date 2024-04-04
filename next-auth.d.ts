import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { Package } from './app/api/module/authen'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    refreshToken: string
    user: {
      id: string
      email: string
      username: string
      role: string
    } & DefaultSession['user']
    expiresAt: number
    error?: 'RefreshAccessTokenError'
    activatedPackages: Package[]
  }

  interface User {
    id: string
    email: string
    username: string
    accessToken: string
    refreshToken: string
    role: string
    activatedPackages: Package[]
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    username: string
    email: string
    accessToken: string
    refreshToken: string
    expiresAt: number
    role: string
    error?: 'RefreshAccessTokenError'
    activatedPackages: Package[]
  }
}
