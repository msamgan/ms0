import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import DeleteUserForm from "./Partials/DeleteUserForm"
import UpdatePasswordForm from "./Partials/UpdatePasswordForm"
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm"
import { Head } from "@inertiajs/react"
import { useState, useEffect } from "react"

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [animateSections, setAnimateSections] = useState(false)
    const [activeTab, setActiveTab] = useState("profile")

    // Trigger animation when component mounts
    useEffect(() => {
        setAnimateSections(true)
    }, [])

    const tabs = [
        {
            id: "profile",
            name: "Profile",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            )
        },
        {
            id: "password",
            name: "Change Password",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                </svg>
            )
        },
        {
            id: "danger",
            name: "Danger Zone",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            )
        }
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="w-full md:w-1/4 space-y-2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden p-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                            activeTab === tab.id
                                                ? "bg-sky-50 text-sky-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    >
                                        {tab.icon}
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="space-y-6">
                                {activeTab === "profile" && (
                                    <div
                                        className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:shadow-lg ${animateSections ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                                        style={{ transitionDelay: "100ms" }}
                                    >
                                        <div className="p-6">
                                            <UpdateProfileInformationForm
                                                mustVerifyEmail={mustVerifyEmail}
                                                status={status}
                                                className="max-w-xl"
                                            />
                                        </div>
                                        <div className="bg-sky-500 h-1"></div>
                                    </div>
                                )}

                                {activeTab === "password" && (
                                    <div
                                        className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:shadow-lg ${animateSections ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                                        style={{ transitionDelay: "100ms" }}
                                    >
                                        <div className="p-6">
                                            <UpdatePasswordForm className="max-w-xl" />
                                        </div>
                                        <div className="bg-sky-500 h-1"></div>
                                    </div>
                                )}

                                {activeTab === "danger" && (
                                    <div
                                        className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:shadow-lg ${animateSections ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                                        style={{ transitionDelay: "100ms" }}
                                    >
                                        <div className="p-6">
                                            <DeleteUserForm className="max-w-xl" />
                                        </div>
                                        <div className="bg-red-500 h-1"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
