"use client"

import axios from "axios";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Spinner } from "@/components/shared/Spinner";

import { PLANS, StripePlan } from "@/data";

type Plan = StripePlan

type Props = {
    children: React.ReactNode
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function StripeDialogPayment({ children }: Props) {
    const [open, setOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleOpenChange = (openState: boolean) => {
        setOpen(openState)
        if (!openState) {
            setSelectedPlan(null)
            setClientSecret(null)
            setError(null)
        }
    }

    const handleSelectPlan = async (plan: Plan) => {
        setSelectedPlan(plan)
        setError(null)
        setLoading(true)
        try {
            const res = await axios.post("/api/checkout", { plan })
            setClientSecret(res.data.clientSecret)
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? err.response?.data ?? "Could not start checkout. Please try again."
                : "Unexpected error. Please try again."
            setError(String(message))
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        setSelectedPlan(null)
        setClientSecret(null)
        setError(null)
    }

    return (
        <>
            <div onClick={() => setOpen(true)} className="w-full cursor-pointer">
                {children}
            </div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="bg-gris-950 border border-white/10 rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            {selectedPlan && (
                                <button
                                    onClick={handleBack}
                                    className="text-gris-400 hover:text-gris-200 transition-colors shrink-0"
                                >
                                    <FiArrowLeft size={16} />
                                </button>
                            )}
                            <DialogTitle className="text-gris-50 text-base font-semibold">
                                {selectedPlan
                                    ? `${selectedPlan === "pro" ? "Pro" : "Premium"} — $${selectedPlan === "pro" ? "10" : "20"}/mo`
                                    : "Choose your Plan"}
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-gris-400 text-sm">
                            {selectedPlan
                                ? "Complete your payment below."
                                : "Select a plan to unlock full access."}
                        </DialogDescription>
                    </DialogHeader>

                    {!selectedPlan ? (
                        <div className="flex flex-col gap-3 mt-2">
                            {PLANS.map((plan) => {
                                const Icon = plan.icon
                                return (
                                    <button
                                        key={plan.id}
                                        onClick={() => handleSelectPlan(plan.id)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 w-full
                                            ${plan.isPro
                                                ? "border-verde-400/40 bg-verde-500/10 hover:bg-verde-500/20"
                                                : "border-azul-400/30 bg-azul-500/10 hover:bg-azul-500/20"
                                            }`}
                                    >
                                        <span className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0
                                            ${plan.isPro
                                                ? "bg-verde-500/20 border border-verde-400/40"
                                                : "bg-azul-500/20 border border-azul-400/40"
                                            }`}
                                        >
                                            <Icon size={18} className={plan.isPro ? "text-verde-400" : "text-azul-400"} />
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gris-50 font-semibold text-sm">{plan.name}</p>
                                            <p className="text-gris-400 text-xs mt-0.5">{plan.description}</p>
                                        </div>
                                        <span className={`text-lg font-bold shrink-0 ${plan.isPro ? "text-verde-400" : "text-azul-400"}`}>
                                            ${plan.price}<span className="text-xs font-normal text-gris-400">/mo</span>
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="mt-2">
                            {loading && <Spinner />}
                            {!loading && error && (
                                <div className="flex flex-col items-center gap-3 py-6 text-center">
                                    <p className="text-red-400 text-sm">{error}</p>
                                    <button
                                        onClick={() => handleSelectPlan(selectedPlan!)}
                                        className="text-xs text-gris-400 hover:text-gris-200 underline underline-offset-2 transition-colors"
                                    >
                                        Try again
                                    </button>
                                </div>
                            )}
                            {clientSecret && (
                                <EmbeddedCheckoutProvider
                                    stripe={stripePromise}
                                    options={{ clientSecret }}
                                >
                                    <EmbeddedCheckout />
                                </EmbeddedCheckoutProvider>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
