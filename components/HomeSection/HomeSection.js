import React from "react"
import SearchBar from "./components/SearchBar"
import SliderSection from "./components/SliderSection"
import PlaceLanding from "./components/PlaceLanding"
import SuggestPlace from "./components/SuggestPlace"

const HomeSection = () => {
    return (
        <div>
            <section
                className="items-cover bg-cover bg-bottom p-10 md:py-32 md:px-16"
                style={{
                    backgroundImage: `url(
                    "https://ik.imagekit.io/reviewcafe/3511_zApiGKUaCd.jpg?tr=w-1800%2Cq-50"
                )`,
                }}
            >
                <div className="text-center bg-smoke-dark rounded w-full shadow-lg">
                    <h1 className="text-2xl md:text-3xl leading-10 text-center font-bold text-slate-50 mb-8 drop-shadow-lg">
                        {"Tìm Góc Cafe - Thỏa Sức Sống Ảo"}
                    </h1>
                    <h3 className="text-lg md:text-lg leading-8 text-center font-normal text-slate-100  mb-8 drop-shadow-lg">
                        {
                            "Mang đến cho bạn những sự lựa chọn tốt nhất cho điểm hẹn cafe"
                        }
                    </h3>
                </div>
                <SearchBar />
            </section>
            <div className="container mx-auto p-3 lg:p-0 mb-10">
                <SliderSection />
                <PlaceLanding />
                <SuggestPlace />
            </div>
        </div>
    )
}

export default HomeSection
