export type SearchLawForm = {
  //search
  search: string
  //เลขทะเบียนกฎหมาย
  lawNumber: string
  //ชื่อกฎหมาย
  lawName: string
  //วันที่ประกาศใช้
  effectiveDate: string
  //วันที่มีผลบังคับใช้
  effectiveDateEnforce: string
  //กฎหมายแม่
  lawMother: string
  //หน่วยงานที่ออก
  department: string
  //กระทรวงที่ออกกฎหมาย
  ministry: string
  //หัวข้อประเภทกฎหมายและข้อกำหนด
  lawType: string[]
  //ประเภทกฎหมาย
  lawCategory: string
  //ระบบการจัดการที่เกี่ยวข้อง
  managementSystem: string[]
}
