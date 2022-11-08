import { useRouter } from "next/router"
import Link from "next/link"
import SinglePlace from "../../../components/SinglePlace"
import Script from "next/script"
import { searchPlaces, getPlaceBySlug } from "lib/services/place"
import axios from "config/axios"
import { toSlug } from "lib/utils"

const Place = ({ place }) => {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <Script
                src="https://kit.fontawesome.com/dbb792b651.js"
                crossOrigin="anonymous"
            />
            <SinglePlace place={place} />
        </>
    )
}

export const getStaticPaths = async () => {
    const body = {
        page: 1,
        pageSize: -1,
    }
    const res = await searchPlaces(body)
    const paths = res.data.map((place) => ({
        params: { slug: place?.slug },
    }))
    return {
        paths,
        fallback: false, // can also be true or 'blocking'
    }
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps = async (context) => {
    const params = context.params
    const res = await getPlaceBySlug(params.slug)

    return {
        // Passed to the page component as props
        props: { place: res.data || [] },
    }
}

export default Place
