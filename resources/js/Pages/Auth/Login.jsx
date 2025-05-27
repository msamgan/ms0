import Checkbox from "@/Components/Checkbox"
import GuestLayout from "@/Layouts/GuestLayout"
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import { Head, Link, useForm } from "@inertiajs/react"

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false
    })

    const submit = (e) => {
        e.preventDefault()

        post(route("login"), {
            onFinish: () => reset("password")
        })
    }

    return (
        <>
            <Head title="Log in" />

            <GuestLayout>
                {status && <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-100 text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <div className="mb-6">
                        <InputLabel htmlFor="email" value="Email address" className="text-gray-700 font-medium" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="your@email.com"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-sky-600 hover:text-sky-500 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="••••••••"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                                className="rounded text-sky-600 focus:ring-sky-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 disabled:opacity-70"
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </GuestLayout>
        </>
    )
}
