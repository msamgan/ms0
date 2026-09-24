import { Head, Link, usePage } from "@inertiajs/react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"
import Reveal from "@/Components/Home/Reveal"
import ArrowIcon from "@/Components/Home/ArrowIcon"

const REQUEST_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"]

const STATUS_GROUPS = [
    { code: "2xx", label: "Success", description: "The request was received and handled successfully." },
    { code: "3xx", label: "Redirects", description: "The client needs to take another step to complete the request." },
    { code: "4xx", label: "Client errors", description: "Something about the request needs attention." },
    { code: "5xx", label: "Server errors", description: "The server could not complete a valid request." }
]

export default function StatusCodes() {
    const { auth } = usePage().props
    const isAuthenticated = !!auth.user
    const user = auth.user

    return (
        <>
            <Head title="HTTP Status Codes" />
            <Header isAuthenticated={isAuthenticated} user={user} />

            <main className="bg-paper font-grotesk text-ink">
                <section className="border-b border-line" aria-labelledby="status-codes-heading">
                    <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 pt-16 md:pt-20 pb-20 md:pb-28">
                        <Reveal className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-8 md:mb-12">
                            <span>01 / HTTP utility</span>
                            <span className="hidden sm:inline">ms0.org / status</span>
                        </Reveal>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 items-end">
                            <Reveal
                                as="h1"
                                id="status-codes-heading"
                                className="lg:col-span-7 font-editorial text-6xl sm:text-7xl lg:text-8xl leading-[1.05]"
                            >
                                Speak
                                <br />
                                in codes.
                            </Reveal>

                            <Reveal delay={80} className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-line">
                                <p className="text-lg text-muted max-w-md">
                                    Test HTTP responses in your browser or call the endpoint directly from your
                                    application.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section className="border-b border-line" aria-labelledby="how-it-works-heading">
                    <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 py-20 md:py-28">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
                            <div className="lg:col-span-4">
                                <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-8">
                                    02 / How it works
                                </Reveal>
                                <Reveal
                                    as="h2"
                                    id="how-it-works-heading"
                                    className="font-grotesk font-extrabold text-4xl sm:text-5xl leading-[1.05] max-w-sm"
                                >
                                    One endpoint. Every response.
                                </Reveal>
                            </div>

                            <div className="lg:col-span-8">
                                <Reveal className="border-t border-line">
                                    <p className="text-muted max-w-2xl py-7 text-lg leading-relaxed">
                                        Send a request with the status code you want to simulate. MS0 returns that
                                        exact code with a predictable JSON response, making it easy to build and
                                        verify loading, error, and edge-case states.
                                    </p>
                                </Reveal>

                                <ol className="border-t border-line">
                                    {[
                                        ["01", "Request", "Choose a method and status code."],
                                        ["02", "Process", "Our server prepares a standard response."],
                                        ["03", "Response", "Your client receives the requested code."]
                                    ].map(([number, title, body]) => (
                                        <Reveal
                                            as="li"
                                            key={number}
                                            className="grid grid-cols-[3rem_7rem_1fr] gap-4 sm:grid-cols-[4rem_9rem_1fr] items-baseline py-5 border-b border-line"
                                        >
                                            <span className="font-mono text-xs text-muted">{number}</span>
                                            <h3 className="font-semibold">{title}</h3>
                                            <p className="text-sm text-muted">{body}</p>
                                        </Reveal>
                                    ))}
                                </ol>

                                <Reveal delay={120} className="pt-7">
                                    <a
                                        href="/docs/api#/operations/status"
                                        className="group inline-flex items-center gap-3 font-semibold text-accent-dark hover:text-ink transition-colors"
                                    >
                                        Read the API documentation
                                        <ArrowIcon />
                                    </a>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-line" aria-labelledby="api-usage-heading">
                    <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 py-20 md:py-28">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
                            <div className="lg:col-span-4">
                                <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-8">
                                    03 / API usage
                                </Reveal>
                                <Reveal
                                    as="h2"
                                    id="api-usage-heading"
                                    className="font-grotesk font-extrabold text-4xl leading-[1.05] max-w-xs"
                                >
                                    Drop it into your request.
                                </Reveal>
                            </div>

                            <div className="lg:col-span-8">
                                <Reveal className="bg-ink text-paper p-6 sm:p-8">
                                    <div className="flex flex-wrap gap-2 mb-8" aria-label="Supported HTTP methods">
                                        {REQUEST_METHODS.map((method) => (
                                            <span
                                                key={method}
                                                className="border border-paper/25 px-2 py-1 font-mono text-[10px] tracking-[0.12em]"
                                            >
                                                {method}
                                            </span>
                                        ))}
                                    </div>
                                    <code className="block overflow-x-auto whitespace-nowrap p-0 bg-transparent text-sm text-black">
                                        <span className="text-accent">GET</span>{" "}
                                        {typeof window !== "undefined" ? window.location.origin : "https://ms0.org"}
                                        /api/status/&#123;statusCode&#125;
                                    </code>
                                    <p className="mt-8 max-w-lg text-sm leading-relaxed text-paper/60">
                                        Replace <span className="font-mono text-paper/90">statusCode</span> with
                                        any valid HTTP status code your client needs to handle.
                                    </p>
                                </Reveal>

                                <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-line">
                                    {STATUS_GROUPS.map((group, index) => (
                                        <Reveal
                                            key={group.code}
                                            delay={index * 60}
                                            className="py-6 sm:pr-8 border-b sm:odd:border-r border-line last:border-b-0 sm:last:border-b"
                                        >
                                            <span className="font-mono text-xs text-accent-dark">{group.code}</span>
                                            <h3 className="font-semibold mt-3 mb-1">{group.label}</h3>
                                            <p className="text-sm text-muted leading-relaxed">{group.description}</p>
                                        </Reveal>
                                    ))}
                                </div>

                                <Reveal delay={120} className="pt-7">
                                    <Link
                                        href={route("dashboard")}
                                        className="group inline-flex items-center gap-3 font-semibold text-accent-dark hover:text-ink transition-colors"
                                    >
                                        Get an API token
                                        <ArrowIcon />
                                    </Link>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
