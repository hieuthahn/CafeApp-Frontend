import React from "react"
import SearchBar from "./components/SearchBar"
import SliderSection from "./components/SliderSection"
import PlaceLanding from "./components/PlaceLanding"
import SuggestPlace from "./components/SuggestPlace"
import Typewriter from "typewriter-effect"

const HomeSection = () => {
    return (
        <div>
            <section
                className="items-cover flex !bg-cover !bg-center h-[500px]"
                style={{
                    background:
                        "linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.6)),url(https://ik.imagekit.io/reviewcafe/3511_zApiGKUaCd.jpg?tr=w-1800%2Cq-50) no-repeat",
                }}
            >
                <div className="m-auto w-full lg:w-[1200px]">
                    <div className="text-center bg-smoke-dark rounded w-full shadow-lg mb-10">
                        <h1 className="text-xl md:text-[2rem] leading-10 text-center font-bold text-slate-50 !mb-2 drop-shadow-lg">
                            <Typewriter
                                options={{
                                    strings: [
                                        "Đi & khám phá điểm hẹn hấp dẫn",
                                        "Tìm Góc Cafe - Thỏa Sức Sống Ảo",
                                    ],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                        <h3 className="text-lg md:text-lg leading-8 text-center font-normal text-slate-100  mb-8 drop-shadow-lg">
                            {
                                "Mang đến cho bạn những sự lựa chọn tốt nhất cho điểm hẹn cafe"
                            }
                        </h3>
                    </div>
                    <SearchBar />
                </div>
            </section>
            <div className="container mx-auto p-2 md:p-3 lg:p-0 mb-10">
                <SliderSection />
                <PlaceLanding />
                <SuggestPlace />
            </div>
        </div>
    )
}

export default HomeSection
