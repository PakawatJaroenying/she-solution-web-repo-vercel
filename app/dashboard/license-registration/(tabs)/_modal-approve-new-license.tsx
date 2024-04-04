import { ModalRegistterNewLicenseForm } from "@/app/lib/module/dashboard/license-registration/register-new-license/modal-formdata-type";
import { schema } from "@/app/lib/module/dashboard/license-registration/register-new-license/modal-schema";
import { Button } from "@/app/ui/button/button";
import FormGroup from "@/app/ui/form/form-group";
import SelectRHF from "@/app/ui/form/select-rhf";
import Modal from "@/app/ui/modal/modal";
import ModalHeader from "@/app/ui/modal/modal-header";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

type ModalApproveNewLicenseProps = {
  manageModalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

function ModalApproveNewLicense({
  manageModalState,
}: ModalApproveNewLicenseProps) {
  const methods = useForm<ModalRegistterNewLicenseForm>({
    resolver: yupResolver(schema),
  });

  const [open, setOpenModal] = manageModalState;

  const onSubmit = (data: ModalRegistterNewLicenseForm) => {
    //TODO: ส่งข้อมูลไปยัง API
    console.log(data);
    setOpenModal(false);
  };

  return (
    <Modal open={open} width="30%">
      <ModalHeader
        title="อนุมัติและแจ้ง Approver"
        setOpenModal={setOpenModal}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="p-4 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col gap-2 items-center w-full">
              <FormGroup
                label="เลือกรายการ"
                className="w-full"
                errorMessage={methods.formState.errors.approve?.message}
              >
                <SelectRHF
                  className="w-full"
                  placeholder="เลือกรายการ"
                  name="approve"
                  options={[
                    { text: "อนุมัติ", value: "approve" },
                    { text: "ไม่อนุมัติ", value: "not-approve" },
                  ]}
                />
              </FormGroup>

              <FormGroup
                label="ข้อความแจ้ง Approver"
                className="w-full"
                errorMessage={methods.formState.errors.message?.message}
              >
                <textarea
                  {...methods.register("message")}
                  className={clsx(
                    "w-full border border-gray-300 rounded-md p-2",
                    {
                      "border-red-500":
                        !!methods.formState.errors.message?.message,
                    }
                  )}
                  placeholder="ข้อความที่นี่..."
                ></textarea>
              </FormGroup>
            </div>
            <div className="flex gap-2  w-full">
              <Button
                variant="primary"
                className="bg-[#F6F6F6] grow text-darkgreen border-0
            hover:bg-[#E5E5E5] hover:text-darkgreen
            "
                type="button"
                onClick={() => setOpenModal(false)}
              >
                ไม่ใช่
              </Button>
              <Button variant="primary" className="grow">
                ใช่ ต้องการ
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default ModalApproveNewLicense;
