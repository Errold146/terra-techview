import { FiGift, FiZap, FiStar } from "react-icons/fi"

export const pricingPlansData = [
    {
        icon: FiGift,
        name: "Free",
        price: "0",
        description: "Perfect for getting started. Includes a 30-day free trial.",
        features: [
            "1 practice interview per day",
            "Valid for 30 days only",
            "Basic coding questions",
            "General AI feedback",
            "Community support",
        ],
        buttonText: "Get Started Free",
        popular: false,
    },
    {
        icon: FiZap,
        name: "Pro",
        price: "10",
        description: "For serious candidates who want to land the job.",
        features: [
            "Unlimited practice interviews",
            "All question types and formats",
            "Company-specific questions",
            "Detailed AI feedback and scoring",
            "Progress tracking and analytics",
            "Priority support",
        ],
        buttonText: "Start Pro Trial",
        popular: true,
    },
    {
        icon: FiStar,
        name: "Premium",
        price: "20",
        description: "The complete toolkit for top-tier interview performance.",
        features: [
            "Everything in Pro",
            "1-on-1 AI mock interview sessions",
            "Custom interview roadmaps",
            "Resume and portfolio review",
            "Role-specific question banks",
            "Advanced performance reports",
            "Dedicated support",
        ],
        buttonText: "Go Premium",
        popular: false,
    },
]
