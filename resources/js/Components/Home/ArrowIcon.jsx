/**
 * Single directional arrow glyph used across the homepage's editorial CTAs
 * (e.g. "SHORTEN ↗"). Kept as one hand-drawn primitive, reused everywhere,
 * so the interface doesn't accumulate an icon library for a single glyph.
 */
export default function ArrowIcon({ className = "h-4 w-4" }) {
    return (
        <svg
            className={`${className} transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M4 12L12 4M12 4H5M12 4V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
