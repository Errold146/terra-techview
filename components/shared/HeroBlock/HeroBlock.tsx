"use client"

import Link from "next/link";
import { FiArrowRight, FiPlay, FiZap, FiCode, FiCpu, FiGift } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";

export function HeroBlock() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">

            {/* Decorative orbs */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-azul-500/20 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-verde-500/15 blur-[140px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-azul-400/10 blur-[100px]" />
            </div>

            {/* Subtle grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center gap-8">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-azul-400/40 bg-azul-500/10 backdrop-blur-sm text-azul-300 text-xs font-semibold tracking-widest uppercase">
                    <FiZap size={12} className="text-verde-400" />
                    AI-Powered Interview Practice
                </div>

                {/* Heading */}
                <h1 className="text-gris-50 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl">
                    Practice real interviews
                    <br />
                    <span className="text-gris-300 font-light">for </span>
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-linear-to-r from-azul-400 via-verde-400 to-azul-300 bg-clip-text text-transparent">
                            <TypeAnimation
                                sequence={[
                                    1000,
                                    "FrontEnd",
                                    1200,
                                    "BackEnd",
                                    1200,
                                    "FullStack",
                                    1200,
                                    "Mobile",
                                    1200,
                                    "DevOps",
                                    1200,
                                    "Data Science",
                                    1200,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                        {/* Underline glow */}
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-azul-400 via-verde-400 to-azul-300 rounded-full opacity-60" />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-gris-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                    Simulate real technical interviews with an AI that asks,
                    evaluates, and gives you <span className="text-verde-400 font-medium">instant actionable feedback</span> — role by role, topic by topic.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                    <Link
                        href="/dashboard"
                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-verde-500 hover:bg-verde-400 text-white font-semibold text-sm shadow-lg shadow-verde-500/30 hover:shadow-verde-400/50 hover:shadow-xl transition-all duration-200"
                    >
                        <FiPlay size={15} />
                        Start Practicing
                        <FiArrowRight
                            size={14}
                            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                        />
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-gris-600 hover:border-azul-400/60 text-gris-300 hover:text-azul-300 font-semibold text-sm bg-white/5 hover:bg-azul-500/10 backdrop-blur-sm transition-all duration-200"
                    >
                        How it Works
                    </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-6 mt-6">
                    {[
                        { icon: FiCode, value: "500+", label: "Practice Questions" },
                        { icon: FiCpu, value: "10+", label: "Tech Roles" },
                        { icon: FiZap, value: "AI", label: "Instant Feedback" },
                        { icon: FiGift, value: "Free", label: "No credit card needed" },
                    ].map(({ icon: Icon, value, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-gris-700/60 bg-gris-900/40 backdrop-blur-sm"
                        >
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-azul-500/20">
                                <Icon size={15} className="text-azul-400" />
                            </span>
                            <div className="text-left">
                                <p className="text-gris-50 font-bold text-base leading-none">{value}</p>
                                <p className="text-gris-500 text-xs mt-0.5">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
