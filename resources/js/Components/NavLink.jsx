import { Link } from "@inertiajs/react"

export default function NavLink({ active = false, className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-4 pt-1 pb-1 border-b-2 text-lg font-medium leading-5 transition-all duration-200 ease-in-out focus:outline-none rounded-t-md " +
                (active
                    ? "border-indigo-500 text-indigo-600 bg-indigo-50 focus:border-indigo-700 shadow-sm "
                    : "border-transparent text-gray-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-gray-50 focus:text-indigo-600 focus:border-indigo-300 ") +
                className
            }
        >
            {children}
        </Link>
    )
}
