import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Rate } from "antd"
import { toSlug } from "lib/utils"

const BASE_URL = "/place"

const PlaceItem = ({ place, className }) => {
    return (
        <div
            className={`rounded-lg shadow-sm bg-white flex ${
                className ? className : "mb-5"
            } `}
        >
            <Link href={`${BASE_URL}/${place?.slug}`} passHref legacyBehavior>
                <a className="py-2 pl-2">
                    <div className="w-[120px] md:w-[270px] h-full rounded-lg">
                        <figure className="relative w-full h-full overflow-hidden">
                            <Image
                                alt="cafe-app"
                                layout="fill"
                                objectFit="cover"
                                src={
                                    place?.photos.length
                                        ? place?.photos[0]
                                        : `/static/images/place/ban-cong-cafe/ban-cong-cafe-${Math.floor(
                                              Math.floor(Math.random() * 10) + 1
                                          )}.jpeg`
                                }
                                className="object-cover object-center hover:scale-105 transition ease-in duration-500 rounded absolute top-0 left-0 w-full h-full"
                            />
                        </figure>
                    </div>
                </a>
            </Link>

            <div className="pl-4 py-2 pr-2 flex flex-col md:gap-2 grow">
                <Link
                    href={`${BASE_URL}/${place?.slug}`}
                    passHref
                    legacyBehavior
                >
                    <a>
                        <h4 className="text-xl font-bold hover:underline ">
                            {place?.name || "EEBakery Coffee"}
                        </h4>
                    </a>
                </Link>
                <div className="truncate pointer-events-none">
                    <span className="mr-2">
                        <Rate
                            className="!text-rose-500 !text-sm "
                            disabled
                            allowHalf
                            defaultValue={place?.rate?.avg || 0}
                        />
                    </span>
                    {/* {`${place?.rateAvg || ""} `} */}
                    <span>{place?.rate?.avg || "Chưa có đánh giá"}</span>
                </div>
                <div className="flex gap-3 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        data-name="Layer 1"
                        viewBox="0 0 32 32"
                    >
                        <path d="M29.5,8H2.5A2.5,2.5,0,0,0,0,10.5v14A2.5,2.5,0,0,0,2.5,27h27A2.5,2.5,0,0,0,32,24.5v-14A2.5,2.5,0,0,0,29.5,8ZM1,10.5A1.5,1.5,0,0,1,2.5,9H4.483A2.466,2.466,0,0,1,5,10.5,2.5,2.5,0,0,1,2.5,13,2.466,2.466,0,0,1,1,12.483ZM4.483,26H2.5A1.5,1.5,0,0,1,1,24.5V22.517A2.466,2.466,0,0,1,2.5,22,2.5,2.5,0,0,1,5,24.5,2.466,2.466,0,0,1,4.483,26ZM31,24.5A1.5,1.5,0,0,1,29.5,26H27.517A2.466,2.466,0,0,1,27,24.5,2.5,2.5,0,0,1,29.5,22a2.466,2.466,0,0,1,1.5.517Zm0-3.145A3.464,3.464,0,0,0,29.5,21,3.5,3.5,0,0,0,26,24.5a3.464,3.464,0,0,0,.355,1.5H5.645A3.464,3.464,0,0,0,6,24.5,3.5,3.5,0,0,0,2.5,21a3.464,3.464,0,0,0-1.5.355V13.645A3.464,3.464,0,0,0,2.5,14,3.5,3.5,0,0,0,6,10.5,3.464,3.464,0,0,0,5.645,9H26.355A3.464,3.464,0,0,0,26,10.5,3.5,3.5,0,0,0,29.5,14a3.464,3.464,0,0,0,1.5-.355Zm0-8.872A2.466,2.466,0,0,1,29.5,13,2.5,2.5,0,0,1,27,10.5,2.466,2.466,0,0,1,27.517,9H29.5A1.5,1.5,0,0,1,31,10.5ZM15.5,15h1a1,1,0,0,1,1,1,.5.5,0,0,0,1,0,2,2,0,0,0-2-2v-.5a.5.5,0,0,0-1,0V14a2,2,0,0,0,0,4h1a1,1,0,0,1,0,2h-1a1,1,0,0,1-1-1,.5.5,0,0,0-1,0,2,2,0,0,0,2,2v.5a.5.5,0,0,0,1,0V21a2,2,0,0,0,0-4h-1a1,1,0,0,1,0-2Zm.5-4a6.5,6.5,0,1,0,6.5,6.5A6.508,6.508,0,0,0,16,11Zm0,12a5.5,5.5,0,1,1,5.5-5.5A5.506,5.506,0,0,1,16,23Z" />
                    </svg>
                    <span>
                        {place?.price?.min?.toLocaleString("vi-VN")}
                        {"đ"}
                        {" - "}
                        {place?.price?.max?.toLocaleString("vi-VN")}
                        {"đ"}
                    </span>
                </div>
                <address className="flex gap-3 items-center text-muted font-semibold mb-1 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 32 32"
                    >
                        <g data-name="Layer 2">
                            <path d="M16,30a1,1,0,0,0,.62-.22C17,29.44,27,21.38,27,13A11,11,0,0,0,5,13c0,8.38,10,16.44,10.38,16.78A1,1,0,0,0,16,30ZM7,13a9,9,0,0,1,18,0c0,6.3-6.87,12.81-9,14.69C13.87,25.81,7,19.3,7,13Z" />
                            <path d="M21,13a5,5,0,1,0-5,5A5,5,0,0,0,21,13Zm-8,0a3,3,0,1,1,3,3A3,3,0,0,1,13,13Z" />
                        </g>
                    </svg>
                    <span>
                        {place?.address?.specific || "2 Đinh Liệt, Hoàn Kiếm"}
                    </span>
                </address>
                <div className="flex gap-3 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        enableBackground="new 0 0 24 24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12.5,11.8740234V7c0-0.276123-0.223877-0.5-0.5-0.5S11.5,6.723877,11.5,7v5c0.0001221,0.0824585,0.0206299,0.1636353,0.0595703,0.2363281l1.5,2.7988281c0.0869751,0.1623535,0.2562256,0.2637329,0.4404297,0.2636719c0.0825195,0.0003052,0.1638184-0.0202026,0.2363281-0.0595703c0.0002441-0.0001221,0.0004272-0.0002441,0.0006714-0.0003662c0.2429199-0.1306152,0.3340454-0.4334717,0.2034302-0.6763916L12.5,11.8740234z M12,2C6.4771729,2,2,6.4771729,2,12s4.4771729,10,10,10c5.5201416-0.0064697,9.9935303-4.4798584,10-10C22,6.4771729,17.5228271,2,12,2z M12,21c-4.9705811,0-9-4.0294189-9-9s4.0294189-9,9-9c4.9683228,0.0054321,8.9945679,4.0316772,9,9C21,16.9705811,16.9705811,21,12,21z" />
                    </svg>
                    <div className="truncate pointer-events-none">
                        <span className="text-green-600 font-semibold">
                            {place?.openingType || "Đang mở cửa"}
                        </span>
                        {" - "}
                        <span>{place?.openingTime || "07:00 - 23:00"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceItem
