"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Interview } from "@/generated/prisma/client";
import { useParams, useRouter } from "next/navigation";

import { vapi } from "@/lib/vapi.sdk";
import { Messages, UserBoxes } from "@/components/interviews";
import { Message, MessageVapi, Speaker, StatusCall } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function InterviewPage() {

    const router = useRouter()
    const params = useParams()
    const interviewId = params.id

    const [callStatus, setCallStatus] = useState<StatusCall>(StatusCall.INACTIVE)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [speaking, setSpeaking] = useState<Speaker>(null)
    const [interview, setInterview] = useState<Interview>()

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await axios(`/api/interview/${interviewId}`)
                setInterview(res.data)

            } catch (error) {
                console.error(error)
                router.push('/dashboard')
            }
        }
        if ( interviewId ) fetchInterview();
    }, [interviewId, router])

    useEffect(() => {
        const onCallStart = () => setCallStatus(StatusCall.ACTIVE)
        const onCallEnded = () => setCallStatus(StatusCall.FINISHED)

        const onSpeachStart = () => {}
        const onSpeachEnd = () => {}
        const onMessage = (message: MessageVapi) => {
            if ( message.type === "transcript" && message.transcriptType === "final" ) {
                const newMessage= {role: message.role, content: message.transcript}
                setMessages((prev => [newMessage, ...prev]))

                if ( message.role === "assistant" ) {
                    setSpeaking("ai")
                } else if ( message.role === "user" ) {
                    setSpeaking("user")
                }
            }
        }

        const onError = (error: Error) => console.error(error)

        vapi.on("call-start", onCallStart)
        vapi.on("call-end", onCallEnded)
        vapi.on("message", onMessage)
        vapi.on("speech-start", onSpeachStart)
        vapi.on("speech-end", onSpeachEnd)
        vapi.on("error", onError)

        return () => {
            vapi.off("call-start", onCallStart)
            vapi.off("call-end", onCallEnded)
            vapi.off("message", onMessage)
            vapi.off("speech-start", onSpeachStart)
            vapi.off("speech-end", onSpeachEnd)
            vapi.off("error", onError)
        }
    }, [])

    const toggleMicro = () => {
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

    const startCall = async () => {
        setCallStatus(StatusCall.CONNECTING)
        const assistantOverrides = {
            variableValues: {
                topic: `Rol: ${interview?.rol} Level: ${interview?.level}`,
                language: interview?.language ?? "English"
            }
        }

        if ( vapi ) {
            vapi.start("158092aa-3dae-418f-b99c-6c995f9cfc49", assistantOverrides)
        }
    }

    const endCall = async () => {
        setCallStatus(StatusCall.FINISHED)
        if ( vapi ) vapi.stop();

        try {
            await axios.post(`/api/interview/${interviewId}/complete`, {
                transcript: messages
            })
            toast.success('Interview completed')
            router.push('/dashboard')
        } catch (error) {
            console.error(error)
            toast.error('Failed to save the interview. Please try again.')
        }
    }

    return (
        <div className="max-w-6xl h-full mx-auto p-4 md:p-6 space-y-6 flex flex-col justify-center items-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl text-gris-100 font-bold flex items-center gap-2">
                        Interview in Progress
                        <span className="mr-1.5 h-3 w-3 flex items-center">
                            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-verde-400"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-verde-400"></span>
                        </span>
                    </h1>
                    <p className="capitalize text-gris-300">
                        Rol: {interview?.rol} | Level: {interview?.level}
                    </p>
                </div>
                <Button
                    color="azul"
                    onClick={() => router.push('/dashboard')}
                    className="rounded-md shadow-lg"
                >
                    Back to Dashboard
                </Button>
            </div>

            <UserBoxes
                callStatus={callStatus}
                endCall={endCall}
                isMuted={isMuted}
                toggleMicro={toggleMicro}
                speaking={speaking}
                startCall={startCall}
            />

            <Messages messages={messages} />
        </div>
    )
}
