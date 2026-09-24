import Reveal from "@/Components/Home/Reveal"

const FEATURES = [
    {
        title: "Lightning fast",
        body: "Instantly create short links with our optimized high-performance engine."
    },
    {
        title: "Status codes",
        body: "Test and verify HTTP status codes for your frontend development directly in the browser."
    },
    {
        title: "Secure & reliable",
        body: "Enterprise-grade security keeps your links protected and available."
    },
    {
        title: "Analytics",
        body: "Detailed insights and click tracking to understand your audience."
    }
]

export default function Features() {
    return (
        <section className="border-b border-line bg-paper" aria-labelledby="features-heading">
            <div className="mx-auto max-w-grid px-6 md:px-10 lg:px-16 py-20 md:py-28">
                <Reveal className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-8">
                    <span>02 / Capabilities</span>
                </Reveal>

                <Reveal
                    as="h2"
                    id="features-heading"
                    className="font-grotesk font-extrabold text-ink text-4xl sm:text-5xl leading-[1.05] max-w-3xl mb-14 md:mb-20"
                >
                    Built for the essentials, nothing else.
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-line divide-y divide-line sm:divide-y-0 lg:divide-x">
                    {FEATURES.map((feature, index) => (
                        <Reveal
                            key={feature.title}
                            delay={index * 60}
                            className="py-8 sm:py-0 sm:pt-8 lg:px-8 first:lg:pl-0 last:lg:pr-0"
                        >
                            <span className="block font-mono text-xs text-muted mb-4">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-grotesk font-bold text-ink text-lg mb-3">{feature.title}</h3>
                            <p className="font-grotesk text-sm text-muted leading-relaxed max-w-xs">
                                {feature.body}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
