import { Link } from "@inertiajs/react"

export default function Header() {
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
                    <li className="flex">
                        <Link
                            rel="noopener noreferrer"
                            href={route("api_docs")}
                            className={route().current("api_docs") ? linkActiveClass : linkClass}
                        >
                            APIs
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
