import { ObjectSchema } from 'yup'
import * as yup from 'yup'
import { Corporation } from './interface'
import { buildingSchema, factorySchema, organizationTypeSchema } from '@/app/lib/branch'
import { RegisterCoparationType } from './formdata-type'
import { CorporationStatus } from '@/app/lib/interfaces/register-corporation'


//TODO: ทำ Schema ต่อ
const corporationSchema: ObjectSchema<Corporation> = yup.object().shape({
  branchType: yup.string().required('กรุณาเลือกประเภทสาขา'),
  status: yup.mixed(),
  branchInformation: yup.object().shape({
    address: yup.string().required('กรุณากรอกที่อยู่'),
    branchIndex: yup.string(),
    district: yup.string().required('กรุณากรอกอำเภอ'),
    name: yup.string().required('กรุณากรอกชื่อสาขา'),
    phone: yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
    postalCode: yup.string().required('กรุณากรอกรหัสไปรษณีย์'),
    province: yup.string().required('กรุณาเลือกจังหวัด'),
    subDistrict: yup.string().required('กรุณากรอกตำบล'),
  }),
  building: buildingSchema,
  factory: factorySchema,
  organizationType: organizationTypeSchema,
  settlement: yup.object().shape({
    isSettlement: yup.boolean().required('กรุณาเลือกการอยู่ในนิคม'),
    settlement: yup.string()
      .when('isSettlement', (isSettlement, schema) => {
          return isSettlement.some(it=>it) ? schema.min(1, 'กรุณาเลือกนิคมอย่างน้อย 1 นิคม') : schema
        })
      .defined('กรุณาเลือกนิคม'),
  })
})

export const schema: ObjectSchema<RegisterCoparationType> = yup.object().shape({
  corporation: yup.array(corporationSchema).required('กรุณากรอกข้อมูลบริษัท'),
  isAccept: yup.boolean().required('กรุณายอมรับเงื่อนไขการใช้งาน'),
})