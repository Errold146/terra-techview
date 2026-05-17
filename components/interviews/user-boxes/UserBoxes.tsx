import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { HiHandRaised } from "react-icons/hi2"
import { FiMic, FiMicOff, FiPhone, FiThumbsUp } from "react-icons/fi";

import { cn } from "@/lib/utils";
import { Speaker, StatusCall } from "@/types";
import { Button } from "@/components/ui/button";

type Props = {
    toggleMicro: () => void
    isMuted: boolean
    startCall: () => void
    endCall: () => void
    callStatus: StatusCall
    speaking: Speaker
}

export function UserBoxes({toggleMicro, isMuted, speaking, startCall, endCall, callStatus}: Props) {

    const { user } = useUser()

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-5">

                <div className="relative h-100">
                    <div className="h-full w-full bg-gris-200/30 backdrop-blur-lg relative rounded-md">
                        <div
                            className="absolute inset-0 z-0 rounded-md"
                            style={{
                                backgroundImage: `radial-gradient(circle 400px at 50% 0%, rgba(73, 175, 231, 0.25), transparent), radial-gradient(circle 200px at 50% 0%, rgba(76, 220, 116, 0.15), transparent)`
                            }}
                        />
                        <div className="z-20 relative p-4 flex flex-col items-center justify-center gap-2 h-full">
                            <div className="relative">
                                {speaking === "ai" && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <span className="animate-pulse absolute inline-flex h-16 w-16 rounded-full bg-azul-400 opacity-50"></span>
                                    </span>
                                )}
                                <div className="border border-azul-200 bg-azul-100 rounded-full p-2 relative z-10">
                                    <Image
                                        src={'/bot.png'}
                                        alt="User Bot"
                                        width={60}
                                        height={60}
                                        priority
                                    />
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-gris-100">AI Recluiter</p>
                        </div>
                    </div>
                </div>

                <div className="relative h-100">
                    <div
                        className={cn(
                            "h-full w-full bg-gris-100/30 backdrop-blur-lg relative rounded-md",
                            speaking === "user" ? "border border-amber-400 shadow-xl" : "border-none"
                        )}
                    >
                        <div
                            className="absolute inset-0 z-0 rounded-md"
                            style={{
                                backgroundImage: `radial-gradient(circle 400px at 50% 0%, rgba(73, 175, 231, 0.25), transparent), radial-gradient(circle 200px at 50% 0%, rgba(76, 220, 116, 0.15), transparent)`
                            }}
                        />
                        <div className="p-4 flex flex-col items-center justify-center gap-2 h-full z-10 relative rounded-md">
                            <div className="relative">
                                {speaking === "user" && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <span className="animate-pulse absolute inline-flex h-20 w-20 rounded-full bg-verde-300 opacity-50"></span>
                                    </span>
                                )}
                                <div className="bg-verde-200 rounded-full p-1 relative z-10">
                                    <Image
                                        src={user?.imageUrl ?? '/user.png'}
                                        alt="User Avatar"
                                        width={70}
                                        height={70}
                                        priority
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-gris-100">{user?.firstName ?? 'Recruited'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <div
                    className="p-2 bg-gris-500 text-gris-50 rounded-full cursor-pointer"
                    onClick={toggleMicro}
                >
                    {isMuted ? (
                        <FiMicOff className="h-5 w-5 text-red-400" />
                    ): (
                        <FiMic className="h-5 w-5 text-verde-400" />
                    )}
                </div>
                <div className="p-2 bg-gris-500 text-azul-400 rounded-full cursor-pointer">
                    <HiHandRaised className="w-5 h-5" />
                </div>
                <Button
                    color="verde"
                    className="px-6 py-2 rounded-full cursor-pointer"
                    onClick={startCall}
                    disabled={callStatus === StatusCall.ACTIVE}
                >
                    <FiPhone className="h-5 w-5 rotate-140" />
                    Start Sesion
                </Button>
                <Button
                    className="px-6 py-2 rounded-full cursor-pointer"
                    onClick={endCall}
                >
                    <FiPhone className="h-5 w-5 rotate-140" />
                </Button>
            </div>

        </div>
    )
}
