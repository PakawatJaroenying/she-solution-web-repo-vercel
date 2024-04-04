import { Tab } from "@/app/lib/module/register/register-corporation/tab";
import React from "react";
import Modal from "../../modal/modal";
import ModalHeader from "../../modal/modal-header";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "../../form/form-group";
import { Button } from "../../button/button";

interface ModalCopyProps {
  tabs: Tab<string>[];
  manageModalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  onSubmitCallBack: (tabKey: string) => void;
}

type FormDataType = {
  //สาขา
  branchKey: string;
};

const schema = yup.object().shape({
  branchKey: yup.string().required("กรุณาเลือกสาขา"),
});

function ModalCopy({
  tabs,
  manageModalState,
  onSubmitCallBack,
}: ModalCopyProps) {
  const methods = useForm<FormDataType>({
    defaultValues: {
      branchKey: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (submitData: FormDataType) => {
    onSubmitCallBack(submitData.branchKey);
    setOpenModal(false);
  };

  const [open, setOpenModal] = manageModalState;
  return (
    <Modal open={open} width="450px">
      <ModalHeader title="สาระสำคัญของกฏหมาย" setOpenModal={setOpenModal} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start justify-center  gap-4 p-4">
            <FormGroup
              label="เลือกสาขา"
              name="branchKey"
              errorMessage={methods.formState.errors.branchKey?.message}
              className="w-full"
            >
              <select
                {...methods.register("branchKey")}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">เลือกสาขา</option>
                {tabs.map((tab, tabIndex) => (
                  <option key={tabIndex} value={tab.key}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </FormGroup>
            <div className="flex w-full gap-2">
              <Button
                variant="primary"
                className="grow border-0 bg-[#F6F6F6] text-darkgreen
            hover:bg-[#E5E5E5] hover:text-darkgreen
            "
                type="button"
                onClick={() => setOpenModal(false)}
              >
                ยกเลิก
              </Button>
              <Button variant="primary" type="submit" className="grow">
                ตกลง
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default ModalCopy;
