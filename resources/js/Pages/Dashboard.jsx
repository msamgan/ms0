import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { useState, useEffect } from "react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import alertify from "alertifyjs"

export default function Dashboard({ auth, token, linkCount, visits }) {
    const [notification, setNotification] = useState("Click to copy token")
    const [isTokenVisible, setIsTokenVisible] = useState(false)
    const [animateStats, setAnimateStats] = useState(false)

    // Trigger animation when component mounts
    useEffect(() => {
        setAnimateStats(true)
    }, [])

    // Function to mask token
    const maskToken = (token) => {
        if (!token) return "";
        const firstPart = token.substring(0, 8);
        const lastPart = token.substring(token.length - 8);
        return `${firstPart}...${lastPart}`;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* Stats Section */}
            <div className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Overview</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Active Links Card */}
                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-sky-500 p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-gray-500 text-sm font-medium uppercase">Active Links</p>
                                        <div className="flex items-baseline">
                                            <p className="text-3xl font-bold text-gray-900">{linkCount}</p>
                                            <p className="ml-2 text-sm text-gray-500">total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-sky-500 h-1"></div>
                        </div>

                        {/* Total Visits Card */}
                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-emerald-500 p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-gray-500 text-sm font-medium uppercase">Total Visits</p>
                                        <div className="flex items-baseline">
                                            <p className="text-3xl font-bold text-gray-900">{visits}</p>
                                            <p className="ml-2 text-sm text-gray-500">clicks</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-emerald-500 h-1"></div>
                        </div>

                        {/* Average CTR Card (Placeholder) */}
                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-amber-500 p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-gray-500 text-sm font-medium uppercase">Avg. CTR</p>
                                        <div className="flex items-baseline">
                                            <p className="text-3xl font-bold text-gray-900">{linkCount > 0 ? Math.round((visits / linkCount) * 10) / 10 : 0}</p>
                                            <p className="ml-2 text-sm text-gray-500">per link</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-amber-500 h-1"></div>
                        </div>

                        {/* Last 24h Activity (Placeholder) */}
                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-purple-500 p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-gray-500 text-sm font-medium uppercase">Last 24h</p>
                                        <div className="flex items-baseline">
                                            <p className="text-3xl font-bold text-gray-900">--</p>
                                            <p className="ml-2 text-sm text-gray-500">visits</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-500 h-1"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Token Section */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-gray-900">API Access Token</h3>
                                </div>
                                <div>
                                    <button
                                        onClick={() => setIsTokenVisible(!isTokenVisible)}
                                        className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center"
                                    >
                                        {isTokenVisible ? (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                                Hide Token
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Show Token
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-2 mb-4">
                                <div
                                    onClick={() => {
                                        navigator.clipboard.writeText(token)
                                        setNotification("Copied to clipboard!")
                                        setTimeout(() => {
                                            setNotification("Click to copy token")
                                        }, 2000)
                                    }}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                                >
                                    <span>{isTokenVisible ? token : maskToken(token)}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{notification}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">Use this token to authenticate API requests</p>
                                <PrimaryButton
                                    onClick={() => {
                                        alertify.confirm(
                                            "Regenerate API Token",
                                            "This will invalidate the current token and generate a new one. All applications using the current token will need to be updated.",
                                            function () {
                                                axios.post(route("service.regenerate-token"), {}).then(() => {
                                                    window.location.reload()
                                                })
                                            },
                                            function () {
                                                // alertify.error('Cancel')
                                            }
                                        ).set('labels', {ok:'Regenerate', cancel:'Cancel'})
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Regenerate Token
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
