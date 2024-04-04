"use client";

import Tab from "@/app/ui/tab";
import { useState } from "react";
import RegisterDataTab from "./(tabs)/register-data-tab";

enum TabType {
  //ข้อมูลที่ต้องลงทะเบียน
  REGISTER_DATA = "REGISTER_DATA",
  //สาระสำคัญ
  ESSENCE = "ESSENCE",
  //ข้อมูลกิจการ
  BUSINESS_INFORMATION = "BUSINESS_INFORMATION",
}
function Page() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.REGISTER_DATA);
  return (
    <>
      <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          {
            key: TabType.REGISTER_DATA,
            label: "ข้อมูลที่ต้องลงทะเบียน",
            content: <RegisterDataTab />,
          },
          {
            key: TabType.ESSENCE,
            label: "สาระสำคัญของกฏหมาย",
            content: <></>,
            disabled: true,
          },
          {
            key: TabType.BUSINESS_INFORMATION,
            label: "ข้อมูลที่ต้องลงทะเบียน",
            content: <></>,
            disabled: true,
          },
        ]}
      />
    </>
  );
}

export default Page;
