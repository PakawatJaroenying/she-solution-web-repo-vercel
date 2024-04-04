//ประเภทการสมัคคร
export enum UserType {
  //บุคคลธรรมดา
  PERSON = "corporation",
  //นิติบุคคล
  JURISTIC_PERSON = "individual",
  //รัฐวิสาหกิจ
  STATE_ENTERPRISE = "stateEnterprise",
}

export const UserTypeLabel = {
  [UserType.PERSON]: 'บุคคลธรรมดา',
  [UserType.JURISTIC_PERSON]: 'นิติบุคคล',
  [UserType.STATE_ENTERPRISE]: 'รัฐวิสาหกิจ',
}
