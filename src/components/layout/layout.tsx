import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import Header from "./header";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <div className='flex flex-col  w-full overflow-hidden'>
        <Header />
        <div className='w-full flex flex-1'>
          <AppSidebar />

          <SidebarInset className='overflow-x-hidden'>
            <main className='flex-1 mt-16'>
              <div className='flex flex-col p-2 gap-4 mb-3'>
                <div className='flex gap-2 items-center'>
                  <SidebarTrigger />
                </div>

                <Outlet />
              </div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
