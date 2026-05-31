
"use client"

import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { FormCreateInterview } from "./FormCreateInterview";

export function BtnCreateInterview() {

    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        axios("/api/user/status")
            .then((res) => setDisabled(res.data.dailyLimitReached ?? false))
            .catch(() => {})
    }, [])

    return (
        <TooltipProvider>
            <Tooltip>
                {/* El span wrapper permite que el tooltip funcione incluso con el botón deshabilitado */}
                <TooltipTrigger
                    render={<span className="w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:mx-auto" />}
                >
                    <Dialog>
                        <DialogTrigger
                            disabled={disabled}
                            render={
                                <Button
                                    color="azul"
                                    disabled={disabled}
                                    className="w-full rounded-xl hover:shadow-lg hover:shadow-azul-400/50 text-sm cursor-pointer gap-2 group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                                >
                                    <FiPlus className="size-4 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">New Interview</span>
                                </Button>
                            }
                        />
                        <DialogContent className="sm:max-w-lg bg-gris-950 border border-white/10 text-white **:data-[slot=dialog-close]:text-white/40 **:data-[slot=dialog-close]:hover:text-white **:data-[slot=dialog-close]:hover:bg-white/10">
                            <FormCreateInterview />
                        </DialogContent>
                    </Dialog>
                </TooltipTrigger>
                {disabled && (
                    <TooltipContent side="right">
                        You've already used up your interview time today. Come back tomorrow or improve your plan.
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    )
}
