import React from 'react'
import { usePathname } from 'next/navigation';
import {
    Sidebar, SidebarHeader, useSidebar, SidebarMenu, SidebarMenuItem
} from './ui/sidebar';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';



const AppSidebar = ({ userType }: AppSidebarProps) => {
    const pathname = usePathname();
    const { toggleSidebar, open } = useSidebar();

    const navLinks =
        userType === "manager"
            ? [
                { icon: "Building", label: "Properties", href: "/managers/properties" },
                {
                    icon: "FileText",
                    label: "Applications",
                    href: "/managers/applications"
                },
                { icon: "Settings", label: "Settings", href: "/managers/settings" },
            ]
            : [
                { icon: "Heart", label: "Favorites", href: "/tenants/favorites" },
                {
                    icon: "FileText",
                    label: "Applications",
                    href: "/tenants/applications"
                },
                { icon: "Home", label: "Residences", href: "/tenants/residences" },
                { icon: "Settings", label: "Settings", href: "/tenants/settings" },

            ]

    return <Sidebar
        collapsible="icon"
        className="fixed left-0 bg-white shadow-lg"
        style={{
            top: `${NAVBAR_HEIGHT}px`,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        }}
    >
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <div
                        className={cn(
                            "flex min-h-[76px] w-full items-center pt-3 mb-3",
                            open ? "justify-between px-4" : "justify-center"
                        )}
                    >
                        {open ? (
                            <>
                                <h1 className="text-xl font-bold text-gray-800">
                                    {userType === "manager" ? "Manager View " : "Rental View"}{" "}
                                </h1>
                                <button
                                    className="hover:bg-gray-100 p-2 rounded-md"
                                    onClick={() => toggleSidebar()}
                                >
                                    <X className="h-6 w-6 text-gray-600" />
                                </button>
                            </>
                        ) : (
                            <button
                                className="hover:bg-gray-100 p-2 rounded-md"
                                onClick={() => toggleSidebar()}
                            >
                                <Menu className="h-6 w-6 text-gray-600" />
                            </button>
                        )}

                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    </Sidebar>

}

export default AppSidebar