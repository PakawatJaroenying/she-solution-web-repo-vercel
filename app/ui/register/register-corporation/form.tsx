"use client";
import React, { useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import TopicAnswer from "./topic-answer";
import FormGroupLayout from "../../form-group-layout";
import DynamicTabs from "./dynamic-tabs";

import TextField from "../../form/textfield-rhf";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "../../form/form-group";

import { Tab } from "@/app/lib/module/register/register-corporation/tab";
import CheckboxRHF from "../../form/checkbox-rhf";
import { schema } from "@/app/lib/module/register/register-corporation/schema";
import RadioRHF from "../../form/radio-rhf";
import SelectCheckboxRHF from "../../form/select-checkbox-rhf";
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
import SelectAutoCompleteRHF from "../../form/select-autocomplete-rhf";
import { RegisterCoparationType } from "@/app/lib/module/register/register-corporation/formdata-type";
import { defaultCorporation } from "./default-corporation";
import { useThaiProvinceDataProvider } from "../../context/thai-province-data-provider";
import SelectRHF from "../../form/select-rhf";
import TextFieldRHF from "../../form/textfield-rhf";
import ModalCopy from "./modal-copy";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@apollo/client";
import { CreateCoporationGQL } from "@/app/api/module/register-corporation";
import { CorporationStatus } from "@/app/lib/interfaces/register-corporation";

function RegisterCorporationForm() {
  const [mutateCreateCoporation] = useMutation(CreateCoporationGQL, {
    onCompleted: () => {
      //TODO: ต้องทำอะไรต่อหลังจากสร้างบริษัทสำเร็จ
      alert("สร้างบริษัทสำเร็จ");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const buttonSubmit = React.useRef<HTMLButtonElement>(null);
  const [tabs, setTabs] = useState<Tab<string>[]>([
    {
      key: "corporation.0",
      label: "สำนักงานใหญ่",
      content: "",
    },
  ]);
  const [tryingSubmit, setTryingSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);
  const manageStateModalCopy = useState<boolean>(false);

  //TODO: การเปลื่ยน tab , copy , add tab ต้องเช็คด้วยไหมว่าบันทึกไปหรือยังถ้ายังไม่บันทึก ถ้ายังไม่บันทึก ให้ alert ว่า ต้องบันทึกก่อน
  const methods = useForm<RegisterCoparationType>({
    defaultValues: {
      corporation: [
        {
          ...defaultCorporation,
          branchType: "headOffice",
          status: CorporationStatus.none,
        },
      ],
    },
    resolver: yupResolver(schema),
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: methods.control,
      name: "corporation",
    },
  );
  const { provinces, districts, subDistricts } = useThaiProvinceDataProvider();

  React.useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      const corporationIndex = Number(name?.split(".")[1]);
      //  if (type === "change") {
      //    setDirtyForm(true);
      //  }
      if (name === `corporation.${corporationIndex}.settlement.isSettlement`) {
        if (value.corporation?.[corporationIndex]?.settlement?.isSettlement) {
          methods.setValue(
            `corporation.${corporationIndex}.settlement.settlement`,
            "",
          );
        }
        if (methods.formState.isSubmitted) {
          // methods.trigger("settlement.settlements");
          methods.trigger(
            `corporation.${corporationIndex}.settlement.settlement`,
          );
        }
      }

      if (
        name === `corporation.${corporationIndex}.organizationType.0.isCheck` &&
        !value.corporation?.[corporationIndex]?.organizationType?.[0]?.isCheck
      ) {
        methods.setValue(
          `corporation.${corporationIndex}.organizationType.0.businessTypes`,
          [],
        );
      }
      if (
        name === `corporation.${corporationIndex}.organizationType.1.isCheck` &&
        !value.corporation?.[corporationIndex]?.organizationType?.[1]?.isCheck
      ) {
        methods.setValue(
          `corporation.${corporationIndex}.organizationType.1.businessTypes`,
          [],
        );
      }
      if (
        name === `corporation.${corporationIndex}.organizationType.2.isCheck` &&
        !value.corporation?.[corporationIndex]?.organizationType?.[2]?.isCheck
      ) {
        methods.setValue(
          `corporation.${corporationIndex}.organizationType.2.businessTypes`,
          [],
        );
      }

      // console.log("name", name); //corporation.0.branchInformation.province
      // console.log("type", type);
      // console.log("value", value);
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const trySubmitFormIsValid = () => {
    //สั่ง form ให้ submit และ preventDefault
    setTryingSubmit(true);
    buttonSubmit.current?.click();
    //check ว่ามี error หรือไม่
    if (methods.formState.isValid) {
      return true;
    } else {
      return false;
    }
  };

  const alertFailedMessage = () => {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  };

  const onClickAddTab = () => {
    if (!trySubmitFormIsValid()) {
      return;
    }
    //ui
    const newTab = {
      key: `corporation.${tabs.length}`,
      label: `สาขา ${tabs.length}`,
      content: ``,
    };
    append({
      ...defaultCorporation,
      branchType: "branch",
    });
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newTab.key);
  };

  const onClickCopy = () => {
    if (!trySubmitFormIsValid()) {
      return;
    }
    manageStateModalCopy[1](true);
  };

  const onSubmit = async (submitData: RegisterCoparationType) => {
    if (tryingSubmit) {
      return;
    }

    // await mutateCreateCoporation({
    //   variables: {
    //     input: {},
    //   },
    // });
  };
  const onSubmitFail = (errors: any) => {
    console.log("🚀 ~ onSubmitFail ~ errors:", errors);
    alertFailedMessage();
  };

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={methods.handleSubmit(onSubmit, onSubmitFail)}
      >
        <button ref={buttonSubmit} type="submit" className="hidden"></button>
        <div className="mt-[3rem]">
          <DynamicTabs
            activeTab={activeTab}
            tabs={tabs.map((tab, tabIndex) => ({
              ...tab,
              content: (
                <div key={tabIndex}>
                  <FormGroupLayout
                    Header={
                      <TopicAnswer
                        label="ข้อมูลบริษัท"
                        otherClass="mt-7 mb-2"
                      />
                    }
                  >
                    <>
                      <div className="grid  grid-cols-2 gap-3">
                        <FormGroup
                          label="ชื่อบริษัท"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.branchInformation?.name?.message
                          }
                        >
                          <TextField
                            name={
                              `corporation.${tabIndex}.branchInformation.name` as const
                            }
                            type="text"
                            placeholder="ชื่อบริษัท"
                          />
                        </FormGroup>

                        <FormGroup
                          label="ที่ตั้ง"
                          className="col-start-1"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.branchInformation?.address?.message
                          }
                        >
                          <TextField
                            name={
                              `corporation.${tabIndex}.branchInformation.address` as const
                            }
                            type="text"
                            placeholder="เช่น เลขที่ตั้ง อาคาร ชั้น"
                          />
                        </FormGroup>

                        <FormGroup
                          label="จังหวัด"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.branchInformation?.province?.message
                          }
                        >
                          <SelectRHF
                            name={
                              `corporation.${tabIndex}.branchInformation.province` as const
                            }
                            className="w-full"
                            placeholder="เลือกจังหวัด"
                            options={
                              provinces.map((province) => ({
                                text: province.name_th,
                                value: String(province.id),
                              })) || []
                            }
                            onChanged={() => {
                              methods.setValue(
                                `corporation.${tabIndex}.branchInformation.district`,
                                "",
                              );
                              methods.setValue(
                                `corporation.${tabIndex}.branchInformation.subDistrict`,
                                "",
                              );
                              methods.setValue(
                                `corporation.${tabIndex}.branchInformation.postalCode`,
                                "",
                              );
                            }}
                          />
                        </FormGroup>

                        <FormGroup
                          label="อำเภอ/เขต"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.branchInformation?.district?.message
                          }
                        >
                          <SelectRHF
                            name={
                              `corporation.${tabIndex}.branchInformation.district` as const
                            }
                            className="w-full"
                            placeholder="เลือกอำเภอ/เขต"
                            options={
                              districts
                                .filter(
                                  (district) =>
                                    district.province_id ===
                                    Number(
                                      methods.watch(
                                        `corporation.${tabIndex}.branchInformation.province` as const,
                                      ),
                                    ),
                                )
                                .map((district) => ({
                                  text: district.name_th,
                                  value: String(district.id),
                                })) || []
                            }
                            onChanged={() => {
                              methods.setValue(
                                `corporation.${tabIndex}.branchInformation.subDistrict`,
                                "",
                              );
                              methods.setValue(
                                `corporation.${tabIndex}.branchInformation.postalCode`,
                                "",
                              );
                            }}
                          />
                        </FormGroup>

                        <FormGroup
                          label="ตำบล/แขวง"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.branchInformation?.subDistrict?.message
                          }
                        >
                          <SelectRHF
                            className="w-full"
                            name={
                              `corporation.${tabIndex}.branchInformation.subDistrict` as const
                            }
                            placeholder="เลือกตำบล/แขวง"
                            options={
                              subDistricts
                                .filter(
                                  (subDistrict) =>
                                    subDistrict.amphure_id ===
                                    Number(
                                      methods.watch(
                                        `corporation.${tabIndex}.branchInformation.district` as const,
                                      ),
                                    ),
                                )
                                .map((subDistrict) => ({
                                  text: subDistrict.name_th,
                                  value: String(subDistrict.id),
                                })) || []
                            }
                            onChanged={() => {
                              methods.setValue(
                                `corporation.${tabIndex}.branchInformation.postalCode`,
                                subDistricts
                                  .find(
                                    (subDistrict) =>
                                      subDistrict.id ===
                                      Number(
                                        methods.watch(
                                          `corporation.${tabIndex}.branchInformation.subDistrict` as const,
                                        ),
                                      ),
                                  )
                                  ?.zip_code?.toString() || "",
                              );
                              methods.trigger(
                                `corporation.${tabIndex}.branchInformation.postalCode`,
                              );
                            }}
                          />
                        </FormGroup>

                        <FormGroup
                          label="รหัสไปรษณีย์"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.branchInformation?.postalCode?.message
                          }
                        >
                          <SelectRHF
                            disabled
                            name={
                              `corporation.${tabIndex}.branchInformation.postalCode` as const
                            }
                            placeholder={`${methods.watch(
                              `corporation.${tabIndex}.branchInformation.postalCode` as const,
                            )}`}
                            className="w-full"
                            options={[]}
                          />
                        </FormGroup>

                        <FormGroup
                          label="เบอร์โทรศัพท์"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.branchInformation?.phone?.message
                          }
                        >
                          <TextFieldRHF
                            name={
                              `corporation.${tabIndex}.branchInformation.phone` as const
                            }
                            type="text"
                            placeholder="เบอร์โทรศัพท์"
                          />
                        </FormGroup>
                      </div>
                    </>
                  </FormGroupLayout>
                  <FormGroupLayout
                    Header={
                      <TopicAnswer
                        label="ข้อมูลโรงงาน"
                        otherClass="mt-7 mb-2"
                      />
                    }
                  >
                    <>
                      <div className="grid  grid-cols-2 gap-3">
                        <FormGroup
                          label="การนิคม"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.settlement?.isSettlement?.message
                          }
                        >
                          <div className="flex items-center gap-2">
                            <RadioRHF
                              onInput={() => {
                                //เช็คก่อนว่า form เคย validated แล้วหรือยัง
                                if (methods.formState.isSubmitted) {
                                  methods.trigger(
                                    `corporation.${tabIndex}.settlement.isSettlement`,
                                  );
                                }
                              }}
                              name={
                                `corporation.${tabIndex}.settlement.isSettlement` as const
                              }
                              text="อยู่ในนิคม"
                              value="true"
                            />
                            <RadioRHF
                              onInput={() => {
                                if (methods.formState.isSubmitted) {
                                  // methods.trigger(`settlement.isSettlement`);
                                  methods.trigger(
                                    `corporation.${tabIndex}.settlement.isSettlement`,
                                  );
                                }
                              }}
                              name={
                                `corporation.${tabIndex}.settlement.isSettlement` as const
                              }
                              text="ไม่อยู่ในนิคม"
                              value="false"
                            />
                          </div>
                        </FormGroup>

                        <FormGroup
                          label="เลือกนิคม"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.settlement?.settlement?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            disabled={
                              !methods.watch(
                                `corporation.${tabIndex}.settlement.isSettlement`,
                              )
                            }
                            name={
                              `corporation.${tabIndex}.settlement.settlement` as const
                            }
                            placeholder="เลือกนิคม"
                            options={settlementOptions}
                          />
                        </FormGroup>
                        {/* {JSON.stringify(methods.formState.errors.organizationType)} */}
                        <FormGroup
                          label="เลือกบัญชีสถานประกอบกิจการ"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.organizationType?.message
                          }
                        >
                          {accountOptions.map((account, accountIndex) => (
                            <CheckboxRHF
                              onInput={() => {
                                if (methods.formState.isSubmitted) {
                                  methods.trigger(
                                    `corporation.${tabIndex}.organizationType`,
                                  );
                                  methods.trigger(
                                    `corporation.${tabIndex}.organizationType.${accountIndex}.isCheck`,
                                  );
                                  methods.trigger(
                                    `corporation.${tabIndex}.organizationType.${accountIndex}.businessTypes`,
                                  );
                                }
                              }}
                              key={tabIndex + accountIndex}
                              name={
                                `corporation.${tabIndex}.organizationType.${accountIndex}.isCheck` as const
                              }
                              direction="column"
                              text={`บัญชี ${account.text}`}
                              value={"true"}
                            />
                          ))}
                        </FormGroup>
                        <FormGroup
                          label="ลำดับของสถานประกอบกิจการ"
                          className="flex flex-col gap-2"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.organizationType === undefined
                              ? ""
                              : methods.formState.errors.corporation?.[tabIndex]
                                  ?.organizationType?.[0]?.businessTypes
                                  ?.message ||
                                methods.formState.errors.corporation?.[tabIndex]
                                  ?.organizationType?.[1]?.businessTypes
                                  ?.message ||
                                methods.formState.errors.corporation?.[tabIndex]
                                  ?.organizationType?.[2]?.businessTypes
                                  ?.message
                          }
                        >
                          {accountOptions.map((account, accountIndex) => (
                            <SelectCheckboxRHF
                              key={tabIndex + accountIndex + account.text}
                              disabled={
                                // !methods.watch(
                                //   `organizationType.${tabIndex}.isCheck`,
                                // )
                                !methods.watch(
                                  `corporation.${tabIndex}.organizationType.${accountIndex}.isCheck`,
                                )
                              }
                              name={
                                `corporation.${tabIndex}.organizationType.${accountIndex}.businessTypes` as const
                              }
                              placeholder={`---- เลือกธุรกิจสำหรับ ประเภท ${account.text}  ----`}
                              options={account.options}
                            />
                          ))}
                        </FormGroup>

                        <FormGroup
                          label="ประเภทกิจการโรงงาน"
                          className="col-start-1"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.factory?.factoryType?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.factory.factoryType` as const
                            }
                            placeholder="โรงงานจำพวก 1"
                            options={factoryBusinessTypeOptions}
                          />
                        </FormGroup>

                        <FormGroup
                          label="กำลังเครื่องจักรที่ครอบครอง"
                          className="col-start-1"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.factory?.machineCapacity?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.factory.machineCapacity` as const
                            }
                            placeholder="มากกว่าหรือเท่ากับ 50 แรงม้า"
                            options={possessionOfMachnePowerOptions}
                          />
                        </FormGroup>

                        <FormGroup
                          label="ขนาดหม้อแปลง"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.factory?.transformerSize?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.factory.transformerSize` as const
                            }
                            placeholder="มากกว่า 3,530 KVA"
                            options={transformerSizeOptions}
                          />
                        </FormGroup>

                        <FormGroup
                          label="ขนาดเครื่องวัดไฟฟ้า"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.factory?.electricMeterSize?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.factory.electricMeterSize` as const
                            }
                            placeholder="มากกว่า 3,000 kW"
                            options={electricMeterSize}
                          />
                        </FormGroup>

                        <FormGroup
                          label="ปริมาณการใช้ไฟฟ้า"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.factory?.electricityUsage?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.factory.electricityUsage` as const
                            }
                            placeholder="20-59 ล้าน mj/ปี"
                            options={electricityConsumptionOptions}
                          />
                        </FormGroup>

                        <FormGroup
                          label="ขนาดพื้นที่อาคาร"
                          className="col-start-1"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.building?.areaSize?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.building.areaSize` as const
                            }
                            placeholder="อาคารสูง 23 ม. ขึ้นไป"
                            options={buildingAreaSizeOptions}
                          />
                        </FormGroup>

                        <FormGroup
                          label="ประเภทอาคาร"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.building?.buildingType?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.building.buildingType` as const
                            }
                            placeholder="เลือกประเภทอาคาร"
                            options={buildingTypeOptions}
                          />
                        </FormGroup>

                        <FormGroup
                          label="วันเดือนปีที่ก่อสร้าง"
                          errorMessage={
                            methods.formState.errors.corporation?.[tabIndex]
                              ?.building?.buildDate?.message
                          }
                        >
                          <SelectAutoCompleteRHF
                            name={
                              `corporation.${tabIndex}.building.buildDate` as const
                            }
                            placeholder="เลือกวันเดือนปีที่ก่อสร้าง"
                            options={dateOfConstructionOptions}
                          />
                        </FormGroup>
                      </div>
                    </>
                  </FormGroupLayout>
                </div>
              ),
            }))}
            onClickChangeTab={setActiveTab}
            onClickAddTab={onClickAddTab}
            onClickCopy={onClickCopy}
            conditionBeforeChangeTab={() => {
              if (!trySubmitFormIsValid()) {
                return false;
              }
              return true;
            }}
          />
        </div>

        <div className="mt-[1rem]">
          <FormGroup
            label=""
            errorMessage={methods.formState.errors.isAccept?.message}
          >
            <CheckboxRHF
              name="isAccept"
              value="isAccept"
              text={
                <span className="text-sm  ">
                  คุณได้ยอมรับ{" "}
                  <span className="text-teal underline">
                    เงื่อนไขข้อตกลงการใช้งาน
                  </span>
                </span>
              }
            />
          </FormGroup>
        </div>

        <div className="mt-[2rem] flex justify-end gap-4">
          <button
            className="btn btn-outline me-auto min-w-[177px] border-2 border-teal text-teal"
            onClick={() => {
              setTryingSubmit(false);
            }}
          >
            แก้ไข
          </button>
          <button
            className="btn  btn-outline min-w-[177px] border-2 border-teal text-teal "
            onClick={() => {
              setTryingSubmit(false);
            }}
          >
            บันทึก
          </button>
          <button
            type="submit"
            className="btn min-w-[177px] bg-forest text-white"
            onClick={() => {
              setTryingSubmit(false);
            }}
          >
            ยืนยันข้อมูล
          </button>
        </div>
      </form>
      {manageStateModalCopy[0] && (
        <ModalCopy
          tabs={tabs}
          manageModalState={manageStateModalCopy}
          onSubmitCallBack={(branchKey) => {
            //branchKey = corporation.1
            const indexCopy = Number(branchKey.split(".")[1]);
            const newTab = {
              key: `corporation.${tabs.length}`,
              label: `สาขา ${tabs.length}`,
              content: ``,
            };
            const copyCorporation = methods.getValues(
              `corporation.${indexCopy}`,
            );
            append(
              JSON.parse(
                JSON.stringify({ ...copyCorporation, branchType: "branch" }),
              ),
            );
            setTabs((prev) => [...prev, newTab]);
            setActiveTab(newTab.key);
          }}
        />
      )}
      {/* <DevTool control={methods.control} /> */}
    </FormProvider>
  );
}

export default RegisterCorporationForm;
