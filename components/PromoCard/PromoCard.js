import Image from 'next/image'
import Link from 'next/link'
import { Modal } from 'antd'
import { useState } from 'react'

const PromoCard = (props) => {
    const { imageUrl, title, name, address } = props
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div
                className="w-full rounded-xl shadow-md overflow-hidden"
                onClick={() => setOpenModal(true)}
            >
                <div className="relative w-full h-[250px] xl:h-[300px]">
                    <Link href={''}>
                        <a>
                            <Image
                                alt="cafe-app"
                                layout="fill"
                                objectFit="cover"
                                src={imageUrl}
                                className="object-cover object-center hover:scale-105 transition ease-in duration-500"
                            />
                        </a>
                    </Link>
                </div>
                <div className="p-4 pt-2 bg-white">
                    <p className="border-b pb-3 text-base text-rose-500 font-bold truncate">
                        {title}
                    </p>
                    <div className="mt-3">
                        <span className="text-lg font-bold truncate">
                            {name}
                        </span>
                        <p className="text-base truncate">{address}</p>
                    </div>
                </div>
            </div>
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
                    <h2 className="font-bold text-xl">{name}</h2>
                    <p className="text-rose-500 font-bold text-xl mt-8">
                        {title}
                    </p>
                    <p className="mt-4">{`Địa chỉ: ${address}`}</p>
                    <div className="flex">
                        <div className="relative h-[120px] w-[120px] mt-4 mr-4">
                            <Image
                                alt="cafe-app"
                                layout="fill"
                                objectFit="cover"
                                src={
                                    'https://ik.imagekit.io/reviewcafe/promo/122878652_3548009975277797_6943584230145280813_n_1MyxdRTK9j.jpg?tr=w-400,q-80'
                                }
                                className="object-cover object-center hover:scale-105 transition ease-in duration-500"
                            />
                        </div>
                        <div className="relative h-[120px] w-[120px] mt-4">
                            <Image
                                alt="cafe-app"
                                layout="fill"
                                objectFit="cover"
                                src={imageUrl}
                                className="object-cover object-center hover:scale-105 transition ease-in duration-500"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PromoCard
