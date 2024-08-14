import {Link} from "@inertiajs/react"

export default function Header({isAuthenticated = false}) {
    const linkClass = "flex items-center px-4 -mb-1 border-b-2 border-transparent"
    const linkActiveClass = "flex items-center px-4 -mb-1 border-b-2 border-indigo-400"

    return (
        <header className="p-4 bg-gray-100 text-gray-800">
            <div className="container flex justify-center h-16 mx-auto max-w-4xl">
                <ul className="items-stretch hidden md:flex">
                    <li className="flex">
                        <Link
                            rel="noopener noreferrer"
                            href={route("home")}
                            className={route().current("home") ? linkActiveClass : linkClass}
                        >
                            Home
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <li className="flex">
                            <Link
                                rel="noopener noreferrer"
                                href={route("dashboard")}
                                className={route().current("register") ? linkActiveClass : linkClass}
                            >
                                Dashboard
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li className="flex">
                                <Link
                                    rel="noopener noreferrer"
                                    href={route("register")}
                                    className={route().current("register") ? linkActiveClass : linkClass}
                                >
                                    Register
                                </Link>
                            </li>
                            <li className="flex">
                                <Link
                                    rel="noopener noreferrer"
                                    href={route("login")}
                                    className={route().current("login") ? linkActiveClass : linkClass}
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                    <li className="flex">
                        <a
                            rel="noopener noreferrer"
                            href={route("documentation.api")}
                            className={route().current("documentation.api") ? linkActiveClass : linkClass}
                        >
                            APIs
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    )
}
