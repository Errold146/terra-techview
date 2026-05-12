export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen w-full bg-linear-to-br from-azul-950 via-gris-950 to-azul-950 flex items-center justify-center p-4 overflow-hidden">

            {/* Orbs decorativos */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-azul-500/20 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-verde-500/15 blur-[140px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-azul-400/10 blur-[100px]" />
            </div>

            {/* Grid overlay sutil */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}
