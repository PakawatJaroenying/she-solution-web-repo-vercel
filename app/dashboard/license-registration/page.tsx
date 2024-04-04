"use client";

import React, { useState } from "react";
import RegisterAllLicenseTab from "./(tabs)/register-all-license";
import RegisterNewLicenseTab from "./(tabs)/register-new-license";
import Tab from "@/app/ui/tab";

enum TabType {
  //ทะเบียนใบอนุญาติทั้งหมด
  REGISTER_ALL_LICENSE = "REGISTER_ALL_LICENSE",
  //ขึ้นทะเบียนใบอนุญาติใหม่
  REGISTER_NEW_LICENSE = "REGISTER_NEW_LICENSE",
}

function Page() {
  const [activeTab, setActiveTab] = useState<TabType>(
    TabType.REGISTER_ALL_LICENSE,
  );

  return (
    <>
      <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          {
            key: TabType.REGISTER_ALL_LICENSE,
            label: "ทะเบียนใบอนุญาตทั้งหมด",
            content: <RegisterAllLicenseTab />,
          },
          {
            key: TabType.REGISTER_NEW_LICENSE,
            label: "ขึ้นทะเบียนใบอนุญาต",
            content: <RegisterNewLicenseTab />,
          },
        ]}
      />
    </>
  );
}

export default Page;
