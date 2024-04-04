import { Building, Factory, OrganizationType } from "@/app/lib/branch"

export interface LawCorporationCriteria{
  //การนิคม
   settlement: {
    settlements: string[],
    isSettlement: boolean,
   }
  //บัญชีสถานประกอบกิจการ
  organizationType: OrganizationType[]
  //โรงงาน
  building: Building
  //อาคาร
  factory: Factory
}