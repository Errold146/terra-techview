
export default function InterviewLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full min-h-screen bg-linear-to-br from-gris-900 via-azul-900 to-verde-900">
            <main className="w-full h-screen">
                {children}
            </main>
        </div>
    )
}
