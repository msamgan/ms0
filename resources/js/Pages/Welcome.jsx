import { Head, usePage } from "@inertiajs/react"
import { useState } from "react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"

export default function Welcome() {
    const { auth } = usePage().props
    const isAuthenticated = !!auth.user
    const user = auth.user
    const [url, setUrl] = useState("")
    const [error, setError] = useState(null)
    const [shortUrl, setShortUrl] = useState(null)
    const [notification, setNotification] = useState("click the link to copy")

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)
        setShortUrl(null)

        if (!url) {
            setError("Url is required")

            setTimeout(() => {
                setError(null)
            }, 3000)

            return
        }

        try {
            const fccUrl = new URL(url)
            axios
                .post(route("service.shorten"), {
                    url: fccUrl.href
                })
                .then((response) => {
                    setShortUrl(response.data.short_url)
                })
        } catch (e) {
            setError("Invalid Url")

            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }

    return (
        <>
            <Head title="Welcome" />
            <Header isAuthenticated={isAuthenticated} user={user} />

            <section className="bg-white text-gray-800 py-20">
                <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-full lg:max-w-[100rem]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="mb-6">
                                <img src="/ms0_logo.png" className="w-24 h-24 drop-shadow-xl" alt={"logo"} />
                            </div>
                            <h1 className="leading-tight mb-6">
                                Simplify Your Links
                                <span className="block mt-2 text-sky-600">Work with Confidence</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-10">
                                Transform long, complex URLs into short, memorable links and test your API with our new HTTP status code feature.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="url"
                                    id="url"
                                    placeholder="Paste your URL here"
                                    autoFocus={true}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full border text-base sm:text-lg rounded-xl px-6 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent border-gray-200 text-gray-800 bg-gray-50"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="w-full px-8 py-2 text-base font-bold rounded-xl bg-sky-600 text-white shadow-md hover:shadow-lg flex-shrink-0"
                                >
                                    <span className="flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
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
                                        Shorten URL
                                    </span>
                                </button>
                            </div>
                            <p className="py-2 text-sm text-start text-gray-500 mt-2">
                                All URLs will be deactivated after 6 months of inactivity.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 max-w-7xl mx-auto px-4 md:px-6">
                        {error && (
                            <div className="flex items-center rounded-xl shadow-lg overflow-hidden relative bg-white border border-red-200 text-gray-800 w-full">
                                <div className="self-stretch flex items-center px-4 flex-shrink-0 bg-red-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        className="h-8 w-8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="p-5 flex-1">
                                    <h3 className="text-xl font-bold text-start text-gray-800">Error</h3>
                                    <p className="text-lg text-red-600 font-medium text-start mt-1">{error}</p>
                                </div>
                                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        )}

                        {shortUrl && (
                            <div className="w-full">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-sky-100 text-gray-800 hover:bg-gray-50">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <span
                                            className="cursor-pointer text-lg font-semibold text-sky-700 hover:text-sky-800 flex items-center"
                                            onClick={() => {
                                                navigator.clipboard.writeText(shortUrl)
                                                setNotification("Copied to clipboard!")

                                                setTimeout(() => {
                                                    setNotification("Click the link to copy")
                                                }, 3000)
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2 text-sky-500 flex-shrink-0"
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
                                            <span className="break-all">{shortUrl}</span>
                                        </span>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(shortUrl)
                                                setNotification("Copied to clipboard!")
                                                setTimeout(() => {
                                                    setNotification("Click the link to copy")
                                                }, 3000)
                                            }}
                                            className="px-4 py-2 text-sm font-medium rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 flex items-center justify-center flex-shrink-0"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                                />
                                            </svg>
                                            Copy
                                        </button>
                                    </div>
                                    <div className="text-gray-600 text-sm mt-3 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {notification}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="py-24 max-w-7xl mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                                Powerful Features for Everyone
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                Everything you need to manage your links effectively in one place.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div className="bg-sky-50 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-sky-600 transition-colors duration-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-sky-600 group-hover:text-white transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Instantly create short links with our optimized high-performance engine.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div className="bg-sky-50 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-sky-600 transition-colors duration-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-sky-600 group-hover:text-white transition-colors duration-300"
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
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Status Codes</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Professional tools to test and verify HTTP status codes for your Frontend
                                    development.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div className="bg-sky-50 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-sky-600 transition-colors duration-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-sky-600 group-hover:text-white transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Enterprise-grade security ensuring your links are always protected and
                                    available.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div className="bg-sky-50 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-sky-600 transition-colors duration-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-sky-600 group-hover:text-white transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Detailed insights and click tracking to understand your audience better.
                                </p>
                            </div>
                        </div>
                    </div>

                    {isAuthenticated ? (
                        <div className="max-w-7xl mx-auto mb-16 px-4 md:px-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center mb-6">
                                    <div className="bg-sky-100 rounded-full p-3 mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-sky-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-800">Welcome, {user.name}!</h2>
                                </div>

                                <p className="text-gray-600 mb-8">
                                    We're delighted to have you here. You have full access to our premium
                                    features:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">HTTP Status Codes</h3>
                                                <p className="text-gray-600">
                                                    Test various HTTP status codes and their messages directly
                                                    through our testing utility.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">Track Your Links</h3>
                                                <p className="text-gray-600">
                                                    Monitor usage statistics and performance of your shortened
                                                    URLs with our advanced analytics dashboard.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">Reactivate Links</h3>
                                                <p className="text-gray-600">
                                                    Restore inactive links with a single click, ensuring your
                                                    shortened URLs never permanently disappear.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
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
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">API Access</h3>
                                                <p className="text-gray-600">
                                                    Integrate our URL shortening service directly into your
                                                    applications with our developer-friendly API.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">Link Management</h3>
                                                <p className="text-gray-600">
                                                    Organize, search, and manage all your shortened links from a
                                                    convenient and intuitive dashboard.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <a
                                        href={route("dashboard")}
                                        className="px-8 py-4 text-base font-semibold rounded-xl bg-sky-600 text-white shadow-md hover:shadow-lg inline-flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
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
                                        Go to Dashboard
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto mb-16 px-4 md:px-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center mb-6">
                                    <div className="bg-sky-100 rounded-full p-3 mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-sky-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-800">Why Create an Account?</h2>
                                </div>

                                <p className="text-gray-600 mb-8">
                                    Create a free account to unlock premium features and enhance your URL
                                    shortening experience:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
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
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">API Access</h3>
                                                <p className="text-gray-600">
                                                    Get exclusive access to our API for integrating URL
                                                    shortening into your applications and services.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">Link Analytics</h3>
                                                <p className="text-gray-600">
                                                    Track click counts, usage patterns, and performance metrics
                                                    for all your shortened URLs.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">Link Reactivation</h3>
                                                <p className="text-gray-600">
                                                    Reactivate expired links at any time, ensuring your
                                                    shortened URLs never permanently disappear.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start">
                                            <div className="bg-sky-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-sky-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 mb-2">Link Management</h3>
                                                <p className="text-gray-600">
                                                    Organize, search, and manage all your shortened links from a
                                                    convenient and intuitive dashboard.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a
                                        href={route("register")}
                                        className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-sky-600 text-white shadow-md hover:shadow-lg inline-flex items-center justify-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        Register Now
                                    </a>
                                    <a
                                        href={route("login")}
                                        className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 shadow-sm hover:shadow inline-flex items-center justify-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
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
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}
