import React, { useState, useEffect } from "react"
import PlaceCard from "../../PlaceCard"
import { searchPlaces } from "lib/services/place"

const PlaceRelated = () => {
    const [places, setPlaces] = useState([])

    const getPlaces = async () => {
        const body = {
            sort: {
                // updatedAt: 1,
                // name: -1,
                "price.min": 1,
            },
            page: 1,
            pageSize: 3,
        }
        try {
            const res = await searchPlaces(body)
            setPlaces(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPlaces()
    }, [])

    return (
        <div>
            <h2 className="text-xl font-bold !mb-2">{"Địa điểm gợi ý"}</h2>
            {places.map((place, index) => {
                return (
                    <div key={index} className="mb-3">
                        <PlaceCard place={place} />
                    </div>
                )
            })}
        </div>
    )
}

export default PlaceRelated
