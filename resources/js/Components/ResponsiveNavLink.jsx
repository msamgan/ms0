import { Link } from "@inertiajs/react"

export default function ResponsiveNavLink({ active = false, className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-center ps-4 pe-4 py-3 border-l-4 ${
                active
                    ? "border-indigo-500 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 shadow-sm"
                    : "border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-50 hover:border-indigo-300 focus:text-indigo-600 focus:bg-gray-50 focus:border-indigo-300"
            } text-base font-medium focus:outline-none transition-all duration-200 ease-in-out rounded-r-md ${className}`}
        >
            {children}
        </Link>
    )
}
