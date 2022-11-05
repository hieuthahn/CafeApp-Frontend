import { useState, useEffect, useCallback } from "react"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Modal, Rate, Input, Switch, Select } from "antd"
import Link from "next/link"
import Image from "next/image"
const { TextArea } = Input
const { Option } = Select
import { searchPlaces } from "lib/services/place"
import { debounce } from "lib/utils/utils"
import { useSession } from "next-auth/react"
import { createReview } from "lib/services/review"
import { useRouter } from "next/router"

const NewReview = () => {
    const router = useRouter()
    const [rate, setRate] = useState({
        position: 5,
        view: 5,
        drink: 5,
        service: 5,
        price: 5,
    })
    const [review, setReview] = useState({
        title: "",
        content: "",
        anonymous: false,
    })
    const { data: session } = useSession()
    const [openModalPlace, setOpenModalPlace] = useState(false)
    const [placeChosen, setPlaceChosen] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [textSearch, setTextSearch] = useState()
    const [loading, setLoading] = useState(false)

    const desc = ["Quá tệ", "Trung bình", "Bình thường", "Tốt", "Tuyệt vời"]
    const rates = ["Vị trí", "Không gian", "Đồ uống", "Phục vụ", "Giá cả"]

    const onSubmitReview = async () => {
        if (!placeChosen || !rate || !review) {
            return
        }

        const body = {
            rate,
            ...review,
            place: placeChosen?._id,
        }
        const formData = new FormData()
        formData.append("data", JSON.stringify(body))
        try {
            const res = await createReview(formData)
            if (res?.success) {
                router.push(`/place/${placeChosen?.slug}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickPlace = (place) => {
        setPlaceChosen(place)
        setOpenModalPlace(false)
    }

    const handleSearchOptions = async (nextValue) => {
        const body = {
            name: nextValue,
        }
        try {
            const res = await searchPlaces(body)
            setSearchResult(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const debounceSearch = useCallback(
        debounce((nextValue) => handleSearchOptions(nextValue), 1000),
        []
    )

    const handleReviewChange = (e, name) => {
        setReview((prev) => ({
            ...prev,
            [name]: name === "anonymous" ? !prev[name] : e.target.value,
        }))
    }

    const handleTextChange = (e) => {
        setTextSearch(e.target.value)
        if (e.target.value !== "") {
            setLoading(true)
            debounceSearch(e.target.value)
        }
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
                            {Object.keys(rate).map((key, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-4 items-center"
                                    >
                                        <span className="basis-1/5 mt-2 text-sm">
                                            {rates[index]}
                                        </span>
                                        <span className="flex gap-4 items-center">
                                            <Rate
                                                className="!text-rose-500 !text-3xl"
                                                onChange={(value) =>
                                                    setRate((prev) => ({
                                                        ...prev,
                                                        [key]: value,
                                                    }))
                                                }
                                                value={rate[key]}
                                                allowClear={false}
                                            />
                                            {rate[key] ? (
                                                <span className="ant-rate-text !hidden md:!block text-lg bg-rose-500 text-white font-semibold rounded-lg px-2 !mt-2">
                                                    {desc[rate[key] - 1]}
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
                                value={review?.title}
                                onChange={(e) => handleReviewChange(e, "title")}
                                allowClear
                            />
                            <TextArea
                                value={review?.content}
                                onChange={(e) =>
                                    handleReviewChange(e, "content")
                                }
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
                        <Switch
                            value={review?.anonymous}
                            onChange={(e) => handleReviewChange(e, "anonymous")}
                        />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                    <h4 className="!mb-2 text-base font-semibold text-gray-500">
                        {"Địa điểm"}
                    </h4>
                    {placeChosen ? (
                        <div className="border rounded-lg">
                            <div className="flex rounded-lg w-full overflow-hidden">
                                <Image
                                    width="210px"
                                    height="160px"
                                    src={
                                        placeChosen?.photos[0]?.url ||
                                        placeChosen?.photos[0]
                                    }
                                    className="rounded-l-lg min-h-[160px] max-h-[160px] mr-3"
                                />
                                <div className="overflow-hidden p-4 flex flex-col gap-1 grow">
                                    <Link href={`/place/${placeChosen?.slug}`}>
                                        <a>
                                            <h4 className="text-xl font-bold hover:underline ">
                                                {placeChosen?.name}
                                            </h4>
                                        </a>
                                    </Link>
                                    <div className="text-gray-500 text-base truncate ">
                                        {placeChosen?.address?.specific}
                                    </div>
                                    <div className="truncate pointer-events-none">
                                        <span>
                                            <Rate
                                                className="!text-rose-500 !text-sm"
                                                disabled
                                                allowHalf
                                                defaultValue={
                                                    placeChosen?.rate?.avg
                                                }
                                            />
                                        </span>
                                        {" - "}
                                        <span>
                                            {Math.floor(
                                                placeChosen?.rate?.avg
                                            ) || "Chưa có đánh giá"}
                                        </span>
                                    </div>
                                    <Button
                                        className="mt-auto ml-auto hover:opacity-75 text-rose-500"
                                        onClick={() => setPlaceChosen(false)}
                                    >
                                        {"Chọn lại"}
                                    </Button>
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
                            <div className="flex justify-between items-center mb-3">
                                <Input
                                    value={textSearch}
                                    onChange={handleTextChange}
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
                                    suffix={
                                        loading && (
                                            <svg
                                                class="animate-spin h-5 w-5 mr-3"
                                                xmlns="http://www.w3.org/2000/svg"
                                                enableBackground="new 0 0 24 24"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="4"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                />
                                                <circle
                                                    cx="16"
                                                    cy="5.1"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                    transform="rotate(-60 16 5.072)"
                                                />
                                                <circle
                                                    cx="18.9"
                                                    cy="8"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                    transform="rotate(-30 18.928 8)"
                                                />
                                                <circle
                                                    cx="20"
                                                    cy="12"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                />
                                                <circle
                                                    cx="18.9"
                                                    cy="16"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                    transform="rotate(-60 18.928 16)"
                                                />
                                                <circle
                                                    cx="16"
                                                    cy="18.9"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                    transform="rotate(-30 15.999 18.929)"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="20"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                />
                                                <circle
                                                    cx="8"
                                                    cy="18.9"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                    transform="rotate(-60 8 18.929)"
                                                />
                                                <circle
                                                    cx="5.1"
                                                    cy="16"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                    transform="rotate(-30 5.071 16)"
                                                />
                                                <circle
                                                    cx="4"
                                                    cy="12"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                />
                                                <circle
                                                    cx="5.1"
                                                    cy="8"
                                                    r="1"
                                                    fill="#fc6d6d"
                                                    transform="rotate(-60 5.072 8)"
                                                />
                                            </svg>
                                        )
                                    }
                                    allowClear={!loading}
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
                            {textSearch !== "" &&
                                !loading &&
                                (searchResult.length > 0 ? (
                                    searchResult?.map((place, index) => {
                                        if (index < 5) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="px-5 py-3 flex gap-3 hover:bg-slate-100 cursor-pointer"
                                                    onClick={() =>
                                                        handleClickPlace(place)
                                                    }
                                                >
                                                    <div>
                                                        <Image
                                                            className="rounded"
                                                            src={
                                                                place?.photos[0]
                                                            }
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-bold text-gray-800">
                                                            {place.name}
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-600 pt-0.5">
                                                            {
                                                                place?.address
                                                                    ?.specific
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                ) : (
                                    <div className="text-center">
                                        Không tìm thấy địa điểm nào.
                                    </div>
                                ))}
                            {/* <div>
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
                            </div> */}
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="my-3">
                <button
                    className="text-white hover:opacity-75 bg-rose-500 px-3 py-2 rounded-lg"
                    onClick={onSubmitReview}
                >
                    {"Gửi đánh giá của bạn"}
                </button>
            </div>
        </div>
    )
}

export default NewReview
