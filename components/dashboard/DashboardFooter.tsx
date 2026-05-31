import Link from "next/link";
import { FiAlertTriangle, FiShield } from "react-icons/fi";
import { contactLinks } from "@/data";

export function DashboardFooter() {
    return (
        <footer className="mt-auto border-t border-white/5">

            {/* Security notice */}
            <div className="bg-amber-500/8 border-b border-amber-400/15">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 shrink-0 mt-0.5">
                            <FiAlertTriangle size={14} className="text-amber-400" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-amber-300 text-xs font-semibold">
                                Important Security Notice
                            </p>
                            <p className="text-amber-100/75 text-xs leading-relaxed">
                                <span className="font-semibold text-amber-100/90">Do not share sensitive information</span> such as credit or debit card numbers, CVV codes, or expiration dates on this platform.{" "}
                                This is a practice application &mdash; we do not store or process real payment data.{" "}
                                <span className="text-red-400 font-semibold">In this version (v1) only free plan features are active.</span>{" "}
                                Paid features will be available in{" "}
                                <span className="text-verde-400 font-semibold">version 2</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="max-w-5xl mx-auto px-6 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

                    <div className="flex flex-col gap-1 text-center sm:text-left">
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                            <FiShield size={13} className="text-verde-400" />
                            <p className="text-gris-200 text-xs font-semibold tracking-widest uppercase">
                                Have a question?
                            </p>
                        </div>
                        <p className="text-gris-400 text-xs">
                            Reach out directly through any of these channels.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                        {contactLinks.map(({ icon: Icon, label, href, color }) => (
                            <Link
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gris-600/50 bg-white/5 text-gris-300 text-xs backdrop-blur-sm transition-all duration-200 ${color}`}
                            >
                                <Icon size={12} />
                                {label}
                            </Link>
                        ))}
                    </div>

                </div>

                <p className="text-center text-gris-400 text-xs mt-5 pt-4 border-t border-white/5">
                    © {new Date().getFullYear()} TechView — Created by{" "}
                    <a
                        href="https://www.microweb-cr.es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-azul-300 hover:text-azul-200 transition-colors duration-200"
                    >
                        Microweb-cr
                    </a>
                </p>
            </div>

        </footer>
    );
}
