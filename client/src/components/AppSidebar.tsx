import React from 'react'
import { usePathname } from 'next/navigation';
import { Sidebar,SidebarHeader, useSidebar } from './ui/sidebar';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { NAVBAR_HEIGHT } from '@/lib/constants';

type AppSidebarProps = {
    useType : "manager" | "tenant"
}
const AppSidebar = ({useType} : AppSidebarProps) => {
    const pathname = usePathname();
    const{toggleSidebar, open} = useSidebar();

    const navLinks = 
    useType === "manager" 
    ? [
        { icon: "Building", label : "Properties" ,href: "/managers/properties" },
        { 
            icon: "FileText",
            label : "Applications",
            href: "/managers/applications" },
        { icon: "Settings", label : "Settings",href: "/managers/settings" },
    ]
    :[
        { icon: "Heart", label : "Favorites" ,href: "/tenants/favorites" },
        { 
            icon: "FileText",
            label : "Applications",
            href: "/tenants/applications" },
        { icon: "Home", label : "Residences",href: "/tenants/residences" },
        { icon: "Settings", label : "Settings",href: "/tenants/settings" },

    ]

    return <Sidebar
        collapsible="icon"
        className = "fixed left-0 bg-white shadow-lg"
        style = {{
            top : `${NAVBAR_HEIGHT}px`,
            height :`calc(100vh - ${NAVBAR_HEIGHT}px)`,
        }}
    >
        <SidebarHeader></SidebarHeader>
    </Sidebar>

}

export default AppSidebar