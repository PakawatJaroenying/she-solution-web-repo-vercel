import { TypedDocumentNode, gql } from '@apollo/client'

export const PublicPackageGQL: TypedDocumentNode<GetPublicPackageResponse> = gql`
  query PublicPackage {
    publicPackage {
      description
      duration
      durationUnit
      id
      name
      price
    }
  }
`

export interface GetPublicPackageResponse {
  publicPackage: {
    description: string
    duration: number
    durationUnit: string
    id: string
    name: string
    price: number
  }[]
}
