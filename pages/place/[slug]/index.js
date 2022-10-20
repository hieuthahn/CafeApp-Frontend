import { useRouter } from "next/router"
import Link from "next/link"
import SinglePlace from "../../../components/SinglePlace"
import Script from "next/script"

const Place = () => {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <Script
                src="https://kit.fontawesome.com/dbb792b651.js"
                crossOrigin="anonymous"
            />
            <SinglePlace />
            <h1 className="text-3xl text-center font-bold text-rose-500 !m-12">
                {/* Post: {slug} */}
            </h1>
        </>
    )
}

export default Place
