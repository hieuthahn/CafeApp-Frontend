import React, { useState, useEffect } from "react"
import PlaceContent from "./components/PlaceContent"
import PlaceDetail from "./components/PlaceDetail"
import PlaceBenefit from "./components/PlaceBenefit"
import PlaceRelated from "./components/PlaceRelated"
import PlaceReview from "./components/PlaceReview"

import { searchPlaces, getPlaceBySlug } from "lib/services/place"

const SinglePlace = (props) => {
    const [place, setPlace] = useState(props.place || {})
    const getPlace = async () => {
        if (props?.slug) {
            try {
                const res = await getPlaceBySlug(props?.slug)
                setPlace(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        setPlace(props.place)
    }, [props.place])

    return (
        <div className="flex flex-col gap-4 mx-auto container py-4">
            <PlaceContent place={place} />
            <PlaceDetail place={place} />
            <PlaceBenefit place={place} />
            <div className="md:flex gap-4">
                <div className="md:basis-3/4 h-fit p-4 bg-white shadow-sm rounded-lg">
                    <PlaceReview place={place} getPlace={getPlace} />
                </div>
                <div className="md:basis-1/4 h-fit p-4 bg-white shadow-sm rounded-lg">
                    <PlaceRelated place={place} />
                </div>
            </div>
        </div>
    )
}

export default SinglePlace
