import { CorporationStatus } from "@/app/lib/interfaces/register-corporation";
import { Corporation } from "@/app/lib/module/register/register-corporation/interface";

export const defaultCorporation: Corporation = {
  branchType: "",
  status: CorporationStatus.none,
  branchInformation: {
    address: "",
    branchIndex: "",
    district: "",
    name: "",
    phone: "",
    postalCode: "",
    province: "",
    subDistrict: "",
  },
  factory: {
    electricMeterSize: "",
    electricityUsage: "",
    factoryType: "",
    machineCapacity: "",
    transformerSize: "",
  },
  building: {
    areaSize: "",
    buildingType: "",
    buildDate: "",
  },
  organizationType: [
    {
      accountNo: 1,
      businessTypes: [],
      isCheck: false,
    },
    {
      accountNo: 2,
      businessTypes: [],
      isCheck: false,
    },
    {
      accountNo: 3,
      businessTypes: [],
      isCheck: false,
    },
  ],
  settlement: {
    isSettlement: false,
    settlement: "",
  },
};