import { Head } from "@inertiajs/react"
import { useState } from "react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"

export default function StatusCodes({ isAuthenticated }) {
    const [statusCode, setStatusCode] = useState("")
    const [statusResponse, setStatusResponse] = useState(null)

    const handleStatusTest = (e) => {
        e.preventDefault()
        setStatusResponse(null)

        if (!statusCode) {
            return
        }

        axios
            .get(route("service.status", { statusCode }))
            .then((response) => {
                setStatusResponse(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setStatusResponse(error.response.data)
                }
            })
    }

    return (
        <>
            <Head title="HTTP Status Codes" />
            <Header isAuthenticated={isAuthenticated} />

            <main className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-full lg:max-w-[100rem]">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">HTTP Status Codes</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Test and understand how different HTTP status codes behave with our API.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Test Section */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Test HTTP Status Codes</h2>
                            </div>
                            <p className="text-gray-600 mb-8">
                                Enter an HTTP status code below to see the JSON response returned by our
                                service. This helps you debug how your application handles different API
                                responses.
                            </p>

                            <form onSubmit={handleStatusTest} className="flex flex-col sm:flex-row gap-4 mb-8">
                                <input
                                    type="number"
                                    placeholder="e.g. 200, 404, 500"
                                    value={statusCode}
                                    onChange={(e) => setStatusCode(e.target.value)}
                                    className="w-full sm:w-1/2 border text-lg rounded-xl px-6 py-3 focus:ring-2 focus:ring-sky-500 focus:border-transparent border-gray-200 text-gray-800 bg-gray-50"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-3 text-lg font-bold rounded-xl bg-sky-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0"
                                >
                                    Test Status
                                </button>
                            </form>

                            {statusResponse && (
                                <div className="mt-8">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                        Response Body
                                    </h3>
                                    <div className="p-6 bg-gray-900 rounded-xl text-green-400 font-mono text-sm overflow-x-auto shadow-inner">
                                        <pre>{JSON.stringify(statusResponse, null, 2)}</pre>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* How it works Section */}
                        <div className="space-y-8">
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
                                        Our status code testing tool allows you to simulate various API
                                        responses by simply providing the desired HTTP status code.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 mt-4">
                                        <li>
                                            <strong>Request:</strong> Your browser sends a GET request to our
                                            status endpoint with the code you specify.
                                        </li>
                                        <li>
                                            <strong>Processing:</strong> Our server receives the request and
                                            prepares a standardized JSON response.
                                        </li>
                                        <li>
                                            <strong>Response:</strong> The server returns the exact HTTP status
                                            code you requested along with a helpful message.
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
                                <p className="text-gray-600 mb-4">
                                    You can also use this feature directly via our API:
                                </p>
                                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm text-gray-800 break-all">
                                    GET {window.location.origin}/api/service/status/&#123;code&#125;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
