import { FieldDefinition } from "@/app/lib/interfaces/tabular";
import { Button } from "@/app/ui/button/button";
import TableNormal from "@/app/ui/table/table-normal";
import { FilePenLine, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import EssenceTabModal from "./essence-tab-modal";
import ModalConfirmDelete from "../../../_modal_confirm-delete";
import { useMutation } from "@apollo/client";
import {
  Essence,
  UpdateLawMasterEssenceGQL,
} from "@/app/api/module/register-law-regulation";
import { useClientProivder } from "../client-provider";

function EssenceTab() {
  const [mutateUpdateEssence] = useMutation(UpdateLawMasterEssenceGQL, {
    onCompleted: () => {
      alert("ลบสำเร็จ");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { data, refetchMasterData } = useClientProivder();
  const fields: FieldDefinition[] = [
    {
      key: "index",
      label: "ลำดับ",
      tdClass: "text-center",
      thClass: "text-center",
    },
    {
      key: "detail",
      label: "สาระสำคัญของกฏหมาย",
    },
    {
      key: "startDate",
      label: "วันกำหนด - วันแล้วเสร็จ",
    },
    {
      key: "manage",
      label: "",
    },
  ];

  function stripHtml(html: string) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const manageModalManage = useState(false);
  const [essenceItem, setEssenceItem] = useState<Essence>();

  const manageModalDelete = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Button
          role="button"
          variant="primary"
          className="flex items-center self-end"
          onClick={() => {
            manageModalManage[1](true);
            setEssenceItem(undefined);
          }}
        >
          <Plus />
          เพิ่มสาระสำคัญ
        </Button>
        <TableNormal
          fields={fields}
          items={data.getLawMaster.essences.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          renderers={{
            index: (item) => <span className=" font-bold">{item.index}</span>,
            detail: (item) => (
              <span className="text-truncate line-clamp-1 font-bold">
                {stripHtml(item.detail)}
              </span>
            ),
            startDate: (item) =>
              `${new Date(item.startDate).toLocaleDateString("th-TH", {
                year: "numeric", //2564
                month: "2-digit", //สิงหาคม
                day: "2-digit", //1
              })} - ${new Date(item.endDate).toLocaleDateString("th-TH", {
                year: "numeric", //2564
                month: "2-digit", //สิงหาคม
                day: "2-digit", //1
              })}`,
            manage: (row) => (
              <div className="flex items-center justify-center gap-2">
                <button
                  className="btn bg-white text-gray-500 hover:bg-gray-50 "
                  onClick={() => {
                    setEssenceItem((prev) => ({
                      detail: row.detail,
                      index: row.index - 1, //! ต้องลบออก 1 เพราะ index ของ array เริ่มที่ 0
                      endDate: row.endDate.split("T")[0],
                      startDate: row.startDate.split("T")[0],
                    }));
                    manageModalManage[1](true);
                  }}
                >
                  <FilePenLine />
                </button>
                <button
                  className="btn border-white bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    manageModalDelete[1](true);
                    setEssenceItem((prev) => ({
                      detail: row.detail,
                      index: row.index - 1, //! ต้องลบออก 1 เพราะ index ของ array เริ่มที่ 0
                      endDate: row.endDate.split("T")[0],
                      startDate: row.startDate.split("T")[0],
                    }));
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            ),
          }}
        />
      </div>
      <ModalConfirmDelete
        id={essenceItem?.index?.toString()!}
        manageModalState={manageModalDelete}
        onDelete={async (id) => {
          await mutateUpdateEssence({
            variables: {
              updateLawMasterId: data.getLawMaster.id,
              input: {
                essences: data.getLawMaster.essences
                  .filter((item, index) => index !== essenceItem?.index)
                  .map((it) => ({
                    startDate: it.startDate,
                    endDate: it.endDate,
                    detail: it.detail,
                  })),
              },
            },
          });

          await refetchMasterData();
        }}
      />
      {manageModalManage[0] && (
        <EssenceTabModal
          manageModalState={manageModalManage}
          essenceItem={essenceItem}
        />
      )}
    </>
  );
}

export default EssenceTab;
