import { Tab } from "@/app/lib/module/register/register-corporation/tab";
import clsx from "clsx";
import React from "react";

interface TabControlProps<T> {
  tabs: Tab<T>[];
  activeTab: T;
  setActiveTab: React.Dispatch<React.SetStateAction<T>>;
  disabled?: boolean;
  beforeChangeTab?: (tab: T) => boolean;
}

function Index<T>({
  tabs,
  activeTab,
  setActiveTab,
  beforeChangeTab,
}: TabControlProps<T>) {
  return (
    <div>
      <div className="!before:bottom-0 flex justify-center space-x-2 border-b-[3px] border-teal">
        {tabs.map((tab, tabIdx) => (
          <button
            disabled={tab.disabled}
            type="button"
            key={tab.key as string}
            className={`min-w-[200px] rounded-t-lg   p-4  text-sm ${
              activeTab === tab.key
                ? "bg-teal text-white"
                : "border-[2px] border-aqua bg-mint text-teal"
            }
              ${tab.disabled ? "cursor-not-allowed bg-gray-200 text-gray-400 " : ""}
            `}
            onClick={() => {
              if (beforeChangeTab && !beforeChangeTab(tab.key)) return;
              setActiveTab(tab.key);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="">
        {tabs.map((tab) => (
          <div
            key={tab.key as string}
            className={clsx("mt-4 hidden rounded-lg bg-white", {
              "!block": activeTab === tab.key,
            })}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
