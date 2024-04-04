import { TimePickerBaseInput } from "@/app/ui/form/timepicker-schema"

export type FormDataTypes = {
    //วันที่โอน
    transferDate: string
    //เวลาที่โอน
    transferTime: TimePickerBaseInput
    //หลักฐานการโอน
    files: File[]
  }
  
  