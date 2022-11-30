import PromoCard from 'components/PromoCard'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPromos } from 'lib/services/promos'

const array = [1, 2, 3, 4, 5, 6, 7, 8]

const Promo = () => {
    const [promos, setPromos] = useState([])
    const [params, setParams] = useState({
        paged: 1,
        pageSize: 10
    })
    const getListPromos = async () => {
        const res = await getPromos(params.paged, params.pageSize)
        if (res.success) {
            setPromos(res.data)
        }
    }

useEffect(() => {
    getListPromos()
}, [])
console.log(promos)
    return (
        <div className="mb-8">
            <div className="h-[220px] bg-[linear-gradient(180deg,#ffb8b8,#f3f4f6)] hidden lg:block">
                <div className="h-full container mx-auto">
                    <div className="h-full flex items-center justify-between">
                        <div>
                            <h1 className="text-[32px] font-bold">
                                Cập nhật khuyến mãi hiện hành
                            </h1>
                            <p className="text-[20px] font-bold mt-4">
                                Bạn đang tìm kiếm một góc cafe để sống ảo?
                            </p>
                            <p className="text-[20px] font-bold">
                                Hãy tiết kiệm hơn với các chương trình khuyến
                                mãi của chúng tôi ở dưới đây.
                            </p>
                        </div>

                        <div className="relative h-[160px] w-[270px]">
                            <Link href={''}>
                                <a>
                                    <Image
                                        alt="cafe-app"
                                        layout="fill"
                                        objectFit="cover"
                                        src={'https://toidicafe.vn/images/discount.svg'}
                                        className="object-cover object-center hover:scale-105 transition ease-in duration-500"
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-2 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {array.map((item, index) => {
                        return (
                            <PromoCard
                                key={index}
                                imageUrl="https://ik.imagekit.io/reviewcafe/promo/217415672_4341774135903397_5329500902239270033_n_5XoTA_iQeo.jpg?tr=w-400,q-80"
                                title="Order thả ga - Hoàn ngay nửa giá"
                                name="MONO Coffee Lab"
                                address="03 Hồ Xuân Hương, Hai Bà Trưng, Hà Nội"
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Promo
