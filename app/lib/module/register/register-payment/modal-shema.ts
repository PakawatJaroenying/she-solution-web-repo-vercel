import * as yup from 'yup'
import { FormDataTypes } from './modal-formdata-type'
import { TimePickerBaseSchema } from '@/app/ui/form/timepicker-schema'
import { filesSchema } from '@/app/lib/files-schema'

export const schema: yup.ObjectSchema<FormDataTypes> = yup.object().shape({
  transferDate: yup.string().required('กรุณากรอกวันที่โอน'),
  transferTime: TimePickerBaseSchema,
  files: filesSchema,
})
