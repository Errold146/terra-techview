import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(3, "El nombre es requerido.").max(50, "El nombre no puede superar los 50 caracteres."),
    rol: z.string().min(1, "El rol es requerido."),
    level: z.string().min(1, "El nivel es requerido."),
    language: z.string().min(1, "El idioma es requerido.")
})
