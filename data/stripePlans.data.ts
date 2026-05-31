import { FiZap, FiStar } from "react-icons/fi";

export type StripePlan = "pro" | "premium"

export const PLANS: {
    id: StripePlan
    name: string
    price: string
    description: string
    icon: React.ElementType
    isPro: boolean
}[] = [
    {
        id: "pro",
        name: "Pro",
        price: "10",
        description: "Full access to all Pro features",
        icon: FiZap,
        isPro: true,
    },
    {
        id: "premium",
        name: "Premium",
        price: "20",
        description: "Unlimited access and exclusive features",
        icon: FiStar,
        isPro: false,
    },
]
