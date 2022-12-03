import Image from 'next/image'

const PromoCard = (props) => {
    const { imageUrl, title, name, address } = props

    return (
        <>
            <div className="w-full rounded-xl shadow-md overflow-hidden">
                <div className="relative w-full h-[250px] xl:h-[300px]">
                    <a>
                        <Image
                            alt="cafe-app"
                            layout="fill"
                            objectFit="cover"
                            src={imageUrl}
                            className="object-cover object-center hover:scale-105 transition ease-in duration-500"
                        />
                    </a>
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
        </>
    )
}

export default PromoCard
