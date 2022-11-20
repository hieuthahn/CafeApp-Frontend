import { useState, useEffect } from "react"
import Sidebar from "components/Profile/Setting/Sidebar"
import Info from "components/Profile/Setting/Info"
import { getReviewsByUserId, deleteReviewById } from "lib/services/review"
import { message, Pagination, Modal, Button } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import moment from "moment"
moment.locale("vi")
const format = "DD-MM-YYYY"

const { confirm } = Modal

const PlaceReviewed = () => {
    const [reviews, setReviews] = useState([])
    const [body, setBody] = useState({
        page: 1,
        pageSize: 10,
    })
    const [options, setOptions] = useState({
        open: false,
        review: null,
    })

    const getReview = async () => {
        try {
            const res = await getReviewsByUserId(body.page, body.pageSize)
            if (res.success) {
                setReviews(res)
            }
        } catch (error) {}
    }

    useEffect(async () => {
        getReview()
    }, [body])

    const getAnonymousText = (text) => {
        return text.replace(/(?!^.?).(?!.{0}$)/g, "*")
    }

    const onPageChange = (newPage, pageSize) => {
        window.scroll({ top: 0 })
        setBody((prev) => ({ ...prev, page: newPage, pageSize: pageSize }))
    }

    const handleRemoveReview = (review) => {
        confirm({
            title: `Bạn muốn xóa đánh giá ${review?.title}?`,
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                try {
                    const res = await deleteReviewById(review?._id)
                    if (res.success) {
                        message.success(res.message)
                        const newReviews = reviews.data.filter(
                            (item) => item !== review
                        )
                        setReviews((prev) => ({ ...prev, data: newReviews }))
                        newReviews.length === 0 && getReview()
                        return
                    }
                    message.error(res.message)
                } catch (error) {
                    message.error(error.message || "Xóa không thành công")
                }
            },
            onCancel() {},
        })
    }

    return (
        <div className="container mx-auto p-1 md:p-4 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3">
                <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9">
                <div className="bg-white rounded-lg p-2 md:p-4">
                    {reviews?.data?.length > 0 ? (
                        reviews?.data?.map((review, index) => (
                            <div
                                className="md:flex md:gap-4 mb-4 bg-white"
                                key={index}
                            >
                                <div className="grow">
                                    <div className="flex flex-col flex-1 rounded-lg bg-gray-100/80 p-4 shadow-sm">
                                        <div className="flex items-center justify-between w-full pb-2 mb-4 border-b-2">
                                            <div>
                                                <div className="flex items-center">
                                                    <h3 className="font-bold text-base">
                                                        {review?.anonymous
                                                            ? getAnonymousText(
                                                                  review?.author
                                                                      ?.name
                                                              )
                                                            : review?.author
                                                                  ?.name}
                                                    </h3>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="none"
                                                            d="M0 0h24v24H0V0z"
                                                        />
                                                        <path
                                                            fill="#666"
                                                            d="M10 17l5-5-5-5v10z"
                                                        />
                                                    </svg>
                                                    <Link
                                                        href={`/place/${review?.place?.slug}`}
                                                        passHref
                                                        legacyBehavior
                                                    >
                                                        <a>
                                                            <h3 className="font-bold text-base hover:text-rose-500">
                                                                {
                                                                    review
                                                                        ?.place
                                                                        ?.name
                                                                }
                                                            </h3>
                                                        </a>
                                                    </Link>
                                                </div>
                                                <span className="text-xs">
                                                    {moment(
                                                        review?.createdAt
                                                    ).format(format)}
                                                </span>
                                            </div>
                                            <span className="bg-rose-500 text-white font-semibold rounded-full w-[32px] h-[32px] text-center leading-[32px]">
                                                {review?.rate?.avg || 0}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-base">
                                                {review?.title}
                                            </div>
                                            <div className="break-all whitespace-pre-wrap">
                                                {review?.content}
                                            </div>
                                            {review?.images?.length > 0 && (
                                                <div className="flex gap-2 w-full h-full mt-2">
                                                    {review?.images?.map(
                                                        (image, i) => {
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
                                                        }
                                                    )}
                                                </div>
                                            )}
                                            <div className="text-end">
                                                <Button
                                                    onClick={() =>
                                                        handleRemoveReview(
                                                            review
                                                        )
                                                    }
                                                    shape="circle"
                                                    icon={<DeleteOutlined />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Bạn chưa có đánh giá nào.</div>
                    )}

                    {reviews?.meta?.totalItems > 10 && (
                        <Pagination
                            className="text-center !pb-5"
                            current={body?.page}
                            onChange={onPageChange}
                            pageSize={body?.pageSize}
                            pageSizeOptions={[6, 10, 20]}
                            total={reviews?.meta?.totalItems}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlaceReviewed
