import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
import axios from "axios"
import alertify from "alertifyjs"

export default function SubscriptionManager({ user, className = "" }) {
    const [subscription, setSubscription] = useState(user?.subscription || null)
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(null)

    const fetchStatus = () => {
        setLoading(true)
        axios
            .get(route("subscription.status"))
            .then(({ data }) => {
                setSubscription(data.subscription)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchStatus()
    }, [])

    const handleUpdatePaymentMethod = () => {
        setActionLoading("payment-method")
        axios
            .get(route("subscription.payment-method"))
            .then(({ data }) => {
                if (data.url) {
                    window.location.href = data.url
                } else {
                    alertify.error("Payment method update URL not available.")
                }
            })
            .catch((err) => {
                alertify.error(err.response?.data?.message || "Failed to load payment method update.")
            })
            .finally(() => setActionLoading(null))
    }

    const handleCancel = () => {
        alertify
            .confirm(
                "Cancel Subscription",
                "Are you sure you want to cancel your subscription? You will retain access until the end of your current billing period.",
                () => {
                    setActionLoading("cancel")
                    axios
                        .post(route("subscription.cancel"))
                        .then(({ data }) => {
                            setSubscription(data.subscription)
                            alertify.success(data.message || "Subscription canceled.")
                        })
                        .catch((err) => {
                            alertify.error(err.response?.data?.message || "Failed to cancel subscription.")
                        })
                        .finally(() => setActionLoading(null))
                },
                () => {}
            )
            .set("labels", { ok: "Cancel Subscription", cancel: "Keep Subscription" })
    }

    const handleResume = () => {
        setActionLoading("resume")
        axios
            .post(route("subscription.resume"))
            .then(({ data }) => {
                setSubscription(data.subscription)
                alertify.success(data.message || "Subscription resumed successfully.")
            })
            .catch((err) => {
                alertify.error(err.response?.data?.message || "Failed to resume subscription.")
            })
            .finally(() => setActionLoading(null))
    }

    const isSubscribed = subscription?.is_subscribed

    return (
        <section className={`border border-line bg-paper p-6 sm:p-8 ${className}`}>
            <header className="border-b border-line pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">03 / Billing</p>
                        <h2 className="font-editorial text-2xl text-ink">Subscription & Billing</h2>
                    </div>
                    {isSubscribed && (
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 font-mono text-xs uppercase tracking-[0.14em] ${
                                subscription?.on_grace_period
                                    ? "bg-amber-100 text-amber-800"
                                    : subscription?.status === "active"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-ink/10 text-ink"
                            }`}
                        >
                            {subscription?.on_grace_period ? "Cancels Soon" : subscription?.status || "Active"}
                        </span>
                    )}
                </div>
                <p className="mt-1 text-sm text-muted">
                    Manage your subscription tier, billing interval, and payment details.
                </p>
            </header>

            <div className="mt-6 space-y-6">
                <div className="border border-line bg-paper-subtle p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                Current Plan
                            </span>
                            <p className="font-editorial text-2xl text-ink">
                                {subscription?.plan_name || (isSubscribed ? "Active Plan" : "Free Plan")}
                            </p>
                            <p className="mt-1 text-xs text-muted">
                                {isSubscribed
                                    ? subscription?.on_grace_period
                                        ? `Your subscription will end on ${subscription.ends_at}.`
                                        : subscription?.interval
                                          ? `Billed ${subscription.interval}. Renews automatically.`
                                          : "Active Paddle subscription."
                                    : "You are on the free plan with basic URL redirection and analytics."}
                            </p>
                        </div>
                        <div>
                            <Link
                                href={route("pricing")}
                                className="inline-block border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent-dark hover:border-accent-dark"
                            >
                                {isSubscribed ? "Change Plan" : "Upgrade Plan"}
                            </Link>
                        </div>
                    </div>
                </div>

                {isSubscribed && (
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleUpdatePaymentMethod}
                            disabled={actionLoading === "payment-method"}
                            className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:text-accent-dark disabled:opacity-50"
                        >
                            {actionLoading === "payment-method" ? "Loading..." : "Update Payment Method"}
                        </button>

                        {subscription?.on_grace_period ? (
                            <button
                                type="button"
                                onClick={handleResume}
                                disabled={actionLoading === "resume"}
                                className="border border-emerald-600 bg-emerald-50 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-800 transition-colors hover:bg-emerald-100 disabled:opacity-50"
                            >
                                {actionLoading === "resume" ? "Resuming..." : "Resume Subscription"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={actionLoading === "cancel"}
                                className="border border-rose-300 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-rose-700 transition-colors hover:bg-rose-50 disabled:opacity-50"
                            >
                                {actionLoading === "cancel" ? "Canceling..." : "Cancel Subscription"}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
