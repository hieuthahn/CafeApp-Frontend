import { useRouter } from "next/router"
import Link from "next/link"
import SinglePlace from "../../../components/SinglePlace"
import Script from "next/script"
import { searchPlaces, getPlaceBySlug } from "lib/services/place"

const Place = ({ place, slug }) => {
    return (
        <>
            <Script
                src="https://kit.fontawesome.com/dbb792b651.js"
                crossOrigin="anonymous"
            />
            <SinglePlace place={place} slug={slug} />
        </>
    )
}

// export const getStaticPaths = async () => {
//     const body = {
//         page: 1,
//         pageSize: -1,
//     }
//     const res = await searchPlaces(body)
//     const paths = res?.data?.map((place) => ({
//         params: { slug: place?.slug },
//     }))
//     return {
//         paths,
//         fallback: false, // can also be true or 'blocking'
//     }
// }

// `getStaticPaths` requires using `getStaticProps`
export const getServerSideProps = async (context) => {
    const params = context.params
    const res = await getPlaceBySlug(params.slug)

    if (!res.data) {
        return {
            notFound: true,
        }
    }

    return {
        // Passed to the page component as props
        props: { place: res?.data || [], slug: params.slug },
    }
}

export default Place
