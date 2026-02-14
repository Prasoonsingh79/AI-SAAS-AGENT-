import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/dashboard-navbar";

import { DashboardSidebar } from "@/modules/dashboard/ui/dashboard-sidebar";



interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar/>
      <main className="flex flex-col h-screen w-screen bg-muted ml-64">
        <DashboardNavbar/>
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};








export default Layout;
