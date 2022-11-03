import React, { useState } from "react"
// import PlaceForm from "../../components/PlaceForm"
import { Button } from "antd"
import Link from "next/link"
import { PlusOutlined, HomeOutlined } from "@ant-design/icons"
import Image from "next/image"

const AddPlace = () => {
    return (
        <div className="container mx-auto flex flex-col justify-center items-center p-8">
            <Image
                src="https://toidicafe.vn/images/suggest-place.svg"
                objectFit="cover"
                width={450}
                height={450}
            />
            <div className="text-base font-semibold text-green-500 my-6">
                Bạn vừa gợi ý địa điểm mới thành công. Chúng tôi sẽ kiểm tra
                trong thời gian sớm nhất!
            </div>
            <div className="text-center">
                <Link href={"/"}>
                    <Button
                        size="large"
                        // type="primary"
                        danger
                        icon={<HomeOutlined />}
                    >
                        Quay về trang chủ
                    </Button>
                </Link>
                <Link href={"/add-place"}>
                    <Button
                        className="ml-4"
                        size="large"
                        type="primary"
                        // icon={<PlusOutlined />}
                    >
                        <PlusOutlined />
                        Thêm địa điểm khác
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default AddPlace
