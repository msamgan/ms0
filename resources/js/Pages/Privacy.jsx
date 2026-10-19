import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"
import Reveal from "@/Components/Home/Reveal"

const sections = [
    {
        title: "Information we collect",
        paragraphs: [
            "When you create an account, we collect your name and email address, a securely hashed password, and an API access token for authenticated API requests.",
            "When you create a short link, we store the destination URL and its short code. For each redirect, we update the link's visit count and most recent visit time."
        ]
    },
    {
        title: "How we use information",
        paragraphs: [
            "We use this information to provide and maintain MS0, authenticate your account and API requests, manage your links, show link activity, and protect the service from misuse. We may also use your email address for account-related messages such as verification and password resets."
        ]
    },
    {
        title: "Cookies and technical information",
        paragraphs: [
            "MS0 uses session cookies and related session data to support sign-in and secure interactions with the service. When you connect to the site, our hosting environment may also process technical request information, such as your IP address and browser user-agent, as part of operating and securing the service."
        ]
    },
    {
        title: "Sharing and external links",
        paragraphs: [
            "We do not sell your personal information. We may provide information to service providers that help us host, maintain, and secure MS0, or disclose it when required by law or necessary to protect the service and its users.",
            "A short link redirects to the destination URL supplied by its creator. The destination site is operated by someone else and has its own privacy practices."
        ]
    },
    {
        title: "Retention and your choices",
        paragraphs: [
            "We keep information for as long as needed to operate MS0, maintain links and accounts, meet legal obligations, and resolve disputes. You can update account information in your profile. To request access to, correction of, or deletion of personal information, contact us using the address below."
        ]
    },
    {
        title: "Security and changes",
        paragraphs: [
            "We use reasonable measures to protect information, but no online service can guarantee complete security. We may update this policy from time to time; the latest version will be published on this page."
        ]
    },
    {
        title: "Contact",
        paragraphs: [
            <>
                Questions or privacy requests? Email{" "}
                <a
                    href="mailto:support@ms0.io"
                    className="font-semibold text-accent-dark underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                >
                    support@ms0.io
                </a>
                .
            </>
        ]
    }
]

export default function Privacy() {
    const { auth } = usePage().props
    const user = auth.user

    return (
        <>
            <Head title="Privacy Policy" />
            <Header isAuthenticated={!!user} user={user} />

            <main className="bg-paper font-grotesk text-ink">
                <section className="border-b border-line" aria-labelledby="privacy-heading">
                    <div className="mx-auto max-w-grid px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-20 lg:px-16">
                        <Reveal className="mb-8 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:mb-12">
                            <span>01 / Privacy</span>
                            <span className="hidden sm:inline">MS0 / Policy</span>
                        </Reveal>

                        <div className="grid grid-cols-1 items-end gap-x-10 gap-y-10 lg:grid-cols-12">
                            <Reveal
                                as="h1"
                                id="privacy-heading"
                                className="font-editorial text-6xl leading-[1.05] sm:text-7xl lg:col-span-7 lg:text-8xl"
                            >
                                Your links.
                                <br />
                                Your privacy.
                            </Reveal>
                            <Reveal delay={80} className="lg:col-span-5 lg:border-l lg:border-line lg:pl-6">
                                <p className="max-w-md text-lg text-muted">
                                    This policy explains what information MS0 handles when you use our URL
                                    shortener, how we use it, and the choices available to you.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section className="border-b border-line" aria-label="Privacy policy details">
                    <div className="mx-auto max-w-grid px-6 py-8 md:px-10 md:py-12 lg:px-16">
                        {sections.map((section, index) => (
                            <article
                                key={section.title}
                                className="grid grid-cols-1 gap-x-10 gap-y-4 border-b border-line py-8 last:border-b-0 md:grid-cols-12 md:py-10"
                            >
                                <div className="md:col-span-4">
                                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                                        {String(index + 2).padStart(2, "0")} / MS0
                                    </p>
                                    <h2 className="max-w-sm text-2xl font-extrabold leading-tight sm:text-3xl">
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="space-y-4 text-sm leading-relaxed text-muted md:col-span-8 md:text-base">
                                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                                        <p key={paragraphIndex}>{paragraph}</p>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
