import { useState } from "react"
import { Collapse, Checkbox, Slider } from "antd"
const { Panel } = Collapse
import { toSlug } from "../../../lib/utils"

const Sidebar = (props) => {
    const { regions, purposes, benefits, tags } = props
    const [price, setPrice] = useState([0, 3000000])

    const onChange = (e) => {
        console.log(e.target.value)
    }

    const onSliderChange = (value) => {
        setPrice(value)
    }
    return (
        <div>
            <div className="relative mb-5 h-[150px] shadow-md rounded-lg bg-[url('https://static.tacdn.com/img2/maps/img_map.png')]">
                <button className="px-3 py-2 border-2 border-black bg-white hover:bg-rose-500 hover:text-white rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {"Xem bản đồ"}
                </button>
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
                                            <Checkbox value={region.value}>
                                                {region.label}
                                            </Checkbox>
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
                                            <Checkbox value={purpose.value}>
                                                {purpose.label}
                                            </Checkbox>
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
                                            <Checkbox value={tag.value}>
                                                {tag.label}
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
                                            <Checkbox value={benefit.value}>
                                                {benefit.label}
                                            </Checkbox>
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
