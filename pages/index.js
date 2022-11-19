import Head from "next/head"
import HomeSection from "../components/HomeSection"
import { NextSeo } from "next-seo"

export default function Home() {
    return (
        <div>
            <Head>
                <title>
                    {
                        "Coffee Mine | Tổng hợp và đánh giá quán cafe đẹp ở Hà Nội"
                    }
                </title>
            </Head>
            <NextSeo
                title={
                    "Coffee Mine | Tổng hợp và đánh giá quán cafe đẹp ở Hà Nội"
                }
                description={
                    "Nơi tổng hợp và đánh giá các quán cafe đẹp ở Hà Nội. Tham gia để chia sẻ trải nghiệm với cộng đồng và tìm kiếm cho mình quán cafe yêu thích. Đi thôi!!"
                }
                canonical="https://www.canonical.ie/"
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />

            <HomeSection />
        </div>
    )
}
