import * as yup from 'yup'
import { FormDataType } from './formdata-type'
import { UserType } from './user-type'
import {
  confirmPasswordSchema,
  passwordSchema,
} from '@/app/lib/password-schema'

export const schema: yup.ObjectSchema<FormDataType> = yup.object().shape({
  userType: yup.mixed<UserType>().defined('กรุณาเลือกประเภทการสมัคร'),
  username: yup.string().required('กรุณากรอกชื่อผู้ใช้'),
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  email: yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
  
})
