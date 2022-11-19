import React from "react"
import Link from "next/link"
import { Button } from "@vechaiui/react"
import Image from "next/image"

const SuggestPlace = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="relative w-[220px] h-[220px]">
                <Image
                    alt="cafe-app"
                    layout="fill"
                    objectFit="cover"
                    src="/static/images/suggest-place.svg"
                />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-center">
                    {"Chúng tôi có đang bỏ lỡ địa điểm nào bạn biết?"}
                </h3>
                <div className="text-center mt-4">
                    <Link href="/add-place" passHref legacyBehavior>
                        <a>
                            <Button
                                className="font-bold cursor-pointer p-5"
                                variant="solid"
                                color="rose"
                            >
                                {"Đóng góp địa điểm"}
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SuggestPlace
