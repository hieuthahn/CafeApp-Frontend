import React from "react"
import Sidebar from "./components/Sidebar"

const PlaceListing = () => {
    return (
        <div className="md:flex container mx-auto p-6">
            <div className="md:basis-3/12 p-3">
                <Sidebar />
            </div>
            <div className="md:basis-md-9/12 p-3">PlaceListing</div>
        </div>
    )
}

export default PlaceListing
