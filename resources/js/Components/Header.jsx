import { Link } from "@inertiajs/react"
import { useState } from "react"
import Dropdown from "@/Components/Dropdown"

export default function Header({ isAuthenticated = false, user = null }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const linkClass =
        "flex items-center px-4 h-full text-gray-700 hover:text-sky-600 font-medium transition-colors"
    const linkActiveClass = "flex items-center px-4 h-full text-sky-600 font-semibold border-b-2 border-sky-500"

    const mobileLinkClass =
        "flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-sky-600 font-medium transition-colors"
    const mobileLinkActiveClass =
        "flex items-center w-full px-4 py-3 text-sky-600 font-semibold border-l-4 border-sky-500"

    return (
        <header className="px-4 md:px-6 bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="container flex justify-between items-center h-14 mx-auto max-w-7xl">
                <div className="flex items-center">
                    <Link href={route("home")} className="flex items-center group">
                        <div className="rounded-lg p-2">
                            <img src="/ms0_logo.png" alt="MS0 Logo" className="h-8 w-8" />
                        </div>
                        <span className="font-bold text-gray-800 ml-3">
                            MS<span className="text-sky-600">0</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex items-center h-full">
                    {/* Desktop Navigation */}
                    <ul className="items-stretch hidden md:flex space-x-1 h-full">
                        <li className="flex">
                            <Link
                                href={route("home")}
                                className={route().current("home") ? linkActiveClass : linkClass}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                                    />
                                </svg>
                                Home
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className="flex">
                                    <Link
                                        href={route("dashboard")}
                                        className={route().current("dashboard") ? linkActiveClass : linkClass}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="flex">
                                    <Link
                                        href={route("links")}
                                        className={route().current("links") ? linkActiveClass : linkClass}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            />
                                        </svg>
                                        Links
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="flex">
                                    <Link
                                        href={route("register")}
                                        className={route().current("register") ? linkActiveClass : linkClass}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                            />
                                        </svg>
                                        Register
                                    </Link>
                                </li>
                                <li className="flex">
                                    <Link
                                        href={route("login")}
                                        className={route().current("login") ? linkActiveClass : linkClass}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="flex">
                            <Link
                                href={route("status-codes")}
                                className={route().current("status-codes") ? linkActiveClass : linkClass}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                                Status Codes
                            </Link>
                        </li>
                        <li className="flex">
                            <a
                                href={route("documentation.api")}
                                className={route().current("documentation.api") ? linkActiveClass : linkClass}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                APIs
                            </a>
                        </li>
                        {isAuthenticated ? (
                            <li className="flex items-center ml-4">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-sky-600 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user?.name}
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route("logout")} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                        ) : (
                            <></>
                        )}
                    </ul>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center p-2 rounded-lg hover:bg-gray-100"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-40">
                    <ul className="flex flex-col py-2">
                        <li>
                            <Link
                                href={route("home")}
                                className={route().current("home") ? mobileLinkActiveClass : mobileLinkClass}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                                    />
                                </svg>
                                Home
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className={
                                            route().current("dashboard")
                                                ? mobileLinkActiveClass
                                                : mobileLinkClass
                                        }
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("links")}
                                        className={
                                            route().current("links") ? mobileLinkActiveClass : mobileLinkClass
                                        }
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            />
                                        </svg>
                                        Links
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("profile.edit")}
                                        className={
                                            route().current("profile.edit")
                                                ? mobileLinkActiveClass
                                                : mobileLinkClass
                                        }
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className={mobileLinkClass}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href={route("register")}
                                        className={
                                            route().current("register")
                                                ? mobileLinkActiveClass
                                                : mobileLinkClass
                                        }
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                            />
                                        </svg>
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("login")}
                                        className={
                                            route().current("login") ? mobileLinkActiveClass : mobileLinkClass
                                        }
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <a
                                href={route("documentation.api")}
                                className={
                                    route().current("documentation.api")
                                        ? mobileLinkActiveClass
                                        : mobileLinkClass
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                APIs
                            </a>
                        </li>
                        <li>
                            <Link
                                href={route("status-codes")}
                                className={
                                    route().current("status-codes") ? mobileLinkActiveClass : mobileLinkClass
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                                Status Codes
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
