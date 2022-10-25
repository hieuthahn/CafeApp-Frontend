import "../styles/globals.css"
// import "antd/dist/antd.css"
// import "/src/styles/variables.less"
import "../styles/antd-custom.less"
import "swiper/scss"
import "mapbox-gl/dist/mapbox-gl.css"
import "swiper/css/bundle"
import Layout from "/components/Layouts"
import { useState, useEffect } from "react"
import { VechaiProvider, Button } from "@vechaiui/react"
import { SessionProvider } from "next-auth/react"
import AdminLayout from "../components/Layouts/AdminLayout"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
        if (Component.layout === "admin") {
            return getLayout(
                <SessionProvider session={session}>
                    <AdminLayout>
                        <VechaiProvider>
                            <Component {...pageProps} />
                        </VechaiProvider>
                    </AdminLayout>
                </SessionProvider>
            )
        } else {
            return getLayout(
                <SessionProvider session={session}>
                    <Layout>
                        <VechaiProvider>
                            <Component {...pageProps} />
                        </VechaiProvider>
                    </Layout>
                </SessionProvider>
            )
        }
    }
}

export default MyApp
