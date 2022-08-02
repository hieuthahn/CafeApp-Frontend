import Head from "next/head"
import HeroSection from "../components/HeroSection"

export default function Home() {
    return (
        <div>
            <Head>
                <title>
                    {"Cafe Soul - Tổng hợp và đánh giá quán cafe đẹp ở Hà Nội"}
                </title>
            </Head>

            <HeroSection />
        </div>
    )
}
