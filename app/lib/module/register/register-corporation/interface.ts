import { BranchInformation, Building, Factory, OrganizationType } from "@/app/lib/branch"
import { CorporationStatus } from "@/app/lib/interfaces/register-corporation"

export interface Corporation {
    branchType: string,
    status?: CorporationStatus
    branchInformation: BranchInformation 
    building: Building
    factory: Factory
    organizationType: OrganizationType[]
    settlement: {
      settlement: string,
      isSettlement: boolean,
    }
}
