import { useState, useEffect } from "react"
import { Progress } from "antd"
import { Button } from "@vechaiui/react"
import { Rate, Tooltip } from "antd"

import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl"

const Map = ReactMapboxGl({
    accessToken:
        process.env.ACCESS_TOKEN_MAPBOX ||
        "pk.eyJ1IjoiaGlldXRoYWhuIiwiYSI6ImNsNzBxeTJ6ajBndTkzb284MGM5eXBvZzAifQ.gQbkdaKK9g6_zS7p4T3uGQ",
})

const PlaceDetail = ({ place }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-lg min-h-[250px]">
            <PlaceVote place={place} />
            <PlaceInfo place={place} />
            <PlaceAddress place={place} />
        </div>
    )
}

const PlaceVote = ({ place }) => {
    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold !mb-2">{"Đánh giá"}</h2>
            {place?.rate?.avg ? (
                <>
                    <div className="flex gap-1 justify-center items-center">
                        <span className="text-xl font-bold text-white bg-rose-500 min-w-[50] rounded-lg py-2 px-3">
                            {place?.rate?.avg}
                        </span>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-bold">{"Tuyệt vời"}</h3>
                            <span className="font-semibold">
                                {"/5 ("}
                                {place?.rate?.avg
                                    ? Math.floor(place?.rate?.avg)
                                    : "0"}
                                {" đánh giá)"}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Vị trí"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={
                                    ((place?.rate?.position || 5) / 5) * 100
                                }
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {place?.rate?.position}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Không gian"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={((place?.rate?.view || 5) / 5) * 100}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {place?.rate?.view}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Đồ uống"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={((place?.rate?.drink || 5) / 5) * 100}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {place?.rate?.drink}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Phục vụ"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={
                                    ((place?.rate?.service || 5) / 5) * 100
                                }
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {place?.rate?.service}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Giá cả"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={((place?.rate?.price || 5) / 5) * 100}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {place?.rate?.price}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex gap-1 justify-center items-center">
                        <span className="text-xl font-bold text-white bg-rose-500 min-w-[50] rounded-lg py-2 px-4">
                            {"0"}
                        </span>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-bold">
                                {"Chưa có đánh giá"}
                            </h3>
                            <span className="font-semibold">
                                {"/5 ("}
                                {"0"}
                                {" đánh giá)"}
                            </span>
                        </div>
                    </div>
                    <div className="relative flex flex-col text-gray-400/90 select-none">
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Vị trí"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={0}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {"0"}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Không gian"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={0}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {"0"}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Đồ uống"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={0}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {"0"}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Phục vụ"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={0}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {"0"}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="w-[40%]">{"Giá cả"}</span>
                            <Progress
                                className="w-[50%]"
                                strokeColor="#F43F5E"
                                percent={0}
                                showInfo={false}
                            />
                            <span className="text-center w-[15%] font-semibold">
                                {"0"}
                            </span>
                        </div>
                        <div className="absolute z-10 flex justify-center items-center w-full h-full">
                            <Button
                                className="hover:!bg-rose-600 hover:!border-rose-600  hover:text-white cursor-pointer text-lg font-bold !py-5 !border-rose-500 !border-[4px] rounded-lg animate-bounce hover:animate-none"
                                color="rose"
                            >
                                {"Đánh giá ngay"}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

const PlaceInfo = ({ place }) => {
    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4 h-full">
            <h2 className="text-xl font-bold !mb-2">{"Thông tin chi tiết"}</h2>
            <div className="flex flex-col gap-3 flex-1 m-auto grow">
                <div className="flex gap-4 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        data-name="Layer 1"
                        viewBox="0 0 32 32"
                    >
                        <path d="M29.5,8H2.5A2.5,2.5,0,0,0,0,10.5v14A2.5,2.5,0,0,0,2.5,27h27A2.5,2.5,0,0,0,32,24.5v-14A2.5,2.5,0,0,0,29.5,8ZM1,10.5A1.5,1.5,0,0,1,2.5,9H4.483A2.466,2.466,0,0,1,5,10.5,2.5,2.5,0,0,1,2.5,13,2.466,2.466,0,0,1,1,12.483ZM4.483,26H2.5A1.5,1.5,0,0,1,1,24.5V22.517A2.466,2.466,0,0,1,2.5,22,2.5,2.5,0,0,1,5,24.5,2.466,2.466,0,0,1,4.483,26ZM31,24.5A1.5,1.5,0,0,1,29.5,26H27.517A2.466,2.466,0,0,1,27,24.5,2.5,2.5,0,0,1,29.5,22a2.466,2.466,0,0,1,1.5.517Zm0-3.145A3.464,3.464,0,0,0,29.5,21,3.5,3.5,0,0,0,26,24.5a3.464,3.464,0,0,0,.355,1.5H5.645A3.464,3.464,0,0,0,6,24.5,3.5,3.5,0,0,0,2.5,21a3.464,3.464,0,0,0-1.5.355V13.645A3.464,3.464,0,0,0,2.5,14,3.5,3.5,0,0,0,6,10.5,3.464,3.464,0,0,0,5.645,9H26.355A3.464,3.464,0,0,0,26,10.5,3.5,3.5,0,0,0,29.5,14a3.464,3.464,0,0,0,1.5-.355Zm0-8.872A2.466,2.466,0,0,1,29.5,13,2.5,2.5,0,0,1,27,10.5,2.466,2.466,0,0,1,27.517,9H29.5A1.5,1.5,0,0,1,31,10.5ZM15.5,15h1a1,1,0,0,1,1,1,.5.5,0,0,0,1,0,2,2,0,0,0-2-2v-.5a.5.5,0,0,0-1,0V14a2,2,0,0,0,0,4h1a1,1,0,0,1,0,2h-1a1,1,0,0,1-1-1,.5.5,0,0,0-1,0,2,2,0,0,0,2,2v.5a.5.5,0,0,0,1,0V21a2,2,0,0,0,0-4h-1a1,1,0,0,1,0-2Zm.5-4a6.5,6.5,0,1,0,6.5,6.5A6.508,6.508,0,0,0,16,11Zm0,12a5.5,5.5,0,1,1,5.5-5.5A5.506,5.506,0,0,1,16,23Z" />
                    </svg>
                    <span>
                        {place?.price?.min?.toLocaleString("vi-VN")}
                        {"đ"}
                        {" - "}
                        {place?.price?.max?.toLocaleString("vi-VN")}
                        {"đ"}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        enableBackground="new 0 0 24 24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12.5,11.8740234V7c0-0.276123-0.223877-0.5-0.5-0.5S11.5,6.723877,11.5,7v5c0.0001221,0.0824585,0.0206299,0.1636353,0.0595703,0.2363281l1.5,2.7988281c0.0869751,0.1623535,0.2562256,0.2637329,0.4404297,0.2636719c0.0825195,0.0003052,0.1638184-0.0202026,0.2363281-0.0595703c0.0002441-0.0001221,0.0004272-0.0002441,0.0006714-0.0003662c0.2429199-0.1306152,0.3340454-0.4334717,0.2034302-0.6763916L12.5,11.8740234z M12,2C6.4771729,2,2,6.4771729,2,12s4.4771729,10,10,10c5.5201416-0.0064697,9.9935303-4.4798584,10-10C22,6.4771729,17.5228271,2,12,2z M12,21c-4.9705811,0-9-4.0294189-9-9s4.0294189-9,9-9c4.9683228,0.0054321,8.9945679,4.0316772,9,9C21,16.9705811,16.9705811,21,12,21z" />
                    </svg>
                    <div className="truncate pointer-events-none">
                        <span className="text-green-600 font-semibold">
                            {place?.openingStatus}
                        </span>
                        {" - "}
                        <span>{place?.openingType}</span>
                    </div>
                </div>
                {place?.phone && (
                    <div className="flex gap-4 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.8457,9.0332 L9.5547,7.9702 C9.7747,7.6402 9.7797,7.2122 9.5667,6.8782 L7.4417,3.5382 L4.9127,4.3812 C3.8857,4.7232 3.3017,5.8252 3.6297,6.8572 C4.2017,8.6542 5.5147,11.5112 8.5017,14.4982 C11.4887,17.4852 14.3457,18.7982 16.1427,19.3692 C17.1757,19.6982 18.2767,19.1152 18.6187,18.0872 L19.4617,15.5582 L16.1217,13.4332 C15.7877,13.2212 15.3597,13.2252 15.0307,13.4452 L13.9667,14.1542 C13.6417,14.3702 13.2237,14.3832 12.8917,14.1772 C12.3507,13.8402 11.4867,13.2412 10.6227,12.3772 C9.7587,11.5132 9.1587,10.6492 8.8237,10.1082 C8.6167,9.7762 8.6297,9.3582 8.8457,9.0332 Z"
                            />
                        </svg>
                        <span>{place?.phone}</span>
                    </div>
                )}
                {place?.email && (
                    <div className="flex gap-4 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.9902344,1.5957031c-1.0087891-0.1067505-2.0227051-0.1586304-3.0371094-0.1552734C11.5898438,1.4404297,9.5,3.5819702,9.5,7.0302734v2.3408203H6.6748047c-0.276001-0.0001831-0.4998779,0.2234497-0.5,0.4994507v3.8511353c-0.0001831,0.276001,0.2234497,0.4998169,0.4994507,0.5H9.5v7.71875c-0.0001831,0.276001,0.2234497,0.4998169,0.4994507,0.5h3.9780884c0.276001,0.0001831,0.4998169-0.2234497,0.5-0.4994507v-7.7192993h2.8164673c0.2512207-0.000061,0.463501-0.1864014,0.4960938-0.4355469l0.4970703-3.8505859c0.0357056-0.2736816-0.1572266-0.5245361-0.4309692-0.5602417c-0.0216064-0.0028076-0.043335-0.0042114-0.0651245-0.0042114h-3.3135376V7.4121094c0-0.9697266,0.1953125-1.375,1.4082031-1.375l2.0390625-0.0009766c0.276001,0.0001221,0.4998169-0.2234497,0.5-0.4994507V2.0917969C18.4248657,1.8408203,18.2390137,1.6286621,17.9902344,1.5957031z M17.4248047,5.0361328l-1.5390625,0.0009766c-2.1582031,0-2.4082031,1.3554688-2.4082031,2.375v2.4590454c-0.0001221,0.2759399,0.2234497,0.4998169,0.4994507,0.499939h3.2456665l-0.3681641,2.8505859h-2.8769531c-0.276001-0.0001221-0.4998169,0.2234497-0.5,0.4994507v7.7192993H10.5v-7.71875c0.0001831-0.276001-0.2234497-0.4998169-0.4993896-0.5H7.1748047v-2.8505859H10c0.276001,0.0001831,0.4998169-0.2234497,0.5-0.4994507V7.0302734c0-2.8740234,1.664978-4.5898438,4.453125-4.5898438c1.0087891,0,1.9199219,0.0546875,2.4716797,0.1025391V5.0361328z" />
                        </svg>
                        <span>{place?.email}</span>
                    </div>
                )}
                {place?.facebook && (
                    <div className="flex gap-4 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.9902344,1.5957031c-1.0087891-0.1067505-2.0227051-0.1586304-3.0371094-0.1552734C11.5898438,1.4404297,9.5,3.5819702,9.5,7.0302734v2.3408203H6.6748047c-0.276001-0.0001831-0.4998779,0.2234497-0.5,0.4994507v3.8511353c-0.0001831,0.276001,0.2234497,0.4998169,0.4994507,0.5H9.5v7.71875c-0.0001831,0.276001,0.2234497,0.4998169,0.4994507,0.5h3.9780884c0.276001,0.0001831,0.4998169-0.2234497,0.5-0.4994507v-7.7192993h2.8164673c0.2512207-0.000061,0.463501-0.1864014,0.4960938-0.4355469l0.4970703-3.8505859c0.0357056-0.2736816-0.1572266-0.5245361-0.4309692-0.5602417c-0.0216064-0.0028076-0.043335-0.0042114-0.0651245-0.0042114h-3.3135376V7.4121094c0-0.9697266,0.1953125-1.375,1.4082031-1.375l2.0390625-0.0009766c0.276001,0.0001221,0.4998169-0.2234497,0.5-0.4994507V2.0917969C18.4248657,1.8408203,18.2390137,1.6286621,17.9902344,1.5957031z M17.4248047,5.0361328l-1.5390625,0.0009766c-2.1582031,0-2.4082031,1.3554688-2.4082031,2.375v2.4590454c-0.0001221,0.2759399,0.2234497,0.4998169,0.4994507,0.499939h3.2456665l-0.3681641,2.8505859h-2.8769531c-0.276001-0.0001221-0.4998169,0.2234497-0.5,0.4994507v7.7192993H10.5v-7.71875c0.0001831-0.276001-0.2234497-0.4998169-0.4993896-0.5H7.1748047v-2.8505859H10c0.276001,0.0001831,0.4998169-0.2234497,0.5-0.4994507V7.0302734c0-2.8740234,1.664978-4.5898438,4.453125-4.5898438c1.0087891,0,1.9199219,0.0546875,2.4716797,0.1025391V5.0361328z" />
                        </svg>
                        <a href={place?.facebook} className="">
                            {place?.name}
                        </a>
                    </div>
                )}
                {place?.instagram && (
                    <div className="flex gap-4 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.9902344,1.5957031c-1.0087891-0.1067505-2.0227051-0.1586304-3.0371094-0.1552734C11.5898438,1.4404297,9.5,3.5819702,9.5,7.0302734v2.3408203H6.6748047c-0.276001-0.0001831-0.4998779,0.2234497-0.5,0.4994507v3.8511353c-0.0001831,0.276001,0.2234497,0.4998169,0.4994507,0.5H9.5v7.71875c-0.0001831,0.276001,0.2234497,0.4998169,0.4994507,0.5h3.9780884c0.276001,0.0001831,0.4998169-0.2234497,0.5-0.4994507v-7.7192993h2.8164673c0.2512207-0.000061,0.463501-0.1864014,0.4960938-0.4355469l0.4970703-3.8505859c0.0357056-0.2736816-0.1572266-0.5245361-0.4309692-0.5602417c-0.0216064-0.0028076-0.043335-0.0042114-0.0651245-0.0042114h-3.3135376V7.4121094c0-0.9697266,0.1953125-1.375,1.4082031-1.375l2.0390625-0.0009766c0.276001,0.0001221,0.4998169-0.2234497,0.5-0.4994507V2.0917969C18.4248657,1.8408203,18.2390137,1.6286621,17.9902344,1.5957031z M17.4248047,5.0361328l-1.5390625,0.0009766c-2.1582031,0-2.4082031,1.3554688-2.4082031,2.375v2.4590454c-0.0001221,0.2759399,0.2234497,0.4998169,0.4994507,0.499939h3.2456665l-0.3681641,2.8505859h-2.8769531c-0.276001-0.0001221-0.4998169,0.2234497-0.5,0.4994507v7.7192993H10.5v-7.71875c0.0001831-0.276001-0.2234497-0.4998169-0.4993896-0.5H7.1748047v-2.8505859H10c0.276001,0.0001831,0.4998169-0.2234497,0.5-0.4994507V7.0302734c0-2.8740234,1.664978-4.5898438,4.453125-4.5898438c1.0087891,0,1.9199219,0.0546875,2.4716797,0.1025391V5.0361328z" />
                        </svg>
                        <a href={place?.instagram} className="">
                            {place?.name}
                        </a>
                    </div>
                )}
                <div className="flex gap-4 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 68 68"
                    >
                        <path d="M29.564 67.104a1.004 1.004 0 0 1-.92-.606l-3.53-8.248a1 1 0 0 1 .726-1.374l20.27-4-6.69-33.908a1 1 0 0 1 1.654-.933 10.162 10.162 0 0 1 2.514 3.526l13.953 32.556a1 1 0 0 1-.525 1.313L29.957 67.023a.991.991 0 0 1-.393.081zM27.439 58.6l2.65 6.192 25.22-10.806-12.863-30.013 5.82 29.497a1 1 0 0 1-.787 1.175l-20.04 3.955z" />
                        <path d="M18.407 60.365a.998.998 0 0 1-.982-.807l-6.85-34.75a10.106 10.106 0 0 1 1.529-7.644 10.12 10.12 0 0 1 6.499-4.33l3.722-.73a1.005 1.005 0 0 1 1.153.704c.653 2.263 1.343 3.511 1.752 4.01.184-.632.344-2.055.101-4.39a1 1 0 0 1 .802-1.084l3.3-.65c5.433-1.067 10.784 2.464 11.941 7.872l6.894 34.905a1.003 1.003 0 0 1-.788 1.175l-28.88 5.7c-.064.012-.129.019-.193.019zm3.418-46.125-2.836.556a8.137 8.137 0 0 0-5.224 3.48 8.123 8.123 0 0 0-1.228 6.144l6.657 33.77 26.918-5.312-6.697-33.91c-.928-4.331-5.24-7.173-9.595-6.312l-2.42.476c.174 2.42.021 5.078-1.336 5.757a.996.996 0 0 1-.36.102c-.08.008-.162.014-.244.029a.985.985 0 0 1-.3.007c-1.494-.191-2.606-2.542-3.335-4.787z" />
                        <path d="M23.777 50.156a1 1 0 0 1-.192-1.981l14.663-2.894a.999.999 0 1 1 .387 1.962l-14.664 2.894a.978.978 0 0 1-.194.019zm-1.026-5.192a1 1 0 0 1-.192-1.981l14.665-2.894a1 1 0 1 1 .387 1.962l-14.665 2.894a.978.978 0 0 1-.195.019z" />
                        <path d="M22.751 44.964a1 1 0 0 1-.192-1.981l14.665-2.894a1 1 0 1 1 .387 1.962l-14.665 2.894a.978.978 0 0 1-.195.019zm3.09-20.025c-1.864 0-3.538-1.313-3.915-3.198a3.951 3.951 0 0 1 .598-2.991 3.963 3.963 0 0 1 2.474-1.673.974.974 0 0 1 .115-.027 4 4 0 0 1 4.624 3.138 3.949 3.949 0 0 1-.595 2.985 3.96 3.96 0 0 1-2.542 1.693h-.004a4 4 0 0 1-.756.073zm.566-1.054h.01-.01zm-.957-4.86v.001a1.977 1.977 0 0 0-1.562 2.325c.211 1.06 1.259 1.756 2.327 1.552a1.977 1.977 0 0 0 1.56-2.323 1.993 1.993 0 0 0-2.084-1.588c-.054.005-.116.01-.18.02a.931.931 0 0 1-.061.013z" />
                        <path d="M25.286 19.035c-.042 0-.084-.003-.126-.008-1.69-.216-2.893-3.2-3.604-5.665a30.865 30.865 0 0 1-.68-2.793c-.441-2.236-.637-4.392-.553-6.07.04-.806.165-3.26 1.77-3.576 2.87-.537 4.496 6.948 4.795 8.458.193.977.34 1.934.434 2.841.27 2.619.272 5.902-1.258 6.667a.996.996 0 0 1-.36.102c-.08.008-.162.014-.244.029a.987.987 0 0 1-.174.015zm.33-1.04h.01-.01zm-.539-.83zm-2.55-14.05c-.277.911-.413 3.398.311 7.067.185.938.4 1.819.637 2.618.655 2.27 1.346 3.519 1.755 4.018.184-.632.344-2.055.101-4.39a29.107 29.107 0 0 0-.405-2.659c-.725-3.674-1.796-5.92-2.398-6.653z" />
                        <path d="M25.391 19.05c-.151 0-.29-.023-.418-.066a.999.999 0 0 1 .14-1.934c.138-.025.276-.039.416-.05.482-.04.945.28 1.06.762a1 1 0 0 1-.6 1.16l-.372-.927.354.936c-.098.04-.187.072-.293.094-.1.016-.196.024-.287.024zm.003-1.523.035.076.171-.517a.6.6 0 0 0-.282-.028l.076.47z" />
                    </svg>
                    <div className="">
                        {place?.tags?.map((tag, index) => {
                            if (place.tags.length === index + 1) {
                                return <a key={index}>{tag}</a>
                            } else {
                                return (
                                    <a key={index}>
                                        {tag}
                                        {" - "}
                                    </a>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const PlaceAddress = ({ place }) => {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-sm p-4">
            <h2 className="text-xl font-bold !mb-2">{"Địa điểm cụ thể"}</h2>
            <Map
                className="rounded-lg"
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                    minHeight: "200px",
                    height: "85%",
                    width: "auto",
                    position: "relative",
                }}
                center={[105.804817, 21.028511]}
            >
                <Tooltip placement="bottom" title="Xem đường đi    ">
                    <div className="absolute top-2 left-[50%] translate-x-[-50%] bg-white shadow-md rounded-md px-3 py-2 flex gap-2 justify-center items-center text-sm w-[80%]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z" />
                            <path d="M22.43 10.59l-9.01-9.01c-.75-.75-2.07-.76-2.83 0l-9 9c-.78.78-.78 2.04 0 2.82l9 9c.39.39.9.58 1.41.58.51 0 1.02-.19 1.41-.58l8.99-8.99c.79-.76.8-2.02.03-2.82zm-10.42 10.4l-9-9 9-9 9 9-9 9zM8 11v4h2v-3h4v2.5l3.5-3.5L14 7.5V10H9c-.55 0-1 .45-1 1z" />
                        </svg>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://www.google.com/maps/dir/?api=1&destination=${"21.028511"},${"105.804817"}`}
                            className="text-black"
                        >
                            {place?.address?.specific}
                        </a>
                    </div>
                </Tooltip>

                <Marker
                    className="cursor-pointer"
                    coordinates={[105.804817, 21.028511]}
                    anchor="bottom"
                    onClick={() => setShowPopup(true)}
                >
                    <svg
                        className="property-marker"
                        height="34"
                        width="34"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 29"
                    >
                        <ellipse
                            className="shadow"
                            fillOpacity=".24"
                            cx="9"
                            cy="27"
                            rx="6"
                            ry="2"
                        />
                        <path
                            className="pin"
                            fill="#ee0033"
                            d="M9 27C7 27 0 16.97 0 9a9 9 0 1 1 18 0c0 7.97-7 18-9 18zm0-14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                        />
                    </svg>
                </Marker>
                {showPopup && (
                    <Popup
                        coordinates={[105.804817, 21.028511]}
                        className="shadow-md"
                        offset={{
                            "bottom-left": [12, -38],
                            bottom: [0, -38],
                            "bottom-right": [-12, -38],
                        }}
                    >
                        <div className="relative flex justify-between items-center gap-3 font-['Quicksand']">
                            <img
                                src={place?.photos[0]}
                                className="rounded-md object-cover w-[40px] h-[40px]"
                            />
                            <div className="">
                                <h3 className="text-base font-semibold">
                                    {place?.name}
                                </h3>
                                <div className="text-sm">
                                    {place?.address?.specific}
                                </div>
                            </div>
                        </div>
                        <button
                            className="absolute right-0 top-0 z-10 p-2 text-base"
                            onClick={() => setShowPopup(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                viewBox="0 0 512 512"
                            >
                                <path d="M437.5 386.6L306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z" />
                            </svg>
                        </button>
                    </Popup>
                )}
            </Map>
        </div>
    )
}

export default PlaceDetail
