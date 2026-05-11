import * as z from "zod";

export const formSchema = z.object({
    username: z.string().min(3, "Username is required.").max(50, "Username max 10 characters.").regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores."
    ),
    rol: z.string().min(1, "Rol is required."),
    level: z.string().min(1, "Level is required.")
})
