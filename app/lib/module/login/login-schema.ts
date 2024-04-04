import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  username: yup.string().required('กรุณากรอกชื่อผู้ใช้งาน'),
  password: yup.string().required('กรุณากรอกรหัสผ่าน'),
  remember: yup.boolean().required(),
})
