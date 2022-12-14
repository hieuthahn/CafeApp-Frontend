import { useRouter } from 'next/router'
import Link from 'next/link'
import SinglePlace from '../../../components/SinglePlace'
import Script from 'next/script'
import { searchPlaces, getPlaceBySlug } from 'lib/services/place'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Logo from 'public/static/images/logo/png/logo-color.png'

const Place = ({ place, slug }) => {
    return (
        <>
            <Head>
                {/* <title>{`${place?.name} ở ${place?.address?.specific}`}</title>
                <meta
                    name="facebook-domain-verification"
                    content="1ycdc02m6c40t0gwngzoi14dyzlskd"
                />
                <meta
                    property="og:title"
                    content={`${place?.name} ở ${place?.address?.specific}`}
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`${window.location.origin}/place/${place?.slug}`}
                />
                <meta
                    property="og:image"
                    content={place?.photos[0]?.url || place?.photos[0] || Logo}
                />
                <meta
                    property="og:image:secure_url"
                    content={place?.photos[0]?.url || place?.photos[0] || Logo}
                />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="400" />
                <meta property="og:image:height" content="300" />
                <meta
                    property="og:image:alt"
                    content={`${place?.name} ở ${place?.address?.specific}`}
                /> */}
                {/* <!-- Primary Meta Tags --> */}
                <title>IONAH Coffee ở 9 Thanh Niên, Ba Đình</title>
                <meta
                    name="title"
                    content="IONAH Coffee ở 9 Thanh Niên, Ba Đình"
                />
                <meta
                    name="description"
                    content="🌱 Nằm trên mặt đường Thanh Niên, tân binh “làng cà phê” IONAH COFFEE có gì thú vị nhỉ? - Tên gọi: IONAH là viết ngược của HANOI - Vibe: mặt tiền và không gian hiện đại, nhưng phía sau lại “xưa ơi là xưa” - Nhân viên: là những “happiness creators” thân thiện và chiều khách ☺️"
                />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://coffee-mine.vercel.app/place/ionah-coffee"
                />
                <meta
                    property="og:title"
                    content="IONAH Coffee ở 9 Thanh Niên, Ba Đình"
                />
                <meta
                    property="og:description"
                    content="🌱 Nằm trên mặt đường Thanh Niên, tân binh “làng cà phê” IONAH COFFEE có gì thú vị nhỉ? - Tên gọi: IONAH là viết ngược của HANOI - Vibe: mặt tiền và không gian hiện đại, nhưng phía sau lại “xưa ơi là xưa” - Nhân viên: là những “happiness creators” thân thiện và chiều khách ☺️"
                />
                <meta property="og:image" content="" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://coffee-mine.vercel.app/place/ionah-coffee"
                />
                <meta
                    property="twitter:title"
                    content="IONAH Coffee ở 9 Thanh Niên, Ba Đình"
                />
                <meta
                    property="twitter:description"
                    content="🌱 Nằm trên mặt đường Thanh Niên, tân binh “làng cà phê” IONAH COFFEE có gì thú vị nhỉ? - Tên gọi: IONAH là viết ngược của HANOI - Vibe: mặt tiền và không gian hiện đại, nhưng phía sau lại “xưa ơi là xưa” - Nhân viên: là những “happiness creators” thân thiện và chiều khách ☺️"
                />
                <meta property="twitter:image" content="" />
            </Head>
            {/* <NextSeo
                title={`${place?.name} ở ${place?.address?.specific}`}
                description={place?.intro}
                canonical={window.location.origin}
                openGraph={{
                    url: `${window.location.origin}/place/${place?.slug}`,
                    title: place?.name,
                    description: place?.intro,
                    type: 'website',
                    locale: 'vi_VN',
                    images: [
                        {
                            url:
                                place?.photos[0]?.url ||
                                place?.photos[0] ||
                                Logo,
                            width: 800,
                            height: 600,
                            alt: place?.name,
                        },
                    ],
                    siteName: 'CoffeeMine',
                }}
            /> */}
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
