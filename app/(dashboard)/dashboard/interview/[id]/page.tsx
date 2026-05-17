"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Interview } from '@/generated/prisma/client';
import { useParams, useRouter } from "next/navigation";
import { FiCalendar, FiBookmark, FiCode, FiUser, FiCheckCircle, FiClock, FiArrowLeft, FiGlobe } from "react-icons/fi"

import { Spinner } from "@/components/shared";
import { InfoCard, TranscriptBox } from "@/components/interviews";
import { TranscriptMessageType } from "@/types";

export default function InterviewIdPage() {

    const params = useParams()
    const interviewId = params.id
    const router = useRouter()

    const [interview, setInterview] = useState<Interview>()

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await axios(`/api/interview/${interviewId}`)
                setInterview(res.data)
            } catch (error) {
                console.log("Error fetching interview", error)
                router.push('/dashboard')
            }
        }

        if ( interviewId ) fetchInterview()
    }, [interviewId, router])

    if ( !interview ) return <Spinner centered />;

    const transcriptFinal = Array.isArray(interview.transcript) ? (interview.transcript as TranscriptMessageType[]) : []

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-10">

            {/* Back nav */}
            <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center gap-2 text-sm text-gris-400 hover:text-gris-100 transition-colors duration-200 group cursor-pointer"
            >
                <FiArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back to Dashboard
            </button>

            {/* Hero header */}
            <div className="relative overflow-hidden rounded-2xl border border-azul-700/30 bg-white/5 backdrop-blur-md shadow-xl shadow-azul-900/30">
                {/* Top linear strip */}
                <div className="h-1 w-full bg-linear-to-r from-azul-500 via-verde-400 to-azul-600" />

                {/* Background orbs */}
                <div className="absolute -top-20 right-10 w-80 h-80 bg-azul-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 left-10 w-64 h-64 bg-verde-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center gap-5 p-8 md:p-12">
                    {/* Status badge */}
                    {interview.completedAt ? (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-verde-400/40 bg-verde-400/10 text-verde-300 font-medium text-xs">
                            <FiCheckCircle className="size-3.5" />
                            Completed
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 font-medium text-xs">
                            <FiClock className="size-3.5" />
                            Pending
                        </span>
                    )}

                    {/* Title */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-azul-400 uppercase tracking-widest">Interview Summary</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-gris-50 leading-tight">{interview.name}</h1>
                    </div>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gris-300">
                            <FiUser className="size-3 text-azul-400" />
                            {interview.rol}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gris-300">
                            <FiCode className="size-3 text-azul-400" />
                            {interview.level}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gris-300">
                            <FiGlobe className="size-3 text-azul-400" />
                            {interview.language ?? "English"}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gris-300">
                            <FiCalendar className="size-3 text-azul-400" />
                            {new Date(interview.startedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard icon={FiBookmark} name={interview.name} label="Name" />
                <InfoCard icon={FiCode} name={interview.level} label="Level" />
                <InfoCard icon={FiCalendar} name={new Date(interview.startedAt).toLocaleDateString()} label="Date" />
                <InfoCard icon={FiUser} name={interview.rol} label="Role" />
            </div>

            {/* Transcript */}
            <TranscriptBox transcript={transcriptFinal} />
        </div>
    )
}
