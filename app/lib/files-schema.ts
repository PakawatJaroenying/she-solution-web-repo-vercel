import * as yup from 'yup'
import { OriginalFilePath } from './interfaces/file'

export const filesSchema = yup
  .array()
  .of(yup.mixed() as yup.Schema<File>)
  .required('กรุณาเลือกไฟล์')
  .min(1, 'กรุณาเลือกไฟล์')


export const originalFilePathSchema= yup
  .array()
  .of(yup.object().shape({
    path: yup.string().required('path is required'),
    url: yup.string().required('url is required')
  }))
  .required('กรุณาเลือกไฟล์')
  .min(1, 'กรุณาเลือกไฟล์')