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

    const customGuestLayoutProps = {
        title: "Create your account",
        description: "Save your links, track their reach, and keep every short URL in one place."
    }

    return (
        <>
            <Head title="Register" />

            <GuestLayout {...customGuestLayoutProps}>
                <form onSubmit={submit}>
                    <div className="mb-7">
                        <InputLabel
                            htmlFor="name"
                            value="Full name"
                            className="font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-ink"
                        />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-2 block w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-grotesk text-base text-ink shadow-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-0"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Your name"
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-7">
                        <InputLabel
                            htmlFor="email"
                            value="Email address"
                            className="font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-ink"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-grotesk text-base text-ink shadow-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-0"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="your@email.com"
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-7">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-ink"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-grotesk text-base text-ink shadow-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-0"
                            autoComplete="new-password"
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mb-7">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm password"
                            className="font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-ink"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-2 block w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-grotesk text-base text-ink shadow-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-0"
                            autoComplete="new-password"
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mb-10 font-grotesk text-sm leading-relaxed text-muted">
                        By registering, you agree to our{" "}
                        <span className="font-semibold text-ink">Terms of Service</span> and{" "}
                        <span className="font-semibold text-ink">Privacy Policy</span>.
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full border border-ink bg-ink px-4 py-4 font-grotesk text-sm font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:border-accent hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? "Creating account..." : "Create account"}
                        </button>
                    </div>

                    <div className="mt-8 border-t border-line pt-5 text-center">
                        <Link
                            href={route("login")}
                            className="font-grotesk text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-dark"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </GuestLayout>
        </>
    )
}
