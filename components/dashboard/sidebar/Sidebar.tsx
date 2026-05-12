"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarItems } from "@/data";
import { AccessStatus } from "./AccessStatus";
import { BtnCreateInterview } from "../create-interview/BtnCreateInterview";
import { UserFooter } from "./UserFooter";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,SidebarMenuItem
} from "@/components/ui/sidebar";

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon" style={{ "--sidebar": "transparent", "--sidebar-width-icon": "4rem" } as React.CSSProperties}>
            {/* Header */}
            <SidebarHeader className="border-b border-white/10 px-4 py-5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-4">
                <Link
                    href={'/'}
                    className="cursor-pointer hover:bg-gris-100/20 p-2 rounded-lg"
                >
                    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">

                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-verde-400 to-azul-500 flex items-center justify-center shrink-0 shadow-lg shadow-verde-500/25">

                            <span className="text-white font-bold text-sm select-none">T</span>

                        </div>
                        <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
                            <span className="text-white font-bold text-base tracking-tight">Terra</span>
                            <span className="text-verde-400 text-[11px] font-semibold tracking-[0.15em] uppercase">Techview</span>
                        </div>

                    </div>
                </Link>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-2 py-3">

                <SidebarGroup>
                    <BtnCreateInterview />
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-white/30 text-[10px] font-bold tracking-[0.15em] uppercase px-3 mb-1">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-0.5">
                            {sidebarItems.map(item => {
                                const isActive = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={`
                                                group/btn relative flex items-center gap-3 rounded-xl px-3 h-10
                                                text-white/50 transition-all duration-200
                                                hover:text-white hover:bg-white/10
                                                data-[active=true]:text-verde-300 data-[active=true]:bg-verde-400/15
                                            `}
                                        >
                                            {isActive && (
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-verde-400 rounded-r-full group-data-[collapsible=icon]:hidden" />
                                            )}
                                            <item.icon
                                                size={18}
                                                weight={isActive ? "fill" : "regular"}
                                                className={`shrink-0 transition-all duration-200 ${isActive ? "text-verde-400" : "group-hover/btn:text-white group-hover/btn:scale-110"}`}
                                            />
                                            <span className="text-sm font-medium truncate group-data-[collapsible=icon]:hidden">
                                                {item.title}
                                            </span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-white/10 p-3 gap-2">
                <AccessStatus />
                <UserFooter />
            </SidebarFooter>
        </Sidebar>
    )
}

