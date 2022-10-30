import { useState, useEffect } from "react"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Modal, Rate, Input, Switch } from "antd"
const { TextArea } = Input

const PlaceReview = (props) => {
    const { place } = props
    const [openReview, setOpenReview] = useState(false)
    const [reviewValue, setReviewValue] = useState({
        ratePosition: 5,
        rateView: 5,
        rateDrink: 5,
        rateService: 5,
        ratePrice: 5,
    })

    // ratePosition: 5,
    //         ratePrice: 5,
    //         rateService: 5,
    //         rateView: 5,
    const [value, setValue] = useState(5)
    const desc = ["Quá tệ", "Trung bình", "Bình thường", "Tốt", "Tuyệt vời"]
    const rates = ["Vị trí", "Không gian", "Đồ uống", "Phục vụ", "Giá cả"]
    const hasReview = false

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {"Đánh giá"}
                    <span className="hidden md-block">{" từ cộng đồng"}</span>
                    {" (0)"}
                </h2>
                <button
                    onClick={() => setOpenReview(true)}
                    className="bg-rose-500 text-white text-base font-bold rounded-lg px-2 py-1 hover:bg-rose-700"
                >
                    {"Viết đánh giá"}
                </button>
                <Modal
                    title={
                        <h3 className="font-bold text-center text-xl">{`Đánh giá ${"Ban công cafe"}`}</h3>
                    }
                    centered
                    visible={openReview}
                    onOk={() => setOpenReview(false)}
                    onCancel={() => setOpenReview(false)}
                    footer={
                        <button
                            className="text-white bg-rose-500 hover:bg-rose-700 py-1 px-2 text-base font-semibold rounded-lg my-1"
                            type="submit"
                            onClick={() => setOpenReview(false)}
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
                            {Object.keys(reviewValue).map((key, index) => {
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
                        <h4 className="!mb-3 text-base font-semibold">
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
                            <h4 className="text-base font-semibold">
                                {"Đánh giá ẩn danh"}
                            </h4>
                            <span className="text-xs">
                                {
                                    "Tên của bạn sẽ hiển thị như h*****g và không hiển thị trên dòng thời gian của bạn"
                                }
                            </span>
                        </div>
                        <Switch />
                    </div>
                </Modal>
            </div>

            {/* linear-gradient(90deg,#ffb8b8,#ffddd8) */}
            <div className="relative h-[180px] bg-gradient-to-r from-[#ffb8b8] to-[#ffddd8] rounded-lg mt-3 flex justify-center items-center">
                <span className="absolute -top-[10px] right-[36px] border-solid border-b-[#ffdcd8] border-b-[10px] border-x-transparent border-x-8 border-t-0"></span>
                <div className="basis-1/3 h-full">
                    <img
                        className="w-full h-full"
                        src="https://ik.imagekit.io/reviewcafe/Online_Review-cuate_wG_WzURJF.svg"
                    />
                </div>
                <div className="basis-2/3 px-2">
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
            {hasReview ? (
                <div className="pt-4 mt-6 border-t">
                    <div className="md:flex md:gap-4 mb-4">
                        <img
                            src="https://toidicafe.vn/anonymous.png"
                            className="hidden md:block w-[64px] h-[64px] rounded-full object-cover border bg-gray-100/80 shadow-sm"
                        />
                        <div>
                            <div className="flex flex-col flex-1 rounded-lg bg-gray-100/80 p-4 shadow-sm">
                                <div className="flex items-center justify-between w-full pb-2 mb-4 border-b-2">
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src="https://toidicafe.vn/anonymous.png"
                                            className="block md:hidden w-[32px] h-[32px] rounded-full object-cover border bg-gray-100/80 shadow-sm"
                                        />
                                        <div>
                                            <h3 className="font-bold text-base">
                                                {"Hiếu Thành"}
                                            </h3>
                                            <span className="text-xs">
                                                {"Đã đánh giá 3 ngày trước"}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="bg-rose-500 text-white font-semibold rounded-full w-[32px] h-[32px] text-center leading-[32px]">
                                        {"5.0"}
                                    </span>
                                </div>
                                <div>
                                    <div className="break-words whitespace-pre-wrap">
                                        {
                                            "Mình nghĩ ai ở HN đủ lâu cũng đều ít nhất 1 lần từng nghe/ từng đi qua chiếc “ban công” siêu thơ này. \nBan công cafe trong 1 căn biệt thự cổ, nằm ngay ngã 3 Đinh Liệt, Hàng Bạc, cùng với “giao diện” ko lẫn vào đâu được. Ko gian bên trong khá rộng, ấm cúng và gần gũi, đương nhiên ko thể thiếu những góc ban công signature của quán. Đặc biệt trên tầng 2 có 1 phòng hoa xinh ngất ngây, \nNgoài đồ uống ra ở đây còn phục vụ đồ ăn, highly recommend cho các đôi đi hẹn hò, hoặc muốn tổ chức tiệc nhỏ buổi tối, từ vị trí, ko gian, đến menu đều rất hợp lý. \nMn đến quán vào cuối tuần có phố đi bộ thì nên gửi xe trước ở 26 Lương Ngọc Quyến nha, hôm mình tới ko biết nên lúc sau phải dắt xe đi gửi nên cũng hơi vất vả. \nCre: Chi Linh Hoàng"
                                        }
                                    </div>
                                    <div className="flex gap-2 w-full h-full mt-2">
                                        <div
                                            data-fancybox="1"
                                            data-src={
                                                "https://toidicafe.vn/static/images/2022/06/05/6916a657-902a-49bf-8f9a-279dcc87ba06-283993292_3680740732153027_274.jpeg?w=960"
                                            }
                                            style={{
                                                backgroundImage: `url(${"https://toidicafe.vn/static/images/2022/06/05/6916a657-902a-49bf-8f9a-279dcc87ba06-283993292_3680740732153027_274.jpeg?w=960"})`,
                                                backgroundPosition: "50%",
                                            }}
                                            className={`relative w-[116px] h-[116px] rounded-lg bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                                        >
                                            <img
                                                src={
                                                    "https://toidicafe.vn/static/images/2022/06/05/6916a657-902a-49bf-8f9a-279dcc87ba06-283993292_3680740732153027_274.jpeg?w=960"
                                                }
                                                className="hidden"
                                            />
                                        </div>
                                        <div
                                            data-fancybox="1"
                                            data-src={
                                                "https://toidicafe.vn/static/images/2022/06/05/ad2d42f9-0fb2-420a-8ed8-5edebd61299d-283876858_3680740905486343_136.jpeg?w=960"
                                            }
                                            style={{
                                                backgroundImage: `url(${"https://toidicafe.vn/static/images/2022/06/05/ad2d42f9-0fb2-420a-8ed8-5edebd61299d-283876858_3680740905486343_136.jpeg?w=960"})`,
                                                backgroundPosition: "50%",
                                            }}
                                            className={`relative w-[116px] h-[116px] rounded-lg bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                                        >
                                            <img
                                                src={
                                                    "https://toidicafe.vn/static/images/2022/06/05/ad2d42f9-0fb2-420a-8ed8-5edebd61299d-283876858_3680740905486343_136.jpeg?w=960"
                                                }
                                                className="hidden"
                                            />
                                        </div>
                                        <div
                                            data-fancybox="gallery"
                                            data-src={
                                                "https://toidicafe.vn/static/images/2022/06/05/a2a1e1f5-92a1-4ea2-86fd-91ae1e65df85-284281730_3680740772153023_164.jpeg?w=960"
                                            }
                                            style={{
                                                backgroundImage: `url(${"https://toidicafe.vn/static/images/2022/06/05/a2a1e1f5-92a1-4ea2-86fd-91ae1e65df85-284281730_3680740772153023_164.jpeg?w=960"})`,
                                                backgroundPosition: "50%",
                                            }}
                                            className="relative w-[116px] h-[116px] rounded-lg bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-100 after:transition cursor-pointer"
                                        >
                                            <img
                                                src={
                                                    "https://toidicafe.vn/static/images/2022/06/05/a2a1e1f5-92a1-4ea2-86fd-91ae1e65df85-284281730_3680740772153023_164.jpeg?w=960"
                                                }
                                                className="hidden"
                                            />
                                            {place.photos.length > 5 && (
                                                <span className="absolute z-10 flex justify-center items-center w-full h-full text-white text-base font-bold">
                                                    {"+"}
                                                    {place.photos.length - 5}
                                                    {" ảnh"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-2">
                                <button>
                                    <i className="far fa-heart"></i>
                                    <span>
                                        {" 0 "}
                                        {"Thích"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex md:gap-4 mb-4">
                        <img
                            src="https://toidicafe.vn/anonymous.png"
                            className="hidden md:block w-[64px] h-[64px] rounded-full object-cover border bg-gray-100/80 shadow-sm"
                        />
                        <div>
                            <div className="flex flex-col flex-1 rounded-lg bg-gray-100/80 p-4 shadow-sm">
                                <div className="flex items-center justify-between w-full pb-2 mb-4 border-b-2">
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src="https://toidicafe.vn/anonymous.png"
                                            className="block md:hidden w-[32px] h-[32px] rounded-full object-cover border bg-gray-100/80 shadow-sm"
                                        />
                                        <div>
                                            <h3 className="font-bold text-base">
                                                {"Hiếu Thành"}
                                            </h3>
                                            <span className="text-xs">
                                                {"Đã đánh giá 3 ngày trước"}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="bg-rose-500 text-white font-semibold rounded-full w-[32px] h-[32px] text-center leading-[32px]">
                                        {"5.0"}
                                    </span>
                                </div>
                                <div>
                                    <div className="break-words whitespace-pre-wrap">
                                        {
                                            "Mình nghĩ ai ở HN đủ lâu cũng đều ít nhất 1 lần từng nghe/ từng đi qua chiếc “ban công” siêu thơ này. \nBan công cafe trong 1 căn biệt thự cổ, nằm ngay ngã 3 Đinh Liệt, Hàng Bạc, cùng với “giao diện” ko lẫn vào đâu được. Ko gian bên trong khá rộng, ấm cúng và gần gũi, đương nhiên ko thể thiếu những góc ban công signature của quán. Đặc biệt trên tầng 2 có 1 phòng hoa xinh ngất ngây, \nNgoài đồ uống ra ở đây còn phục vụ đồ ăn, highly recommend cho các đôi đi hẹn hò, hoặc muốn tổ chức tiệc nhỏ buổi tối, từ vị trí, ko gian, đến menu đều rất hợp lý. \nMn đến quán vào cuối tuần có phố đi bộ thì nên gửi xe trước ở 26 Lương Ngọc Quyến nha, hôm mình tới ko biết nên lúc sau phải dắt xe đi gửi nên cũng hơi vất vả. \nCre: Chi Linh Hoàng"
                                        }
                                    </div>
                                    <div className="flex gap-2 w-full h-full mt-2">
                                        <div
                                            data-fancybox="1"
                                            data-src={
                                                "https://toidicafe.vn/static/images/2022/06/05/6916a657-902a-49bf-8f9a-279dcc87ba06-283993292_3680740732153027_274.jpeg?w=960"
                                            }
                                            style={{
                                                backgroundImage: `url(${"https://toidicafe.vn/static/images/2022/06/05/6916a657-902a-49bf-8f9a-279dcc87ba06-283993292_3680740732153027_274.jpeg?w=960"})`,
                                                backgroundPosition: "50%",
                                            }}
                                            className={`relative w-[116px] h-[116px] rounded-lg bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                                        >
                                            <img
                                                src={
                                                    "https://toidicafe.vn/static/images/2022/06/05/6916a657-902a-49bf-8f9a-279dcc87ba06-283993292_3680740732153027_274.jpeg?w=960"
                                                }
                                                className="hidden"
                                            />
                                        </div>
                                        <div
                                            data-fancybox="1"
                                            data-src={
                                                "https://toidicafe.vn/static/images/2022/06/05/ad2d42f9-0fb2-420a-8ed8-5edebd61299d-283876858_3680740905486343_136.jpeg?w=960"
                                            }
                                            style={{
                                                backgroundImage: `url(${"https://toidicafe.vn/static/images/2022/06/05/ad2d42f9-0fb2-420a-8ed8-5edebd61299d-283876858_3680740905486343_136.jpeg?w=960"})`,
                                                backgroundPosition: "50%",
                                            }}
                                            className={`relative w-[116px] h-[116px] rounded-lg bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                                        >
                                            <img
                                                src={
                                                    "https://toidicafe.vn/static/images/2022/06/05/ad2d42f9-0fb2-420a-8ed8-5edebd61299d-283876858_3680740905486343_136.jpeg?w=960"
                                                }
                                                className="hidden"
                                            />
                                        </div>
                                        <div
                                            data-fancybox="gallery"
                                            data-src={
                                                "https://toidicafe.vn/static/images/2022/06/05/a2a1e1f5-92a1-4ea2-86fd-91ae1e65df85-284281730_3680740772153023_164.jpeg?w=960"
                                            }
                                            style={{
                                                backgroundImage: `url(${"https://toidicafe.vn/static/images/2022/06/05/a2a1e1f5-92a1-4ea2-86fd-91ae1e65df85-284281730_3680740772153023_164.jpeg?w=960"})`,
                                                backgroundPosition: "50%",
                                            }}
                                            className="relative w-[116px] h-[116px] rounded-lg bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-100 after:transition cursor-pointer"
                                        >
                                            <img
                                                src={
                                                    "https://toidicafe.vn/static/images/2022/06/05/a2a1e1f5-92a1-4ea2-86fd-91ae1e65df85-284281730_3680740772153023_164.jpeg?w=960"
                                                }
                                                className="hidden"
                                            />
                                            {place.photos.length > 5 && (
                                                <span className="absolute z-10 flex justify-center items-center w-full h-full text-white text-base font-bold">
                                                    {"+"}
                                                    {place.photos.length - 5}
                                                    {" ảnh"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-2">
                                <button>
                                    <i className="far fa-heart"></i>
                                    <span>
                                        {" 0 "}
                                        {"Thích"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
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
