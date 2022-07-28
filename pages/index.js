import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import HeaderMain from "/components/HeaderMain"

const logoSrc = "/public/static/image/logo/icon.svg"

export default function Home() {
    return (
        <div c>
            <Head>
                <title>
                    {"Cafe Soul - Tổng hợp và đánh giá quán cafe đẹp ở Hà Nội"}
                </title>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="64x64"
                    objectFit="contain"
                    href="/static/images/logo/icon.png"
                />
                <link
                    href="/static/fonts/cera-round-pro/style.css"
                    rel="stylesheet"
                />
            </Head>

            <HeaderMain />
            <div>Hieu 123123</div>
        </div>
    )
}
