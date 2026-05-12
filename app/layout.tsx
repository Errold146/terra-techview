import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"
import { generateTitle } from "@/utils";
import { ThemeProvider } from "@/components/theme-provider"

const spaceGroptesk = Space_Grotesk({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: generateTitle(),
    description: 'AI-powered app for interview practice for IT professionals'
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ClerkProvider>
            <html
                lang="es"
                className={`${spaceGroptesk.className} h-full`}
                suppressHydrationWarning
            >
                <body className="bg-gris-100">
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
