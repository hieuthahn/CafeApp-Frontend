import React, { useRef, useState } from "react"
import Image from "next/image"
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

// import required modules
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper"
import Fancybox from "components/Fancybox"

const PlaceMedia = (props) => {
    const { place } = props
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [swiperIndex, setSwiperIndex] = useState(0)
    return (
        <>
            <div className="hidden md:flex items-center justify-center h-[355px] gap-1 rounded-lg overflow-hidden">
                <Fancybox>
                    {place?.photos?.map((photo, index) => {
                        if (index < 2) {
                            return (
                                <div
                                    key={index}
                                    data-fancybox="gallery"
                                    data-src={photo?.url || photo}
                                    style={{
                                        backgroundImage: `url(${
                                            photo?.url || photo
                                        })`,
                                        backgroundPosition: "50%",
                                    }}
                                    className={`relative w-full h-[355px] bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                                >
                                    <Image
                                        alt="cafe-app"
                                        layout="fill"
                                        objectFit="cover"
                                        src={photo?.url || photo}
                                        className="hidden"
                                    />
                                </div>
                            )
                        }
                    })}
                    {place?.photos?.length > 2 && (
                        <div className="flex flex-col w-full h-[355px]">
                            {place?.photos[2] && (
                                <div
                                    data-fancybox="gallery"
                                    data-src={
                                        place?.photos[2]?.url ||
                                        place?.photos[2]
                                    }
                                    style={{
                                        backgroundImage: `url(${
                                            place?.photos[2]?.url ||
                                            place?.photos[2]
                                        })`,
                                        backgroundPosition: "50%",
                                    }}
                                    className="relative w-full h-full bg-white bg-cover mb-1 after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                                >
                                    <Image
                                        alt="cafe-app"
                                        layout="fill"
                                        objectFit="cover"
                                        src={
                                            place?.photos[2]?.url ||
                                            place?.photos[2]
                                        }
                                        className="hidden"
                                    />
                                </div>
                            )}
                            {place?.photos?.length === 4 && place?.photos[3] && (
                                <div
                                    data-fancybox="gallery"
                                    data-src={
                                        place?.photos[3]?.url ||
                                        place?.photos[3]
                                    }
                                    style={{
                                        backgroundImage: `url(${
                                            place?.photos[3]?.url ||
                                            place?.photos[3]
                                        })`,
                                        backgroundPosition: "50%",
                                    }}
                                    className="relative w-full h-full bg-white bg-cover mb-1 after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                                >
                                    <Image
                                        alt="cafe-app"
                                        layout="fill"
                                        objectFit="cover"
                                        src={
                                            place?.photos[3]?.url ||
                                            place?.photos[3]
                                        }
                                        className="hidden"
                                    />
                                </div>
                            )}
                            {place?.photos[3] && place?.photos[4] && (
                                <div className="flex w-full h-full">
                                    <div
                                        data-fancybox="gallery"
                                        data-src={
                                            place?.photos[3]?.url ||
                                            place?.photos[3]
                                        }
                                        style={{
                                            backgroundImage: `url(${
                                                place?.photos[3]?.url ||
                                                place?.photos[3]
                                            })`,
                                            backgroundPosition: "50%",
                                        }}
                                        className="relative w-full h-auto bg-white bg-cover mr-1 after:block after:absolute after:inset-0 after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                                    >
                                        <Image
                                            alt="cafe-app"
                                            layout="fill"
                                            objectFit="cover"
                                            src={
                                                place?.photos[3]?.url ||
                                                place?.photos[3]
                                            }
                                            className="hidden"
                                        />
                                    </div>
                                    <div
                                        data-fancybox="gallery"
                                        data-src={
                                            place?.photos[5]?.url ||
                                            place?.photos[5]
                                        }
                                        style={{
                                            backgroundImage: `url(${
                                                place?.photos[5]?.url ||
                                                place?.photos[5]
                                            })`,
                                            backgroundPosition: "50%",
                                        }}
                                        className="relative w-full h-auto bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-100 after:transition cursor-pointer"
                                    >
                                        <Image
                                            alt="cafe-app"
                                            layout="fill"
                                            objectFit="cover"
                                            src={
                                                place?.photos[5]?.url ||
                                                place?.photos[5]
                                            }
                                            className="hidden"
                                        />
                                        {place.photos.length > 5 && (
                                            <span className="absolute z-10 flex justify-center items-center w-full h-full text-slate-200 text-xl font-bold">
                                                {"+"}
                                                {place.photos.length - 5}
                                                {" ảnh"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            {place?.photos?.map((photo, index) => {
                                if (index > 4) {
                                    return (
                                        <div
                                            key={index}
                                            data-fancybox="gallery"
                                            data-src={photo?.url || photo}
                                            style={{
                                                backgroundImage: `url(${
                                                    photo?.url || photo
                                                })`,
                                                backgroundPosition: "50%",
                                            }}
                                            className={`hidden relative w-full h-[355px] bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                                        >
                                            <Image
                                                alt="cafe-app"
                                                layout="fill"
                                                objectFit="cover"
                                                src={photo?.url || photo}
                                                className="hidden"
                                            />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )}
                </Fancybox>
            </div>
            <div className="block md:hidden">
                <Fancybox>
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        loop={false}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs, Pagination]}
                        className="!w-full !max-h-full rounded-[0.25rem] overflow-hidden"
                    >
                        {place?.photos?.map((url, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    onChange={() => setSwiperIndex(index)}
                                >
                                    <a
                                        className="relative"
                                        data-fancybox="1"
                                        data-src={url}
                                    >
                                        <figure className="m-0 bg-black/[0.3] pb-[56.0141509434%] pe-none">
                                            <Image
                                                alt="cafe-app"
                                                layout="fill"
                                                objectFit="cover"
                                                className="w-full h-full object-cover absolute left-0 top-0 blur-[15px] z-[1]"
                                                src={url}
                                            />
                                            <Image
                                                alt="cafe-app"
                                                layout="fill"
                                                objectFit="cover"
                                                className="w-full h-full object-contain absolute left-0 top-0 z-[2]"
                                                src={url}
                                            />
                                        </figure>
                                    </a>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Fancybox>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={false}
                    spaceBetween={10}
                    slidesPerView={8.3}
                    breakpoints={{
                        0: {
                            slidesPerView: 4.3,
                        },
                        768: {
                            slidesPerView: 5.3,
                        },
                        1200: {
                            slidesPerView: 8.3,
                        },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mt-2"
                >
                    {place?.photos?.map((url, index) => {
                        return (
                            <SwiperSlide
                                key={index}
                                onClick={() => setSwiperIndex(index)}
                                className={`hover:border-blue-600/60 border-4 ${
                                    swiperIndex === index
                                        ? "border-blue-600/60"
                                        : "border-white"
                                } !transition !duration-300 rounded-[0.25rem] cursor-pointer`}
                            >
                                <figure className="m-0 bg-slate-200 pb-[56.0141509434%] pe-none">
                                    <Image
                                        alt="cafe-app"
                                        layout="fill"
                                        objectFit="cover"
                                        className="w-full h-full object-contain absolute left-0 top-0 z-[2]"
                                        src={url}
                                    />
                                </figure>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    )
}

export default PlaceMedia
