import React, { Fragment } from "react"
import PlaceCard from "../../PlaceCard"
import listPlace from "../../../pages/management/places/listPlace.json"

const PlaceLanding = () => {
    return (
        <Fragment>
            <section className="my-12">
                <h2 className="text-center text-2xl font-bold text-slate-700">
                    {"Địa điểm nổi bật"}
                </h2>
                <div className="mx-auto w-[90px] h-[2px] bg-rose-500 mt-2 rounded-lg"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 justify-between items-center">
                    {listPlace.map((place, index) => {
                        if (index < 8) {
                            return <PlaceCard place={place} key={index} />
                        }
                    })}
                </div>
            </section>
        </Fragment>
    )
}

export default PlaceLanding
