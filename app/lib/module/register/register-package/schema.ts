import * as yup from 'yup'
import { FormDataType } from './formdata-type'

export const schema: yup.ObjectSchema<FormDataType> = yup.object().shape({
  package: yup.string().required('กรุณาเลือกแพ็คเกจ'),
})
