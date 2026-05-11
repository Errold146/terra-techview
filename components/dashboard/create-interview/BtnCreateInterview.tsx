
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormCreateInterview } from "./FormCreateInterview"
import { FiPlus } from "react-icons/fi"

export function BtnCreateInterview() {
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button
                        color="azul"
                        className="w-full rounded-xl hover:shadow-lg hover:shadow-azul-400/50 text-sm cursor-pointer gap-2 group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto"
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
    )
}
