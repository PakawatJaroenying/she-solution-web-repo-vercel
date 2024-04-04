import * as yup from 'yup'
import moment from 'moment'

export type TimePickerBaseInput = {
  hour: string
  minute: string
}



export const TimePickerBaseSchema: yup.ObjectSchema<TimePickerBaseInput> = yup
  .object()
  .shape({
    hour: yup.string().required('กรุณาเลือกเวลา'),
    minute: yup.string().required('กรุณาเลือกนาที'), //validate ampm with enums
  })
  .required('กรุณาเลือกช่วงเวลา')

//default values ให้เป็นเวลา ณ ปัจจบัน (ใช้ moment.js)
export const TimePickerDefaultValues = {
  hour: moment().format('HH'),
  minute: moment().format('mm'),
}
