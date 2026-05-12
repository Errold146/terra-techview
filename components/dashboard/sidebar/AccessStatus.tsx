"use client"

import { StatusPaid } from "./StatusPaid";
import { StatusFreeTrial } from "./StatusFreeTrial";
import { StatusPremium } from "./StatusPremium";

type Plan = "free" | "pro" | "premium"

export function AccessStatus() {
    const plan: Plan = "free" // TODO: reemplazar con lógica real

    if (plan === "pro") return <StatusPaid />
    if (plan === "premium") return <StatusPremium />
    return <StatusFreeTrial />
}
