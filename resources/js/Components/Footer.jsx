export default function Footer() {
    return (
        <footer className="px-6 py-12 bg-white border-t border-gray-200">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg p-2 shadow-md">
                                <img src="/ms0_logo.png" alt="MS0 Logo" className="h-8 w-8" />
                            </div>
                            <span className="text-xl font-bold text-gray-800 ml-3">MS<span className="text-sky-600">0</span></span>
                        </div>
                        <p className="text-gray-600 mb-4">
                            A modern URL shortener service that helps you create, manage, and track shortened links with ease.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/msamgan/ms0"
                                className="text-gray-600 hover:text-sky-600 transition-colors duration-200 flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                                aria-label="GitHub"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a
                                href="https://msamgan.com"
                                className="text-gray-600 hover:text-sky-600 transition-colors duration-200 flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                                aria-label="msamgan website"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href={route("home")} className="text-gray-600 hover:text-sky-600 transition-colors duration-200">Home</a>
                            </li>
                            <li>
                                <a href={route("documentation.api")} className="text-gray-600 hover:text-sky-600 transition-colors duration-200">API Documentation</a>
                            </li>
                            <li>
                                <a href={route("register")} className="text-gray-600 hover:text-sky-600 transition-colors duration-200">Register</a>
                            </li>
                            <li>
                                <a href={route("login")} className="text-gray-600 hover:text-sky-600 transition-colors duration-200">Login</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
                        <p className="text-gray-600 mb-4">
                            MS0 is an open-source URL shortener built with Laravel and React. It provides a simple and efficient way to shorten long URLs.
                        </p>
                        <a
                            href="https://github.com/msamgan/ms0"
                            className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Star on GitHub
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} MS0. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-sm flex items-center">
                        Made with <span className="text-red-500 mx-1">❤️</span> by
                        <a className="text-sky-600 hover:text-sky-700 font-medium transition-colors duration-200 ml-1" href="https://msamgan.com">
                            msamgan
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
