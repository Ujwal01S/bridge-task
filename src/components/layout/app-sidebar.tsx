import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { navigationData } from "@/constants";

const AppSidebar = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <Sidebar className='mt-16' collapsible='icon'>
      <SidebarContent>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.map((nav) => (
              <Collapsible
                key={nav.title}
                defaultOpen={isHomePage && nav.title === "Home"}
              >
                <SidebarMenuItem>
                  {nav.url !== "#" ? (
                    // Direct link (no submenu)
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname === nav.url
                          ? "bg-customSidebar-active"
                          : undefined
                      }
                    >
                      <Link to={nav.url}>
                        {(() => {
                          const Icon = nav.icon;
                          return <Icon className='mr-2 h-4 w-4' />;
                        })()}
                        <span className='flex-1 capitalize font-semibold'>
                          {nav.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    // Collapsible with submenu
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className='group/collapsible data-[state=open]:bg-customSidebar-active'>
                        {(() => {
                          const Icon = nav.icon;
                          return <Icon className='mr-2 h-4 w-4' />;
                        })()}
                        <span className='flex-1 capitalize font-semibold'>
                          {nav.title}
                        </span>
                        {nav.subNavigation && nav.subNavigation?.length > 0 && (
                          <ChevronRight className='h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  )}

                  {nav.subNavigation && (
                    <CollapsibleContent>
                      <SidebarMenuSub className='border-l-2'>
                        {nav.subNavigation.map((subNav) => (
                          <Link
                            key={subNav.title}
                            to={subNav.url}
                            className={`capitalize rounded-sm pl-2 ${
                              pathname === subNav.url
                                ? "bg-customSidebar-active"
                                : undefined
                            }`}
                          >
                            <SidebarMenuSubItem className='capitalize text-sm font-medium py-1'>
                              {subNav.title}
                            </SidebarMenuSubItem>
                          </Link>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
