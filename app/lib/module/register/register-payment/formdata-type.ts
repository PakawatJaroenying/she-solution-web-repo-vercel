export interface FormDataType {
  package: string
  //ชื่อบริษัท
  companyName: string
  //ที่ตั้ง
  companyAddress: string
  //จังหวัด
  companyProvinceId: string
  companyProvince?: string
  //อำเภอ/เขต
  companyDistrictId: string
  companyDistrict?: string
  //ตำบล/แขวง
  companySubDistrictId: string
  companySubDistrict?: string
  // รหัสไปรษณีย์:
  companyPostalCode: string
  //เบอร์โทรศัพท์
  companyPhoneNumber: string
}
