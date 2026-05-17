import { TranscriptBoxType } from "@/types";
import { FiCpu, FiUser, FiMessageSquare } from "react-icons/fi";

export function TranscriptBox({ transcript }: TranscriptBoxType) {

    const ordered = [...transcript].reverse()

    return (
        <div className="rounded-2xl border border-azul-700/30 bg-white/5 backdrop-blur-md shadow-xl shadow-azul-900/20 overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-azul-700/20 bg-white/0.3">
                <div className="p-2 bg-linear-to-br from-azul-500/30 to-verde-500/20 border border-azul-500/20 rounded-lg">
                    <FiMessageSquare className="w-4 h-4 text-azul-300" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gris-100">Transcript</h3>
                    <p className="text-xs text-gris-400">{transcript.length} {transcript.length === 1 ? "message" : "messages"}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="p-4 md:p-6 max-h-130 overflow-y-auto space-y-4 scrollbar-none">
                {ordered.length > 0 ? (
                    ordered.map((msg, index) => {
                        const isUser = msg.role === "user"
                        return (
                            <div key={index} className="flex items-start gap-3">

                                {/* AI avatar — left */}
                                {!isUser && (
                                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-azul-400/20 border border-azul-400/40">
                                        <FiCpu className="w-3.5 h-3.5 text-azul-300" />
                                    </div>
                                )}

                                {/* Bubble */}
                                <div className={`flex flex-col gap-1 max-w-[75%] ${
                                    isUser ? "ml-auto items-end" : "mr-auto items-start"
                                }`}>
                                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                                        isUser ? "text-verde-400" : "text-azul-400"
                                    }`}>
                                        {isUser ? "You" : "AI Recruiter"}
                                    </span>
                                    <div className={`px-4 py-2.5 text-sm leading-relaxed text-gris-100 ${
                                        isUser
                                            ? "bg-verde-500/15 border border-verde-400/25 rounded-2xl rounded-tr-none"
                                            : "bg-azul-500/15 border border-azul-400/25 rounded-2xl rounded-tl-none"
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>

                                {/* User avatar — right */}
                                {isUser && (
                                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-verde-400/20 border border-verde-400/40">
                                        <FiUser className="w-3.5 h-3.5 text-verde-300" />
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 bg-azul-500/10 rounded-full border border-azul-500/20 mb-4">
                            <FiMessageSquare className="w-8 h-8 text-azul-400" />
                        </div>
                        <p className="text-gris-300 font-medium">No transcript available</p>
                        <p className="text-gris-500 text-sm mt-1">Complete the interview to see the transcript here</p>
                    </div>
                )}
            </div>
        </div>
    )
}
