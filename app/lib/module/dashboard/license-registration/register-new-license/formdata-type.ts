export type RegistterNewLicenseForm = {
  //เลขทะเบียนใบอนุญาติ
  licenseNumber: string
  //ชื่อใบอนุญาติ
  licenseName: string
  //วันที่ใบอนุญาตเริ่มมีผล
  effectiveDate: string
  //วันที่ใบอนุญาตหมดอายุ
  expirationDate: string
  //หน่วยงานที่ออกใบอนุญาต
  organization: string
  //กระทรวงที่ออกใบอนุญาต
  ministry: string
  //กฎหมายต้นฉบับ (files)
  originalLaw: File[]
  //ชื่อผู้รับผิดชอบ
  responsiblePerson: string
  //อีเมลผู้รับผิดชอบ
  responsibleEmail: string
}
