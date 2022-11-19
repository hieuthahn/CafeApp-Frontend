import React from "react"
import { Rate } from "antd"
import Link from "next/link"
import Image from "next/image"

const PlaceCard = ({ place }) => {
    return (
        <div className="w-full h-auto rounded-lg overflow-hidden flex flex-col border drop-shadow-sm">
            <div className="relative">
                <span className="absolute left-4 top-4 bg-rose-500 text-white z-10 rounded-md px-2 py-1 text-xs font-semibold select-none pointer-events-none">
                    {"Hot"}
                </span>
                <Link href={`/place/${place?.slug}`} passHref legacyBehavior>
                    <a>
                        <Image
                            alt="cafe-app"
                            width={450}
                            height={300}
                            objectFit="cover"
                            src={
                                (place?.photos && place?.photos[0]) ||
                                `/static/images/place/ban-cong-cafe/ban-cong-cafe-${Math.floor(
                                    Math.floor(Math.random() * 10) + 1
                                )}.jpeg`
                            }
                            className="object-cover object-center hover:scale-105 transition ease-in duration-500"
                        />
                    </a>
                </Link>
                <div className="absolute left-0 bottom-1 p-4 md:text-base text-sm font-semibold text-white w-full bg-gradient-to-b from-transparent to-gray-900/[.8] select-none pointer-events-none">
                    <span>
                        {place?.price?.min?.toLocaleString("vi-VN")}
                        {"đ"}
                    </span>
                    {" - "}
                    <span>
                        {place?.price?.max?.toLocaleString("vi-VN")}
                        {"đ"}
                    </span>
                </div>
            </div>
            <div className="p-4 pt-2 bg-white">
                <Link href={`/place/${place?.slug}`} passHref legacyBehavior>
                    <a>
                        <h2 className="truncate text-lg font-bold hover:text-rose-500">
                            {place?.name || "Ban Công Cafe"}
                        </h2>
                    </a>
                </Link>
                <address className="text-muted font-semibold mb-1 pointer-events-none truncate">
                    {place?.address?.specific}
                </address>
                <div className="truncate pointer-events-none">
                    <span className="text-green-600 font-semibold text-sm">
                        {place?.openingType || "Đang mở cửa"}
                    </span>
                    {" - "}
                    <span className="text-sm">{"07:00 - 23:00"}</span>
                </div>
                <div className="truncate pointer-events-none">
                    <span>
                        <Rate
                            className="!text-rose-500 !text-sm"
                            disabled
                            allowHalf
                            value={place?.rate?.avg}
                            defaultValue={place?.rate?.avg}
                        />
                    </span>
                    {" - "}
                    <span>{Math.floor(place?.rate?.avg) + " đánh giá"}</span>
                </div>
            </div>
        </div>
    )
}

export default PlaceCard
