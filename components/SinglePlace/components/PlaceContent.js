import { useState, useEffect } from "react"
import Image from "next/image"
import Fancybox from "components/Fancybox"
import PlaceMedia from "./PlaceMedia"
import { Modal } from "antd"
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookShareCount,
    FacebookMessengerShareButton,
} from "react-share"
import NotFoundImage from "public/static/images/file-not-found.png"
import { select, selectAll, removeClass } from "lib/utils/dom"
import QRCode from "qrcode.react"

const PlaceContent = (props) => {
    const { place } = props
    const [showMenu, setShowMenu] = useState(false)
    const [openShare, setOpenShare] = useState(false)

    useEffect(() => {
        if (openShare) {
            const shareEls = selectAll(
                ".react-share__ShareButton",
                document.body
            )
            shareEls.map((shareEl) =>
                removeClass("react-share__ShareButton", shareEl)
            )

            const script = document.createElement("script")

            script.src = "https://sp.zalo.me/plugins/sdk.js"
            script.async = true

            document.body.appendChild(script)
            const zaloShareEl = select(".zalo-share-button", document.body)
            if (zaloShareEl) {
                setTimeout(() => {
                    removeClass("zalo-share-button", zaloShareEl)
                }, 100)
            }

            return () => {
                document.body.removeChild(script)
            }
        }
    }, [openShare])

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = select("#qr-gen", document.body)
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        let downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        downloadLink.download = `${place?.slug}-QR.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

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

                    <div className="mb-2 flex items-center gap-2">
                        <button
                            className="flex items-center gap-1 hover:text-rose-500"
                            onClick={() => setOpenShare(true)}
                        >
                            <i className="far fa-share-square text-lg"></i>
                            <span className="text-base">
                                {""}
                                {"Chia sẻ"}
                            </span>
                        </button>
                        <Modal
                            title={
                                <div className="font-bold text-xl text-center">
                                    {`Chia sẻ địa điểm ${place?.name}`}
                                </div>
                            }
                            style={{
                                top: 80,
                            }}
                            open={openShare}
                            onCancel={() => setOpenShare(false)}
                            footer={null}
                        >
                            <div className="flex flex-wrap items-center justify-around">
                                <FacebookShareButton
                                    url={window.location.href}
                                    quote={place?.name}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <FacebookIcon size={36} round={true} />
                                    <div>Facebook</div>
                                </FacebookShareButton>
                                <FacebookMessengerShareButton
                                    url={window.location.href}
                                    quote={place?.name}
                                    appId={"685154232939629"}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <FacebookMessengerIcon
                                        size={36}
                                        round={true}
                                    />
                                    <div>Messenger</div>
                                </FacebookMessengerShareButton>
                                <div
                                    className="zalo-share-button flex flex-col justify-center items-center gap-1"
                                    data-href={window.location.href}
                                    data-oaid="4045075758142864226"
                                    data-layout="2"
                                    data-color="blue"
                                    data-customize="true"
                                    title="Chia sẻ với Zalo"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="40"
                                        height="40"
                                    >
                                        <path
                                            fill="#2962ff"
                                            d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
                                        />
                                        <path
                                            fill="#eee"
                                            d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
                                        />
                                        <path
                                            fill="#2962ff"
                                            d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
                                        />
                                        <path
                                            fill="#2962ff"
                                            d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
                                        />
                                        <path
                                            fill="#2962ff"
                                            d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
                                        />
                                        <path
                                            fill="#2962ff"
                                            d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
                                        />
                                    </svg>
                                    <div className="">Zalo</div>
                                </div>
                                <div className="text-center flex flex-col items-center">
                                    <QRCode
                                        id="qr-gen"
                                        value={window.location.href}
                                        size={100}
                                        level={"H"}
                                        includeMargin={true}
                                    />
                                    <button onClick={downloadQRCode}>
                                        Tải QR code
                                    </button>
                                </div>
                            </div>
                        </Modal>
                        <span>{" — "}</span>
                        <button className="flex items-center gap-1 hover:text-rose-500">
                            <i className="far fa-heart text-lg"></i>

                            {/* <i class="fas fa-heart text-rose-500 text-lg"></i> */}
                            <span className="text-base">
                                {" 0 "}
                                {"Thích"}
                            </span>
                        </button>
                    </div>
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
                                        key={index}
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
