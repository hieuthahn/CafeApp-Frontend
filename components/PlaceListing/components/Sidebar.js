import { useState } from "react"
import { Collapse, Checkbox, Slider, Modal, Button, Rate } from "antd"
const { Panel } = Collapse
import { toSlug } from "../../../lib/utils"
import Image from "next/image"
import Link from "next/link"
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl"

const Map = ReactMapboxGl({
    accessToken:
        process.env.ACCESS_TOKEN_MAPBOX ||
        "pk.eyJ1IjoiaGlldXRoYWhuIiwiYSI6ImNsNzBxeTJ6ajBndTkzb284MGM5eXBvZzAifQ.gQbkdaKK9g6_zS7p4T3uGQ",
})

const Sidebar = (props) => {
    const { regions, purposes, benefits, tags } = props
    const [price, setPrice] = useState([0, 3000000])
    const [modalMapOpen, setModalMapOpen] = useState(false)

    const onChange = (e) => {
        console.log(e.target.value)
    }

    const onSliderChange = (value) => {
        setPrice(value)
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
                                {"Đang hiển thị 10/440 kết quả tìm kiếm:"}
                            </div>
                            {Array.from(Array(10)).map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-between p-4 border-b cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col text-sm">
                                            <Link href="/place/ban-cong-coffee">
                                                <a>
                                                    <h4 className="text-base font-bold hover:underline ">
                                                        {"EEBakery Coffee"}
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
                                                    {"30.000"}
                                                    {"đ"}
                                                    {" - "}
                                                    {"60.000"}
                                                    {"đ"}
                                                </span>
                                            </div>
                                            <address className="flex gap-3 items-center text-muted font-semibold mb-0 pointer-events-none">
                                                <span>
                                                    {"2 Đinh Liệt, Hoàn Kiếm"}
                                                </span>
                                            </address>
                                            <div className="flex gap-3 items-center">
                                                <div className="truncate pointer-events-none">
                                                    <span className="text-green-600 font-semibold">
                                                        {"Đang mở cửa"}
                                                    </span>
                                                    {" - "}
                                                    <span>
                                                        {"07:00 - 23:00"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Image
                                            width="100%"
                                            height="100%"
                                            objectFit="cover"
                                            src="/static/images/purpose/chill-370x247.png"
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
                                <div className="text-base font-semibold pb-0">
                                    {"Khu vực"}
                                </div>
                            }
                            key="1"
                        >
                            <div className="max-h-[220px] overflow-y-auto scrollbar">
                                {regions.map((region, index) => {
                                    return (
                                        <div className="mt-2" key={index}>
                                            <Checkbox>{region.label}</Checkbox>
                                        </div>
                                    )
                                })}
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
                                {purposes.map((purpose, index) => {
                                    return (
                                        <div className="mt-2" key={index}>
                                            <Checkbox>{purpose.label}</Checkbox>
                                        </div>
                                    )
                                })}
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
                                {tags.map((tag, index) => {
                                    return (
                                        <div className="mt-2" key={index}>
                                            <Checkbox>{tag.label}</Checkbox>
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
                                {benefits.map((benefit, index) => {
                                    return (
                                        <div className="mt-2" key={index}>
                                            <Checkbox>{benefit.label}</Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
