import PromoCard from 'components/PromoCard'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from 'antd'
import { getPromos } from 'lib/services/promos'

const Promo = () => {
    const [promos, setPromos] = useState([])
    const [promo, setPromo] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [params, setParams] = useState({
        paged: 1,
        pageSize: 10,
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

    const handleOpenModal = (data) => {
        setPromo(data)
        setOpenModal(true)
    }
    return (
        <div className="mb-8">
            <div className="h-[220px] bg-[linear-gradient(180deg,#ffb8b8,#f3f4f6)] hidden lg:block">
                <div className="h-full container mx-auto">
                    <div className="h-full flex items-center justify-between">
                        <div className="select-none">
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
                            <Image
                                alt="cafe-app"
                                layout="fill"
                                objectFit="cover"
                                src={'https://toidicafe.vn/images/discount.svg'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-3 md:p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8">
                    {promos.map((item, index) => {
                        if (item?.showing) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        handleOpenModal(item)
                                    }}
                                >
                                    <PromoCard
                                        imageUrl={
                                            item?.images && item?.images[0]?.url
                                        }
                                        title={item?.title}
                                        name={item?.place?.name}
                                        address={item?.place?.address?.specific}
                                    />
                                </div>
                            )
                        }
                    })}

                    <Modal
                        title={
                            <h3 className="text-xl font-bold text-center">
                                {'Chi tiết khuyến mãi'}
                            </h3>
                        }
                        open={openModal}
                        onCancel={() => setOpenModal(false)}
                        centered
                        footer={false}
                    >
                        <div>
                            <h2 className="font-bold text-xl">{promo?.name}</h2>
                            <p className="text-rose-500 font-bold text-xl">
                                {promo?.title}
                            </p>
                            <p className="mt-4">{promo?.description}</p>
                            <p className="mt-4 font-bold">{`Địa chỉ: ${promo?.place?.address?.specific}`}</p>
                            <div className="flex">
                                <div className="relative h-[300px] w-full mt-4">
                                    <Image
                                        alt="cafe-app"
                                        layout="fill"
                                        objectFit="contain"
                                        src={
                                            promo?.images &&
                                            promo?.images[0]?.url
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Promo
