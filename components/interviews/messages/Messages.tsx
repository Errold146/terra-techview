
type Props = {
    messages: {
        role: string
        content: string
    }[]
}

export function Messages({ messages }: Props) {

    return (
        <div className="overflow-y-auto scrollbar-none overflow-auto h-60 mt-4 max-w-3xl mx-auto w-full p-4 bg-gris-50/20 backdrop-blur-md border border-gris-200 rounded-lg space-y-4 shadow-sm">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center text-gris-100">Transcription</h2>

            <div>
                {messages.map((mesg, key) => {
                    const isAI = mesg.role === "assistant"

                    return (
                        <div
                            key={key}
                            className={`flex mb-2 ${isAI ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`
                                    maw-w-[80%] px-4 py-2 rounded-2xl shadow-md text-sm whitespace-pre-wrap ${
                                        isAI ? 'bg-azul-200 text-left' : 'bg-verde-200 text-right'
                                    }
                                `}
                            >
                                <span className="block font-semibold mb-1 text-xs text-gris-500 uppercase tracking-wide">
                                    {isAI ? "Recruiter" : "User"}
                                </span>
                                <span>{mesg.content}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
