import React from "react"
import Image from "next/image"
import Link from "next/link"

const CardSlider = ({ label, image, slug }) => {
    return (
        <Link href={`/search/?purposes=${label}`}>
            <a>
                <div className="w-full h-auto mx-auto overflow-x-hidden overflow-y-hidden my-10 rounded-lg select-none">
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto ">
                        <img
                            src={image}
                            alt={label}
                            className="object-cover object-center w-full h-full hover:scale-105 transition ease-in duration-700"
                        />
                        <div className="absolute transform w-full text-center bottom-0 p-4 pointer-events-none bg-gradient-to-b from-transparent to-gray-900/[.8]">
                            <h3 className="text-xl lg:text-xl font-bold leading-5 lg:leading-6 text-white">
                                {label}
                            </h3>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default CardSlider
