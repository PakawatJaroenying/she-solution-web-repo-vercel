import * as yup from 'yup'

const passwordSchema = yup
  .string()
  .required('กรุณากรอกรหัสผ่าน')
  .matches(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/, 'รหัสผ่านต้องเป็นภาษาอังกฤษ')
  .test('password', 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร', (value) => {
    return value?.length >= 8
  })
  .matches(/[a-zA-Z]/, 'รหัสผ่านต้องประกอบด้วยตัวอักษรอย่างน้อย 1 ตัว')
  .matches(/[0-9]/, 'รหัสผ่านต้องประกอบด้วยตัวเลขอย่างน้อย 1 ตัว')
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    'รหัสผ่านต้องประกอบด้วยอักขระพิเศษอย่างน้อย 1 ตัว',
  )
  .matches(/[A-Z]/, 'รหัสผ่านต้องประกอบด้วยตัวอักษรตัวใหญ่อย่างน้อย 1 ตัว')
  .matches(
    /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/,
    'รหัสผ่านต้องประกอบด้วยตัวอักษร, ตัวเลข, และอักขระพิเศษ',
  )

const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน')
  .required('กรุณากรอกรหัสผ่านอีกครั้ง')

export { passwordSchema, confirmPasswordSchema }
