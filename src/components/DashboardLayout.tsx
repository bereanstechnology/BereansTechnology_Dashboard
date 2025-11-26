import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { useState } from "react";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <DashboardHeader 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex gap-0 lg:gap-6 lg:p-6 p-0">
        <DashboardSidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 p-4 lg:p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
