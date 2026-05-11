import { Contact, Footer, HeroBlock, HowItWorks, Navbar, Pricing } from "@/components/shared";

export default function HomePage() {
    return (
        <div className="min-h-screen w-full bg-linear-to-br from-gris-900 via-azul-900 to-gris-900">
            <Navbar />
            <HeroBlock />
            <HowItWorks />
            <Pricing />
            <Contact />
            <Footer />
        </div>
    )
}
