import { useState } from "react"
import Header from "@/Components/Header"

export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <div className="min-h-[101vh] flex flex-col bg-gray-100">
            <Header isAuthenticated={true} user={user} />

            {header && (
                <header className="bg-white shadow-sm border-b border-sky-100">
                    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="transition-all duration-300 hover:scale-[1.01]">{header}</div>
                    </div>
                </header>
            )}

            <main className="flex-1 pb-20">{children}</main>
        </div>
    )
}
