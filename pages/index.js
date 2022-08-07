import Head from "next/head"
import HomeSection from "../components/HomeSection"

export default function Home() {
    return (
        <div>
            <Head>
                <title>
                    {"Cafe Soul - Tổng hợp và đánh giá quán cafe đẹp ở Hà Nội"}
                </title>
            </Head>

            <HomeSection />
        </div>
    )
}
