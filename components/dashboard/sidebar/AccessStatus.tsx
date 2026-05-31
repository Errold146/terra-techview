"use client"

import axios from "axios";
import { useEffect, useState } from "react";

import type { Plan } from "@/lib/plan";
import { StatusPaid } from "./StatusPaid";
import { StatusPremium } from "./StatusPremium";
import { StatusFreeTrial } from "./StatusFreeTrial";

export function AccessStatus() {

    const [plan, setPlan] = useState<Plan | null>(null)

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const res = await axios("/api/user/status")
                setPlan(res.data.plan ?? "free")
            } catch (error) {
                console.error("Fetching User Status: ", error)
                setPlan("free")
            }
        }
        fetchUserStatus()
    }, [])

    if (plan === null) return null   // loading — no muestra nada hasta saber el plan
    if (plan === "pro") return <StatusPaid />
    if (plan === "premium") return <StatusPremium />
    return <StatusFreeTrial />
}
