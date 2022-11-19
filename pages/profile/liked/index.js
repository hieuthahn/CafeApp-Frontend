import { useState, useEffect } from "react"
import Sidebar from "components/Profile/Setting/Sidebar"
import Info from "components/Profile/Setting/Info"
import PlaceItem from "components/PlaceListing/components/PlaceItem"
import { getLikeByUserId, likePlace } from "lib/services/like"
import { message } from "antd"

const PlaceLiked = () => {
    const [listLike, setListLike] = useState([])
    useEffect(async () => {
        try {
            const res = await getLikeByUserId()
            setListLike(res?.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleUnlike = async (info) => {
        const key = "loading"
        try {
            message.loading({
                content: "Loading...",
                key,
            })
            const res = await likePlace(info.place?._id)
            if (res.success) {
                const newListLike = listLike.filter((item) => item !== info)
                setListLike(newListLike)
                message.success({
                    content: `Đã bỏ thích ${info.place.name}`,
                    key,
                    duration: 4,
                })
                return
            }
            message.error({
                content: res.message || "Có lỗi xảy ra",
                key,
                duration: 4,
            })
        } catch (error) {
            message.error({
                content: error.message || "Có lỗi xảy ra",
                key,
                duration: 4,
            })
        }
    }

    return (
        <div className="container mx-auto p-1 md:p-4 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3">
                <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9">
                {listLike?.length > 0 ? (
                    listLike?.map((info) => {
                        return (
                            <div key={info._id} className="relative">
                                <PlaceItem
                                    key={info._id}
                                    place={info?.place}
                                    // className="mb-0"
                                />
                                <div
                                    className="absolute bottom-2 right-2 flex justify-end bg-white"
                                    onClick={() => handleUnlike(info)}
                                >
                                    <button className="border border-rose-500 px-2 py-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-500">
                                        <i className="far fa-heart mr-1"></i>
                                        <span className="">{"Bỏ thích"}</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="bg-white p-4 rounded-lg">
                        Bạn chưa có địa điểm yêu thích nào.
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlaceLiked
