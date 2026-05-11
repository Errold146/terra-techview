import { howItWorksData } from "@/data";

export function HowItWorks() {
    return (
        <section
            className="py-10 bg-linear-to-b from-transparent to-verde-900"
            id="how-it-works"
        >
            <div
                className="container mx-auto px-4"
            >
                <div className="text-center mb-16">
                    <h2 className="text-gris-100 text-3xl md:text-4xl font-bold mb-4">
                        How It Works
                    </h2>
                    <p className="text-gris-400 text-xl max-w-2xl mx-auto">Get interview ready in just a few simple steps.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {howItWorksData.map((step, index) => (
                        <div key={index} className="relative group flex flex-col">

                            {/* Step number + connector line */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-azul-500/20 border border-azul-400/40 text-azul-300 text-xs font-bold shrink-0">
                                    {index + 1}
                                </span>
                                {index < howItWorksData.length - 1 && (
                                    <div className="hidden lg:block flex-1 h-px bg-linear-to-r from-azul-400/40 to-transparent" />
                                )}
                            </div>

                            {/* Card */}
                            <div className="flex-1 rounded-2xl border border-gris-700/50 bg-gris-900/50 backdrop-blur-sm p-6 flex flex-col gap-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-azul-400/40 group-hover:shadow-lg group-hover:shadow-azul-500/10">

                                {/* Icon */}
                                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-azul-500/15 border border-azul-400/20 group-hover:bg-azul-500/25 group-hover:border-azul-400/40 transition-all duration-300">
                                    <step.icon className="w-5 h-5 text-azul-400 group-hover:text-azul-300 transition-colors duration-300" />
                                </span>

                                {/* Text */}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-gris-50 font-semibold text-base leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-gris-400 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
