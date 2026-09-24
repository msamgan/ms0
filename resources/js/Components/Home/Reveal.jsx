import { useEffect, useRef, useState } from "react"

/**
 * Lightweight, dependency-free scroll-reveal wrapper.
 * Fades + lifts content into place once it enters the viewport.
 * Honors prefers-reduced-motion by skipping the transition entirely.
 */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reduceMotion) {
            setVisible(true)
            return
        }

        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${className}`}
        >
            {children}
        </Tag>
    )
}
