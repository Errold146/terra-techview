
import Image from "next/image";
import Link from "next/link";
import { FiAlertTriangle, FiExternalLink } from "react-icons/fi";

export function Footer() {
    return (
        <footer className="bg-azul-950 border-t border-gris-800/40">

            {/* Warning banner */}
            <div className="border-b border-yellow-500/20 bg-yellow-500/5">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-start gap-2.5 justify-center text-center max-w-3xl mx-auto">
                        <FiAlertTriangle size={15} className="text-yellow-400 shrink-0 mt-0.5" />
                        <p className="text-yellow-300/80 text-xs leading-relaxed">
                            <span className="font-semibold text-yellow-300">Practice project notice:</span>{" "}
                            Although this platform accepts payments, <span className="font-semibold">do not enter real card details</span>. This is a student practice project — no real transactions are processed. Never share sensitive financial information.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2.5">
                            <Link href={'/'} className="cursor-pointer">
                                <Image
                                    src="/Fronty.png"
                                    alt="TechView logo"
                                    width={32}
                                    height={32}
                                    style={{ width: '32px', height: '32px' }}
                                />
                            </Link>
                            <span className="text-gris-50 font-semibold text-lg">
                                Terra <span className="text-verde-400 font-normal">Teachview</span>
                            </span>
                        </div>
                        <p className="text-gris-500 text-sm leading-relaxed">
                            AI-powered interview practice for IT professionals. Master every role, one session at a time.
                        </p>
                        <p className="text-gris-600 text-xs">
                            Created & maintained by{" "}
                            <a href="https://www.microweb-cr.es/" target="_blank">
                                <span className="text-azul-400 font-medium">Microweb-cr</span>
                            </a>
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-gris-300 text-sm font-semibold tracking-widest uppercase">Platform</h4>
                        <ul className="flex flex-col gap-2.5">
                            {[
                                { label: "How it Works", href: "#how-it-works" },
                                { label: "Pricing",      href: "#pricing"      },
                                { label: "Dashboard",    href: "/dashboard"    },
                            ].map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-gris-500 text-sm hover:text-azul-300 transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-gris-300 text-sm font-semibold tracking-widest uppercase">Connect</h4>
                        <p className="text-gris-500 text-sm leading-relaxed">
                            Find all our links, social media, and projects in one place.
                        </p>
                        <Link
                            href="https://terra-link-phi.vercel.app/MicroWeb-cr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-azul-400/30 bg-azul-500/10 hover:bg-azul-500/20 hover:border-azul-400/60 text-azul-300 hover:text-azul-200 text-sm font-medium transition-all duration-200 w-fit"
                        >
                            <Image
                                src="/Fronty.png"
                                alt="TerraLink"
                                width={16}
                                height={16}
                                style={{ width: '16px', height: '16px' }}
                            />
                            TerraLink — MicroWeb-cr
                            <FiExternalLink size={13} className="opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                        </Link>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-gris-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-5xl mx-auto">
                    <p className="text-gris-600 text-xs">
                        © {new Date().getFullYear()} TechView · Built by{" "}
                        <Link
                            href="https://www.microweb-cr.es"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-azul-500 hover:text-azul-300 transition-colors duration-200"
                        >
                            Microweb-cr
                        </Link>
                    </p>
                    <p className="text-gris-700 text-xs italic">
                        Student practice project — no real payments processed
                    </p>
                </div>
            </div>
        </footer>
    )
}

