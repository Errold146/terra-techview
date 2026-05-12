interface Props {
    icon: React.ReactNode
    title: string
    value: string | number
}

export function MetricCard({ icon, title, value }: Props) {
    return (
        <div className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-azul-700/30 shadow-lg shadow-azul-900/20 hover:border-azul-500/50 hover:shadow-azul-700/30 hover:bg-white/8 transition-all duration-300">
            <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br from-azul-500/30 to-verde-500/20 border border-azul-500/20 shadow-inner">
                <span className="text-3xl [&>svg]:w-7 [&>svg]:h-7">
                    {icon}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-gris-50 leading-none">
                    {value}
                </span>
                <p className="text-sm text-gris-400 mt-1 font-medium">{title}</p>
            </div>
        </div>
    )
}
