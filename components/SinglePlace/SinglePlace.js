import React from "react"
import PlaceContent from "./components/PlaceContent"
import PlaceDetail from "./components/PlaceDetail"
import PlaceBenefit from "./components/PlaceBenefit"
import PlaceRelated from "./components/PlaceRelated"
import PlaceReview from "./components/PlaceReview"

import { purposes, regions, place, benefits } from "../../lib/data/sample"

const SinglePlace = () => {
    return (
        <div className="flex flex-col gap-4 mx-auto container pt-4">
            <PlaceContent place={place} benefits={benefits} />
            <PlaceDetail place={place} benefits={benefits} />
            <PlaceBenefit place={place} benefits={benefits} />
            <div className="md:flex gap-4">
                <div className="md:basis-3/4 h-fit p-4 bg-white shadow-sm rounded-lg">
                    <PlaceReview place={place} benefits={benefits} />
                </div>
                <div className="md:basis-1/4 h-fit p-4 bg-white shadow-sm rounded-lg">
                    <PlaceRelated place={place} />
                </div>
            </div>
        </div>
    )
}

export default SinglePlace
