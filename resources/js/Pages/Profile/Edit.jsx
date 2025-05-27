import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import DeleteUserForm from "./Partials/DeleteUserForm"
import UpdatePasswordForm from "./Partials/UpdatePasswordForm"
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm"
import { Head } from "@inertiajs/react"
import { useState, useEffect } from "react"

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [animateSections, setAnimateSections] = useState(false)

    // Trigger animation when component mounts
    useEffect(() => {
        setAnimateSections(true)
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                    <div className="space-y-6">
                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:shadow-lg ${animateSections ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
                            <div className="p-6">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>
                            <div className="bg-sky-500 h-1"></div>
                        </div>

                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:shadow-lg ${animateSections ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                            <div className="p-6">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>
                            <div className="bg-emerald-500 h-1"></div>
                        </div>

                        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:shadow-lg ${animateSections ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                            <div className="p-6">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                            <div className="bg-red-500 h-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
