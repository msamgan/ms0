import { Link } from "@inertiajs/react"
import { useState } from "react"
import Dropdown from "@/Components/Dropdown"

export default function Header({ isAuthenticated = false, user = null }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const linkClass = "relative py-2 font-grotesk text-sm text-muted hover:text-ink transition-colors"
    const linkActiveClass =
        "relative py-2 font-grotesk text-sm text-ink after:absolute after:left-0 after:right-0 after:-bottom-px after:h-[2px] after:bg-accent"

    const mobileLinkClass =
        "flex w-full items-center justify-between px-6 py-4 font-grotesk text-base text-ink border-b border-line"

    const navItems = [
        { key: "home", href: route("home"), label: "Home", show: true },
        { key: "dashboard", href: route("dashboard"), label: "Dashboard", show: isAuthenticated },
        { key: "links", href: route("links"), label: "Links", show: isAuthenticated },
        { key: "register", href: route("register"), label: "Register", show: !isAuthenticated },
        { key: "login", href: route("login"), label: "Login", show: !isAuthenticated },
        { key: "status-codes", href: route("status-codes"), label: "Status codes", show: true },
        {
            key: "documentation.api",
            href: route("documentation.api"),
            label: "APIs",
            show: true,
            external: true
        }
    ].filter((item) => item.show)

    return (
        <header className="sticky top-0 z-50 bg-paper border-b border-line">
            <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 flex items-center justify-between h-16 sm:h-[72px]">
                <Link href={route("home")} className="flex items-center gap-3 group">
                    <img src="/ms0_logo.png" alt="MS0 logo" className="h-7 w-7" />
                    <span className="font-grotesk font-extrabold tracking-tight text-ink text-lg">
                        MS<span className="text-accent">0</span>
                        <span className="hidden sm:inline text-muted font-medium text-xs align-top ml-1 tracking-[0.18em] uppercase">
                            .org
                        </span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
                    {navItems.map((item) =>
                        item.external ? (
                            <a key={item.key} href={item.href} className={linkClass}>
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={route().current(item.key) ? linkActiveClass : linkClass}
                            >
                                {item.label}
                            </Link>
                        )
                    )}

                    {isAuthenticated && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 font-grotesk text-sm text-ink hover:text-accent-dark transition-colors"
                                >
                                    {user?.name}
                                    <svg
                                        className="h-3.5 w-3.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="bg-paper">
                                <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route("logout")} method="post" as="button">
                                    Log out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </nav>

                <button
                    onClick={() => setMobileMenuOpen((v) => !v)}
                    className="md:hidden inline-flex items-center justify-center h-10 w-10 text-ink"
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-paper border-t border-line">
                    {navItems.map((item) =>
                        item.external ? (
                            <a
                                key={item.key}
                                href={item.href}
                                className={mobileLinkClass}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={mobileLinkClass}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                    {isAuthenticated && (
                        <>
                            <Link
                                href={route("profile.edit")}
                                className={mobileLinkClass}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className={mobileLinkClass}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Log out
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}
