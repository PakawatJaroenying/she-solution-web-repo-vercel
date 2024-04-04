import { TypedDocumentNode, gql } from '@apollo/client'

export interface GetPrompPayQRPaymentImageVariables {
  packageId: string
}
export interface GetPrompPayQRPaymentImageResponse {
  promptPayQRPayment: {
    amount: number
    qrBase64Image: string
  }
}

export const GetPrompPayQRPaymentImageGQL: TypedDocumentNode<
  GetPrompPayQRPaymentImageResponse,
  GetPrompPayQRPaymentImageVariables
> = gql`
  query PromptPayQRPayment($packageId: String!) {
    promptPayQRPayment(packageId: $packageId) {
      amount
      qrBase64Image
    }
  }
`

export interface UploadSignUrlVariables {
  key: string //{user_id}/payment-images/{image_name}
}

export interface UploadSignUrlResponse {
  uploadSignUrl: {
    key: string
    signedUrl: string //url ที่จะเอาไฟล์ upload ขึ้นไปที่ storage (ใช้ method put)
  }
}

export const UploadSignUrlGQL: TypedDocumentNode<
  UploadSignUrlResponse,
  UploadSignUrlVariables
> = gql`
  query UploadSignUrl($key: String!) {
    uploadSignUrl(key: $key) {
      key
      signedUrl
    }
  }
`

export interface CreatePaymentVariables {
  input: PaymentInput
  ownerId: string //"{user_id}"
}

export interface PaymentInput {
  address: string
  companyName: string
  district: string
  packageId: string
  paymentDateTime: string
  paymentImageKey: string //{user_id}/payment-images/{image_name} ได้มาจากการ UploadSignUrlGQL รูป
  phoneNumber: string
  postalCode: string
  province: string
  subDistrict: string
}

export interface CreatePaymentResponse {
  createPayment: {
    address: string
    companyName: string
    district: string
    id: string
    isActivated: boolean
    ownerId: string
    packageId: string
    paymentDateTime: string
    paymentImageKey: string
    phoneNumber: string
    postalCode: string
    province: string
    subDistrict: string
  }
}

export const CreatePaymentGQL: TypedDocumentNode<
  CreatePaymentResponse,
  CreatePaymentVariables
> = gql`
  mutation Mutation($input: PaymentInput!, $ownerId: String!) {
    createPayment(input: $input, ownerId: $ownerId) {
      address
      companyName
      district
      id
      isActivated
      ownerId
      packageId
      paymentDateTime
      paymentImageKey
      phoneNumber
      postalCode
      province
      subDistrict
    }
  }
`
