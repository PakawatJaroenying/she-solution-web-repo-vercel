import * as yup from 'yup'
import { FormDataTypes } from './modal-formdata-type'

export const schema: yup.ObjectSchema<FormDataTypes> = yup.object().shape({
  otp: yup
    .string()
    .length(6, 'กรุณากรอกรหัส OTP 6 หลัก')
    .required('กรุณากรอกรหัส OTP'),
})
