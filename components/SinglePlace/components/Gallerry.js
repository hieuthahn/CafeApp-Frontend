import LightGallery from "lightgallery/react"

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import { purposes, regions } from "../../../lib/data/sample"
import PurposeSlider from "../../CardSlider/PurposeSlider"
import Link from "next/link"

const Gallerry = () => {
    const onInit = () => {
        console.log("lightGallery has been initialized")
    }
    return (
        <LightGallery
            elementClassNames="h-[500px] flex flex-row gap-4"
            onInit={onInit}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
        >
            {purposes.map((purpose, index) => {
                return (
                    <a key={index} href={purpose.image}>
                        <div className="w-full h-[200px] mx-auto overflow-x-hidden overflow-y-hidden my-10 rounded-lg select-none">
                            <div className="flex flex-shrink-0 relative w-full sm:w-auto ">
                                <img
                                    src={purpose.image}
                                    alt={purpose.label}
                                    className="object-cover object-center w-full h-full hover:scale-105 transition ease-in duration-700"
                                />
                                <div className="absolute transform w-full text-center bottom-0 p-4 pointer-events-none bg-gradient-to-b from-transparent to-gray-900/[.8]">
                                    <h3 className="text-xl lg:text-xl font-bold leading-5 lg:leading-6 text-white">
                                        {purpose.label}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })}
        </LightGallery>
    )
}

export default Gallerry
