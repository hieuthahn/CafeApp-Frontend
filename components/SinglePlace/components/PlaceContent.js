import { useState } from "react"

import { purposes, regions, place } from "../../../lib/data/sample"
import Fancybox from "../../Fancybox"

const PlaceContent = () => {
    return (
        <>
            {place && (
                <div className="bg-white rounded-lg shadow-sm p-4 overflow-hidden ">
                    <h1 className="text-2xl font-bold !mb-2">{place.label}</h1>
                    <p className="text-base mb-2">{place.desc}</p>
                    <p className="text-base mb-2">
                        {place.address}
                        <span>{" — "}</span>
                        <a className="text-base font-semibold hover:underline">
                            {"Hiển thị bản đồ"}
                        </a>
                        <span>{" — "}</span>
                        <a className="text-base font-semibold hover:underline">
                            {"Xem đường đi"}
                        </a>
                        <span>{" — "}</span>
                        <a className="text-base font-semibold hover:underline">
                            {"Xem menu"}
                        </a>
                    </p>
                    <div className="flex items-center justify-center h-[355px] gap-1 rounded-lg overflow-hidden">
                        <Fancybox>
                            <div
                                data-fancybox="gallery"
                                data-src={place.photos[0]}
                                style={{
                                    backgroundImage: `url(${place.photos[0]})`,
                                    backgroundPosition: "50%",
                                }}
                                className={`relative w-full h-[355px] bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                            ></div>

                            <div
                                data-fancybox="gallery"
                                data-src={place.photos[1]}
                                style={{
                                    backgroundImage: `url(${place.photos[1]})`,
                                    backgroundPosition: "50%",
                                }}
                                className="relative w-full h-[355px] bg-white bg-cover after:block after:absolute after:inset-0 after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                            ></div>
                            <div className="flex flex-col w-full h-[355px]">
                                <div
                                    data-fancybox="gallery"
                                    data-src={place.photos[5]}
                                    style={{
                                        backgroundImage: `url(${place.photos[5]})`,
                                        backgroundPosition: "50%",
                                    }}
                                    className="relative w-full h-full bg-white bg-cover mb-1 after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                                ></div>
                                <div className="flex w-full h-full">
                                    <div
                                        data-fancybox="gallery"
                                        data-src={place.photos[3]}
                                        style={{
                                            backgroundImage: `url(${place.photos[3]})`,
                                            backgroundPosition: "50%",
                                        }}
                                        className="relative w-full h-auto bg-white bg-cover mr-1 after:block after:absolute after:inset-0 after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                                    ></div>
                                    <div
                                        data-fancybox="gallery"
                                        data-src={place.photos[4]}
                                        style={{
                                            backgroundImage: `url(${place.photos[4]})`,
                                            backgroundPosition: "50%",
                                        }}
                                        className="relative w-full h-auto bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-100 after:transition cursor-pointer"
                                    >
                                        <span className="absolute z-10 flex justify-center items-center w-full h-full text-slate-200 text-xl font-bold">
                                            {"+"}
                                            {"21"}
                                            {" ảnh"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Fancybox>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlaceContent
