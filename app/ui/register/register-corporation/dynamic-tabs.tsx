// components/DynamicTabs.js

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Tab } from "@/app/lib/module/register/register-corporation/tab";
import { defaultCorporation } from "./default-corporation";
import { Button } from "../../button/button";

const DynamicTabs = ({
  activeTab,
  tabs,
  onClickChangeTab,
  onClickAddTab,
  onClickCopy,
  conditionBeforeChangeTab,
}: {
  activeTab: string;
  tabs: Tab<string>[];
  onClickChangeTab: (tabKey: string) => void;
  onClickAddTab: () => void;
  onClickCopy: () => void;
  conditionBeforeChangeTab: () => boolean;
}) => {
  return (
    <>
      <header className="flex items-center justify-between border-b-[3px] border-teal">
        <div className="flex  space-x-2">
          {tabs.map((tab, tabIndex) => (
            <button
              type="button"
              key={tabIndex}
              className={`min-w-[168px] rounded-t-lg px-4 py-2 text-sm  font-semibold ${
                activeTab === tab.key
                  ? "bg-teal text-white"
                  : "border-[2px] border-aqua bg-mint text-teal"
              }`}
              onClick={() => {
                conditionBeforeChangeTab() && onClickChangeTab(tab.key);
              }}
            >
              <span className="text-lg font-[700]">ข้อมูลบริษัท</span>
              <br />
              <span className="text-sm font-[400]">({tab.label})</span>
            </button>
          ))}
          {/* Render the plus button */}
          {tabs.length < 4 && (
            <button
              type="button"
              className="flex w-[72px] items-center justify-center rounded-t-lg border-[2px] border-aqua bg-mint px-4 py-2 text-sm font-semibold text-green-900"
              onClick={onClickAddTab}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
        </div>
        <Button
          type="button"
          variant="primary"
          className="btn-outline"
          onClick={onClickCopy}
        >
          คัดลอก
        </Button>
      </header>

      {/* Content */}
      <main>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`${
              activeTab === tab.key ? "block" : "hidden"
            } rounded-lg    bg-white`}
          >
            {tab.content}
          </div>
        ))}
      </main>
    </>
  );
};

export default DynamicTabs;
