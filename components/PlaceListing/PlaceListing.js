import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import PlaceItem from "./components/PlaceItem"
import { regions, purposes, benefits, tags } from "../../lib/data/sample"
import { Pagination } from "antd"
import listPlace from "../../pages/management/places/listPlace.json"
import { searchPlaces } from "lib/services/place"

const PlaceListing = () => {
    const [places, setPlaces] = useState([])
    const [region, setRegion] = useState(regions)
    const [purpose, setPurpose] = useState(purposes)
    const [benefit, setBenefit] = useState(benefits)
    const [tag, setTag] = useState(tags)
    const [body, setBody] = useState({
        page: 1,
        pagesize: 10,
    })

    const searchPlace = async () => {
        try {
            const res = await searchPlaces(body)
            setPlaces(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        searchPlace()
    }, [body])

    const onPageChange = (page, pageSize) => {
        setBody((prev) => ({
            ...prev,
            page,
            pagesize: pageSize,
        }))
    }

    return (
        <div className="grid grid-cols-12 container mx-auto p-6">
            <div className="hidden md:block md:col-span-3 pr-3">
                <Sidebar
                    regions={region}
                    purposes={purpose}
                    benefits={benefit}
                    tags={tag}
                />
            </div>
            <div className="col-span-12 md:col-span-9">
                <div className="mb-3">
                    <span className="text-lg">
                        <strong>{"100 "}</strong>
                        {"Địa điểm khớp với tìm kiếm của bạn:"}
                    </span>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                    {Array.from(Array(1)).map((item, index) => {
                        return (
                            <span
                                key={index}
                                className="flex gap-1 items-center text-rose-500 border border-rose-500 rounded-lg w-fit py-1 pl-2 pr-1 bg-white text-sm font-bold"
                            >
                                {"Quận Ba Đình"}
                                <span className="cursor-pointer mt-[2px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        id="Layer_1"
                                        x="0"
                                        y="0"
                                        version="1.1"
                                        viewBox="0 0 29 29"
                                    >
                                        <path
                                            fill="#eee"
                                            stroke="#999"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                            d="M9.197 19.803L19.803 9.197M9.197 9.197l10.606 10.606"
                                        />
                                    </svg>
                                </span>
                            </span>
                        )
                    })}
                </div>
                {places &&
                    places.map((place, index) => {
                        return <PlaceItem place={place} key={index} />
                    })}
                <div className="flex justify-center">
                    <Pagination
                        defaultCurrent={1}
                        pageSizeOptions={[10, 20, 30]}
                        total={listPlace.length}
                        pageSize={body?.pagesize}
                        current={body?.page}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default PlaceListing
