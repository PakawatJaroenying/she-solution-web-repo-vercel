import * as yup from 'yup'
import { FormDataType } from './formdata-type'

export const schema: yup.ObjectSchema<FormDataType> = yup.object().shape({
  package: yup.string().required('กรุณาเลือกแพ็คเกจ'),
  companyName: yup.string().required('กรุณากรอกชื่อบริษัท'),
  companyAddress: yup.string().required('กรุณากรอกที่อยู่บริษัท'),
  companyProvinceId: yup.string().required('กรุณากรอกที่อยู่บริษัท'),
  companyProvince: yup.string(),
  companyDistrictId: yup.string().required('กรุณากรอกอำเภอ/เขต'),
  companyDistrict: yup.string(),
  companySubDistrictId: yup.string().required('กรุณากรอกตำบล/แขวง'),
  companySubDistrict: yup.string(),
  companyPostalCode: yup.string().required('กรุณากรอกรหัสไปรษณีย์'),
  companyPhoneNumber: yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
})
