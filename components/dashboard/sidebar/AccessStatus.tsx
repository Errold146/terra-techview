"use client"

import { useState } from "react";

import { StatusPaid } from "./StatusPaid";
import { Button } from "@/components/ui/button";
import { StatusFreeTrial } from "./StatusFreeTrial";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

export function AccessStatus() {
    const [open, setOpen] = useState(false)

    const hasPaid: boolean = false
    const statusFree: boolean = true

    if (hasPaid) return <StatusPaid />
    if (statusFree) return <StatusFreeTrial />

    return (
        <div className="boder rounded-md border-verde-400 bg-azul-300/20 p-4 text-center">
            <h3 className="mb-1 text-xl font-semibold text-azul-50">
                Plan no activated
            </h3>
            <p className="w-full rounded-xl bg-red-500 p-1 text-center text-red-50">
                Limited Access
            </p>
            <p className="mt-2 mb-3 text-xs text-verde-50">
                You have used ypur free trial
            </p>

            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogTrigger
                    render={
                        <Button color="azul" className="w-full rounded-lg font-semibold cursor-pointer">
                            Update Your Plan
                        </Button>
                    }
                />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update your plan</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
