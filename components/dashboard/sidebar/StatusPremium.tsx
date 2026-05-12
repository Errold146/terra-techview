"use client"

import { FiStar } from "react-icons/fi";

export function StatusPremium() {
    return (
        <div className="w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:mx-auto">
            {/* Collapsed: solo ícono */}
            <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-purple-500/30 to-pink-500/20 border border-purple-500/30">
                <FiStar size={16} className="text-purple-400" />
            </div>

            {/* Expanded: tarjeta de plan */}
            <div className="group-data-[collapsible=icon]:hidden flex flex-col gap-1.5 p-3 rounded-xl border border-purple-500/25 bg-purple-500/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <FiStar size={13} className="text-purple-400 shrink-0" />
                        <span className="text-[12px] font-bold text-purple-300 uppercase tracking-widest">Premium</span>
                    </div>
                    <span className="text-[10px] font-semibold text-purple-400/70 bg-purple-400/15 px-2 py-0.5 rounded-full">Activo</span>
                </div>
                <p className="text-[11px] text-white/40 leading-tight">
                    Acceso ilimitado y funciones exclusivas Premium
                </p>
            </div>
        </div>
    )
}
