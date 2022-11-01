import { useState } from "react"
import Image from "next/image"
import Fancybox from "components/Fancybox"
import PlaceMedia from "./PlaceMedia"
import { Modal } from "antd"

import NotFoundImage from "public/static/images/file-not-found.png"

const PlaceContent = (props) => {
    const { place } = props
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            {place && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h1 className="text-2xl font-bold !mb-2">{place?.name}</h1>
                    <p className="text-base !mb-2">{place?.intro}</p>
                    <p className="text-base !mb-2">
                        {place?.address?.specific}
                        <span>{" — "}</span>
                        <a className="text-base font-semibold hover:underline">
                            {"Hiển thị bản đồ"}
                        </a>
                        <span>{" — "}</span>
                        <a className="text-base font-semibold hover:underline">
                            {"Xem đường đi"}
                        </a>
                        <span>{" — "}</span>
                        <a
                            className="text-base font-semibold hover:underline"
                            onClick={() => setShowMenu(true)}
                        >
                            {"Xem menu"}
                        </a>
                    </p>
                    <PlaceMedia place={place} />
                </div>
            )}

            <Modal
                title={
                    <div className="font-bold text-xl text-center">
                        {`Menu của ${place?.name}`}
                    </div>
                }
                width="50vw"
                style={{
                    top: 80,
                }}
                bodyStyle={{
                    height: "50vh",
                    padding: "0px",
                    overflowY: "auto",
                }}
                open={showMenu}
                onCancel={() => setShowMenu(false)}
                footer={null}
            >
                <Fancybox>
                    <div className="grid grid-cols-4 p-4">
                        {place?.menu?.length && place?.menu[0] ? (
                            place?.menu?.map((item, index) => {
                                return (
                                    <div
                                        data-fancybox="gallery"
                                        data-src={item}
                                        className="rounded text-center cursor-pointer"
                                    >
                                        <Image
                                            className="rounded"
                                            key={index}
                                            src={item}
                                            width={150}
                                            height={150}
                                            objectFit="contain"
                                        />
                                    </div>
                                )
                            })
                        ) : (
                            <>
                                <div className="text-center">
                                    <Image
                                        src={NotFoundImage}
                                        width={250}
                                        height={250}
                                        // layout={"fill"}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className="text-center font-bold text-lg">
                                    {"Menu chưa được cập nhật!"}
                                </div>
                            </>
                        )}
                    </div>
                </Fancybox>
            </Modal>
        </>
    )
}

export default PlaceContent
