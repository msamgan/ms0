import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"
import Hero from "@/Components/Home/Hero"
import Features from "@/Components/Home/Features"
import Process from "@/Components/Home/Process"
import AccountPanel from "@/Components/Home/AccountPanel"

/**
 * Homepage design system (editorial / Swiss / technical utility):
 *  - Type:  font-editorial (DM Serif Display, hero + closing statements only),
 *           font-grotesk (Manrope, all UI copy and headings),
 *           font-mono (JetBrains Mono, URLs / metadata / technical labels)
 *  - Color: paper (#F5F3ED bg) / ink (#111111 text) / muted (secondary text)
 *           / line (hairline borders) / accent (#E33B2E, used sparingly)
 *  - Grid:  max-w-grid (1400px) container, consistent px-6/10/16 margins
 *  - Shape: sharp corners everywhere, no cards/shadows - hierarchy comes
 *           from type, spacing, rules and a 12-column grid instead.
 */
export default function Welcome() {
    const { auth } = usePage().props
    const isAuthenticated = !!auth.user
    const user = auth.user

    return (
        <>
            <Head title="Welcome" />
            <Header isAuthenticated={isAuthenticated} user={user} />

            <main className="bg-paper font-grotesk">
                <Hero />
                <Features />
                <Process />
                <AccountPanel isAuthenticated={isAuthenticated} user={user} />
            </main>

            <Footer />
        </>
    )
}
