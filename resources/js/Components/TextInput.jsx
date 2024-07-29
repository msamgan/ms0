import { forwardRef, useEffect, useRef } from "react"

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
                "border-gray-300 focus:border-sky-600 focus:ring-sky-600 rounded-md shadow-sm " + className
            }
            ref={input}
        />
    )
})
