import { UpdateLawMasterCorporationCriteriaGQL } from "@/app/api/module/register-law-regulation";
import {
  accountOptions,
  buildingAreaSizeOptions,
  buildingTypeOptions,
  dateOfConstructionOptions,
  electricMeterSize,
  electricityConsumptionOptions,
  factoryBusinessTypeOptions,
  possessionOfMachnePowerOptions,
  settlementOptions,
  transformerSizeOptions,
} from "@/app/lib/master";

import { Button } from "@/app/ui/button/button";
import FormGroupLayout from "@/app/ui/form-group-layout";
import CheckboxRHF from "@/app/ui/form/checkbox-rhf";
import FormGroup from "@/app/ui/form/form-group";
import RadioRHF from "@/app/ui/form/radio-rhf";
import SelectAutoCompleteRHF from "@/app/ui/form/select-autocomplete-rhf";
import SelectCheckboxRHF from "@/app/ui/form/select-checkbox-rhf";
import TopicAnswer from "@/app/ui/register/register-corporation/topic-answer";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useClientProivder } from "../client-provider";
import { lawCorporationCriteriaSchema } from "@/app/lib/module/dashboard/registration-law-regulation/schema";
import { LawCorporationCriteria } from "@/app/lib/module/dashboard/registration-law-regulation/formdata-type";
import { TabType } from "../../_interfaces";
import { LawMasterStatus } from "@/app/lib/interfaces/register-law-regulation";

