"use client"

import Link from "next/link";
import type { IconType } from "react-icons";
import { FiSettings, FiDollarSign, FiMessageCircle, FiGrid } from "react-icons/fi";

import { links, type NavLink } from "@/data";

const iconMap: Record<NavLink['icon'], IconType> = {
    FiSettings,
    FiDollarSign,
    FiMessageCircle,
    FiGrid,
}

export function NavbarDesktop() {
    return (
        <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
                const Icon = iconMap[link.icon]
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gris-700 rounded-xl border border-gris-200 bg-gris-100 shadow-sm transition-all duration-200 hover:border-verde-300 hover:bg-verde-50 hover:text-verde-700 hover:shadow-verde-100 hover:shadow-md"
                    >
                        <Icon
                            size={16}
                            className="text-azul-400 group-hover:text-verde-500 transition-colors duration-200"
                        />
                        <span>{link.name}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
