import { useEffect, useState } from "react"
import axios from "axios"

export default function LinkTags({ linkId, initialTags = [], onTagClick }) {
    const [tags, setTags] = useState(initialTags)
    const [adding, setAdding] = useState(false)
    const [value, setValue] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const search = value.trim()
        if (!adding || !search) {
            setSuggestions([])
            return
        }

        const controller = new AbortController()
        const timeout = window.setTimeout(() => {
            axios
                .get(route("service.tags"), {
                    params: { search },
                    signal: controller.signal
                })
                .then(({ data }) => {
                    const attachedIds = new Set(tags.map((tag) => tag.id))
                    setSuggestions((data.tags?.data ?? []).filter((tag) => !attachedIds.has(tag.id)))
                })
                .catch((requestError) => {
                    if (requestError.code !== "ERR_CANCELED") {
                        setError("Could not load tag suggestions.")
                    }
                })
        }, 200)

        return () => {
            window.clearTimeout(timeout)
            controller.abort()
        }
    }, [adding, value, tags])

    const reset = () => {
        setAdding(false)
        setValue("")
        setSuggestions([])
        setError("")
    }

    const addTag = (e, tagName = value) => {
        e?.preventDefault()
        const name = tagName.trim()
        if (!name) return reset()
        if (tags.some((t) => t.name.toLowerCase() === name.toLowerCase())) {
            return reset()
        }

        setBusy(true)
        axios
            .post(route("links.tags.attach", linkId), { name })
            .then(({ data }) => {
                setTags((prev) => [...prev, data.tag])
                reset()
            })
            .catch((err) => {
                setError(err.response?.data?.errors?.name?.[0] || "Could not add tag.")
            })
            .finally(() => setBusy(false))
    }

    const removeTag = (tag) => {
        axios
            .delete(route("links.tags.detach", [linkId, tag.slug]))
            .then(() => setTags((prev) => prev.filter((t) => t.id !== tag.id)))
            .catch(() => setError("Could not remove tag."))
    }

    return (
        <div className="mt-3">
            <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag.id}
                        className="inline-flex items-center gap-1 border border-line bg-paper px-2 py-1 font-mono text-[11px] text-ink"
                    >
                        {onTagClick ? (
                            <a
                                href={`/links?tag=${encodeURIComponent(tag.slug)}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onTagClick(tag)
                                }}
                                className="hover:text-accent"
                            >
                                {tag.name}
                            </a>
                        ) : (
                            tag.name
                        )}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            aria-label={`Remove tag ${tag.name}`}
                            className="text-muted hover:text-accent"
                        >
                            &times;
                        </button>
                    </span>
                ))}

                {adding ? (
                    <form onSubmit={addTag} className="relative inline-flex">
                        <input
                            autoFocus
                            value={value}
                            disabled={busy}
                            maxLength={255}
                            role="combobox"
                            aria-autocomplete="list"
                            aria-expanded={suggestions.length > 0}
                            aria-controls={`link-${linkId}-tag-suggestions`}
                            onChange={(e) => {
                                setValue(e.target.value)
                                setError("")
                            }}
                            onBlur={() => !busy && !value.trim() && reset()}
                            onKeyDown={(e) => e.key === "Escape" && reset()}
                            placeholder="Tag name"
                            className="w-28 border border-line bg-paper px-2 py-1 font-mono text-[11px] text-ink focus:border-ink focus:outline-none focus:ring-0"
                        />
                        {suggestions.length > 0 && (
                            <ul
                                id={`link-${linkId}-tag-suggestions`}
                                role="listbox"
                                className="absolute left-0 top-full z-30 mt-1 max-h-40 min-w-40 overflow-auto border border-line bg-paper py-1 shadow-lg"
                            >
                                {suggestions.map((tag) => (
                                    <li key={tag.id} role="option" aria-selected="false">
                                        <button
                                            type="button"
                                            disabled={busy}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => addTag(undefined, tag.name)}
                                            className="block w-full px-3 py-1.5 text-left font-mono text-[11px] text-ink hover:bg-line/40"
                                        >
                                            {tag.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                ) : (
                    <button
                        type="button"
                        onClick={() => setAdding(true)}
                        className="border border-dashed border-line px-2 py-1 font-mono text-[11px] text-muted hover:border-ink hover:text-ink"
                    >
                        + Tag
                    </button>
                )}
            </div>
            {error && <p className="mt-1 font-mono text-[11px] text-accent">{error}</p>}
        </div>
    )
}
