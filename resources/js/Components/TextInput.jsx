import { forwardRef, useEffect, useRef } from "react"

/**
 * The single text input style used across the app, matching the homepage's
 * "Paste URL" instrument: a plain underline field (no rounded/boxed chrome)
 * that accents on focus. `className` only needs to carry layout concerns
 * (e.g. spacing) — visual styling is baked in here.
 */
export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    return (
        <input
            {...props}
            type={type}
            className={
                "block w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 " +
                "font-grotesk text-base text-ink shadow-none transition-colors placeholder:text-muted/60 " +
                "focus:border-accent focus:ring-0 " +
                className
            }
            ref={input}
        />
    )
})