function LawCorporationTab() {
  const router = useRouter();
  const params = useParams();
  const {
    data: {
      getLawMaster: { lawCorporationCriteria },
    },
    setDirtyForm,
    activeTab,
  } = useClientProivder();

  const id = params.id as string;

  const [submitAndBoardcast, setSubmitAndBoardcast] = React.useState(false);

  const methods = useForm<FormDataType>({
    defaultValues: {
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
        settlements: [],
      },
    },
    resolver: yupResolver(lawCorporationCriteriaSchema),
  });

  const [mutateUpdateLawMasterCorporationCriteria] = useMutation(
    UpdateLawMasterCorporationCriteriaGQL,
    {
      onCompleted: () => {
        if (submitAndBoardcast) alert("บันทึกและประกาศแจ้งลูกค้าสำเร็จ");
        else alert("บันทึกร่างสำเร็จ");
        router.push("/dashboard/registration-law-regulation");
      },
      onError: (error) => {
        alert(error.message);
      },
    },
  );

  function setDefaultForm() {
    methods.reset({
      building: {
        areaSize: lawCorporationCriteria.building.areaSize,
        buildDate: lawCorporationCriteria.building.buildDate,
        buildingType: lawCorporationCriteria.building.buildingType,
      },
      factory: {
        electricityUsage: lawCorporationCriteria.factory.electricityUsage,
        factoryType: lawCorporationCriteria.factory.factoryType,
        machineCapacity: lawCorporationCriteria.factory.machineCapacity,
        transformerSize: lawCorporationCriteria.factory.transformerSize,
        electricMeterSize: lawCorporationCriteria.factory.electricMeterSize,
      },
      organizationType: lawCorporationCriteria.organizationType.map(
        (organization) => ({
          accountNo: organization.accountNo,
          businessTypes: organization.businessTypes,
          isCheck: organization.isCheck,
        }),
      ),
      settlement: {
        isSettlement: lawCorporationCriteria.settlement.isSettlement,
        settlements: lawCorporationCriteria.settlement.settlements,
      },
    });
  }

  useEffect(() => {
    if (lawCorporationCriteria) {
      setDefaultForm();
    }
  }, []);

  //dirty form
  useEffect(() => {
    console.log("🚀 ~ law corporation tab", activeTab);
    if (
      activeTab !== TabType.LAW_CORPORATION &&
      methods.formState.isDirty &&
      lawCorporationCriteria
    ) {
      setDefaultForm();
    }
  }, [activeTab, methods.formState.isDirty]);

  React.useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (type === "change") {
        setDirtyForm(true);
      }

      if (name === "settlement.isSettlement") {
        if (value.settlement?.isSettlement) {
          methods.setValue("settlement.settlements", []);
        }
        if (methods.formState.isSubmitted) {
          methods.trigger("settlement.settlements");
        }
      }

      if (
        name === "organizationType.0.isCheck" &&
        !value.organizationType?.[0]?.isCheck
      ) {
        methods.setValue("organizationType.0.businessTypes", []);
      }
      if (
        name === "organizationType.1.isCheck" &&
        !value.organizationType?.[1]?.isCheck
      ) {
        methods.setValue("organizationType.1.businessTypes", []);
      }
      if (
        name === "organizationType.2.isCheck" &&
        !value.organizationType?.[2]?.isCheck
      ) {
        methods.setValue("organizationType.2.businessTypes", []);
      }

      //ถ้า isCheck === false ให้เคลีย value ประเภทกิจการ
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const onSubmit = async (submitData: FormDataType) => {
    await mutateUpdateLawMasterCorporationCriteria({
      variables: {
        updateLawMasterId: id,
        input: {
          lawCorporationCriteria: submitData,
          status: submitAndBoardcast
            ? LawMasterStatus.broadcast
            : LawMasterStatus.save,
        },
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <header>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl ">ข้อมูลกิจการ</h1>
              <div className="badge badge-primary p-4">Admin ระบบ</div>
            </div>
          </header>
          <main>
            <div className="card border border-whitegreen p-8 shadow-xl">
              <FormGroupLayout
                Header={
                  <TopicAnswer
                    label="ข้อมูลที่ต้องลงทะเบียน"
                    otherClass="mb-2"
                  />
                }
              >
                <div className="grid  grid-cols-2 gap-3">
                  <FormGroup
                    label="การนิคม"
                    errorMessage={
                      methods.formState.errors.settlement?.isSettlement?.message
                    }
                  >
                    <div className="flex items-center gap-2">
                      <RadioRHF
                        onInput={() => {
                          //เช็คก่อนว่า form เคย validated แล้วหรือยัง
                          if (methods.formState.isSubmitted) {
                            methods.trigger(`settlement.isSettlement`);
                          }
                        }}
                        name={`settlement.isSettlement` as const}
                        text="อยู่ในนิคม"
                        value="true"
                      />
                      <RadioRHF
                        onInput={() => {
                          if (methods.formState.isSubmitted) {
                            methods.trigger(`settlement.isSettlement`);
                          }
                        }}
                        name={`settlement.isSettlement` as const}
                        text="ไม่อยู่ในนิคม"
                        value="false"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup
                    label="เลือกนิคม"
                    errorMessage={
                      methods.formState.errors.settlement?.settlements?.message
                    }
                  >
                    <SelectCheckboxRHF
                      disabled={!methods.watch("settlement.isSettlement")}
                      name={`settlement.settlements` as const}
                      placeholder="เลือกนิคม"
                      options={settlementOptions}
                    />
                  </FormGroup>
                  {/* {JSON.stringify(methods.formState.errors.organizationType)} */}
                  <FormGroup
                    label="เลือกบัญชีสถานประกอบกิจการ"
                    errorMessage={
                      methods.formState.errors.organizationType?.root?.message
                    }
                  >
                    {accountOptions.map((account, idx) => (
                      <CheckboxRHF
                        onInput={() => {
                          if (methods.formState.isSubmitted) {
                            methods.trigger(`organizationType`);
                            methods.trigger(`organizationType.${idx}.isCheck`);
                            methods.trigger(
                              `organizationType.${idx}.businessTypes`,
                            );
                          }
                        }}
                        key={idx}
                        name={`organizationType.${idx}.isCheck` as const}
                        direction="column"
                        text={`บัญชี ${account.text}`}
                        value={"true"}
                      />
                    ))}
                  </FormGroup>
                  {/* {JSO.stNringify(methods.formState.errors.organizationType)} */}
                  <FormGroup
                    label="ลำดับของสถานประกอบกิจการ"
                    className="flex flex-col gap-2"
                    errorMessage={
                      methods.formState.errors.organizationType === undefined
                        ? ""
                        : methods.formState.errors.organizationType[0]
                            ?.businessTypes?.message ||
                          methods.formState.errors.organizationType[1]
                            ?.businessTypes?.message ||
                          methods.formState.errors.organizationType[2]
                            ?.businessTypes?.message
                    }
                  >
                    {accountOptions.map((account, idx) => (
                      <SelectCheckboxRHF
                        key={idx}
                        disabled={
                          !methods.watch(`organizationType.${idx}.isCheck`)
                        }
                        name={`organizationType.${idx}.businessTypes` as const}
                        placeholder={`---- เลือกธุรกิจสำหรับ ประเภท ${account.text}  ----`}
                        options={account.options}
                      />
                    ))}
                  </FormGroup>

                  <FormGroup
                    label="ประเภทกิจการโรงงาน"
                    className="col-start-1"
                    errorMessage={
                      methods.formState.errors.factory?.factoryType?.message
                    }
                  >
                    <SelectAutoCompleteRHF
                      name={`factory.factoryType` as const}
                      placeholder="โรงงานจำพวก 1"
                      options={factoryBusinessTypeOptions}
                    />
                  </FormGroup>

                  <FormGroup
                    label="กำลังเครื่องจักรที่ครอบครอง"
                    className="col-start-1"
                    errorMessage={
                      methods.formState.errors.factory?.machineCapacity?.message
                    }
                  >
                    <SelectAutoCompleteRHF
                      name={`factory.machineCapacity` as const}
                      placeholder="มากกว่าหรือเท่ากับ 50 แรงม้า"
                      options={possessionOfMachnePowerOptions}
                    />
                  </FormGroup>

                  <FormGroup
                    label="ขนาดหม้อแปลง"
                    errorMessage={
                      methods.formState.errors.factory?.transformerSize?.message
                    }
                  >
                    <SelectAutoCompleteRHF
                      name={`factory.transformerSize` as const}
                      placeholder="มากกว่า 3,530 KVA"
                      options={transformerSizeOptions}
                    />
                  </FormGroup>

                  <FormGroup
                    label="ขนาดเครื่องวัดไฟฟ้า"
                    errorMessage={
                      methods.formState.errors.factory?.electricMeterSize
                        ?.message
                    }
                  >
                    <SelectAutoCompleteRHF
                      name={`factory.electricMeterSize` as const}
                      placeholder="มากกว่า 3,000 kW"
                      options={electricMeterSize}
                    />
                  </FormGroup>

                  <FormGroup
                    label="ปริมาณการใช้ไฟฟ้า"
                    errorMessage={
                      methods.formState.errors.factory?.electricityUsage
                        ?.message
                    }
                  >
                    <SelectAutoCompleteRHF
                      name={`factory.electricityUsage` as const}
                      placeholder="20-59 ล้าน mj/ปี"
                      options={electricityConsumptionOptions}
                    />
                  </FormGroup>

                  <FormGroup
                    label="ขนาดพื้นที่อาคาร"
                    className="col-start-1"
                    errorMessage={
                      methods.formState.errors.building?.areaSize?.message
                    }
                  >
                    <SelectAutoCompleteRHF
                      name={`building.areaSize` as const}
                      placeholder="อาคารสูง 23 ม. ขึ้นไป"
                      options={buildingAreaSizeOptions}
                    />
                  </FormGroup>

                  <FormGroup
                    label="ประเภทอาคาร"
                    errorMessage={
                      methods.formState.errors.building?.buildingType?.message
                    }
                  >
                    {/* TODO: มาเเก้ Options */}
                    <SelectAutoCompleteRHF
                      name={`building.buildingType` as const}
                      placeholder="เลือกประเภทอาคาร"
                      options={buildingTypeOptions}
                    />
                  </FormGroup>

                  <FormGroup
                    label="วันเดือนปีที่ก่อสร้าง"
                    errorMessage={
                      methods.formState.errors.building?.buildDate?.message
                    }
                  >
                    <SelectAutoCompleteRHF
                      name={`building.buildDate` as const}
                      placeholder="เลือกวันเดือนปีที่ก่อสร้าง"
                      options={dateOfConstructionOptions}
                    />
                  </FormGroup>
                </div>
                <div className="mt-8  flex items-center justify-end gap-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-outline"
                    onClick={() => {
                      setSubmitAndBoardcast(false);
                    }}
                  >
                    บันทึกร่าง
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      setSubmitAndBoardcast(true);
                    }}
                  >
                    ประกาศแจ้งลูกค้าที่เข้าข่าย
                  </Button>
                </div>
              </FormGroupLayout>
            </div>
          </main>
        </div>
      </form>
      {/* <pre>{JSON.stringify(methods.watch(), null, 2)}</pre> */}
    </FormProvider>
  );
}

type FormDataType = LawCorporationCriteria & {};

export default LawCorporationTab;
