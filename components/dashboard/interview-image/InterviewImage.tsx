import { roles } from "@/data";
import { roleColors } from "../roleColors";
import { Interview } from "@/generated/prisma/client";

interface Props {
    interview: Interview
}

export function InterviewImage({ interview }: Props) {

    const roleInfo = roles.find(r => r.value === interview.rol)!
    const Icon = roleInfo?.icon

    return (
        <div
            className={`p-2 rounded-md border ${roleColors[interview.rol]}`}
        >
            <span className="text-3xl">{Icon && <Icon />}</span>
        </div>
    )
}
