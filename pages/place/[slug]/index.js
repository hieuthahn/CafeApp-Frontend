import { useRouter } from "next/router"
import Link from "next/link"
// import Header from "../../../components/header"

const Place = () => {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <h1 className="text-3xl text-center font-bold text-rose-500 !m-12">
                Post: {slug}
            </h1>
        </>
    )
}

export default Place
