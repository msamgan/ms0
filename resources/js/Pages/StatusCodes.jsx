import { Head } from "@inertiajs/react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"

export default function StatusCodes({ isAuthenticated }) {
    return (
        <>
            <Head title="HTTP Status Codes" />
            <Header isAuthenticated={isAuthenticated} />

            <main className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-full lg:max-w-[100rem]">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                            HTTP Status Codes
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Test and understand how different HTTP status codes behave with our API.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* How it works Section */}
                        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2 text-sky-600"
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
                                How it works
                            </h2>
                            <div className="prose prose-sky text-gray-600">
                                <p>
                                    Our status code testing tool allows you to simulate various API responses by
                                    simply providing the desired HTTP status code.
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-4">
                                    <li>
                                        <strong>Request:</strong> Your browser sends a{" "}
                                        <span className="font-mono bg-green-200 rounded-lg p-1.5">
                                            GET|POST|PUT|PATCH|DELETE
                                        </span>{" "}
                                        request to our status endpoint with the code you specify.
                                    </li>
                                    <li>
                                        <strong>Processing:</strong> Our server receives the request and
                                        prepares a standardized JSON response.
                                    </li>
                                    <li>
                                        <strong>Response:</strong> The server returns the exact HTTP status code
                                        you requested along with a helpful message.
                                    </li>
                                </ul>
                                <div className="mt-6 flex items-center">
                                    <a
                                        href="/docs/api#/operations/status"
                                        className="text-sky-600 hover:text-sky-700 font-semibold flex items-center group transition-all duration-200"
                                    >
                                        Know more
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2 text-sky-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                API Usage
                            </h2>
                            <p className="text-gray-600 mb-4">You can use this feature directly via our API:</p>
                            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm text-gray-800 break-all mb-4">
                                <span className="font-mono bg-green-200 rounded-lg p-1.5">
                                    GET|POST|PUT|PATCH|DELETE
                                </span>{" "}
                                {window.location.origin}
                                /api/status/&#123;stausCode&#125;
                            </div>
                            <div className="flex items-center">
                                <a
                                    href={route("dashboard")}
                                    className="text-sky-600 hover:text-sky-700 font-semibold flex items-center group transition-all duration-200"
                                >
                                    Get API Token
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
