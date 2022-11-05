// Import Swiper React components
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper"
import { Fragment } from "react"
import PurposeSlider from "../../CardSlider/PurposeSlider"
import RegionSlider from "../../CardSlider/RegionSlider"
import { purposes, regions } from "../../../lib/data/sample"
import { getRegions, getPurposes } from "lib/services/category"

const SliderSection = () => {
    const [categories, setCategories] = useState({
        regions: [],
        purposes: [],
    })

    const getCategories = async () => {
        try {
            const _regions = getRegions()
            const _purposes = getPurposes()
            const regions = await _regions
            const purposes = await _purposes
            setCategories({
                regions: regions.data,
                purposes: purposes.data,
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Fragment>
            <section className="my-12">
                <h2 className="text-center text-2xl font-bold text-slate-700">
                    {"Mục đích bạn cần ?"}
                </h2>
                <div className="mx-auto w-[90px] h-[2px] bg-rose-500 mt-2 rounded-lg"></div>
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
                                    slug={purpose.value}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
            <section className="my-12">
                <h2 className="text-center text-2xl font-bold text-slate-700">
                    {"Khu vực gần đây"}
                </h2>
                <div className="mx-auto w-[90px] h-[2px] bg-rose-500 mt-2 rounded-lg"></div>
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
                                        slug={region.value}
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
