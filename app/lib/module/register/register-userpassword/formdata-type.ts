import { UserType } from "./user-type"

export type FormDataType = {
    userType: UserType
    username: string
    password: string
    confirmPassword: string
    email: string
  }