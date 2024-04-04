import {
  Essence,
  UpdateLawMasterEssenceGQL,
} from "@/app/api/module/register-law-regulation";
import { Button } from "@/app/ui/button/button";
import DatePickerRHF from "@/app/ui/form/datepicker-rhf";
import FormGroup from "@/app/ui/form/form-group";
import Modal from "@/app/ui/modal/modal";
import ModalHeader from "@/app/ui/modal/modal-header";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useClientProivder } from "../client-provider";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

type EssenceTabModalProps = {
  manageModalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  essenceItem?: Essence;
};

function EssenceTabModal({
  manageModalState,
  essenceItem,
}: EssenceTabModalProps) {
  const { data: dataMaster, refetchMasterData } = useClientProivder();
  const [open, setOpenModal] = manageModalState;

  const methods = useForm<FormData>({
    defaultValues: essenceItem
      ? essenceItem
      : { detail: "", startDate: "", endDate: "" },
    resolver: yupResolver(schema),
  });

  const isEdit = essenceItem ? true : false;

  const [mutateUpdateEssence] = useMutation(UpdateLawMasterEssenceGQL, {
    onCompleted: () => {
      setOpenModal(false);
      alert("บันทึกสำเร็จ");
      refetchMasterData();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = async (submitData: FormData) => {
    const { startDate, endDate, detail } = submitData;
    const input = {
      startDate: startDate + "T" + "00:00:00+07:00",
      endDate: endDate + "T" + "00:00:00+07:00",
      detail,
    };
    console.log("🚀 ~ onSubmit ~ input:", input);
    await mutateUpdateEssence({
      variables: {
        updateLawMasterId: dataMaster.getLawMaster.id,
        input: {
          essences: isEdit
            ? dataMaster.getLawMaster.essences.map((essence, idx) => {
                if (idx === essenceItem!.index!) {
                  return input;
                }
                return {
                  startDate: essence.startDate,
                  endDate: essence.endDate,
                  detail: essence.detail,
                };
              })
            : [
                ...dataMaster.getLawMaster.essences.map((essence, idx) => ({
                  startDate: essence.startDate,
                  endDate: essence.endDate,
                  detail: essence.detail,
                })),
                input,
              ],
        },
      },
    });
  };

  return (
    <Modal open={open} width="80%">
      <ModalHeader title="สาระสำคัญของกฏหมาย" setOpenModal={setOpenModal} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="flex  gap-4 self-end">
              <FormGroup
                label="วันกำหนด"
                errorMessage={methods.formState.errors.startDate?.message}
              >
                <DatePickerRHF name="startDate" placeholder="วันกำหนด" />
              </FormGroup>
              <FormGroup
                label="วันแล้วเสร็จ"
                errorMessage={methods.formState.errors.endDate?.message}
              >
                <DatePickerRHF name="endDate" placeholder="วันแล้วเสร็จ" />
              </FormGroup>
            </div>
            <FormGroup
              label="สาระสำคัญของกฏหมาย"
              errorMessage={methods.formState.errors.detail?.message}
              className="w-full"
            >
              <CKEditor
                editor={DecoupledEditor}
                data={methods.watch("detail")}
                //เพิ่ม alignment ให้ editor
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "fontSize",
                    "fontFamily",
                    "fontColor",
                    "fontBackgroundColor",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "alignment",
                    "undo",
                    "redo",
                  ],
                }}
                onReady={(editor) => {
                  console.log("Editor is ready to use!", editor);
                  //intregate to online editor
                  editor!.ui
                    .getEditableElement()
                    ?.parentElement!.insertBefore(
                      editor.ui.view.toolbar.element!,
                      editor.ui.getEditableElement()!,
                    );

                  //ปรับความสูงของ editor
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      "height",
                      "400px",
                      editor.editing.view.document.getRoot()!,
                    );
                    writer.setStyle(
                      "padding-inline",
                      "2rem",
                      editor.editing.view.document.getRoot()!,
                    );
                    writer.setStyle(
                      "border",
                      "1px solid #d1d5db",
                      editor.editing.view.document.getRoot()!,
                    );
                  });
                }}
                onChange={(event, context) => {
                  const data = context.getData();
                  methods.setValue("detail", data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </FormGroup>
            <div className="flex w-1/2 flex-col items-center justify-center gap-4 pt-4">
              <Button role="button" variant="primary" className="w-full">
                บันทึก
              </Button>
              <Button
                onClick={() => {
                  methods.reset();

                  setOpenModal(false);
                }}
                role="button"
                variant="primary"
                className="w-full border-none bg-[#F6F6F6] text-darkgreen
            hover:bg-[#F6F6F6] hover:text-darkgreen hover:opacity-80
            "
              >
                ยกเลิก
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

interface FormData {
  detail: string;
  startDate: string;
  endDate: string;
}

const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  startDate: yup.string().required("กรุณากรอกวันกำหนด"),
  endDate: yup.string().required("กรุณากรอกวันแล้วเสร็จ"),
  detail: yup.string().required("กรุณากรอกสาระสำคัญของกฏหมาย"),
});

export default EssenceTabModal;
