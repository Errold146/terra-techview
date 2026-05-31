"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CancelPlanButton() {
    const [loading, setLoading] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const router = useRouter()

    const handleCancel = async () => {
        if (!confirmed) {
            setConfirmed(true)
            return
        }

        setLoading(true)
        try {
            await axios.post("/api/stripe/cancel")
            toast.success("Suscripción cancelada", {
                description: "Tu acceso continuará hasta el fin del período actual.",
            })
            router.refresh()
        } catch {
            toast.error("No se pudo cancelar", {
                description: "Intenta de nuevo o contacta soporte.",
            })
        } finally {
            setLoading(false)
            setConfirmed(false)
        }
    }

    if (confirmed) {
        return (
            <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-[10px] text-gris-400">¿Confirmar cancelación?</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setConfirmed(false)}
                        className="text-[10px] text-gris-500 hover:text-gris-300 transition-colors"
                    >
                        No
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="text-[10px] text-red-400 hover:text-red-300 font-semibold transition-colors disabled:opacity-50"
                    >
                        {loading ? "Cancelando..." : "Sí, cancelar"}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <button
            onClick={handleCancel}
            className="text-[10px] text-gris-500 hover:text-red-400 transition-colors underline underline-offset-2 w-full text-center mt-1"
        >
            Cancelar suscripción
        </button>
    )
}
