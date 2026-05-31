import Link from "next/link";
import { FiAlertTriangle, FiArrowLeft, FiZap } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gris-900 via-azul-900 to-verde-900 flex items-center justify-center px-6">
            {/* Glow de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-verde-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/3 w-100 h-100 bg-azul-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center text-center max-w-lg gap-8">

                {/* Ícono */}
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500/15 border border-amber-400/30 shadow-lg shadow-amber-500/10">
                    <FiAlertTriangle size={36} className="text-amber-400" />
                </div>

                {/* Código y título */}
                <div className="flex flex-col gap-3">
                    <span className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-verde-400 to-azul-400 leading-none select-none">
                        404
                    </span>
                    <h1 className="text-2xl font-bold text-gris-50">
                        Página no encontrada
                    </h1>
                    <p className="text-gris-400 text-sm leading-relaxed">
                        Lo que buscas no existe o aún no está disponible en esta versión.
                        <br />
                        Estamos trabajando para traerte nuevas funcionalidades en la{" "}
                        <span className="text-verde-400 font-semibold">versión 2</span>.
                    </p>
                </div>

                {/* Badge versión 2 */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-verde-500/10 border border-verde-400/25">
                    <FiZap size={13} className="text-verde-400 shrink-0" />
                    <span className="text-verde-300 text-xs font-medium">
                        Próximamente en TechView v2
                    </span>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                        href="/dashboard"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-verde-500 to-azul-500 hover:from-verde-400 hover:to-azul-400 text-white font-semibold text-sm shadow-lg shadow-verde-500/30 hover:shadow-verde-400/40 transition-all duration-200"
                    >
                        <FiArrowLeft size={15} />
                        Volver al Dashboard
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gris-200 hover:text-white font-medium text-sm transition-all duration-200"
                    >
                        Ir al inicio
                    </Link>
                </div>

            </div>
        </div>
    );
}
