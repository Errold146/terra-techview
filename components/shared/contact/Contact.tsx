import Link from "next/link";
import { FiArrowRight, FiPlay, FiUsers, FiTrendingUp, FiBriefcase } from "react-icons/fi";

export function Contact() {
    return (
        <section
            className="py-10 bg-linear-to-b from-gris-900 to-azul-950"
        >
            <div className="container mx-auto px-4">
                <div
                    className="max-w-4xl mx-auto text-center space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:w-5xl font-bold text-gris-100">
                            Ready to Ace <br /> Your Next Interview?
                        </h2>
                        <p className="text-xl text-gris-300 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of developers who ve transformed their interview akills and landed their dream jobs. Start practicing today.
                        </p>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >

                        <Link
                            href="/dashboard"
                            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-verde-500 hover:bg-verde-400 text-white font-semibold text-sm shadow-lg shadow-verde-500/30 hover:shadow-verde-400/50 hover:shadow-xl transition-all duration-200"
                        >
                            <FiPlay size={15} />
                             Start Free Trial
                            <FiArrowRight
                                size={14}
                                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-10 border-t border-gris-700/40">
                        {[
                            { icon: FiUsers,      value: "10K+", label: "Developers Trained" },
                            { icon: FiTrendingUp, value: "94%",  label: "Success Rate"       },
                            { icon: FiBriefcase,  value: "500+", label: "Companies Hiring"   },
                        ].map(({ icon: Icon, value, label }) => (
                            <div
                                key={label}
                                className="group flex flex-col items-center gap-3 px-6 py-6 rounded-2xl border border-gris-700/40 bg-gris-900/40 backdrop-blur-sm hover:border-azul-400/40 hover:bg-azul-500/5 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-azul-500/15 border border-azul-400/20 group-hover:bg-azul-500/25 group-hover:border-azul-400/40 transition-all duration-300">
                                    <Icon size={20} className="text-azul-400 group-hover:text-azul-300 transition-colors duration-300" />
                                </span>
                                <div className="text-center">
                                    <p className="text-3xl font-extrabold text-gris-50 leading-none">{value}</p>
                                    <p className="text-gris-400 text-sm mt-1.5">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
