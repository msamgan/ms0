import { Head } from "@inertiajs/react"
import { useState, useEffect } from "react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"

export default function Welcome({ isAuthenticated, user }) {
    const [url, setUrl] = useState("")
    const [error, setError] = useState(null)
    const [shortUrl, setShortUrl] = useState(null)
    const [notification, setNotification] = useState("click the link to copy")
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Set isLoaded to true after component mounts to trigger animations
        setIsLoaded(true)
    }, [])

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
                    setShortUrl(response.data.shot_url)
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
            <Header isAuthenticated={isAuthenticated} />

            <section className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 mb-28 py-12">
                <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-10 lg:px-32 max-w-4xl">
                    <div className={`mb-8 transform hover:scale-105 transition-transform duration-300 ${isLoaded ? 'animate-float' : 'opacity-0'}`}>
                        <img src="/ms0_logo.png" className="w-48 h-48 drop-shadow-xl" alt={"logo"} />
                    </div>
                    <h1 className={`text-4xl font-bold leading-tight sm:text-5xl mb-6 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                        You know what to do,
                        <span className="text-primary bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent"> right?</span>
                    </h1>
                    <fieldset className={`w-full space-y-3 text-gray-800 mt-8 bg-white p-8 rounded-xl shadow-lg ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                        <div className="flex">
                            <input
                                type="text"
                                name="url"
                                id="url"
                                placeholder="Paste your URL here"
                                autoFocus={true}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex flex-1 border text-lg rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-transparent border-gray-300 text-gray-800 bg-white transition-all duration-200"
                            />
                        </div>
                        <p className="py-2 text-sm text-start text-gray-600 italic">
                            All URLs will be deactivated after 6 months of inactivity.
                        </p>
                        <div className="flex flex-wrap justify-end">
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-200"
                            >
                                Shorten
                            </button>
                        </div>
                    </fieldset>

                    <div className={"mt-8 w-full"}>
                        {error && (
                            <div className="flex items-center rounded-lg shadow-lg overflow-hidden relative bg-white border border-red-200 text-gray-800 w-full animate-fadeIn">
                                <div className="self-stretch flex items-center px-4 flex-shrink-0 bg-gradient-to-b from-red-500 to-red-600">
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
                                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200">
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
                            <div className={"w-full"}>
                                <div className="flex items-center justify-between p-6 rounded-lg shadow-lg border-l-4 border-sky-600 bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-200">
                                    <span
                                        className={"cursor-pointer text-lg font-semibold text-start text-sky-700 hover:text-sky-800 transition-colors duration-200 flex items-center"}
                                        onClick={() => {
                                            navigator.clipboard.writeText(shortUrl)
                                            setNotification("Copied to clipboard!")

                                            setTimeout(() => {
                                                setNotification("Click the link to copy")
                                            }, 3000)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        {shortUrl}
                                    </span>
                                </div>
                                <div className="text-gray-600 text-sm mt-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {notification}
                                </div>
                            </div>
                        )}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex flex-col justify-start text-start py-12 mt-4">
                            <div className={`bg-white rounded-xl shadow-lg p-8 border-t-4 border-sky-600 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
                                <h2 className="text-3xl font-bold sm:text-4xl text-gray-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Welcome, {user.name}!
                                </h2>
                                <p className="text-lg mt-5 text-gray-600 leading-relaxed">
                                    We're delighted to have you here. You now have access to our premium features:
                                </p>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-sky-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Track Your Links</h3>
                                            <p className="text-gray-600">Monitor usage statistics and performance of your shortened URLs.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-sky-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Reactivate Links</h3>
                                            <p className="text-gray-600">Restore inactive links with a single click, anytime you need.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-start text-start py-12 mt-4">
                            <div className={`bg-white rounded-xl shadow-lg p-8 border-t-4 border-sky-600 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
                                <h2 className="text-3xl font-bold sm:text-4xl text-gray-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Why Register?
                                </h2>
                                <p className="text-lg mt-4 text-gray-600">
                                    Create an account to unlock premium features and enhance your URL shortening experience:
                                </p>
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                                        <div className="flex-shrink-0 bg-sky-100 rounded-full p-2 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">API Access</h3>
                                            <p className="text-gray-600">Get exclusive access to our API for integrating URL shortening into your applications.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                                        <div className="flex-shrink-0 bg-sky-100 rounded-full p-2 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Link Analytics</h3>
                                            <p className="text-gray-600">Track click counts, usage patterns, and performance metrics for all your shortened URLs.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                                        <div className="flex-shrink-0 bg-sky-100 rounded-full p-2 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Link Reactivation</h3>
                                            <p className="text-gray-600">Reactivate expired links at any time, ensuring your shortened URLs never permanently disappear.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                                        <div className="flex-shrink-0 bg-sky-100 rounded-full p-2 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Link Management</h3>
                                            <p className="text-gray-600">Organize, search, and manage all your shortened links from a convenient dashboard.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <a href={route("register")} className={`px-6 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-200 inline-flex items-center ${isLoaded ? 'animate-pulse-slow' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Register Now
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
