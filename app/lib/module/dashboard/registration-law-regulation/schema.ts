import { ObjectSchema } from "yup"
import * as yup from 'yup'
import { LawCorporationCriteria } from "./formdata-type"
import { buildingSchema, factorySchema, organizationTypeSchema } from "@/app/lib/branch"

export const lawCorporationCriteriaSchema: ObjectSchema<LawCorporationCriteria> = yup.object().shape({
  settlement: yup.object().shape({
      // ต้องเลือกอย่างน้อย 1 ถ้ามี isSettlement เป็น true
      isSettlement: yup.boolean().defined('กรุณาเลือกการอยู่ในนิคม'),
      settlements: yup
        .array(yup.string().defined('กรุณาเลือกนิคม'))
        .when('isSettlement', (isSettlement, schema) => {
          // console.log("🚀 ~ .when ~ isSettlement:", isSettlement)
          return isSettlement.some(it=>it) ? schema.min(1, 'กรุณาเลือกนิคมอย่างน้อย 1 นิคม') : schema
        })
        .defined('กรุณาเลือกนิคม')
    }),
    organizationType: organizationTypeSchema,
    factory: factorySchema,
    building: buildingSchema
  })