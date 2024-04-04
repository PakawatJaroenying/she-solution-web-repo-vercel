import * as yup from 'yup'
import { RegistterNewLicenseForm } from './formdata-type'
import { filesSchema } from '@/app/lib/files-schema'

export const schema: yup.ObjectSchema<RegistterNewLicenseForm> = yup
  .object()
  .shape({
    licenseNumber: yup.string().required('กรุณากรอกเลขทะเบียนใบอนุญาต'),
    licenseName: yup.string().required('กรุณากรอกชื่อใบอนุญาต'),
    effectiveDate: yup.string().required('กรุณากรอกวันที่ใบอนุญาตเริ่มมีผล'),
    expirationDate: yup.string().required('กรุณากรอกวันที่ใบอนุญาตหมดอายุ'),
    organization: yup.string().required('กรุณากรอกหน่วยงานที่ออกใบอนุญาต'),
    ministry: yup.string().required('กรุณากรอกกระทรวงที่ออกใบอนุญาต'),
    originalLaw: filesSchema,
    responsiblePerson: yup.string().required('กรุณากรอกชื่อผู้รับผิดชอบ'),
    responsibleEmail: yup
      .string()
      .email('รูปแบบอีเมลไม่ถูกต้อง')
      .required('กรุณากรอกอีเมลผู้รับผิดชอบ'),
  })
