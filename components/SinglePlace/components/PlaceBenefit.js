import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper"
import { benefits } from "../../../lib/data/sample"

const PlaceBenefit = () => {
    return (
        <div className="bg-white rounded-lg py-2">
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                spaceBetween={20}
                slidesPerView={3}
                // loop={true}
                loopFillGroupWithBlank={true}
                breakpoints={{
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 6,
                    },
                }}
            >
                {benefits.map((benefit, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="py-1 flex flex-col items-center justify-centerselect-none cursor-pointer">
                                <span className="text-xl">
                                    <i className="fas fa-cloud-sun text-rose-500 "></i>
                                </span>
                                <span className="text-sm text-center">
                                    {benefit.label}
                                </span>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default PlaceBenefit
