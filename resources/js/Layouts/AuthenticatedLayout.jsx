import Header from "@/Components/Header"

export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-paper">
            <Header isAuthenticated={true} user={user} />

            {header && (
                <header className="bg-paper border-b border-line">
                    <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 py-6">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-1">{children}</main>
        </div>
    )
}
