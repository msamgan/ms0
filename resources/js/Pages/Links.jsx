import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import UrlShortener from "@/Components/Home/UrlShortener"
import { Head } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function Links({ links = [], auth }) {
    const [notification, setNotification] = useState({})
    const [animateTable, setAnimateTable] = useState(false)

    useEffect(() => {
        setAnimateTable(true)
    }, [])

    const totalLinks = links.length
    const activeLinks = links.filter((link) => (link.status || "Active").toLowerCase() === "active").length
    const totalVisits = links.reduce((sum, link) => sum + Number(link.visits || 0), 0)

    const copyToClipboard = async (url, id) => {
        try {
            await navigator.clipboard.writeText(url)
            setNotification((prev) => ({ ...prev, [id]: true }))

            window.setTimeout(() => {
                setNotification((prev) => ({ ...prev, [id]: false }))
            }, 2000)
        } catch (error) {
            console.error("Clipboard copy failed", error)
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center border border-line bg-paper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-ink"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 5.17M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 18.83"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                                Link library
                            </p>
                            <h2 className="font-editorial text-3xl text-ink">Links</h2>
                        </div>
                    </div>

                    <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        01 / Inventory
                    </span>
                </div>
            }
        >
            <Head title="Links" />

            <main className="bg-paper font-grotesk text-ink">
                <section className="border-b border-line bg-paper">
                    <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 py-14 md:py-20">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-3xl">
                                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                                    01 / Link library
                                </p>
                                <h1 className="font-editorial text-5xl leading-none text-ink sm:text-6xl lg:text-[5rem]">
                                    Short links,
                                    <br />
                                    ready to ship.
                                </h1>
                            </div>

                            <div className="grid grid-cols-3 gap-4 sm:gap-6">
                                <div className="border-l border-line pl-4">
                                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                        Total
                                    </div>
                                    <div className="mt-2 font-grotesk text-2xl font-extrabold text-ink">
                                        {totalLinks}
                                    </div>
                                </div>
                                <div className="border-l border-line pl-4">
                                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                        Active
                                    </div>
                                    <div className="mt-2 font-grotesk text-2xl font-extrabold text-ink">
                                        {activeLinks}
                                    </div>
                                </div>
                                <div className="border-l border-line pl-4">
                                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                        Visits
                                    </div>
                                    <div className="mt-2 font-grotesk text-2xl font-extrabold text-ink">
                                        {totalVisits}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-line bg-paper">
                    <div className="mx-auto max-w-grid px-6 py-12 md:px-10 md:py-16 lg:px-16">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-20">
                            <div>
                                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                                    02 / Create link
                                </p>
                                <h2 className="font-editorial text-4xl leading-none text-ink sm:text-5xl">
                                    Shorten a new URL.
                                </h2>
                                <p className="mt-5 max-w-md text-sm leading-6 text-muted">
                                    Turn a long URL into a link that is ready to share and track.
                                </p>
                            </div>

                            <UrlShortener />
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 py-12 md:py-20">
                    {links.length === 0 ? (
                        <div className="border border-line bg-paper px-6 py-12 text-center">
                            <p className="font-grotesk text-xl text-ink">No links created yet.</p>
                            <p className="mt-2 text-sm text-muted">
                                Start by shortening a URL from the home page and it will appear here.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                                03 / Link Data
                            </p>
                            <div className="overflow-hidden border border-line bg-paper">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border-collapse">
                                        <thead className="bg-ink text-paper">
                                            <tr>
                                                <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                                                    Original
                                                </th>
                                                <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                                                    Short link
                                                </th>
                                                <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                                                    Visits
                                                </th>
                                                <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                                                    Last visited
                                                </th>
                                                <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-line bg-paper">
                                            {links.map((link, index) => {
                                                const rowId =
                                                    link.id ?? `${link.shortened_url ?? "short"}-${index}`
                                                const status =
                                                    (link.status || "Active").toLowerCase() === "active"
                                                        ? "Active"
                                                        : "Inactive"
                                                const isActive = status === "Active"

                                                return (
                                                    <tr
                                                        key={rowId}
                                                        className={`transition-all duration-300 ${
                                                            animateTable
                                                                ? "translate-y-0 opacity-100"
                                                                : "translate-y-4 opacity-0"
                                                        }`}
                                                        style={{ transitionDelay: `${index * 50}ms` }}
                                                    >
                                                        <td className="max-w-[26rem] px-5 py-5 align-top">
                                                            <a
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="block break-all font-grotesk text-sm text-ink underline decoration-line decoration-1 underline-offset-4 hover:text-accent"
                                                            >
                                                                {link.url}
                                                            </a>
                                                        </td>

                                                        <td className="px-5 py-5 align-top">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    copyToClipboard(link.shortened_url, rowId)
                                                                }
                                                                className="group inline-flex items-center gap-3 rounded-none border border-line bg-paper px-3 py-2 text-left transition-colors hover:border-ink hover:bg-white"
                                                            >
                                                                <span className="font-mono text-sm text-ink">
                                                                    {link.shortened_url}
                                                                </span>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`h-4 w-4 transition-colors ${
                                                                        notification[rowId]
                                                                            ? "text-accent"
                                                                            : "text-muted group-hover:text-ink"
                                                                    }`}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth={1.8}
                                                                >
                                                                    {notification[rowId] ? (
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    ) : (
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h6A2.25 2.25 0 0 1 19.5 9.75v6A2.25 2.25 0 0 1 17.25 18h-6A2.25 2.25 0 0 1 9 15.75v-6Zm-4.5 1.5A2.25 2.25 0 0 1 6.75 9h6A2.25 2.25 0 0 1 15 11.25v6A2.25 2.25 0 0 1 12.75 19.5h-6A2.25 2.25 0 0 1 4.5 17.25v-6Z"
                                                                        />
                                                                    )}
                                                                </svg>
                                                            </button>
                                                        </td>

                                                        <td className="px-5 py-5 align-top text-sm text-ink">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                                                    Views
                                                                </span>
                                                                <span className="font-grotesk text-base font-semibold">
                                                                    {link.visits || 0}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="px-5 py-5 align-top text-sm text-muted">
                                                            {link.last_visit || "Never"}
                                                        </td>

                                                        <td className="px-5 py-5 align-top">
                                                            <span
                                                                className={`inline-flex items-center border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                                                                    isActive
                                                                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                                                        : "border-red-200 bg-red-50 text-red-700"
                                                                }`}
                                                            >
                                                                {status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </AuthenticatedLayout>
    )
}
