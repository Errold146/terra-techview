"use client"

import { FiZap } from "react-icons/fi";
import { StripeDialogPayment } from "@/components/shared/stripe/StripeDialogPayment";

export function StatusFreeTrial() {

    return (
        <StripeDialogPayment>
        <button
            className="w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:mx-auto cursor-pointer transition-all duration-200 group-data-[collapsible=icon]:p-0">
            {/* Collapsed: solo ícono */}
            <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 hover:from-amber-500/50 hover:to-orange-500/40 transition-all duration-200">
                <FiZap size={16} className="text-amber-400" />
            </div>

            {/* Expanded: tarjeta de plan */}
            <div className="group-data-[collapsible=icon]:hidden flex flex-col gap-1.5 p-3 rounded-xl border border-amber-500/25 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-400/40 transition-all duration-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <FiZap size={13} className="text-amber-400 shrink-0" />
                        <span className="text-[12px] font-bold text-amber-300 uppercase tracking-widest">Free Trial</span>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-400/70 bg-amber-400/15 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <p className="text-[11px] text-white/40 leading-tight">
                    v1: Only free plan features are active. Upgrade to unlock full access.
                </p>
                <div className="mt-0.5 w-full py-1.5 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-[11px] font-semibold text-center shadow-md shadow-amber-500/25 transition-all duration-200">
                    Update plan →
                </div>
            </div>
        </button>
        </StripeDialogPayment>
    )
}
