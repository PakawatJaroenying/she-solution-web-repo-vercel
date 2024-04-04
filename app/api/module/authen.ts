export interface LoginInput {
  input: {
    username: string
    password: string
  }
}

export interface LoginResponse {
  signIn: {
    token: Token
    user: User
    activatedPackages: Package[]
  }
}

export interface Package {
  activatedAt: string
  description: string
  expiredAt: string
  id: string
  name: string
}

export interface Token {
  accessToken: string
  refreshToken: string
}
export interface User {
  id: string
  email: string
  username: string
  role: string
}

export interface RefreshAccessTokenInput {
  refreshToken: string
}

export interface RefreshAccessTokenResponse extends Token {}
