import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { useState } from "react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import alertify from "alertifyjs"

export default function Dashboard({ auth, token }) {
    const [notification, setNotification] = useState("Click the token copy...")

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col space-y-3 p-6">
                        <div className="text-gray-900">Access Token</div>
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
                                        axios.post(route("api.regenerate-token"), {}).then(() => {
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
        </AuthenticatedLayout>
    )
}
