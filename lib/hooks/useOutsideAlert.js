import React, { useState, useEffect } from "react"

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (ref) => {
    const [result, setResult] = useState(false)
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setResult(true)
            } else {
                setResult(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])

    return result
}

export default useOutsideAlerter
