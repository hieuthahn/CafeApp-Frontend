import { useState } from "react"

import Fancybox from "../../Fancybox"
import PlaceMedia from "./PlaceMedia"

const PlaceContent = (props) => {
    const { place } = props
    return (
        <>
            {place && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h1 className="text-2xl font-bold !mb-2">{place?.name}</h1>
                    <p className="text-base !mb-2">{place?.intro}</p>
                    <p className="text-base !mb-2">
                        {place?.address?.specific}
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
