"use client"

import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";
import { FiMenu, FiX, FiSettings, FiDollarSign, FiMessageCircle, FiGrid } from "react-icons/fi";

import { Button } from "../../ui/button";
import { links, type NavLink } from "@/data";

const iconMap: Record<NavLink['icon'], IconType> = {
    FiSettings,
    FiDollarSign,
    FiMessageCircle,
    FiGrid,
}

export function NavbarMovile() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative flex md:hidden">
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Toggle button */}
            <Button
                className="relative z-50 rounded-lg text-verde-500 border border-verde-300 bg-gris-100 hover:bg-verde-500 hover:text-verde-50 hover:border-transparent transition-all duration-200 px-2 py-3"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="relative w-6 h-6">
                    <FiMenu
                        size={24}
                        className={`absolute inset-0 m-auto transition-all duration-200 ${
                            isOpen
                                ? "opacity-0 rotate-90 scale-75"
                                : "opacity-100 rotate-0 scale-100"
                        }`}
                    />
                    <FiX
                        size={24}
                        className={`absolute inset-0 m-auto transition-all duration-200 ${
                            isOpen
                                ? "opacity-100 rotate-0 scale-100"
                                : "opacity-0 -rotate-90 scale-75"
                        }`}
                    />
                </div>
            </Button>

            {/* Dropdown panel */}
            <div
                className={`absolute right-0 top-[calc(100%+12px)] w-64 z-50 transition-all duration-300 ease-out origin-top-right ${
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
                {/* Top accent line */}
                <div className="h-0.5 rounded-t-full bg-linear-to-r from-verde-400 via-azul-400 to-verde-300" />

                <div className="rounded-b-2xl rounded-tr-2xl border border-t-0 border-gris-200 bg-white/95 backdrop-blur-md shadow-xl shadow-gris-300/40 overflow-hidden">
                    <div className="p-2 flex flex-col gap-0.5">
                        {links.map((link, i) => {
                            const Icon = iconMap[link.icon]
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ transitionDelay: isOpen ? `${i * 40}ms` : "0ms" }}
                                    className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gris-700 rounded-xl transition-all duration-200 hover:bg-verde-50 hover:text-verde-700 ${
                                        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                    }`}
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gris-100 group-hover:bg-verde-100 group-hover:shadow-sm transition-all duration-200">
                                        <Icon
                                            size={15}
                                            className="text-azul-400 group-hover:text-verde-600 transition-colors duration-200"
                                        />
                                    </span>
                                    <span className="tracking-wide">{link.name}</span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Bottom footer hint */}
                    <div className="px-4 py-2.5 border-t border-gris-100 bg-gris-50/60">
                        <p className="text-[11px] text-gris-400 text-center font-medium tracking-wide">
                            TechView — AI Interview Prep
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
