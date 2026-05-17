"use client"

import { useClerk, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { FiLogOut } from "react-icons/fi"

export function UserFooter() {
    const { user } = useUser()
    const { signOut } = useClerk()

    if (!user) return null

    return (
        <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/15 hover:border-red-500/30 transition-all duration-200 group cursor-pointer
                group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
        >
            <div className="relative shrink-0">
                {user.imageUrl ? (
                    <Image
                        src={user.imageUrl}
                        alt={user.fullName ?? "User"}
                        width={34}
                        height={34}
                        className="rounded-full object-cover ring-2 ring-white/20 group-hover:ring-red-400/40 transition-all duration-200
                            group-data-[collapsible=icon]:w-7 group-data-[collapsible=icon]:h-7"
                    />
                ) : (
                    <div className="w-[34px] h-[34px] rounded-full bg-linear-to-br from-azul-400 to-verde-400 flex items-center justify-center ring-2 ring-white/20
                        group-data-[collapsible=icon]:w-7 group-data-[collapsible=icon]:h-7">
                        <span className="text-white font-bold text-sm">
                            {user.firstName?.[0] ?? "U"}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-start leading-none min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold text-white/90 truncate max-w-[120px]">
                    {user.fullName ?? user.username}
                </span>
                <span className="text-[11px] text-red-400/80 font-medium mt-0.5 group-hover:text-red-400 transition-colors duration-200">
                    Cerrar sesión
                </span>
            </div>
            <FiLogOut
                size={15}
                className="ml-auto shrink-0 text-white/20 group-hover:text-red-400 transition-colors duration-200 group-data-[collapsible=icon]:hidden"
            />
        </button>
    )
}
