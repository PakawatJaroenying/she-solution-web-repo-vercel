import { TypedDocumentNode, gql } from "@apollo/client";
import { PaginationInput, PaginationResponse } from "../pagination";
import { LawMasterStatus } from "@/app/lib/interfaces/register-law-regulation";

export const SearchLawMastersGQL: TypedDocumentNode<
    SearchLawMastersResponse,
    SearchLawMastersVariables
> = gql`
query SearchLawMasters($input: SearchLawMasterInput!) {
  searchLawMasters(input: $input) {
    items {
      id
      lawInformation {
        lawId
        name
        lawType
        announcementDate
        effectiveDate
      }
      status
    }
    pagination {
      pageNo
      pageSize
      total
    }
  }
}
`;


export interface SearchLawMastersVariables {
    input: {
        searchText: string;
        pagination: PaginationInput;
        statues: LawMasterStatus[];
    };
}

export interface SearchLawMastersResponse {
    searchLawMasters: {
        items: {
            id: string;
            lawInformation:LawInformation;
            status: LawMasterStatus;
        }[];
        pagination: PaginationResponse
    };
}

export const DeleteLawMasterGQL: TypedDocumentNode<
    DeleteLawMasterResponse,
    {deleteLawMasterId: string}
    > = gql`
    mutation DeleteLawMaster($deleteLawMasterId: String!) {
        deleteLawMaster(id: $deleteLawMasterId) {
            essences {
            detail
            endDate
            startDate
            }
            id
            status
            lawCorporationCriteria {
            building {
                areaSize
                buildingType
                buildDate
            }
            factory {
                electricMeterSize
                electricityUsage
                factoryType
                machineCapacity
                transformerSize
            }
            organizationType {
                accountNo
                businessTypes
                isCheck
            }
            settlement {
                isSettlement
                settlements
            }
            }
            lawInformation {
            announcementDate
            category
            department
            effectiveDate
            lawId
            lawType
            lawTypeDetail
            ministry
            motherLaw
            name
            originalFilePath {
                path
                url
            }
            relatedSystem
            }
        }
    }
`;

export interface DeleteLawMasterResponse {
    deleteLawMaster: {
        essences: Essence[];
        id: string;
        lawCorporationCriteria: LawCorporationCriteria;
        lawInformation: LawInformation;
        status: LawMasterStatus;
    };
}


export const CreateLawMasterGQL : TypedDocumentNode<
    CreateLawMasterResponse,
    CreateLawMasterVariables
    > = gql`
    mutation CreateLawMaster($input: LawInformationInput!) {
    createLawMaster(input: $input) {
        id
        lawInformation {
        announcementDate
        category
        department
        effectiveDate
        lawId
        lawType
        lawTypeDetail
        ministry
        motherLaw
        name
        originalFilePath {
            path
            url
        }
        relatedSystem
        }
    }
    }
`;

interface CreateLawMasterVariables {
    input: {
        announcementDate: string;
        category: string;
        department: string;
        effectiveDate: string;
        lawType: string;
        lawTypeDetail: string[];
        ministry: string;
        motherLaw: string;
        name: string;
        originalFilePath: string[]
        relatedSystem: string[];
    };
}
    
interface CreateLawMasterResponse{
    createLawMaster: {
        id: string;
        lawInformation: LawInformation;
    };
}


export const GetLawMasterGQL: TypedDocumentNode<
    GetLawMasterResponse,
    {getLawMasterId: string}
    > = gql`
    query GetLawMaster($getLawMasterId: String!) {
        getLawMaster(id: $getLawMasterId) {
            essences {
            detail
            endDate
            startDate
            }
            id
            lawCorporationCriteria {
            building {
                areaSize
                buildingType
                buildDate
            }
            factory {
                electricMeterSize
                electricityUsage
                factoryType
                machineCapacity
                transformerSize
            }
            organizationType {
                accountNo
                businessTypes
                isCheck
            }
            settlement {
                isSettlement
                settlements
            }
            }
            lawInformation {
            announcementDate
            category
            department
            effectiveDate
            lawId
            lawType
            lawTypeDetail
            ministry
            motherLaw
            name
            originalFilePath {
                path
                url
            }
            relatedSystem
            }
            status
        }
    }
`;


// #region interface
export interface GetLawMasterResponse {
    getLawMaster: {
        essences: Essence[];
        id: string;
        lawCorporationCriteria: LawCorporationCriteria;
        lawInformation: LawInformation;
        status: LawMasterStatus;
    };
}

