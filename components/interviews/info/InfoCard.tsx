import { IconType } from "react-icons";

type Props = {
    name: string
    icon: IconType
    label: string
}

export function InfoCard({ name, icon: Icon, label }: Props) {
    return (
        <div className="group flex flex-col items-center gap-3 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-azul-700/30 shadow-lg shadow-azul-900/20 hover:border-azul-500/50 hover:bg-white/[0.08] hover:shadow-azul-700/30 transition-all duration-300 text-center">
            <div className="p-3 bg-gradient-to-br from-azul-500/30 to-verde-500/20 border border-azul-500/20 rounded-xl shadow-inner group-hover:from-azul-400/40 group-hover:to-verde-400/30 transition-all duration-300">
                <Icon className="w-5 h-5 text-azul-300 group-hover:text-azul-200 transition-colors duration-300" />
            </div>
            <div>
                <p className="text-[10px] font-semibold text-gris-400 uppercase tracking-widest mb-1">{label}</p>
                <span className="text-sm font-semibold text-gris-50 capitalize leading-snug block truncate max-w-[120px]">{name}</span>
            </div>
        </div>
    )
}
