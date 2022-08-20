import React from "react"
import PlaceCard from "../../PlaceCard"

const PlaceRelated = () => {
    return (
        <div>
            <h2 className="text-xl font-bold !mb-2">{"Địa điểm gợi ý"}</h2>
            {[...Array(4)].map((item, index) => {
                return (
                    <div key={index} className="mb-3">
                        <PlaceCard />
                    </div>
                )
            })}
        </div>
    )
}

export default PlaceRelated
