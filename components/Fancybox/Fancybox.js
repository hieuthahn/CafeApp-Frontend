import React, { useEffect } from "react"

// import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js"
import { Fancybox as NativeFancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox.css"

function Fancybox(props) {
    const delegate = props.delegate || "[data-fancybox]"

    useEffect(() => {
        const opts = props.options || {}

        NativeFancybox.bind(delegate, opts)

        return () => {
            NativeFancybox.destroy()
        }
    }, [props.delegate, props.options])

    return <>{props.children}</>
}

export default Fancybox
