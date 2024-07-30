import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head } from "@inertiajs/react"
import { useState } from "react"

export default function Links({ links, auth }) {
    const [notification, setNotification] = useState("click link to copy...")
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Links</h2>}
        >
            <Head title="Links" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="container mx-auto text-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-lg">
                                <thead className="bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">Link</th>
                                        <th className="p-3">Short Link</th>
                                        <th className="p-3">Visits</th>
                                        <th className="p-3">Last Visited</th>
                                        <th className="p-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.map((link, index) => (
                                        <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                            <td className="p-3 w-1/2">{link.url}</td>
                                            <td className="p-3">
                                                <div className={"flex flex-col"}>
                                                    <span
                                                        className={"cursor-pointer"}
                                                        onClick={(e) => {
                                                            navigator.clipboard.writeText(link.shortened_url)
                                                            setNotification("Copied to clipboard!")

                                                            setTimeout(() => {
                                                                setNotification("click link to copy...")
                                                            }, 2000)
                                                        }}
                                                    >
                                                        {link.shortened_url}
                                                    </span>
                                                    <small className="text-gray-500">{notification}</small>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <p>{link.visits}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{link.last_visit}</p>
                                            </td>
                                            <td className="p-3 text-start">
                                                <span className="px-3 py-1 font-semibold rounded-md bg-sky-600 text-gray-50">
                                                    <span>{link.status}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
