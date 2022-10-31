import React, { useEffect, useState, useRef, useCallback } from "react"
import { Input } from "antd"
const { Search } = Input
import Link from "next/link"
import useOutsideAlerter from "../../../lib/hooks/useOutsideAlert"
import Divider from "@vechaiui/core/src/components/divider"
import { Button } from "@vechaiui/react"
import { toSlug } from "lib/utils/"
import { debounce } from "lib/utils/utils"
import { searchPlace } from "lib/services/place"
import Image from "next/image"

const SearchBar = () => {
    const [openChild, setOpenChild] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [textSearch, setTextSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const wrapperRef = useRef(null)
    const clickOutside = useOutsideAlerter(wrapperRef)
    useEffect(() => {
        if (clickOutside) {
            setOpenChild(false)
        }
    }, [clickOutside])

    const handleSearchOptions = async (name) => {
        const body = {
            name,
        }
        try {
            const res = await searchPlace(body)
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

    const handleTextChange = (e) => {
        setTextSearch(e.target.value)
        if (e.target.value !== "") {
            setLoading(true)
            debounceSearch(e.target.value)
        }
    }

    return (
        <>
            <div className="py-8 px-4">
                <div
                    ref={wrapperRef}
                    className={`lg:max-w-[1096px] md:max-w-[696px] max-w-[375px] mx-auto bg-white overflow-hidden shadow-lg ${
                        openChild ? "rounded-t-lg" : "rounded-lg"
                    }`}
                >
                    <div
                        className={`flex justify-between items-center p-3 border-b-2 border-transparent ${
                            openChild ? "border-b border-slate-300" : ""
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2 w-full flex-wrap">
                            <input
                                onClick={() => setOpenChild(true)}
                                type="text"
                                placeholder="Search"
                                className="focus:outline-none border-none grow"
                                value={textSearch}
                                onChange={handleTextChange}
                            />
                            {loading && (
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
                            )}
                            <Link href="/search?q=">
                                <Button
                                    className="font-semibold cursor-pointer p-5"
                                    variant="solid"
                                    color="rose"
                                >
                                    <svg
                                        // className="fill-white"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.63633 2.5C7.42268 2.5 6.23628 2.85989 5.22717 3.53416C4.21806 4.20843 3.43155 5.16679 2.9671 6.28806C2.50266 7.40932 2.38114 8.64314 2.61791 9.83347C2.85468 11.0238 3.43911 12.1172 4.29729 12.9754C5.15547 13.8335 6.24886 14.418 7.43919 14.6547C8.62952 14.8915 9.86334 14.77 10.9846 14.3056C12.1059 13.8411 13.0642 13.0546 13.7385 12.0455C14.4128 11.0364 14.7727 9.84998 14.7727 8.63633C14.7726 7.0089 14.126 5.44817 12.9753 4.2974C11.8245 3.14664 10.2638 2.5001 8.63633 2.5V2.5Z"
                                            stroke="#fff"
                                            strokeWidth="1.25"
                                            strokeMiterlimit={10}
                                        />
                                        <path
                                            d="M13.2144 13.2148L17.4999 17.5004"
                                            stroke="#fff"
                                            strokeWidth="1.25"
                                            strokeMiterlimit={10}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {"Tìm kiếm"}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`overflow-y-scroll absolute bg-slate-50 z-10 lg:min-w-[1096px] md:min-w-[696px] min-w-[375px] py-3 ${
                            openChild ? "block shadow-sm" : "hidden"
                        }`}
                    >
                        {textSearch !== "" ? (
                            searchResult.length ? (
                                searchResult.map((item, index) => {
                                    if (index < 5) {
                                        return (
                                            <div
                                                key={index}
                                                className="px-5 py-3 flex gap-3 hover:bg-slate-100 cursor-pointer"
                                            >
                                                <div>
                                                    <Image
                                                        className="rounded"
                                                        src={item?.photos[0]}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-gray-800">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-600 pt-0.5">
                                                        {
                                                            item?.address
                                                                ?.specific
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            ) : (
                                <div className="px-5 py-3 font-bold flex gap-3 hover:bg-slate-100 cursor-pointer">
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.63633 2.5C7.42268 2.5 6.23628 2.85989 5.22717 3.53416C4.21806 4.20843 3.43155 5.16679 2.9671 6.28806C2.50266 7.40932 2.38114 8.64314 2.61791 9.83347C2.85468 11.0238 3.43911 12.1172 4.29729 12.9754C5.15547 13.8335 6.24886 14.418 7.43919 14.6547C8.62952 14.8915 9.86334 14.77 10.9846 14.3056C12.1059 13.8411 13.0642 13.0546 13.7385 12.0455C14.4128 11.0364 14.7727 9.84998 14.7727 8.63633C14.7726 7.0089 14.126 5.44817 12.9753 4.2974C11.8245 3.14664 10.2638 2.5001 8.63633 2.5V2.5Z"
                                            stroke="#000"
                                            strokeWidth="1.25"
                                            strokeMiterlimit={10}
                                        />
                                        <path
                                            d="M13.2144 13.2148L17.4999 17.5004"
                                            stroke="#000"
                                            strokeWidth="1.25"
                                            strokeMiterlimit={10}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className>
                                        Xem tất cả tìm kiếm cho
                                        {`"${textSearch}"`}
                                    </div>
                                </div>
                            )
                        ) : (
                            <>
                                <Link href="/search?q=">
                                    <div className="flex items-center gap-2 text-base font-semibold leading-none text-gray-800 py-3 px-5 hover:bg-slate-100 cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fillRule="evenodd"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="2"
                                            clipRule="evenodd"
                                            viewBox="0 0 32 32"
                                            width="28"
                                            height="28"
                                        >
                                            <rect
                                                width="32"
                                                height="32"
                                                y=".003"
                                                fill="none"
                                            />
                                            <path d="M16,2.003c-6.071,-0 -11,4.929 -11,11c0,5.925 5.16,11.892 8.23,14.858c1.548,1.488 3.992,1.487 5.538,0.001c3.072,-2.967 8.232,-8.934 8.232,-14.859c-0,-6.071 -4.929,-11 -11,-11Zm0,2c4.967,-0 9,4.032 9,9c-0,5.383 -4.831,10.725 -7.62,13.419c-0.77,0.74 -1.99,0.741 -2.763,-0.002c-2.786,-2.692 -7.617,-8.034 -7.617,-13.417c0,-4.968 4.033,-9 9,-9Zm0,5c-2.208,-0 -4,1.792 -4,4c0,2.207 1.792,4 4,4c2.208,-0 4,-1.793 4,-4c0,-2.208 -1.792,-4 -4,-4Zm0,2c1.104,-0 2,0.896 2,2c0,1.104 -0.896,2 -2,2c-1.104,-0 -2,-0.896 -2,-2c0,-1.104 0.896,-2 2,-2Z" />
                                        </svg>
                                        Tìm quanh đây
                                    </div>
                                </Link>

                                <div className="border-b border-gray-100">
                                    <div className="px-5 py-2 text-base font-bold leading-none text-gray-800">
                                        Đề xuất
                                    </div>
                                    <Link href="/place/ban-cong-cafe">
                                        <div className="px-5 py-3 flex gap-3 hover:bg-slate-100 cursor-pointer">
                                            <div className>
                                                <Image
                                                    className="rounded"
                                                    src="/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg"
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-gray-800">
                                                    Ban công coffee
                                                </p>
                                                <p className="text-sm text-gray-600 pt-0.5">
                                                    2 Đinh Liệt, Hoàn Kiếm
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <div className="px-5 py-2 text-base font-bold leading-none text-gray-800 pt-4">
                                        Đã xem gần đây
                                    </div>
                                    <Link href="/place/ban-cong-cafe">
                                        <div className="px-5 py-3 flex gap-3 hover:bg-slate-100 cursor-pointer">
                                            <div className>
                                                <Image
                                                    className="rounded"
                                                    src="/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg"
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-gray-800">
                                                    Ban công coffee
                                                </p>
                                                <p className="text-sm text-gray-600 pt-0.5">
                                                    2 Đinh Liệt, Hoàn Kiếm
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style>
                {`
                    ::-webkit-scrollbar {
                        width: 5px;
                    }
                    ::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 20px;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #e0e7ff;
                        border-radius: 20px;
                    }
                    input:checked ~ .dot_search_4{
                        transform: translateX(100%);
                        background-color: #ffffff;
                    }
                    input:checked ~ .bg_search_4 {
                        background-color: #4338ca;
                    }

                    input:checked ~ .dot1_search_4 {
                        transform: translateX(100%);
                        background-color: #ffffff;
                    }
                    input:checked ~ .bg1 {
                        background-color: #4338ca;
                    }

                    input:checked ~ .dot2_search_4 {
                        transform: translateX(100%);
                        background-color: #ffffff;
                    }
                    input:checked ~ .bg2_search_4 {
                        background-color: #4338ca;
                    }

                    input:checked ~ .dot3_search_4 {
                        transform: translateX(100%);
                        background-color: #ffffff;
                    }
                    input:checked ~ .bg3_search_4 {
                        background-color: #4338ca;
                    }

                    input:checked ~ .dot4_search_4 {
                        transform: translateX(100%);
                        background-color: #ffffff;
                    }
                    input:checked ~ .bg4_search_4 {
                        background-color: #4338ca;
                    }
                    input:checked ~ .dot5_search_4 {
                        transform: translateX(100%);
                        background-color: #ffffff;
                    }
                    input:checked ~ .bg5_search_4 {
                        background-color: #4338ca;
                    }
                    `}
            </style>
        </>
    )
}

export default SearchBar
