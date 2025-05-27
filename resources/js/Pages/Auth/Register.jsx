import GuestLayout from "@/Layouts/GuestLayout"
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import { Head, Link, useForm } from "@inertiajs/react"

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const submit = (e) => {
        e.preventDefault()

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation")
        })
    }

    // Override the GuestLayout's default welcome text for the register page
    const customGuestLayoutProps = {
        title: "Create your account",
        description: "Join MS0 to start creating and managing your shortened URLs"
    };

    return (
        <>
            <Head title="Register" />

            <GuestLayout {...customGuestLayoutProps}>
                <form onSubmit={submit}>
                    <div className="mb-6">
                        <InputLabel htmlFor="name" value="Full name" className="text-gray-700 font-medium" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="John Doe"
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="email" value="Email address" className="text-gray-700 font-medium" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="your@email.com"
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            autoComplete="new-password"
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="password_confirmation" value="Confirm password" className="text-gray-700 font-medium" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            autoComplete="new-password"
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mb-6 text-sm text-gray-600">
                        By registering, you agree to our <a href="#" className="text-sky-600 hover:text-sky-500">Terms of Service</a> and <a href="#" className="text-sky-600 hover:text-sky-500">Privacy Policy</a>.
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 disabled:opacity-70"
                        >
                            {processing ? 'Creating account...' : 'Create account'}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href={route("login")}
                            className="text-sm text-sky-600 hover:text-sky-500 font-medium"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </GuestLayout>
        </>
    )
}
