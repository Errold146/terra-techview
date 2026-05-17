export enum StatusCall {
    INACTIVE = "inactive",
    CONNECTING = "connecting",
    ACTIVE = "active",
    FINISHED = "finished"
}

export type Speaker = "user" | "ai" | null

export type Message = {
    role: string
    content: string
}

export type MessageVapi = {
    role: string
    transcript: string
    transcriptType: string
    type: string
}

export type TranscriptMessageType = {
    role: "user" | "system" | "assistant"
    content: string
}

export type TranscriptBoxType = {
    transcript: TranscriptMessageType[]
}
