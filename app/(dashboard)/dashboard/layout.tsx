import { Metadata } from "next";
import { generateTitle } from "@/utils";
import { AppSidebar } from "@/components/dashboard";
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Logo } from "@/components/shared/Logo"

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
                    <div className="flex flex-col flex-1 min-w-0">
                        <header className="w-full px-4 pl-6 pt-5 pb-0 mb-6">
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-azul-700/30 shadow-lg shadow-azul-900/30">
                                <div className="flex items-center gap-3">
                                    <SidebarTrigger className="w-9 h-9 rounded-xl bg-linear-to-br from-verde-400 to-azul-500 text-white shadow-lg shadow-verde-500/25 hover:from-verde-300 hover:to-azul-400 hover:text-white border-0 [&_svg]:size-4 cursor-pointer" />
                                    <Logo />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Show when="signed-out">
                                        <SignInButton>
                                            <button className="text-sm font-medium text-azul-200 hover:text-white px-4 py-2 rounded-full border border-azul-500/50 hover:border-azul-300/70 hover:bg-azul-800/40 transition-all duration-200 cursor-pointer">
                                                Iniciar sesión
                                            </button>
                                        </SignInButton>
                                        <SignUpButton>
                                            <button className="text-sm font-semibold text-white bg-linear-to-r from-verde-500 to-azul-500 hover:from-verde-400 hover:to-azul-400 px-5 py-2 rounded-full shadow-lg shadow-verde-500/40 hover:shadow-verde-400/60 transition-all duration-200 cursor-pointer">
                                                Registrarse
                                            </button>
                                        </SignUpButton>
                                    </Show>
                                    <Show when="signed-in">
                                        <UserButton />
                                    </Show>
                                </div>
                            </div>
                        </header>
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </TooltipProvider>
        </div>
    )
}
