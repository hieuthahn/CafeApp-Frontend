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
                <Link href="/place/ban-cong-coffee">
                    <a>
                        <Image
                            width={450}
                            height={300}
                            objectFit="cover"
                            src={`/static/images/place/ban-cong-cafe/ban-cong-cafe-${Math.floor(
                                Math.floor(Math.random() * 10) + 1
                            )}.jpeg`}
                            className="object-cover object-center hover:scale-105 transition ease-in duration-500"
                        />
                    </a>
                </Link>
                <div className="absolute left-0 bottom-1 p-4 md:text-base text-sm font-semibold text-white w-full bg-gradient-to-b from-transparent to-gray-900/[.8] select-none pointer-events-none">
                    {/* <span>
                        {"50.000"}
                        {"đ"}
                    </span>
                    {" - "}
                    <span>
                        {"70.000"}
                        {"đ"}
                    </span> */}
                    {place?.price}
                </div>
            </div>
            <div className="p-4 pt-2 bg-white">
                <Link href="/place/ban-cong-coffee">
                    <a>
                        <h2 className="truncate text-lg font-bold hover:text-rose-500">
                            {place?.name || "Ban Công Cafe"}
                        </h2>
                    </a>
                </Link>
                <address className="text-muted font-semibold mb-1 pointer-events-none">
                    {"2 Đinh Liệt, Hoàn Kiếm"}
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
                            defaultValue={4.5}
                        />
                    </span>
                    {/* {" - "} */}
                    <span>{place?.reviewCount || "1 đánh giá"}</span>
                </div>
            </div>
        </div>
    )
}

export default PlaceCard
