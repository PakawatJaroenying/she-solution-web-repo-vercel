"use client";

import Tab from "@/app/ui/tab";
import { createContext, useContext, useEffect, useState } from "react";
import RegisterDataTab from "./(tabs)/register-data-tab";
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import {
  GetLawMasterGQL,
  GetLawMasterResponse,
} from "@/app/api/module/register-law-regulation";
import { useParams } from "next/navigation";
import LoadingScreen from "@/app/ui/loading/loading-screen";
import EssenceTab from "./(tabs)/essence-tab";
import LawCorporationTab from "./(tabs)/law-corporation-tab";
import ClientProvider from "./client-provider";
import { TabType } from "../_interfaces";

function Page() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>(TabType.REGISTER_DATA);
  const [dirtyForm, setDirtyForm] = useState(false);
  const {
    loading: loadingGetLawMasterData,
    refetch,
    data: getLawMasterData,
  } = useQuery(GetLawMasterGQL, {
    variables: {
      getLawMasterId: id,
    },
    fetchPolicy: "network-only",
    onError: (error) => {
      alert(error.message);
    },
  });

  if (loadingGetLawMasterData || !getLawMasterData) {
    return <LoadingScreen />;
  }

  return (
    <ClientProvider
      value={{
        data: getLawMasterData,
        refetchMasterData: async () => {
          const { data } = await refetch();
          return data;
        },
        setDirtyForm: setDirtyForm,
        setActiveTab: setActiveTab,
        dirtyForm: dirtyForm,
        activeTab: activeTab,
      }}
    >
      <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        beforeChangeTab={(tab) => {
          if (dirtyForm) {
            if (
              confirm(
                "คุณยังไม่ได้บันทึกข้อมูล ต้องการออกจากเเท็บนี้โดยไม่บันทึกข้อมูลหรือไม่?",
              )
            ) {
              setDirtyForm(false);
              return true;
            }
          }
          return true;
        }}
        tabs={[
          {
            key: TabType.REGISTER_DATA,
            label: "ข้อมูลที่ต้องลงทะเบียน",
            content: <RegisterDataTab />,
          },
          {
            key: TabType.ESSENCE,
            label: "สาระสำคัญของกฏหมาย",
            content: <EssenceTab />,
          },
          {
            key: TabType.LAW_CORPORATION,
            label: "ข้อมูลสาขาที่เกี่ยวข้อง",
            content: <LawCorporationTab />,
          },
        ]}
      />
    </ClientProvider>
  );
}

export default Page;
