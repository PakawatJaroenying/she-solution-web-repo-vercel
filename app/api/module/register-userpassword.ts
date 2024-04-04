'use client'
import { UserType } from '@/app/lib/module/register/register-userpassword/user-type'
import { DocumentNode, gql } from '@apollo/client'



export const RegisterUserGQL: DocumentNode = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input)
  }
`

export interface RegisterUserInput {
  input: {
    email: string
    password: string
    username: string
    userType: UserType
  }
}


export const ConfirmUserGQL =  gql`
  mutation ConfirmUser($input: ConfirmUserInput!) {
    confirmUser(input: $input)
  }
`

export interface ConfirmUserInput {
  input: {
    code: string
    username: string
  }
}