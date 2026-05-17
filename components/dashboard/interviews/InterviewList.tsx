"use client"
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiTrash2, FiCheckCircle, FiClock, FiPlusCircle, FiRefreshCw } from "react-icons/fi";
import type { Interview } from "@/generated/prisma/client";

import { cn } from "@/lib/utils";
import { roleColors } from "../roleColors";
import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { InterviewImage } from "../interview-image/InterviewImage";
import { BtnCreateInterview } from "../create-interview/BtnCreateInterview";
import { FormCreateInterview } from "../create-interview/FormCreateInterview";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

export function InterviewList() {

    const router = useRouter()
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [completedDialog, setCompletedDialog] = useState<Interview | null>(null)
    const [showCreateForm, setShowCreateForm] = useState(false)

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await axios('/api/interviews')
                setInterviews(res.data)
            } catch {
                setError('Error fetching interviews')
            } finally {
                setLoading(false)
            }
        }
        fetchInterview()
    }, [])

    const handleDelete = async (id: string) => {
        setDeletingId(id)
        try {
            await axios.delete(`/api/interview/${id}`)
            setInterviews(prev => prev.filter(i => i.id !== id))
            toast.success('Interview deleted')
        } catch {
            toast.error('Failed to delete interview')
        } finally {
            setDeletingId(null)
        }
    }

    const handleDetailsClick = (itv: Interview) => {
        if (itv.completedAt) {
            setCompletedDialog(itv)
        } else {
            router.push(`/interview/${itv.id}`)
        }
    }

    return (
        <div>
            <div className="mt-5 p-4 md:px-10 border border-verde-400/20 rounded-md bg-azul-50/10 backdrop-blur-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gris-50">Last Interviews</h2>
                    <div className="w-fit shrink-0">
                        <BtnCreateInterview />
                    </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gris-200 font-medium border-b border-verde-300/20">
                                <th className="pb-3 font-medium pr-4">Date</th>
                                <th className="pb-3 font-medium pr-4 w-[35%]">Lessons</th>
                                <th className="pb-3 font-medium pr-4">Level</th>
                                <th className="pb-3 font-medium pr-4">Type</th>
                                <th className="pb-3 font-medium pr-4">Status</th>
                                <th className="pb-3 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="pt-6">
                                        <Spinner />
                                    </td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan={6} className="text-red-500 font-semibold text-center text-xl pt-6">
                                        {error}
                                    </td>
                                </tr>
                            )}
                            {!loading && interviews.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-azul-400 font-semibold text-center text-xl pt-6">
                                        No interviews found
                                    </td>
                                </tr>
                            )}

                            {interviews.slice(0, 5).map(itv => (
                                <tr
                                    key={itv.id}
                                    className="border-b border-verde-300/20 last:border-b-0 align-middle"
                                >
                                    <td className="py-4 pr-4 text-gris-50 whitespace-nowrap">
                                        {new Date(itv.startedAt).toLocaleDateString()}
                                    </td>

                                    <td className="py-4 pr-4">
                                        <div className="flex gap-4 items-center">
                                            <InterviewImage interview={itv} />
                                            <h3 className="text-xl font-semibold text-gris-100">{itv.name}</h3>
                                        </div>
                                    </td>

                                    <td className="py-4 pr-4">
                                        <span className={cn("text-xs px-2 py-1 rounded-full border w-fit block", roleColors[itv.rol])}>
                                            {itv.level}
                                        </span>
                                    </td>

                                    <td className="py-4 pr-4">
                                        <span className={cn("text-xs px-2 py-1 rounded-full border w-fit block", roleColors[itv.rol])}>
                                            {itv.rol}
                                        </span>
                                    </td>

                                    <td className="py-4 pr-4">
                                        {itv.completedAt ? (
                                            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-verde-400/40 bg-verde-400/10 text-verde-300">
                                                <FiCheckCircle className="size-3 shrink-0" />
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
                                                <FiClock className="size-3 shrink-0" />
                                                Pending
                                            </span>
                                        )}
                                    </td>

                                    <td className="py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                color="verde"
                                                className="rounded-md px-4 py-2 flex items-center gap-2"
                                                onClick={() => handleDetailsClick(itv)}
                                            >
                                                <FiEye />
                                                Details
                                            </Button>

                                            <Dialog>
                                                <DialogTrigger
                                                    render={
                                                        <Button
                                                            color="rojo"
                                                            className="rounded-md px-4 py-2 flex items-center gap-2"
                                                            disabled={deletingId === itv.id}
                                                        >
                                                            <FiTrash2 />
                                                            Delete
                                                        </Button>
                                                    }
                                                />
                                                <DialogContent className="bg-gris-950 border border-white/10 rounded-xl max-w-sm">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-white text-base font-semibold">
                                                            Delete Interview
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gris-300">
                                                            Are you sure you want to delete{" "}
                                                            <span className="text-white font-medium">{itv.name}</span>?
                                                            This action cannot be undone.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose
                                                            render={
                                                                <Button className="rounded-md px-4 py-2 bg-gris-800 text-white hover:bg-gris-700 border-0">
                                                                    Cancel
                                                                </Button>
                                                            }
                                                        />
                                                        <DialogClose
                                                            render={
                                                                <Button
                                                                    color="rojo"
                                                                    className="rounded-md px-4 py-2 flex items-center gap-2"
                                                                    onClick={() => handleDelete(itv.id)}
                                                                    disabled={deletingId === itv.id}
                                                                >
                                                                    <FiTrash2 />
                                                                    Confirm Delete
                                                                </Button>
                                                            }
                                                        />
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal: create new interview */}
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogContent className="sm:max-w-lg bg-gris-950 border border-white/10 text-white **:data-[slot=dialog-close]:text-white/40 **:data-[slot=dialog-close]:hover:text-white **:data-[slot=dialog-close]:hover:bg-white/10">
                    <FormCreateInterview />
                </DialogContent>
            </Dialog>

            {/* Modal: interview already completed */}
            <Dialog open={!!completedDialog} onOpenChange={(open) => { if (!open) setCompletedDialog(null) }}>
                <DialogContent className="bg-gris-950 border border-white/10 rounded-xl max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base font-semibold flex items-center gap-2">
                            <FiCheckCircle className="text-verde-400 size-5" />
                            Interview Already Completed
                        </DialogTitle>
                        <DialogDescription className="text-gris-300">
                            You already completed{" "}
                            <span className="text-white font-medium">{completedDialog?.name}</span>.
                            Would you like to redo it or start a fresh new interview?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col sm:flex-col gap-2">
                        <DialogClose
                            render={
                                <Button
                                    color="verde"
                                    className="rounded-md px-4 py-2 flex items-center gap-2 w-full justify-center"
                                    onClick={() => router.push(`/interview/${completedDialog?.id}`)}
                                >
                                    <FiRefreshCw />
                                    Redo this interview
                                </Button>
                            }
                        />
                        <DialogClose
                            render={
                                <Button
                                    className="rounded-md px-4 py-2 flex items-center gap-2 w-full justify-center bg-azul-600/30 border border-azul-400/30 text-azul-200 hover:bg-azul-600/50"
                                    onClick={() => setShowCreateForm(true)}
                                >
                                    <FiPlusCircle />
                                    Create new interview
                                </Button>
                            }
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

