import { useState } from "react"

import { purposes, regions, place } from "../../../lib/data/sample"
import Fancybox from "../../Fancybox"
import PlaceMedia from "./PlaceMedia"

const PlaceContent = () => {
    return (
        <>
            {place && (
                <div className="bg-white rounded-lg shadow-sm p-4">
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
                    <PlaceMedia place={place} />
                </div>
            )}
        </>
    )
}

export default PlaceContent
