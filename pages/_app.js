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
import nProgress from "nprogress"
import "nprogress/nprogress.css"
import Router from "next/router"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const getLayout = Component.getLayout || ((page) => page)
    const [showChild, setShowChild] = useState(false)
    useEffect(() => {
        setShowChild(true)
    }, [])

    Router.events.on("routeChangeStart", nProgress.start)
    Router.events.on("routeChangeError", nProgress.done)
    Router.events.on("routeChangeComplete", nProgress.done)

    nProgress.configure({
        template:
            '<div class="bar !bg-rose-500 !border-b-[2.2px] !border-rose-500" role="bar"><div class="peg !bg-rose-500"></div></div>',
        easing: "ease",
        speed: 300,
        minimum: 0.1,
    })

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
