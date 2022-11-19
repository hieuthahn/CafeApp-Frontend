import React, { useState } from "react"
import PlaceForm from "../../components/PlaceForm"

const AddPlace = () => {
    return (
        <div className="container mx-auto flex justify-center items-center px-3 md:px-6">
            <div className="bg-white rounded shadow my-3 p-3 md:my-7 md:p-7 w-full">
                <h1 className="font-bold text-2xl">Thêm địa điểm</h1>
                <p>
                    Những quán cafe yêu thích của bạn chưa có trên Coffee Soul?
                    Chia sẻ với cộng đồng ngay!
                </p>
                <PlaceForm />
            </div>
        </div>
    )
}

export default AddPlace
