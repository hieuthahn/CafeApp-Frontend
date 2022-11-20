import { useState, useEffect } from "react"
import { UserOutlined } from "@ant-design/icons"
import {
    Avatar,
    Button,
    Modal,
    Rate,
    Input,
    Switch,
    message,
    Pagination,
} from "antd"
const { TextArea } = Input
import Image from "next/image"
import { getReviews, createReview } from "lib/services/review"
import useBearStore from "lib/data/zustand"
import moment from "moment"
moment.locale("vi")
const format = "DD-MM-YYYY"
message.config({
    top: 100,
    duration: 3,
    maxCount: 3,
})

const getAnonymousText = (text) => {
    return text.replace(/(?!^.?).(?!.{0}$)/g, "*")
}

const PlaceReview = (props) => {
    const { place } = props
    const state = useBearStore()
    const [rate, setRate] = useState({
        position: 5,
        view: 5,
        drink: 5,
        service: 5,
        price: 5,
    })
    const [newReview, setNewReview] = useState({
        title: "",
        content: "",
        anonymous: false,
    })
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 6,
    })
    const [reviews, setReviews] = useState([])
    const desc = ["Quá tệ", "Trung bình", "Bình thường", "Tốt", "Tuyệt vời"]
    const rates = ["Vị trí", "Không gian", "Đồ uống", "Phục vụ", "Giá cả"]

    const getListReview = async () => {
        try {
            const res = await getReviews(
                place?._id,
                pagination.page,
                pagination.pageSize
            )
            if (res.success) {
                setReviews(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListReview()
    }, [pagination, place])

    const onSubmitReview = async () => {
        if (!newReview.title || !newReview.content) {
            message.error("Bạn cần nhập tiêu đề và nội dung đánh giá")
            return
        }

        const body = {
            rate,
            ...newReview,
            place: place?._id,
        }
        const formData = new FormData()
        formData.append("data", JSON.stringify(body))
        try {
            const res = await createReview(formData)
            if (res?.success) {
                state.toggleModalReview()
                message.success("Viết đánh giá thành công!")
                resetNewReview()
                getListReview()
                props.getPlace()
                return
            }
        } catch (error) {
            message.error("Đánh giá thất bại")
            console.log(error)
        }
    }

    const handleReviewChange = (e, name) => {
        setNewReview((prev) => ({
            ...prev,
            [name]: name === "anonymous" ? !prev[name] : e.target.value,
        }))
    }

    const onPageChange = (page, pageSize) => {
        setPagination({
            page,
            pageSize,
        })
    }

    const resetNewReview = () => {
        setRate({
            position: 5,
            view: 5,
            drink: 5,
            service: 5,
            price: 5,
        })
        setNewReview({
            title: "",
            content: "",
            anonymous: false,
        })
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {"Đánh giá"}
                    <span className="hidden md-block">{" từ cộng đồng"}</span>
                    {" (0)"}
                </h2>
                <button
                    onClick={state.toggleModalReview}
                    className="bg-rose-500 text-white text-base font-bold rounded-lg px-2 py-1 hover:bg-rose-700"
                >
                    {"Viết đánh giá"}
                </button>
                <Modal
                    title={
                        <h3 className="font-bold text-center text-xl">{`Đánh giá ${place?.name}`}</h3>
                    }
                    centered
                    open={state.modalReview}
                    onCancel={state.toggleModalReview}
                    destroyOnClose={true}
                    footer={
                        <button
                            className="text-white bg-rose-500 hover:bg-rose-700 py-1 px-2 text-base font-semibold rounded-lg my-1"
                            type="submit"
                            onClick={onSubmitReview}
                        >
                            {"Gửi đánh giá"}
                        </button>
                    }
                >
                    <div>
                        <h4 className="!mb-1 text-base font-semibold">
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
                        <h4 className="!mb-3 text-base font-semibold">
                            {"Đánh giá của bạn"}
                        </h4>
                        <div className="flex flex-col gap-2">
                            <Input
                                placeholder="Nhập tiêu đề đánh giá"
                                value={newReview?.title}
                                onChange={(e) => handleReviewChange(e, "title")}
                                allowClear
                            />
                            <TextArea
                                value={newReview?.content}
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
                            <h4 className="text-base font-semibold">
                                {"Đánh giá ẩn danh"}
                            </h4>
                            <span className="text-xs">
                                {
                                    "Tên của bạn sẽ hiển thị như h*****g và không hiển thị trên dòng thời gian của bạn"
                                }
                            </span>
                        </div>
                        <Switch
                            value={newReview?.anonymous}
                            onChange={(e) => handleReviewChange(e, "anonymous")}
                        />
                    </div>
                </Modal>
            </div>

            {/* linear-gradient(90deg,#ffb8b8,#ffddd8) */}
            <div className="relative h-[auto] bg-gradient-to-r from-[#ffb8b8] to-[#ffddd8] rounded-lg mt-3 flex justify-center items-center">
                <span className="absolute -top-[10px] right-[36px] border-solid border-b-[#ffdcd8] border-b-[10px] border-x-transparent border-x-8 border-t-0"></span>
                <div className="relative basis-1/3 h-[180px]">
                    <Image
                        alt="cafe-app"
                        layout="fill"
                        objectFit="contain"
                        className="w-full h-full"
                        src="https://ik.imagekit.io/reviewcafe/Online_Review-cuate_wG_WzURJF.svg"
                    />
                </div>
                <div className="basis-2/3 p-4">
                    <h3 className="text-xl font-bold !mb-3">
                        {"Bạn đã từng đến đây?"}
                    </h3>
                    <div>
                        {
                            "Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi người cùng biết "
                        }
                        <i className="fas fa-heart text-rose-500"></i>
                    </div>
                    <div>
                        {
                            "Những review chất lượng sẽ được xuất hiện ở bảng tin đấy!"
                        }
                    </div>
                </div>
            </div>
            {reviews?.data?.length ? (
                <div className="pt-4 mt-6 border-t">
                    {reviews.data.map((review, index) => (
                        <div className="md:flex md:gap-4 mb-4" key={index}>
                            <div className="relative hidden md:block w-[64px] h-[64px] rounded-full border bg-gray-100/80 shadow-sm">
                                <Image
                                    alt="cafe-app"
                                    layout="fill"
                                    objectFit="cover"
                                    src="https://toidicafe.vn/anonymous.png"
                                    className=""
                                />
                            </div>

                            <div className="grow">
                                <div className="flex flex-col flex-1 rounded-lg bg-gray-100/80 p-4 shadow-sm">
                                    <div className="flex items-center justify-between w-full pb-2 mb-4 border-b-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="relative block md:hidden  w-[32px] h-[32px] rounded-full border bg-gray-100/80 shadow-sm">
                                                <Image
                                                    alt="cafe-app"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    src="https://toidicafe.vn/anonymous.png"
                                                    className=""
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base">
                                                    {review?.anonymous
                                                        ? getAnonymousText(
                                                              review?.author
                                                                  ?.name
                                                          )
                                                        : review?.author?.name}
                                                </h3>
                                                <span className="text-xs">
                                                    {moment(
                                                        review?.createdAt
                                                    ).format(format)}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="bg-rose-500 text-white font-semibold rounded-full w-[32px] h-[32px] text-center leading-[32px]">
                                            {review?.rate?.avg || 0}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="break-all whitespace-pre-wrap">
                                            {review?.content}
                                        </div>
                                        <div className="flex gap-2 w-full h-full mt-2">
                                            {review?.images?.map((image, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        data-fancybox="1"
                                                        data-src={
                                                            image?.url ||
                                                            image ||
                                                            ""
                                                        }
                                                        style={{
                                                            backgroundImage: `url(${
                                                                image?.url ||
                                                                image ||
                                                                ""
                                                            })`,
                                                            backgroundPosition:
                                                                "50%",
                                                        }}
                                                        className={`relative w-[116px] h-[116px] rounded-lg bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                                                    >
                                                        <Image
                                                            alt="cafe-app"
                                                            layout="fill"
                                                            objectFit="cover"
                                                            src={
                                                                image?.url ||
                                                                image ||
                                                                ""
                                                            }
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="px-4 py-2">
                                    <button>
                                        <i className="far fa-heart"></i>
                                        <span>
                                            {" 0 "}
                                            {"Thích"}
                                        </span>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    ))}

                    {reviews?.meta?.totalItems > 6 && (
                        <Pagination
                            className="text-center"
                            current={pagination?.page}
                            onChange={onPageChange}
                            pageSize={pagination?.pageSize}
                            pageSizeOptions={[6, 10, 20]}
                            total={reviews?.meta?.totalItems}
                        />
                    )}
                </div>
            ) : (
                <div className="min-h-[100px] text-base text-center flex items-center justify-center pt-4 mt-6 border-t">
                    {
                        "Địa điểm này chưa có đánh giá nào. Hãy là người đầu tiên làm chuyện ấy!"
                    }
                </div>
            )}
        </>
    )
}

export default PlaceReview
