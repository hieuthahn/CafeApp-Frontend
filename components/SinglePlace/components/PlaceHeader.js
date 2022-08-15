import React from "react"
import LightGallery from "lightgallery/react"

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import { purposes, regions } from "../../../lib/data/sample"

const PlaceHeader = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 overflow-hidden ">
            <h1 className="text-2xl font-bold !mb-2">{"Ban Công Cafe"}</h1>
            <p className="text-base mb-2">
                {
                    "Nằm trong biệt thự Pháp cổ, Ban Công Cafe nghiễm nhiên được tận hưởng trọn vẹn nét cổ kính, trầm mặc. Những bức tường ve vàng, cầu thang, nền gạch hoa…dường như bị thời gian bỏ quên. Ở đây không mang phong cách bao cấp thường thấy, mà cổ theo lối quý tộc."
                }
            </p>
            <p className="text-base mb-2">
                {" 2 Đinh Liệt, Hoàn Kiếm"}
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
            <div className="flex items-center justify-center h-[355px] gap-1">
                <div className="relative bg-[url('/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg')] w-full h-[355px] bg-white bg-cover rounded-l-lg after:block after:absolute after:inset-0 after:rounded-l-lg after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"></div>
                <div className="relative bg-[url('/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg')] w-full h-[355px] bg-white bg-cover after:block after:absolute after:inset-0 after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"></div>
                <div className="flex flex-col w-full h-[355px]">
                    <div className="relative bg-[url('/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg')] w-full h-full bg-white bg-cover rounded-tr-lg mb-1 after:block after:absolute after:inset-0 after:rounded-tr-lg after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"></div>
                    <div className="flex w-full h-full">
                        <div className="relative bg-[url('/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg')] w-full h-auto bg-white bg-cover mr-1 after:block after:absolute after:inset-0 after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"></div>
                        <div className="relative bg-[url('/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg')] w-full h-auto bg-white bg-cover rounded-br-lg after:block after:absolute after:inset-0 after:rounded-br-lg after:bg-black/30 after:opacity-100 after:transition cursor-pointer">
                            <span className="absolute z-10 flex justify-center items-center w-full h-full text-white text-xl font-bold">
                                {"+"}
                                {"21"}
                                {" ảnh"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceHeader
