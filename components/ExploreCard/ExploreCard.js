import Image from 'next/image'

const ExploreCard = () => {
    return (
        <div className="card shadow-lg mb-5 bg-white rounded-xl">
            <div className="px-4 py-3">
                <div className="card-header flex mb-2">
                    <div className="mr-2 w-[46px] h-[46px] relative">
                        <Image
                        className='rounded-full'
                            src="https://toidicafe.vn/static/images/user/622d8a7b5beae850b31efe4f.svg"
                            layout="fill"
                            alt="cafe-app"
                            objectFit="cover"
                        />
                    </div>
                    <div className="">
                        <div className="">
                            <span className="pr-2 text-lg font-bold">
                                {'Nghiện Cafe >'}
                            </span>
                            <span className="text-lg font-bold">
                                Thong Dong Cafe
                            </span>
                        </div>
                        <div className="">
                            <span className="font-bold mr-3">4.6 *****</span>
                            <span className="text-sm text-gray-400">
                                một tháng trước
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-content mb-3">
                    <div className="text-base mb-4">
                        🌿Nhà ở khu Hoàng Mai, mà mãi mới kiếm được quán cafe
                        rộng rãi, xanh mát như này hic. Quán nằm gọn xinh trong
                        một con ngõ yên bình, không gian thoáng mát, ngập tràn
                        cây cỏ. Quán có 2 tầng đủ view vừa sống ảo, vừa có thể
                        học tập, làm việc. Tone màu chủ đạo là trắng và nâu,
                        giữa quán có hồ cá Koi xinh lắm.
                    </div>
                    <div className="relative h-[500px]">
                        <a>
                            <Image
                                alt="cafe-app"
                                layout="fill"
                                objectFit="cover"
                                src={
                                    'https://toidicafe.vn/static/images/2022/10/29/f8f4050a-2cc6-4696-9ac7-b3301cff6da2-309312369_2024871071056846_288.jpg?w=640'
                                }
                                className="object-cover object-center"
                            />
                        </a>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="border-t border-b">
                        <div className="flex justify-around text-base font-semibold">
                            <button className="text-center rounded-md p-1 w-full hover:bg-gray-100 transition m-1">
                                Thích
                            </button>
                            <button className="text-center rounded-md p-1 w-full hover:bg-gray-100 transition m-1">
                                Bình luận
                            </button>
                            <button className="text-center rounded-md p-1 w-full hover:bg-gray-100 transition m-1">
                                Chia sẻ
                            </button>
                        </div>
                    </div>
                    <div className="text-center mt-2 font-bold">
                        Xem tất cả 10 bình luận...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreCard
