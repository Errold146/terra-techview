"use client"

import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";

export function StatusPaid() {
    return (
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-all duration-200 group/footer group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-verde-500 to-azul-600 flex items-center justify-center shrink-0 shadow-md ring-2 ring-white/10">
                <UserCircleIcon size={18} weight="fill" className="text-white" />
            </div>

            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-[15px] font-semibold text-verde-50 truncate">Full Access</p>
                <p className="text-[12px] text-verde-300 truncate">Username</p>
            </div>

            <SignOutIcon
                size={15}
                className="text-verde-100 group-hover/footer:text-verde-400 transition-colors shrink-0 group-data-[collapsible=icon]:hidden"
            />
        </div>
    )
}
