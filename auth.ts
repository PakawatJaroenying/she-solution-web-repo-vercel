import NextAuth, { User } from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getUserFormBackendAsync } from './app/lib/server-action/authen'

export const { signIn, signOut, auth, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data
          const user = await getUserFormBackendAsync(username, password)
          if (!user) return null

          const userToJWT = {
            id: user.signIn.user.id,
            email: user.signIn.user.email,
            username: user.signIn.user.username,
            accessToken: user.signIn.token.accessToken,
            refreshToken: user.signIn.token.refreshToken,
            activatedPackages: user.signIn.activatedPackages,
            role: user.signIn.user.role,
          } as User

          return userToJWT
        }

        return null
      },
    }),
  ],
})
