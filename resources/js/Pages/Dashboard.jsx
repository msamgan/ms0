import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { useState } from "react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import alertify from "alertifyjs"

export default function Dashboard({ auth, token, linkCount, visits }) {
    const [notification, setNotification] = useState("Click the token copy...")

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="pt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col space-y-3 p-6">
                        <div className="text-gray-900 font-semibold text-lg">Access Token</div>
                        <div
                            onClick={() => {
                                navigator.clipboard.writeText(token)
                                setNotification("Copied to clipboard!")

                                setTimeout(() => {
                                    setNotification("Click the token copy...")
                                }, 2000)
                            }}
                            className="bg-white text-gray-900 cursor-pointer"
                        >
                            {token}
                        </div>
                        <small className="text-gray-500 pb-3">{notification}</small>
                        <PrimaryButton
                            onClick={() => {
                                alertify.confirm(
                                    "Are you sure?",
                                    "This will invalidate the current token and generate a new one.",
                                    function () {
                                        axios.post(route("service.regenerate-token"), {}).then(() => {
                                            window.location.reload()
                                        })
                                    },
                                    function () {
                                        // alertify.error('Cancel')
                                    }
                                )
                            }}
                            className="bg-blue-500 w-1/6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Regenerate Token
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            <section className="p-6 my-6 bg-gray-100 text-gray-800">
                <div className="container max-w-7xl grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sky-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                className="h-9 w-9 text-gray-100"
                            >
                                <polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
                                <path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
                                <path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none">{linkCount}</p>
                            <p className="capitalize">Active Links</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sky-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                className="h-9 w-9 text-gray-100"
                            >
                                <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                                <path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
                                <polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
                                <polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none">{visits}</p>
                            <p className="capitalize">Total Visits</p>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    )
}
