import Header from "../Header"
import Footer from "../Footer"
import { BackTop } from "antd"

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <BackTop />
        </>
    )
}
