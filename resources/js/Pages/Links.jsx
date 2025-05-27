import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head } from "@inertiajs/react"
import { useState, useEffect } from "react"

export default function Links({ links, auth }) {
    const [notification, setNotification] = useState({})
    const [animateTable, setAnimateTable] = useState(false)

    // Trigger animation when component mounts
    useEffect(() => {
        setAnimateTable(true)
    }, [])

    const copyToClipboard = (url, id) => {
        navigator.clipboard.writeText(url)
        setNotification({
            ...notification,
            [id]: true
        })

        setTimeout(() => {
            setNotification({
                ...notification,
                [id]: false
            })
        }, 2000)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Your Links</h2>
                </div>
            }
        >
            <Head title="Links" />

            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                Link Management
                            </h3>
                            <p className="text-gray-600 mt-2">Manage all your shortened links in one place. Click on any short link to copy it to your clipboard.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-sky-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Original Link</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Short Link</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Visits</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Last Visited</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {links.map((link, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 transition-all duration-300 ${animateTable ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                            style={{ transitionDelay: `${index * 50}ms` }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                                                <div className="tooltip" title={link.url}>
                                                    {link.url}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => copyToClipboard(link.shortened_url, index)}
                                                        className={`group flex items-center text-sky-600 hover:text-sky-800 transition-colors duration-200 ${notification[index] ? 'text-green-600' : ''}`}
                                                    >
                                                        <span className="mr-2">{link.shortened_url}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-all duration-200 ${notification[index] ? 'text-green-600' : 'text-gray-400 group-hover:text-sky-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            {notification[index] ? (
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            ) : (
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                            )}
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {link.visits}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {link.last_visit}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${link.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {link.status}
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
