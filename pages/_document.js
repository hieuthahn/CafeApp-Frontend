import Document, { Html, Head, Main, NextScript } from "next/document"
import { NextSeo } from "next-seo"

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <NextSeo
                    title={"Coffee Mine"}
                    description={"Tổng hợp và đánh giá quán cafe đẹp ở Hà Nội"}
                    canonical="https://www.canonical.ie/"
                    twitter={{
                        handle: "@handle",
                        site: "@site",
                        cardType: "summary_large_image",
                    }}
                />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
