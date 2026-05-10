import { Logo } from "../Logo";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMovile } from "./NavbarMovile";

export function Navbar() {
    return (
        <nav
            className="w-[90%] md:w-full md:max-w-5xl mx-auto sticky top-5 z-20 flex items-center justify-between px-6 py-3 bg-azul-500/30 backdrop-blur-md rounded-full shadow-lg shadow-azul-500/20 border border-azul-400/40 hover:shadow-xl hover:shadow-azul-600/50"
        >
            <Logo />

            <NavbarDesktop />
            <NavbarMovile />
        </nav>
    )
}
