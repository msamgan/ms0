import { Head } from "@inertiajs/react"
import { useState } from "react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"

export default function Welcome({ isAuthenticated, user }) {
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

            <section className="bg-gray-100 text-gray-800 mb-28">
                <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-10 lg:px-32 xl:max-w-4xl">
                    <img src="/ms0_logo.png" className="w-48 h-48" alt={"logo"} />
                    <h1 className="text-3xl font-bold leading-none sm:text-3xl">
                        You know what to do, right?
                        <span className="text-sky-600"> Shorten It</span>
                    </h1>
                    <fieldset className="w-full space-y-1 text-gray-800 mt-6">
                        <div className="flex">
                            <input
                                type="text"
                                name="url"
                                id="url"
                                placeholder="Paste your url here"
                                autoFocus={true}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex flex-1 border text-lg rounded-md focus:ring-inset border-gray-300 text-gray-800 bg-white focus:ring-sky-600"
                            />
                        </div>
                        <p className="py-2 text-lg text-start text-gray-600">
                            All the URLs will be deactivated after 6 months of inactivity.
                        </p>
                        <div className="flex flex-wrap justify-end">
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-2 m-2 text-sm font-semibold rounded bg-sky-600 text-gray-50"
                            >
                                Shorten
                            </button>
                        </div>
                    </fieldset>

                    <div className={"mt-6 w-full"}>
                        {error && (
                            <div className="flex items-center rounded shadow-md overflow-hidden relative bg-gray-50 text-gray-800 w-full">
                                <div className="self-stretch flex items-center px-3 flex-shrink-0 bg-gray-300 text-sky-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="red"
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
                                <div className="p-4 flex-1">
                                    <h3 className="text-xl font-bold text-start">Error</h3>
                                    <p className="text-lg text-red-600 font-bold text-start">{error}</p>
                                </div>
                                <button className="absolute top-2 right-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4 p-2 rounded cursor-pointer"
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
                                <div className="flex items-center justify-between p-6 border-l-8 sm:py-8 border-sky-600 bg-gray-50 text-gray-800">
                                    <span
                                        className={"cursor-pointer text-lg font-bold text-start"}
                                        onClick={() => {
                                            navigator.clipboard.writeText(shortUrl)
                                            setNotification("copied to clipboard")

                                            setTimeout(() => {
                                                setNotification("click the link to copy")
                                            }, 3000)
                                        }}
                                    >
                                        {shortUrl}
                                    </span>
                                </div>
                                <small className={"text-gray-600 float-start mt-2"}>{notification}</small>
                            </div>
                        )}
                    </div>

                    {isAuthenticated ? (
                        <div className="container flex flex-col justify-start text-start py-8">
                            <h2 className="text-2xl font-semibold sm:text-4xl">Welcome, {user.name}</h2>
                            <p className="text-lg mt-5">
                                We are glad you are here. You can now track your shortened links, how many times
                                they have been used, when they were used last etc...
                            </p>
                        </div>
                    ) : (
                        <div className="container flex flex-col justify-start text-start py-8">
                            <h2 className="text-2xl font-semibold sm:text-4xl">Why Register?</h2>
                            <ol className="list-decimal text-gray-900 list-inside text-lg mt-5">
                                <li className={"leading-7"}>
                                    First, and most simple answer is to get access to APIs
                                </li>
                                <li className={"leading-7"}>
                                    With registration you get to track your shortened links, how many times they
                                    have been used, when they were used last etc...
                                </li>
                                <li className={"leading-7"}>
                                    As mentioned above, the links will be deactivated after 6 months of
                                    inactivity, but if you are a registered user, you can reactivate the link at
                                    any time
                                </li>
                                <li className={"leading-7"}>Never loose a short link again</li>
                            </ol>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}
