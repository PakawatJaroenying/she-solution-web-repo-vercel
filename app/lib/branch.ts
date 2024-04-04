import { ArraySchema, ObjectSchema } from "yup"
import * as yup from 'yup'

export interface BranchInformation {
  address:string
  branchIndex?:string
  district:string
  name:string
  phone:string
  postalCode:string
  province:string
  subDistrict:string
}



export interface OrganizationType{
  accountNo: number,
  businessTypes: string[],
  isCheck: boolean,
}

export  interface Building{
  //ขนาดพื้นที่อาคาร
  areaSize: string,
  //ประเภทอาคาร
  buildingType: string,
  //ปีที่ก่อสร้าง
  buildDate: string,
}

export  interface Factory{
  electricityUsage:string
  factoryType:string
  transformerSize:string
  machineCapacity:string
  electricMeterSize: string
}

export const buildingSchema: ObjectSchema<Building> = yup.object().shape({
      areaSize: yup.string().required('กรุณากรอกขนาดพื้นที่'),
      buildingType: yup.string().required('กรุณาเลือกประเภทอาคาร'),
      buildDate: yup.string().required('กรุณาเลือกปีที่ก่อสร้าง'),
})
  
export const factorySchema: ObjectSchema<Factory> = yup.object().shape({
      electricityUsage: yup.string().required('กรุณาเลือกการใช้ไฟฟ้า'),
      factoryType: yup.string().required('กรุณาเลือกประเภทโรงงาน'),
      transformerSize: yup.string().required('กรุณาเลือกขนาดหม้อแปลง'),
      machineCapacity: yup.string().required('กรุณาเลือกกำลังเครื่องจักร'),
      electricMeterSize: yup.string().required('กรุณาเลือกขนาดเครื่องวัดไฟฟ้า'),
})

export const organizationTypeSchema: yup.ArraySchema<OrganizationType[], yup.AnyObject, undefined, ""> = yup.array(
      yup.object().shape({
        accountNo: yup
          .number()
          .required(''),
        isCheck: yup.boolean().required('กรุณาเลือกการตรวจสอบ'),
        businessTypes: yup
          .array(yup.string().defined(''))
          .defined('')
          .when('isCheck', (isCheck, schema,options) => {
          return isCheck.some(it=>it) ? schema.min(1, 'กรุณาเลือกประเภทกิจการอย่างน้อย 1 ประเภท') : schema
          })
      })
    )
    .test('isCheck', 'กรุณาเลือกบัญชีสถานประกอบกิจการอย่างน้อย 1 บัญชี', (organizationType, context) => {
      // console.log('organizationType',organizationType)
      return organizationType?.every((it) => !it.isCheck) ?  context.createError({ message: 'กรุณาเลือกบัญชีสถานประกอบกิจการอย่างน้อย 1 บัญชี' }) : true
    })
    .defined('')