import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { pricingPlansData } from "@/data";

export function Pricing() {
    return (
        <section
            className="py-24 bg-linear-to-b from-verde-900 to-gris-900"
            id="pricing"
        >
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16 flex flex-col gap-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-gris-50">
                        Choose your Plan
                    </h2>
                    <p className="text-gris-400 text-lg max-w-xl mx-auto">
                        Start free, upgrade when you're ready to ace every interview.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
                    {pricingPlansData.map((plan, index) => {
                        const Icon = plan.icon
                        const isPro = plan.popular

                        return (
                            <div
                                key={index}
                                className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden group
                                    ${isPro
                                        ? "border-verde-400/60 bg-linear-to-b from-verde-900/80 to-gris-900/90 shadow-xl shadow-verde-500/20 scale-[1.03]"
                                        : "border-gris-700/50 bg-gris-900/50 hover:border-azul-400/40 hover:shadow-lg hover:shadow-azul-500/10"
                                    }`}
                            >
                                {/* Popular badge */}
                                {isPro && (
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-verde-400 via-azul-400 to-verde-300" />
                                )}
                                {isPro && (
                                    <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-verde-500/20 border border-verde-400/40 text-verde-300">
                                        Most Popular
                                    </span>
                                )}

                                <div className="p-7 flex flex-col gap-6 flex-1">

                                    {/* Icon + name */}
                                    <div className="flex flex-col gap-3">
                                        <span className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300
                                            ${isPro
                                                ? "bg-verde-500/20 border-verde-400/40 group-hover:bg-verde-500/30"
                                                : "bg-azul-500/15 border-azul-400/20 group-hover:bg-azul-500/25"
                                            }`}
                                        >
                                            <Icon size={18} className={isPro ? "text-verde-400" : "text-azul-400"} />
                                        </span>
                                        <div>
                                            <h3 className="text-gris-50 font-bold text-lg">{plan.name}</h3>
                                            <p className="text-gris-400 text-sm mt-0.5 leading-snug">{plan.description}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-end gap-1">
                                        <span className="text-gris-400 text-sm mb-1">$</span>
                                        <span className="text-gris-50 text-4xl font-extrabold leading-none">{plan.price}</span>
                                        {plan.price !== "0" && (
                                            <span className="text-gris-500 text-sm mb-1">/mo</span>
                                        )}
                                        {plan.price === "0" && (
                                            <span className="text-verde-400 text-sm mb-1 font-medium">free forever</span>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className={`h-px ${isPro ? "bg-verde-700/40" : "bg-gris-700/40"}`} />

                                    {/* Features */}
                                    <ul className="flex flex-col gap-2.5 flex-1">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-gris-300">
                                                <span className={`mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 rounded-full
                                                    ${isPro ? "bg-verde-500/20 text-verde-400" : "bg-azul-500/20 text-azul-400"}`}
                                                >
                                                    <FiCheck size={10} strokeWidth={3} />
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link
                                        href="/dashboard"
                                        className={`mt-2 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                                            ${isPro
                                                ? "bg-verde-500 hover:bg-verde-400 text-white shadow-lg shadow-verde-500/30 hover:shadow-verde-400/40"
                                                : "border border-gris-600 hover:border-azul-400/60 text-gris-300 hover:text-azul-300 bg-white/5 hover:bg-azul-500/10"
                                            }`}
                                    >
                                        {plan.buttonText}
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
