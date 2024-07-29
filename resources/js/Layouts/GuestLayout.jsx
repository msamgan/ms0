import { Link } from "@inertiajs/react"

export default function Guest({ children }) {
    return (
        <div className="flex flex-col sm:justify-center items-center bg-gray-100">
            <div>
                <Link href="/">
                    <img src="/ms0_logo.png" className="w-48 h-48" alt={"logo"} />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    )
}
