import Document, { Html, Head, Main, NextScript } from "next/document"

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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
