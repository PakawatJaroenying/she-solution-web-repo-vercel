import ButtonList from "@/app/ui/dashboard/(overview)/button-list";
import React from "react";
import StatusNumberGraphList from "./_status-numbers-graph-list";

function LegalStatusPage() {
  return (
    <>
      <ButtonList />
      <StatusNumberGraphList className="mt-4"/>
    </>
  );
}

export default LegalStatusPage;
