import { useRouter } from "next/router"
import Link from "next/link"
import SinglePlace from "../../../components/SinglePlace"
import Script from "next/script"
import { searchPlaces, getPlaceBySlug } from "lib/services/place"
import { NextSeo } from "next-seo"
import Head from "next/head"

const Place = ({ place, slug }) => {
    return (
        <>
            <Head>
                <title>
                    {place?.name ||
                        "Cafe Mine - Tổng hợp và đánh giá quán cafe đẹp ở Hà Nội"}
                </title>
            </Head>
            <NextSeo
                title={`${place?.name} ở ${place?.address?.specific}`}
                description={place?.intro}
                canonical="https://www.canonical.ie/"
                openGraph={{
                    url: "https://www.url.ie/a",
                    title: place?.name,
                    description: place?.intro,
                    images: [
                        {
                            url: place?.photos[0]?.url || place?.photos[0],
                            width: 800,
                            height: 600,
                            alt: place?.name,
                            type: "image/jpeg",
                        },
                    ],
                    siteName: "CoffeeMine",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
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
