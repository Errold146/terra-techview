import { FiGlobe, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { IconType } from "react-icons";

export type ContactLink = {
    icon: IconType
    label: string
    href: string
    color: string
}

export const contactLinks: ContactLink[] = [
    {
        icon: FiGlobe,
        label: "microweb-cr.es",
        href: "https://www.microweb-cr.es",
        color: "hover:border-verde-400/50 hover:text-verde-300 hover:bg-verde-500/5",
    },
    {
        icon: FiMail,
        label: "errold222@gmail.com",
        href: "mailto:errold222@gmail.com",
        color: "hover:border-azul-400/50 hover:text-azul-300 hover:bg-azul-500/5",
    },
    {
        icon: FaWhatsapp,
        label: "+506 7802 7211",
        href: "https://wa.me/50678027211",
        color: "hover:border-green-400/50 hover:text-green-300 hover:bg-green-500/5",
    },
    {
        icon: FiLinkedin,
        label: "LinkedIn",
        href: "https://linkedin.com/in/errold-n%C3%BA%C3%B1ez-s%C3%A1nchez",
        color: "hover:border-azul-400/50 hover:text-azul-300 hover:bg-azul-500/5",
    },
    {
        icon: FiGithub,
        label: "Errold146",
        href: "https://github.com/Errold146",
        color: "hover:border-gris-400/50 hover:text-gris-200 hover:bg-gris-500/5",
    },
]
