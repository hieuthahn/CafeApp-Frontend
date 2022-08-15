import "../styles/globals.css"
// import "antd/dist/antd.css"
// import "/src/styles/variables.less"
import "../styles/antd-custom.less"
import "swiper/scss"
import "swiper/css/bundle"
import Layout from "/components/Layout"
import { useState, useEffect } from "react"
import { VechaiProvider, Button } from "@vechaiui/react"

// import styles
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"

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
