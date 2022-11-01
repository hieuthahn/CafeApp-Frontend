import React, { useState, useEffect } from "react"
import PlaceContent from "./components/PlaceContent"
import PlaceDetail from "./components/PlaceDetail"
import PlaceBenefit from "./components/PlaceBenefit"
import PlaceRelated from "./components/PlaceRelated"
import PlaceReview from "./components/PlaceReview"

import { purposes, regions, place, benefits } from "../../lib/data/sample"

const SinglePlace = ({ place }) => {
    const [openReview, setOpenReview] = useState(false)

    return (
        <div className="flex flex-col gap-4 mx-auto container py-4">
            <PlaceContent place={place} benefits={benefits} />
            <PlaceDetail
                place={place}
                benefits={benefits}
                openReview={openReview}
                setOpenReview={setOpenReview}
            />
            <PlaceBenefit place={place} benefits={benefits} />
            <div className="md:flex gap-4">
                <div className="md:basis-3/4 h-fit p-4 bg-white shadow-sm rounded-lg">
                    <PlaceReview
                        place={place}
                        benefits={benefits}
                        openReview={openReview}
                        setOpenReview={setOpenReview}
                    />
                </div>
                <div className="md:basis-1/4 h-fit p-4 bg-white shadow-sm rounded-lg">
                    <PlaceRelated place={place} />
                </div>
            </div>
        </div>
    )
}

export default SinglePlace
