import React, { useState } from "react"
import PlaceListing from "../../components/PlaceListing"
import { NextSeo } from "next-seo"

const Search = () => {
    return (
        <>
            <NextSeo
                title={"Tìm kiếm quán cafe | Coffee Mine"}
                description={
                    "Nơi tổng hợp và đánh giá các quán cafe đẹp ở Hà Nội. Tham gia để chia sẻ trải nghiệm với cộng đồng và tìm kiếm cho mình quán cafe yêu thích. Đi thôi!!"
                }
                canonical="https://www.canonical.ie/"
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <PlaceListing />
        </>
    )
}

export default Search
