import { Metadata } from "next";
import { generateTitle } from "@/utils";
import { AppSidebar } from "@/components/dashboard";
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export const metadata: Metadata = {
    title: generateTitle('Dashboard'),
    description: 'Managing and configuring your AI interviews'
}

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full min-h-screen bg-linear-to-br from-gris-900 via-azul-900 to-verde-900">
            <TooltipProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="w-full min-h-screen p-6">
                        <div className="flex justify-between">
                            <SidebarTrigger className="w-9 h-9 rounded-xl bg-linear-to-br from-verde-400 to-azul-500 text-white shadow-lg shadow-verde-500/25 hover:from-verde-300 hover:to-azul-400 hover:text-white border-0 [&_svg]:size-4 cursor-pointer" />
                        </div>
                        {children}
                    </main>
                </SidebarProvider>
            </TooltipProvider>
        </div>
    )
}
