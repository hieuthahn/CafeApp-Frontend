// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper"
import { Fragment } from "react"
import PurposeSlider from "../../CardSlider/PurposeSlider"
import RegionSlider from "../../CardSlider/RegionSlider"
import { purposes, regions } from "../../../lib/data/sample"

const SliderSection = () => {
    return (
        <Fragment>
            <section className="my-12">
                <h2 className="text-center text-2xl font-bold text-slate-700">
                    {"Find a Place That Fits Your Comfort"}
                </h2>
                <Swiper
                    className="mySwiper"
                    pagination={{
                        clickable: true,
                    }}
                    navigation
                    modules={[Pagination, Navigation, Autoplay]}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    slidesPerView={2}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {purposes.map((purpose, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <PurposeSlider
                                    label={purpose.label}
                                    image={purpose.image}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
            <section className="my-12">
                <h2 className="text-center text-2xl font-bold text-slate-700">
                    {"Find a Place That Fits Your Comfort"}
                </h2>
                <Swiper
                    className="mySwiper"
                    pagination={{
                        clickable: true,
                    }}
                    navigation
                    modules={[Pagination, Navigation, Autoplay]}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    slidesPerView={2}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {regions.map((region, index) => {
                        if (region.image) {
                            return (
                                <SwiperSlide key={index}>
                                    <RegionSlider
                                        label={region.label}
                                        image={region.image}
                                        desc={"50 quán cafe"}
                                    />
                                </SwiperSlide>
                            )
                        }
                    })}
                </Swiper>
            </section>
        </Fragment>
    )
}

export default SliderSection
