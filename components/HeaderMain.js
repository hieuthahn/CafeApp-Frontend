import Image from "next/image"
import Link from "next/link"
import HeaderLink from "./HeaderLink"

const HeaderMain = () => {
    return (
        <header className="flex justify-between items-center px-4 py-2 drop-shadow-sm border-b-2">
            <div className="relative flex justify-center items-center">
                <Link href="/">
                    <a>
                        <Image
                            src="/static/images/logo/icon.png"
                            objectFit="contain"
                            width={50}
                            height={50}
                        />
                    </a>
                </Link>
                <Link href="/">
                    <a>
                        <Image
                            src="/static/images/logo/coffee-soul.svg"
                            objectFit="contain"
                            width={150}
                            height={50}
                        />
                    </a>
                </Link>
            </div>
            <div className="d-flex justify-between">
                <div>
                    <HeaderLink />
                </div>
            </div>
        </header>
    )
}

export default HeaderMain
