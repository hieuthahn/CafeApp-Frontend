import React from "react"
import Link from "next/link"

const RegionSlider = ({ label, image, desc, slug }) => {
    return (
        <Link href={`/search/?regions=${label}`}>
            <a>
                <div className="w-full h-full overflow-x-hidden overflow-y-hidden my-10 rounded-lg select-none">
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto ">
                        <img
                            src={image}
                            alt={label}
                            className="object-cover object-center w-[full] h-[300px] sm:h-[330px] hover:scale-105 transition ease-in duration-700"
                        />
                        <div className="absolute transform w-full bottom-0 p-4 pointer-events-none bg-gradient-to-b from-transparent to-gray-900/[.8]">
                            <h3 className="text-xl lg:text-xl font-bold leading-5 lg:leading-6 text-white drop-shadow-md">
                                {label}
                            </h3>
                            <h4 className="text-sm font-normal leading-5 lg:leading-6 text-white drop-shadow-md">
                                {desc}
                            </h4>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default RegionSlider
