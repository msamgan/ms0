import { Link } from "@inertiajs/react"

export default function ResponsiveNavLink({ active = false, className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-center ps-4 pe-4 py-3 border-l-4 ${
                active
                    ? "border-sky-500 text-sky-700 focus:text-sky-800 focus:border-sky-700"
                    : "border-transparent text-gray-600 hover:text-sky-600 hover:bg-gray-50 hover:border-sky-300 focus:text-sky-600 focus:bg-gray-50 focus:border-sky-300"
            } text-base font-medium focus:outline-none transition-all duration-200 ease-in-out rounded-r-md ${className}`}
        >
            {children}
        </Link>
    )
}
