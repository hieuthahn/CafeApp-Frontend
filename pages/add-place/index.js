import React, { useState } from "react"
import PlaceForm from "../../components/PlaceForm"
import { NextSeo } from "next-seo"

const AddPlace = () => {
    return (
        <>
            <NextSeo
                title={"Thêm địa điểm | Coffee Mine"}
                description={
                    "Chia sẻ với cộng đồng những quán cafe bạn yêu thích chưa có trên CoffeeMine. Những hành động thiết thực này sẽ gây dựng cộng đồng yêu cafe ngày càng lớn mạnh!"
                }
                canonical="https://www.canonical.ie/"
                openGraph={{
                    url: "https://www.url.ie/a",
                    title: "Viết Review | Coffee Mine",
                    description:
                        "Chia sẻ với cộng đồng những quán cafe bạn yêu thích chưa có trên CoffeeMine. Những hành động thiết thực này sẽ gây dựng cộng đồng yêu cafe ngày càng lớn mạnh!",
                    siteName: "CoffeeMine",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <div className="container mx-auto flex justify-center items-center px-3 md:px-6">
                <div className="bg-white rounded shadow my-3 p-3 md:my-7 md:p-7 w-full">
                    <h1 className="font-bold text-2xl">Thêm địa điểm</h1>
                    <p>
                        Những quán cafe yêu thích của bạn chưa có trên Coffee
                        Mine? Chia sẻ với cộng đồng ngay!
                    </p>
                    <PlaceForm />
                </div>
            </div>
        </>
    )
}

export default AddPlace
