"use client"

import z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { formSchema } from "@/form";
import { roles, difficulties, languages } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";



export function FormCreateInterview() {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            rol: "",
            level: "",
            language: "English"
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true)

        try {
            const res = await axios.post("/api/create-interview", data)
            router.push(`/interview/${res.data.id}`)
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const code = error.response?.data?.error
                if (code === "free_trial_expired") {
                    toast.error("Your free trial has expired. Upgrade your plan to keep practicing.")
                } else if (code === "daily_limit_reached") {
                    toast.error("You've reached your 1 interview/day limit on the free plan. Come back tomorrow or upgrade.")
                } else {
                    toast.error("Failed to create interview. Please try again.")
                }
            } else {
                toast.error("Failed to create interview. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full border-0 bg-transparent shadow-none rounded-lg">
            {/* Card Header */}
            <div className="px-0 pt-0 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-verde-400 to-azul-500 flex items-center justify-center shadow-md shadow-verde-500/30">
                        <span className="text-white font-bold text-xs select-none">AI</span>
                    </div>
                    <h2 className="text-white font-bold text-lg tracking-tight">Create Interview</h2>
                </div>
                <p className="text-verde-400/70 text-xs ml-11">Configure your AI-powered technical interview session</p>
            </div>

            <CardContent className="px-0 py-5">
                <form
                    id="form-rhf-input"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FieldGroup className="gap-4">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-2">
                                    <FieldLabel htmlFor="name" className="text-azul-300 text-xs font-semibold uppercase tracking-widest">
                                        Interview Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. Frontend Developer Interview"
                                        name="name"
                                        className="h-10 rounded-xl border-white/15 bg-gris-900/80 text-white placeholder:text-gris-400 focus-visible:border-verde-400/70 focus-visible:ring-verde-400/20 text-sm px-4 py-3"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Controller
                            name="rol"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-2">
                                    <FieldLabel htmlFor="rol" className="text-azul-300 text-xs font-semibold uppercase tracking-widest">
                                        Role
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id="rol"
                                            aria-invalid={fieldState.invalid}
                                            className="h-11 w-full rounded-xl border-white/15 bg-gris-900/80 text-white text-sm px-4 focus-visible:border-verde-400/70 focus-visible:ring-verde-400/20 data-placeholder:text-gris-400 hover:bg-gris-700 transition-colors [&_svg]:text-gris-400"
                                        >
                                            <SelectValue placeholder="Select a role…" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border border-white/10 bg-gris-950 text-white shadow-xl shadow-black/40 backdrop-blur-sm">
                                            {roles.map((role) => (
                                                <SelectItem
                                                    key={role.value}
                                                    value={role.value}
                                                    className="rounded-lg text-sm text-white/80 focus:bg-verde-400/10 focus:text-white data-highlighted:bg-verde-400/10 data-highlighted:text-white cursor-pointer px-3 py-2.5"
                                                >
                                                    <role.icon className="size-4 shrink-0 text-verde-400" />
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Controller
                            name="level"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-2">
                                    <FieldLabel htmlFor="level" className="text-azul-300 text-xs font-semibold uppercase tracking-widest">
                                        Level
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id="level"
                                            aria-invalid={fieldState.invalid}
                                            className="h-11 w-full rounded-xl border-white/15 bg-gris-900/80 text-white text-sm px-4 focus-visible:border-azul-400/70 focus-visible:ring-azul-400/20 data-placeholder:text-gris-400 hover:bg-gris-700 transition-colors [&_svg]:text-gris-400"
                                        >
                                            <SelectValue placeholder="Select a level…" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border border-white/10 bg-gris-950 text-white shadow-xl shadow-black/40 backdrop-blur-sm">
                                            {difficulties.map((difficulty) => (
                                                <SelectItem
                                                    key={difficulty.value}
                                                    value={difficulty.value}
                                                    className="rounded-lg text-sm text-white/80 focus:bg-azul-400/10 focus:text-white data-highlighted:bg-azul-400/10 data-highlighted:text-white cursor-pointer px-3 py-2.5"
                                                >
                                                    <difficulty.icon className="size-4 shrink-0 text-azul-400" />
                                                    {difficulty.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Controller
                            name="language"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-2">
                                    <FieldLabel htmlFor="language" className="text-azul-300 text-xs font-semibold uppercase tracking-widest">
                                        Language
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id="language"
                                            aria-invalid={fieldState.invalid}
                                            className="h-11 w-full rounded-xl border-white/15 bg-gris-900/80 text-white text-sm px-4 focus-visible:border-verde-400/70 focus-visible:ring-verde-400/20 data-placeholder:text-gris-400 hover:bg-gris-700 transition-colors [&_svg]:text-gris-400"
                                        >
                                            <SelectValue placeholder="Select a language…" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border border-white/10 bg-gris-950 text-white shadow-xl shadow-black/40 backdrop-blur-sm">
                                            {languages.map((lang) => (
                                                <SelectItem
                                                    key={lang.value}
                                                    value={lang.value}
                                                    className="rounded-lg text-sm text-white/80 focus:bg-verde-400/10 focus:text-white data-highlighted:bg-verde-400/10 data-highlighted:text-white cursor-pointer px-3 py-2.5"
                                                >
                                                    <lang.icon className="size-4 shrink-0 text-verde-400" />
                                                    {lang.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="px-0 pb-0 pt-5 flex justify-end border-t border-white/10">
                <Field orientation="horizontal">
                    <Button
                        type="submit"
                        form="form-rhf-input"
                        className="h-10 px-6 rounded-lg bg-linear-to-r from-verde-500 to-azul-500 text-white font-semibold text-sm border-0 hover:from-verde-400 hover:to-azul-400 shadow-lg shadow-verde-500/25 transition-all duration-200"
                        disabled={loading}
                    >
                        Start Interview
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
