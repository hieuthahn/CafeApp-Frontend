import { useState, useEffect } from "react"
import { Collapse, Checkbox, Slider, Modal, Button, Rate } from "antd"
const { Panel } = Collapse
import { toSlug } from "../../../lib/utils"
import Image from "next/image"
import Link from "next/link"
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl"
import {
    getRegions,
    getTags,
    getPurposes,
    getBenefits,
} from "lib/services/category"

const Map = ReactMapboxGl({
    accessToken:
        process.env.ACCESS_TOKEN_MAPBOX ||
        "pk.eyJ1IjoiaGlldXRoYWhuIiwiYSI6ImNsNzBxeTJ6ajBndTkzb284MGM5eXBvZzAifQ.gQbkdaKK9g6_zS7p4T3uGQ",
})

const Sidebar = (props) => {
    const { body, setBody, places, pagination } = props
    const [categories, setCategories] = useState()
    const [price, setPrice] = useState([0, 3000000])
    const [modalMapOpen, setModalMapOpen] = useState(false)

    const getCategories = async () => {
        try {
            const _regions = getRegions()
            const _purposes = getPurposes()
            const _tags = getTags()
            const _benefits = getBenefits()
            const regions = await _regions
            const purposes = await _purposes
            const tags = await _tags
            const benefits = await _benefits
            setCategories({
                regions: regions.data,
                purposes: purposes.data,
                tags: tags.data,
                benefits: benefits.data,
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onChange = (value, name) => {
        if (body[name].includes(value?.name)) {
            const filter = body[name].filter((item) => item !== value?.name)
            setBody((prev) => ({
                ...prev,
                [name]: filter,
            }))
        } else {
            const temp = body[name]
            temp.push(value?.name)
            setBody((prev) => ({
                ...prev,
                [name]: temp,
            }))
        }
    }

    const onSliderChange = (value) => {
        setPrice(value)
    }

    const onSliderAfterChange = (value) => {
        const price = {
            min: value[0],
            max: value[1],
        }
        setBody((prev) => ({
            ...prev,
            price,
        }))
    }

    return (
        <div>
            <div className="relative mb-5 h-[150px] shadow-md rounded-lg bg-[url('https://static.tacdn.com/img2/maps/img_map.png')]">
                <button
                    onClick={() => setModalMapOpen(true)}
                    className="px-3 py-2 border-2 border-black bg-white hover:bg-rose-500 hover:text-white rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    {"Xem bản đồ"}
                </button>
                <Modal
                    title={
                        <div className="font-bold text-xl text-center">
                            {"Tìm kiếm địa điểm"}
                        </div>
                    }
                    width="90vw"
                    style={{
                        top: 20,
                    }}
                    bodyStyle={{
                        height: "85vh",
                        padding: "0px",
                    }}
                    open={modalMapOpen}
                    onCancel={() => setModalMapOpen(false)}
                    footer={null}
                    destroyOnClose={true}
                >
                    <div className="grid grid-cols-12 h-full">
                        <div className="col-span-12 md:col-span-4 overflow-y-scroll">
                            <div className="pl-4 py-2 text-base text-gray-500">
                                {`Đang hiển thị ${pagination?.pageSize}/${pagination?.totalItems} kết quả tìm kiếm:`}
                            </div>
                            {places.map((place, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-between p-4 border-b cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col text-sm">
                                            <Link
                                                href={`/place/${place?.slug}`}
                                                passHref
                                                legacyBehavior
                                            >
                                                <a>
                                                    <h4 className="text-base font-bold hover:underline ">
                                                        {place?.name}
                                                    </h4>
                                                </a>
                                            </Link>
                                            <div className="truncate pointer-events-none">
                                                <span>
                                                    <Rate
                                                        className="!text-rose-500 !text-sm"
                                                        disabled
                                                        allowHalf
                                                        defaultValue={4.5}
                                                    />
                                                </span>
                                                {" - "}
                                                <span>{"1 đánh giá"}</span>
                                            </div>
                                            <div className="flex gap-3 items-center">
                                                <span>
                                                    {place?.price?.min?.toLocaleString(
                                                        "vi-VN"
                                                    )}
                                                    {"đ"}
                                                    {" - "}
                                                    {place?.price?.max?.toLocaleString(
                                                        "vi-VN"
                                                    )}
                                                    {"đ"}
                                                </span>
                                            </div>
                                            <address className="flex gap-3 items-center text-muted font-semibold mb-0 pointer-events-none">
                                                <span>
                                                    {place?.address?.specific}
                                                </span>
                                            </address>
                                            <div className="flex gap-3 items-center">
                                                <div className="truncate pointer-events-none">
                                                    <span className="text-green-600 font-semibold">
                                                        {place?.openingStatus}
                                                    </span>
                                                    {" - "}
                                                    <span>
                                                        {place?.openingType}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Image
                                            alt="cafe-app"
                                            width="100%"
                                            height="100%"
                                            objectFit="cover"
                                            src={place?.photos[0]}
                                            className="rounded"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <Map
                            className="col-span-12 md:col-span-8"
                            style="mapbox://styles/mapbox/streets-v11"
                            containerStyle={{
                                minHeight: "200px",
                                height: "100%",
                                width: "auto",
                                position: "relative",
                            }}
                            center={[105.804817, 21.028511]}
                        ></Map>
                    </div>
                </Modal>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3">
                <div className="text-lg font-semibold border-b py-4 px-1">
                    {"Lọc kết quả"}
                </div>
                <div>
                    <Collapse
                        defaultActiveKey={["1", "2", "3", "4", "5"]}
                        ghost
                        expandIconPosition="end"
                    >
                        <Panel
                            header={
                                <div className="text-base font-semibold !pb-0">
                                    {"Khu vực"}
                                </div>
                            }
                            key="1"
                        >
                            <div className="max-h-[220px] overflow-y-auto scrollbar">
                                {categories &&
                                    categories?.regions?.map(
                                        (region, index) => {
                                            return (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    <Checkbox
                                                        checked={body.regions.includes(
                                                            region?.name
                                                        )}
                                                        onChange={(e) =>
                                                            onChange(
                                                                region,
                                                                "regions"
                                                            )
                                                        }
                                                    >
                                                        {region?.name}
                                                    </Checkbox>
                                                </div>
                                            )
                                        }
                                    )}
                            </div>
                        </Panel>
                        <Panel
                            header={
                                <div className="text-base font-semibold pb-0">
                                    {"Mục đích"}
                                </div>
                            }
                            key="2"
                        >
                            <div className="max-h-[220px] overflow-y-auto scrollbar">
                                {categories &&
                                    categories?.purposes?.map(
                                        (purpose, index) => {
                                            return (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    <Checkbox
                                                        checked={body.purposes.includes(
                                                            purpose?.name
                                                        )}
                                                        onChange={(e) =>
                                                            onChange(
                                                                purpose,
                                                                "purposes"
                                                            )
                                                        }
                                                    >
                                                        {purpose?.name}
                                                    </Checkbox>
                                                </div>
                                            )
                                        }
                                    )}
                            </div>
                        </Panel>
                        <Panel
                            header={
                                <div className="text-base font-semibold pb-0">
                                    {"Kiểu quán"}
                                </div>
                            }
                            key="3"
                        >
                            <div className="max-h-[220px] overflow-y-auto scrollbar">
                                {categories &&
                                    categories?.tags?.map((tag, index) => {
                                        return (
                                            <div className="mb-2" key={index}>
                                                <Checkbox
                                                    checked={body.tags.includes(
                                                        tag?.name
                                                    )}
                                                    onChange={(e) =>
                                                        onChange(tag, "tags")
                                                    }
                                                >
                                                    {tag?.name}
                                                </Checkbox>
                                            </div>
                                        )
                                    })}
                            </div>
                        </Panel>
                        <Panel
                            header={
                                <div className="text-base font-semibold pb-0">
                                    {"Khoảng giá"}
                                </div>
                            }
                            key="4"
                        >
                            <div className="max-h-[220px] overflow-y-auto scrollbar !px-2">
                                <div className="text-center">
                                    {price[0].toLocaleString("vi-VN")}
                                    {" ~ "}
                                    {price[1].toLocaleString("vi-VN")}
                                    {" VNĐ"}
                                </div>
                                <Slider
                                    range
                                    value={price}
                                    defaultValue={[0, 300000]}
                                    min={0}
                                    max={300000}
                                    step={10000}
                                    onAfterChange={onSliderAfterChange}
                                    onChange={onSliderChange}
                                />
                            </div>
                        </Panel>
                        <Panel
                            header={
                                <div className="text-base font-semibold pb-0">
                                    {"Tiện ích"}
                                </div>
                            }
                            key="5"
                        >
                            <div className="max-h-[220px] overflow-y-auto scrollbar">
                                {categories &&
                                    categories?.benefits?.map(
                                        (benefit, index) => {
                                            return (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    <Checkbox
                                                        checked={body.benefits.includes(
                                                            benefit?.name
                                                        )}
                                                        onChange={(e) =>
                                                            onChange(
                                                                benefit,
                                                                "benefits"
                                                            )
                                                        }
                                                    >
                                                        {benefit?.name}
                                                    </Checkbox>
                                                </div>
                                            )
                                        }
                                    )}
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
