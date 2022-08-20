import "../styles/globals.css"
// import "antd/dist/antd.css"
// import "/src/styles/variables.less"
import "../styles/antd-custom.less"
import "swiper/scss"
import "mapbox-gl/dist/mapbox-gl.css"
import "swiper/css/bundle"
import Layout from "/components/Layout"
import { useState, useEffect } from "react"
import { VechaiProvider, Button } from "@vechaiui/react"

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)
    const [showChild, setShowChild] = useState(false)
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return null
    }

    if (typeof window === "undefined") {
        return <></>
    } else {
        return getLayout(
            <Layout>
                <VechaiProvider>
                    <Component {...pageProps} />
                </VechaiProvider>
            </Layout>
        )
    }
}

export default MyApp
