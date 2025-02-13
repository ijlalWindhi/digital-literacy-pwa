import React from "react";

import ModuleHeader from "./LearnModulHeader";
import ModuleContent from "./LearnModulContent";
import ModuleProgress from "./LearnModulProgress";

export default function LearnModul({
  modulId,
}: Readonly<{
  modulId: string;
}>) {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ModuleHeader modulId={modulId} />
          <ModuleContent modulId={modulId} />
        </div>
        <div>
          <ModuleProgress modulId={modulId} />
        </div>
      </div>
    </div>
  );
}
