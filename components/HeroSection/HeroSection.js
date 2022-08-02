import React from "react"
import SearchBar from "./SearchBar"

const HeroSection = () => {
    return (
        <section
            className="flex items-cover bg-cover bg-bottom p-10 md:py-32 md:px-16"
            style={{
                backgroundImage: `url(
                    "https://ik.imagekit.io/reviewcafe/3511_zApiGKUaCd.jpg?tr=w-1800%2Cq-50"
                )`,
            }}
        >
            <div className="bg-smoke-dark p-6 md:p-10 rounded w-full shadow-lg">
                <h1 className="font-serif text-2xl md:text-3xl leading-tight text-center font-normal text-white mb-8">
                    Find your dream accommodation today
                </h1>
                <SearchBar />
            </div>
        </section>
    )
}

export default HeroSection
