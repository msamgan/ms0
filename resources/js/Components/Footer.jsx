export default function Footer() {
    return (
        <footer className="bg-paper border-t border-line">
            <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 pb-12 border-b border-line">
                    <div className="lg:col-span-6">
                        <p className="font-editorial text-ink text-4xl sm:text-5xl leading-[1.1] max-w-lg">
                            Short links.
                            <br />
                            No noise.
                        </p>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3 font-grotesk text-sm">
                            <li>
                                <a
                                    href={route("home")}
                                    className="text-ink hover:text-accent-dark transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href={route("documentation.api")}
                                    className="text-ink hover:text-accent-dark transition-colors"
                                >
                                    API documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href={route("status-codes")}
                                    className="text-ink hover:text-accent-dark transition-colors"
                                >
                                    Status codes
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
                            Account
                        </h3>
                        <ul className="space-y-3 font-grotesk text-sm">
                            <li>
                                <a
                                    href={route("register")}
                                    className="text-ink hover:text-accent-dark transition-colors"
                                >
                                    Register
                                </a>
                            </li>
                            <li>
                                <a
                                    href={route("login")}
                                    className="text-ink hover:text-accent-dark transition-colors"
                                >
                                    Login
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/msamgan/ms0"
                                    className="text-ink hover:text-accent-dark transition-colors"
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted">
                    <p>© {new Date().getFullYear()} MS0.org. All rights reserved.</p>
                    <p>
                        Built by{" "}
                        <a
                            href="https://msamgan.com"
                            className="text-ink hover:text-accent-dark transition-colors"
                        >
                            msamgan
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
