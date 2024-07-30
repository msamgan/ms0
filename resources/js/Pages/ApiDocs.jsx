import { Head } from "@inertiajs/react"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"

export default function ApiDocs({ isAuthenticated, token, api_endpoint }) {
    return (
        <>
            <Head title="Api Docs" />
            <Header isAuthenticated={isAuthenticated} />

            <section className="bg-gray-100 text-gray-800">
                <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-10 lg:px-32 xl:max-w-4xl">
                    <img src="/ms0_logo.png" className="w-48 h-48" alt={"logo"} />
                    <h1 className="text-4xl font-bold leading-none sm:text-5xl">Api Docs</h1>
                </div>
            </section>

            <section className="bg-gray-100 text-gray-800">
                <div className="container mx-auto flex flex-col text-start px-4 py-2 md:px-10 lg:px-32 xl:max-w-5xl mb-20">
                    <p>
                        ms0 provides a simple and easy way to shorten your url with our api. To access the api
                        you will need to create an account and get the access token from your dashboard.
                    </p>

                    <h2 className="text-lg mt-8 font-semibold leading-none sm:text-lg">Endpoint</h2>
                    <code className="mt-2">POST {api_endpoint}</code>

                    <h2 className="text-lg mt-8 font-semibold leading-none sm:text-lg">Headers</h2>
                    <code className="mt-2 whitespace-pre-wrap">
                        Authorization: Bearer{" "}
                        {isAuthenticated ? (
                            <span
                                className={"cursor-pointer"}
                                onClick={() => navigator.clipboard.writeText(token)}
                            >
                                {token}
                            </span>
                        ) : (
                            "<i>token</i>"
                        )}
                    </code>
                    {isAuthenticated && <small className="text-xs mt-2">click the access token to copy</small>}

                    <h2 className="text-lg mt-8 font-semibold leading-none sm:text-lg">Body</h2>
                    <code className="mt-2 whitespace-pre-wrap">
                        {"{"}
                        <br />
                        <span className={"whitespace-pre-wrap"}>
                            &emsp;&emsp;"url":
                            "https://msamgan.com/laravel-v11170-released-add-wherelike-clause-allow-microsecond-travel-add-method-queryexecutedtorawsql-reduce-the-number-of-queries-with-cachemany-and-cacheputmany"
                        </span>
                        <br />
                        {"}"}
                    </code>

                    <h2 className="text-lg mt-8 font-semibold leading-none sm:text-lg">Response 200</h2>
                    <code className="mt-2 whitespace-pre-wrap bg-green-200">
                        {"{"}
                        <br />
                        &emsp;&emsp;"status": true,
                        <br />
                        &emsp;&emsp;"message": "Shortened Url created successfully",
                        <br />
                        &emsp;&emsp;"shot_url": "https://ms0.link/123"
                        <br />
                        {"}"}
                    </code>

                    <h2 className="text-lg mt-8 font-semibold leading-none sm:text-lg">Response 401</h2>
                    <code className="mt-2 whitespace-pre-wrap bg-red-200">
                        {"{"}
                        <br />
                        &emsp;&emsp;"message": "Unauthorized"
                        <br />
                        {"}"}
                    </code>
                </div>
            </section>

            <Footer />
        </>
    )
}
