import React, { Fragment } from "react"
import PlaceCard from "../../PlaceCard"

const PlaceLanding = () => {
    return (
        <Fragment>
            <section className="my-12">
                <h2 className="text-center text-2xl font-bold text-slate-700">
                    {"Find a Place That Fits Your Comfort"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 justify-between items-center">
                    {[...Array(8)].map((item, index) => {
                        return <PlaceCard key={index} />
                    })}
                </div>
            </section>
        </Fragment>
    )
}

export default PlaceLanding
