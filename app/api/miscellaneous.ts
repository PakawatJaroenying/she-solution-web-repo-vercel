'use server'

export interface APIResult<T = any> {
  data? : T
  errors?: {
    message: string
    statusCode: number
  }[]
}
