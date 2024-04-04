import { CorporationStatus } from "@/app/lib/interfaces/register-corporation";
import { TypedDocumentNode, gql } from "@apollo/client";

export const CreateCoporationGQL: TypedDocumentNode<
    CreateCoporationResponse,
    CreateCoporationVariables
    > = gql`
    mutation CreateCorporation($input: BranchInput!) {
    createCorporation(input: $input) {
        branches {
        branchInformation {
            address
            branchIndex
            district
            name
            phone
            postalCode
            province
            subDistrict
        }
        branchType
        building {
            areaSize
            buildDate
            buildingType
        }
        factory {
            electricMeterSize
            electricityUsage
            factoryType
            machineCapacity
            transformerSize
        }
        id
        organizationType {
            accountNo
            businessTypes
            isCheck
        }
        settlement {
            isSettlement
            settlement
        }
        status
        }
        id
    }
    }
`;

interface CreateCoporationResponse{
    createCorporation: {
        branches: {
            branchInformation: BranchInformation
            branchType: string
            building: Building
            factory: Factory
            id: string
            organizationType: OrganizationType
            settlement: {
                isSettlement: boolean 
                settlement: string
            }
            status: CorporationStatus
        }[]
        id: string
    }
}


interface CreateCoporationVariables {
    input: {
        branchType: string,
        status : CorporationStatus,
        settlement: {
            isSettlement: boolean;
            settlement: string;
        },
        branchInformation: BranchInformation
        building: Building
        factory: Factory
        organizationType: OrganizationType[]
    }
}



// #region app/lib/branch.ts
export interface BranchInformation {
  address:string
  branchIndex?:string
  district:string
  name:string
  phone:string
  postalCode:string
  province:string
  subDistrict:string
}
export  interface Building{
  //ขนาดพื้นที่อาคาร
  areaSize: string,
  //ประเภทอาคาร
  buildingType: string,
  //ปีที่ก่อสร้าง
  buildDate: string,
}
export  interface Factory{
  electricityUsage:string
  factoryType:string
  transformerSize:string
  machineCapacity:string
  electricMeterSize: string
}
export interface OrganizationType{
  accountNo: number,
  businessTypes: string[],
  isCheck: boolean,
}
// #endregion