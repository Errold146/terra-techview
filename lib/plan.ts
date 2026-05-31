export type Plan = "free" | "pro" | "premium"

export const PLAN_CONFIG = {
    free: {
        label: "Free",
        maxInterviews: 3,
        description: "Limited access — free interviews only",
    },
    pro: {
        label: "Pro",
        maxInterviews: 20,
        description: "Full access to all Pro features",
    },
    premium: {
        label: "Premium",
        maxInterviews: -1, // unlimited
        description: "Unlimited access and exclusive Premium features",
    },
} as const satisfies Record<Plan, { label: string; maxInterviews: number; description: string }>

/** Validate and normalize a raw plan string from the DB */
export function parsePlan(raw: string): Plan {
    if (raw === "pro" || raw === "premium") return raw
    return "free"
}

/** Check if a user's plan has access to a required tier */
export function hasAccess(userPlan: Plan, requiredPlan: Plan): boolean {
    const order: Plan[] = ["free", "pro", "premium"]
    return order.indexOf(userPlan) >= order.indexOf(requiredPlan)
}
