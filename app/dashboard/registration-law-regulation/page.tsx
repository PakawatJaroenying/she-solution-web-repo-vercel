"use client";
import {
  DeleteLawMasterGQL,
  SearchLawMastersGQL,
} from "@/app/api/module/register-law-regulation";
import { DEFAULT_PAGE_SIZE } from "@/app/lib/constant";
import { FieldDefinition } from "@/app/lib/interfaces/tabular";
import { Button } from "@/app/ui/button/button";
import Pagination from "@/app/ui/pagination/pagination";
import TableNormal from "@/app/ui/table/table-normal";
import { useMutation, useQuery } from "@apollo/client";
import { FilePenLine, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ModalConfirmDelete from "./_modal_confirm-delete";
import { useRouter } from "next/navigation";
import { LawMasterStatus } from "@/app/lib/interfaces/register-law-regulation";

function Page() {
  const rotuer = useRouter();
  const manageModalState = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const fields: FieldDefinition[] = [
    {
      key: "lawId",
      label: "เลขทะเบียน",
    },
    {
      key: "name",
      label: "ชื่อกฏหมาย",
    },
    {
      key: "lawType",
      label: "ประเภทกฏหมาย",
    },
    {
      key: "announcementDate",
      label: "วันที่ประกาศใช้",
    },
    {
      key: "effectiveDate",
      label: "วันที่มีผลบังคับใช้",
    },
    {
      key: "status",
      label: "สถานะ",
    },
    {
      key: "manage",
      label: "",
    },
  ];

  const {
    data: searchLawMasterData,
    loading,
    refetch,
  } = useQuery(SearchLawMastersGQL, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        searchText: "",
        pagination: {
          pageNo: 1,
          pageSize: DEFAULT_PAGE_SIZE,
        },
        statues: [LawMasterStatus.save],
      },
    },
  });

  const [mutateDeleteLawMaster, { loading: loadingDeleteLawMaster }] =
    useMutation(DeleteLawMasterGQL, {
      fetchPolicy: "no-cache",
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: async () => {
        await refetch();
      },
    });

  const onClickAddLaw = () => {
    rotuer.push("/dashboard/registration-law-regulation/add");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <header>
          <div className="flex w-full items-end justify-between">
            <h1 className="text-xl ">ทะเบียนกฏหมายและข้อกำหนด</h1>
            <Button
              variant="primary"
              className="btn-outline"
              onClick={onClickAddLaw}
            >
              เพิ่มกฏหมาย
            </Button>
          </div>
        </header>
        <main className="space-y-[1.5rem]">
          <TableNormal
            fields={fields}
            items={
              searchLawMasterData?.searchLawMasters.items.map((it) => ({
                ...it,
                ...it.lawInformation,
              })) || []
            }
            loading={loading}
            renderers={{
              lawId: (row) => (
                <span className="text-teal">{row.lawId || "-"}</span>
              ),
              announcementDate: (row) => (
                <span>
                  {new Date(row.announcementDate).toLocaleDateString("th-TH", {
                    year: "numeric", //2564
                    month: "2-digit", //สิงหาคม
                    day: "2-digit", //1
                  })}
                </span>
              ),
              effectiveDate: (row) => (
                <span>
                  {new Date(row.effectiveDate).toLocaleDateString("th-TH", {
                    year: "numeric", //2564
                    month: "2-digit", //สิงหาคม
                    day: "2-digit", //1
                  })}
                </span>
              ),
              manage: (row) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="btn bg-white text-gray-500 hover:bg-gray-50 "
                    onClick={() => {
                      rotuer.push(
                        `/dashboard/registration-law-regulation/edit/${row.id}`,
                      );
                    }}
                  >
                    <FilePenLine />
                  </button>
                  <button
                    className="btn border-white bg-red-500 text-white hover:bg-red-600"
                    onClick={() => {
                      setIdDelete(row.id);
                      manageModalState[1](true);
                    }}
                  >
                    <Trash2 />
                  </button>
                </div>
              ),
            }}
          />
          <div className="text-right">
            <Pagination
              totalPages={
                !!searchLawMasterData?.searchLawMasters?.pagination?.total
                  ? Math.ceil(
                      searchLawMasterData?.searchLawMasters?.pagination?.total /
                        DEFAULT_PAGE_SIZE,
                    )
                  : 1
              }
              onChange={async (page) => {
                await refetch({
                  input: {
                    searchText: "",
                    pagination: {
                      pageNo: page,
                      pageSize: DEFAULT_PAGE_SIZE,
                    },
                    statues: [LawMasterStatus.save],
                  },
                });
              }}
            />
          </div>
        </main>
      </div>
      <ModalConfirmDelete
        id={idDelete}
        manageModalState={manageModalState}
        onDelete={async (id) => {
          await mutateDeleteLawMaster({
            variables: {
              deleteLawMasterId: id,
            },
          });
        }}
      />
    </>
  );
}

export default Page;
