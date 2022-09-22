import { useState } from "react"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Modal, Rate, Input, Switch } from "antd"
import Link from "next/link"
import Image from "next/image"
const { TextArea } = Input

const NewReview = () => {
    const [reviewValue, setReviewValue] = useState({
        ratePosition: 5,
        rateView: 5,
        rateDrink: 5,
        rateService: 5,
        ratePrice: 5,
    })
    const [openModalPlace, setOpenModalPlace] = useState(false)
    const [placeChosen, setPlaceChosen] = useState(false)

    const desc = ["Quá tệ", "Trung bình", "Bình thường", "Tốt", "Tuyệt vời"]
    const rates = ["Vị trí", "Không gian", "Đồ uống", "Phục vụ", "Giá cả"]

    const handleClickPlace = () => {
        setPlaceChosen(true)
        setOpenModalPlace(false)
    }

    return (
        <div className="container mx-auto bg-white rounded-lg my-3 p-4">
            <h1 className="font-bold text-2xl text-center border-b py-3 !mb-3">
                {"Viết Review"}
            </h1>
            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-6 order-2 md:order-1">
                    <div>
                        <h4 className="!mb-2 text-base font-semibold text-gray-500">
                            {"Xếp hạng của bạn"}
                        </h4>
                        <div className="flex flex-col gap-2 pl-3 mb-3">
                            {/* ["Vị trí", "Không gian", "Đồ uống", "Phục vụ", "Giá cả"] */}
                            {Object.keys(reviewValue).map((key, index) => {
                                return (
                                    <div className="flex gap-4 items-center">
                                        <span className="basis-1/5 mt-2 text-sm">
                                            {rates[index]}
                                        </span>
                                        <span className="flex gap-4 items-center">
                                            <Rate
                                                className="!text-rose-500 !text-3xl"
                                                onChange={(value) =>
                                                    setReviewValue((prev) => ({
                                                        ...prev,
                                                        [key]: value,
                                                    }))
                                                }
                                                value={reviewValue[key]}
                                                allowClear={false}
                                            />
                                            {reviewValue[key] ? (
                                                <span className="ant-rate-text !hidden md:!block text-lg bg-rose-500 text-white font-semibold rounded-lg px-2 !mt-2">
                                                    {desc[reviewValue[key] - 1]}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h4 className="!mb-3 text-base font-semibold text-gray-500">
                            {"Đánh giá của bạn"}
                        </h4>
                        <div className="flex flex-col gap-2">
                            <Input
                                placeholder="Nhập tiêu đề đánh giá"
                                value={`Đánh giá của ${"Nguyễn Thành Hiếu"} cho ${"Ban Công Cafe"}`}
                                allowClear
                            />
                            <TextArea
                                placeholder="Nhập nội dung đánh giá"
                                showCount
                                maxLength={100}
                                autoSize={{ minRows: 5, maxRows: 8 }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-3">
                        <div className="basis-5/6">
                            <h4 className="text-base font-semibold text-gray-500">
                                {"Đánh giá ẩn danh"}
                            </h4>
                            <span className="text-xs text-gray-500">
                                {
                                    "Tên của bạn sẽ hiển thị như h*****g và không hiển thị trên dòng thời gian của bạn"
                                }
                            </span>
                        </div>
                        <Switch />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                    <h4 className="!mb-2 text-base font-semibold text-gray-500">
                        {"Địa điểm"}
                    </h4>
                    {placeChosen ? (
                        <div className="border-2 rounded-lg">
                            <div className="flex rounded-lg w-full overflow-hidden">
                                <Image
                                    width="210px"
                                    height="160px"
                                    src="/static/images/purpose/chill-370x247.png"
                                    className="rounded-l-lg min-h-[160px] max-h-[160px] mr-3"
                                />
                                <div className="overflow-hidden p-4 flex flex-col gap-1">
                                    <Link href="/place/ban-cong-coffee">
                                        <a>
                                            <h4 className="text-xl font-bold hover:underline ">
                                                {"Ban công coffee"}
                                            </h4>
                                        </a>
                                    </Link>
                                    <div className="text-gray-500 text-base truncate ">
                                        {"2 Đinh Liệt, Hoàn Kiếm"}
                                    </div>
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
                                    <button
                                        className="ml-auto hover:opacity-75 text-rose-500 underline"
                                        onClick={() => setPlaceChosen(false)}
                                    >
                                        {"Chọn lại"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="py-7 border-2 rounded-lg border-dashed cursor-pointer"
                            onClick={() => setOpenModalPlace(true)}
                        >
                            <span className="flex justify-center items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    height="19"
                                    width="22"
                                >
                                    <g data-name="Layer 2">
                                        <path d="M16,30a1,1,0,0,0,.62-.22C17,29.44,27,21.38,27,13A11,11,0,0,0,5,13c0,8.38,10,16.44,10.38,16.78A1,1,0,0,0,16,30ZM7,13a9,9,0,0,1,18,0c0,6.3-6.87,12.81-9,14.69C13.87,25.81,7,19.3,7,13Z" />
                                        <path d="M21,13a5,5,0,1,0-5,5A5,5,0,0,0,21,13Zm-8,0a3,3,0,1,1,3,3A3,3,0,0,1,13,13Z" />
                                    </g>
                                </svg>
                                {"Nhấn vào đây để chọn địa điểm"}
                            </span>
                        </div>
                    )}

                    <Modal
                        title={
                            <div className="font-bold text-center text-xl">
                                {"Chọn địa điểm đánh giá"}
                            </div>
                        }
                        open={openModalPlace}
                        onCancel={() => setOpenModalPlace(false)}
                        footer={null}
                    >
                        <div className="min-w-[250px] min-h-[200px]">
                            <div className="flex justify-between items-center">
                                <Input
                                    className="!h-[36px] md:basis-3/4"
                                    size="small"
                                    placeholder="Tìm kiếm địa điểm"
                                    prefix={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="Layer_1"
                                            x="0"
                                            y="0"
                                            version="1.1"
                                            viewBox="0 0 29 29"
                                            height="18"
                                            width="18"
                                        >
                                            <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z" />
                                            <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z" />
                                        </svg>
                                    }
                                />
                                <Link
                                    href="/add-place"
                                    className="md:basis-1/4"
                                >
                                    <a>
                                        <span className="hidden md:block font-bold cursor-pointer text-gray-500">
                                            {"Thêm địa điểm"}
                                        </span>
                                        <span className="md:hidden">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="24"
                                                width="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <g fill="#999">
                                                    <g data-name="plus">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            opacity="0"
                                                            transform="rotate(180 12 12)"
                                                        />
                                                        <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <div className="text-gray-500 my-2 ml-2">
                                    {"Đã xem gần đây"}
                                </div>
                                <div>
                                    <div
                                        className="flex items-center hover:bg-gray-100 rounded-lg cursor-pointer p-2"
                                        onClick={() => handleClickPlace()}
                                    >
                                        <Image
                                            width="40"
                                            height="40"
                                            src="/static/images/purpose/chill-370x247.png"
                                            className="rounded mr-3"
                                        />
                                        <div className="overflow-hidden pl-3">
                                            <div className="text-lg font-bold truncate">
                                                {"Ban công coffee"}
                                            </div>
                                            <div className="text-gray-500 text-sm truncate ">
                                                {"2 Đinh Liệt, Hoàn Kiếm"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="my-3">
                <button className="text-white hover:opacity-75 bg-rose-500 px-3 py-2 rounded-lg">
                    {"Gửi đánh giá của bạn"}
                </button>
            </div>
        </div>
    )
}

export default NewReview
