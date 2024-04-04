import { ModalRegistterNewLicenseForm } from './modal-formdata-type'
import * as yup from 'yup'

export const schema: yup.ObjectSchema<ModalRegistterNewLicenseForm> = yup
  .object()
  .shape({
    approve: yup.string().required('กรุณาเลือกรายการ'),
    message: yup.string().required('กรุณากรอกข้อความ'),
  })
