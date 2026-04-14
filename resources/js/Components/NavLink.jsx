import { Link } from "@inertiajs/react"

export default function NavLink({ active = false, className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-4 pt-1 pb-1 border-b-2 text-base font-medium transition-all duration-200 ease-in-out focus:outline-none rounded-t-md " +
                (active
                    ? "border-sky-500 text-sky-600 focus:border-sky-700 "
                    : "border-transparent text-gray-500 hover:text-sky-600 hover:border-sky-300 focus:text-sky-600 focus:border-sky-300 ") +
                className
            }
        >
            {children}
        </Link>
    )
}
