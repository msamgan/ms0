import { Link } from "@inertiajs/react"
import Footer from "@/Components/Footer"

export default function Guest({ children, title = "Welcome back", description = "Sign in to access your account and manage your shortened URLs" }) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 via-white to-gray-50">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <Link href="/" className="inline-block group">
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-4 shadow-lg transform group-hover:scale-105 transition-all duration-200 mb-4">
                                    <img src="/ms0_logo.png" className="w-20 h-20" alt="MS0 Logo" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">MS<span className="text-sky-600">0</span></h2>
                            </div>
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-800">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {description}
                        </p>
                    </div>

                    <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
                        {children}
                    </div>

                    {route().current("login") && (
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link href={route("register")} className="font-medium text-sky-600 hover:text-sky-500">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