//เงื่อนไขกฎหมาย
export const UpdateLawMasterCorporationCriteriaGQL: TypedDocumentNode<
    UpdateLawMasterResponse,
    UpdateLawMasterCorporationCriteriaVariables
    > = gql`
mutation UpdateLawMaster($updateLawMasterId: String!, $input: UpdateLawMasterInput!) {
    updateLawMaster(id: $updateLawMasterId, input: $input) {
        id
        status
        essences {
        detail
        endDate
        startDate
        }
        lawCorporationCriteria {
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
        organizationType {
            accountNo
            businessTypes
            isCheck
        }
        settlement {
            isSettlement
            settlements
        }
        }
        lawInformation {
        announcementDate
        category
        department
        effectiveDate
        lawId
        lawType
        lawTypeDetail
        ministry
        motherLaw
        name
        originalFilePath {
            path
            url
        }
        relatedSystem
        }
    }
}
`;


//สาระสำคัญ
export const UpdateLawMasterEssenceGQL: TypedDocumentNode<
    UpdateLawMasterResponse,
    UpdateLawMasterEssenceVariables
    > = gql`
mutation UpdateLawMaster($updateLawMasterId: String!, $input: UpdateLawMasterInput!) {
    updateLawMaster(id: $updateLawMasterId, input: $input) {
        id
        status
        essences {
        detail
        endDate
        startDate
        }
        lawCorporationCriteria {
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
        organizationType {
            accountNo
            businessTypes
            isCheck
        }
        settlement {
            isSettlement
            settlements
        }
        }
        lawInformation {
            announcementDate
            category
            department
            effectiveDate
            lawId
            lawType
            lawTypeDetail
            ministry
            motherLaw
            name
            originalFilePath {
                path
                url
            }
        relatedSystem
        }
    }
}
`;


//สถานะกฎหมาย
export const UpdateLawMasterInformationGQL: TypedDocumentNode<
    UpdateLawMasterResponse,
    UpdateLawMasterInformationVariables
    > = gql`
    mutation UpdateLawMaster($updateLawMasterId: String!, $input: UpdateLawMasterInput!) {
    updateLawMaster(id: $updateLawMasterId, input: $input) {
        id
        status
        essences {
        detail
        endDate
        startDate
        }
        lawCorporationCriteria {
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
        organizationType {
            accountNo
            businessTypes
            isCheck
        }
        settlement {
            isSettlement
            settlements
        }
        }
        lawInformation {
        announcementDate
        category
        department
        effectiveDate
        lawId
        lawType
        lawTypeDetail
        ministry
        motherLaw
        name
        originalFilePath {
            path
            url
        }
        relatedSystem
        }
    }
}
`;

export interface UpdateLawMasterCorporationCriteriaVariables{
    updateLawMasterId: string;
    input: {
        lawCorporationCriteria: LawCorporationCriteria;
        // กรณีกดปุ่ม ประกาศ ให้ส่ง status: broadcast
        status: LawMasterStatus;
    };

}

export interface UpdateLawMasterBusinessVariables {
    updateLawMasterId: string;
    input: {
        lawCorporationCriteria: LawCorporationCriteria;
    };
}

export interface UpdateLawMasterInformationVariables {
    updateLawMasterId: string;
    input: {
        lawInformation : CreateLawMasterVariables["input"]
    };
}

interface UpdateLawMasterEssenceVariables {
    updateLawMasterId: string;
    input: {
        essences: Essence[];
    };
}

interface UpdateLawMasterResponse {
    updateLawMaster: {
        id: string;
        status: LawMasterStatus;
        lawInformation: LawInformation;
        lawCorporationCriteria: LawCorporationCriteria;
        essences: Essence[];
    };
}


export interface LawCorporationCriteria{
    building: {
        areaSize: string;
        buildingType: string;
        buildDate: string;
    };
    factory: {
        electricMeterSize: string;
        electricityUsage: string;
        factoryType: string;
        machineCapacity: string;
        transformerSize: string;
    };
    organizationType: {
        accountNo: number;
        businessTypes: string[];
        isCheck: boolean;
    }[];
    settlement: {
        isSettlement: boolean;
        settlements: string[];
    };
}

export interface LawInformation{
    announcementDate: string;
    category: string;
    department: string;
    effectiveDate: string;
    lawId: string;
    lawType: string;
    lawTypeDetail: string[];
    ministry: string;   
    motherLaw: string;
    name: string;
    originalFilePath: OriginalFilePath[];
    relatedSystem: string[];
}

interface OriginalFilePath{
    path: string;
    url: string;
}

export interface Essence{
    index?: number;
    detail: string;
    endDate: string;
    startDate: string;
}

// #endregion interface