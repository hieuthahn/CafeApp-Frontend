import React, { useState, Fragment } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import {
    Button,
    cx,
    Divider,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Input,
} from "@vechaiui/react"
import { Dialog, Transition, Tab } from "@headlessui/react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { useForm } from "react-hook-form"

const navLinkItems = [
    {
        path: "/",
        title: "Trang chủ",
        icon: null,
    },
    {
        path: "/explore",
        title: "Khám phá",
        icon: null,
    },
    {
        path: "/promo",
        title: "Khuyến mại",
        icon: null,
    },
    {
        path: "/about",
        title: "Giới thiệu",
        icon: null,
    },
    {
        path: "/contact",
        title: "Liên hệ - Góp ý",
        icon: null,
    },
    {
        path: "/add-place",
        title: "Đóng góp địa điểm",
        icon: null,
    },
]

const navLinkUserItems = [
    {
        path: "/",
        title: "Trang cá nhân",
        icon: null,
    },
    {
        path: "/explore",
        title: "Chỉnh sửa hồ sơ",
        icon: null,
    },
    {
        path: "/promo",
        title: "Liên hệ - Góp ý",
        icon: null,
    },
    {
        path: "/about",
        title: "Giới thiệu",
        icon: null,
    },
    {
        path: "/contact",
        title: "Đăng xuất",
        icon: null,
    },
]

const tabs = [
    {
        value: "dang-nhap",
        name: "Account",
        content: "Tab one content",
        // icon: UserCircleIcon,
    },
    {
        value: "dang-ky",
        name: "Notifications",
        content: "Tab second content",
        // icon: BellIcon,
    },
]

const Header = () => {
    const { pathname } = useRouter()
    const [show, setShow] = useState(null)
    const [profile, setProfile] = useState(false)
    const [user, setUser] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = React.useState(false)
    const inputRef = React.useRef(null)
    const [loading, setLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const handleToggleShowPassword = () => setShowPassword(!showPassword)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        setTimeout(() => {
            alert(JSON.stringify(data))
            setLoading(false)
        }, 500)
    }

    const handleCloseLoginDialog = () => setShowLoginDialog(false)
    const handleOpenLoginDialog = () => setShowLoginDialog(true)

    return (
        <>
            <div className="bg-gray-200 h-full w-full">
                {/* Navbar desktop */}
                <nav className="w-full bg-white hidden xl:block shadow">
                    <div className="container px-6 h-16 flex justify-between items-center lg:items-stretch mx-auto">
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="mr-10 flex items-center">
                                <Link href="/">
                                    <a>
                                        <Image
                                            src="/static/images/logo/icon.png"
                                            objectFit="contain"
                                            width={35}
                                            height={30}
                                        />
                                    </a>
                                </Link>
                                <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight hidden lg:block">
                                    <Link href="/">
                                        <a>
                                            <Image
                                                src="/static/images/logo/coffee-soul.svg"
                                                objectFit="contain"
                                                width={90}
                                                height={50}
                                            />
                                        </a>
                                    </Link>
                                </h3>
                            </div>
                            <ul className="hidden xl:flex items-center h-full gap-6">
                                {navLinkItems.map((item, index) => {
                                    return (
                                        <Link key={index} href={item.path}>
                                            <a className="flex items-center font-bold">
                                                <li
                                                    className={`cursor-pointer h-full flex items-center text-sm tracking-normal transition duration-150 ease-in-out ${
                                                        pathname === item.path
                                                            ? "text-rose-500"
                                                            : "hover:text-rose-500 text-gray-800"
                                                    }`}
                                                >
                                                    <span className="mr-2">
                                                        {item.icon}
                                                    </span>
                                                    {item.title}
                                                </li>
                                            </a>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="h-full hidden xl:flex items-center justify-end">
                            {user ? (
                                <div className="h-full flex">
                                    <div className="w-20 h-full flex items-center justify-center border-l border-r border-gray-300 text-gray-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-messages cursor-pointer"
                                            width={28}
                                            height={28}
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                            />
                                            <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                            <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                        </svg>
                                    </div>
                                    <div className="w-20 h-full flex items-center justify-center border-r border-gray-300 cursor-pointer text-gray-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-bell"
                                            width={28}
                                            height={28}
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                            />
                                            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                        </svg>
                                    </div>
                                    <div
                                        className="flex items-center pl-8 relative cursor-pointer"
                                        onClick={() => setProfile(!profile)}
                                    >
                                        {profile && (
                                            <ul className="p-2 w-40 border-r bg-white absolute rounded left-0 shadow mt-16 top-0 ">
                                                {navLinkUserItems.map(
                                                    (item, index) => {
                                                        return (
                                                            <Link
                                                                key={index}
                                                                href={item.path}
                                                            >
                                                                <a>
                                                                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-rose-500 focus:text-rose-500 focus:outline-none font-bold">
                                                                        <div className="flex items-center">
                                                                            <span className="ml-2">
                                                                                {
                                                                                    item.title
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </a>
                                                            </Link>
                                                        )
                                                    }
                                                )}
                                            </ul>
                                        )}
                                        <img
                                            className="rounded-full h-10 w-10 object-cover"
                                            src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png"
                                            alt="logo"
                                        />
                                        <p className="text-gray-800 text-sm ml-2 font-semibold">
                                            Jane Doe
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center w-full h-full gap-2">
                                    <Link href="/new-review">
                                        <a>
                                            <Button
                                                className="font-semibold cursor-pointer"
                                                variant="solid"
                                                color="rose"
                                            >
                                                Viết review
                                            </Button>
                                        </a>
                                    </Link>
                                    <Button
                                        className="font-semibold cursor-pointer"
                                        color="rose"
                                        onClick={handleOpenLoginDialog}
                                    >
                                        Đăng nhập
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Navbar mobile */}
                <nav>
                    <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white top-0 z-40">
                        <div className="w-24">
                            <Link href="/">
                                <a>
                                    <Image
                                        src="/static/images/logo/icon.png"
                                        objectFit="contain"
                                        width={30}
                                        height={30}
                                    />
                                </a>
                            </Link>
                        </div>
                        <div>
                            <div
                                id="menu"
                                className="text-gray-800"
                                onClick={() => setShow(!show)}
                            >
                                {show ? (
                                    " "
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-menu-2"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <line x1={4} y1={6} x2={20} y2={6} />
                                        <line x1={4} y1={12} x2={20} y2={12} />
                                        <line x1={4} y1={18} x2={20} y2={18} />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    {show && (
                        <div
                            className={
                                show
                                    ? "absolute xl:hidden w-full h-full transform -translate-x-0 z-40"
                                    : "absolute xl:hidden w-full h-full transform -translate-x-full z-40"
                            }
                            id="mobile-nav"
                        >
                            <div
                                className="bg-gray-800 opacity-50 w-full h-full"
                                onClick={() => setShow(!show)}
                            />
                            <div className="w-64 z-40 fixed overflow-y-auto top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                                <div className="px-6 h-full">
                                    <div className="flex flex-col justify-between h-full w-full">
                                        <div>
                                            <div className="mt-6 flex w-full items-center justify-between">
                                                <div className="flex items-center justify-between w-full">
                                                    {/* Logo */}
                                                    <div className="flex items-center">
                                                        <Link href="/">
                                                            <a>
                                                                <Image
                                                                    src="/static/images/logo/icon.png"
                                                                    objectFit="contain"
                                                                    width={30}
                                                                    height={30}
                                                                />
                                                            </a>
                                                        </Link>
                                                        <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight">
                                                            <Link href="/">
                                                                <a>
                                                                    <Image
                                                                        src="/static/images/logo/coffee-soul.svg"
                                                                        objectFit="contain"
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            30
                                                                        }
                                                                    />
                                                                </a>
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div
                                                        id="cross"
                                                        className="text-gray-800"
                                                        onClick={() =>
                                                            setShow(!show)
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon icon-tabler icon-tabler-x"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path
                                                                stroke="none"
                                                                d="M0 0h24v24H0z"
                                                            />
                                                            <line
                                                                x1={18}
                                                                y1={6}
                                                                x2={6}
                                                                y2={18}
                                                            />
                                                            <line
                                                                x1={6}
                                                                y1={6}
                                                                x2={18}
                                                                y2={18}
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="f-m-m">
                                                {navLinkItems.map(
                                                    (item, index) => {
                                                        return (
                                                            <Link
                                                                key={index}
                                                                href={item.path}
                                                            >
                                                                <a className="flex items-center font-semibold">
                                                                    <li
                                                                        className={`pt-8 ${
                                                                            pathname ===
                                                                            item.path
                                                                                ? "text-rose-500"
                                                                                : "hover:text-rose-500 text-gray-800"
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <div className="w-6 h-6 md:w-8 md:h-8">
                                                                                {
                                                                                    item.icon
                                                                                }
                                                                            </div>
                                                                            <p className="xl:text-base text-base ml-3">
                                                                                {
                                                                                    item.title
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                </a>
                                                            </Link>
                                                        )
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                        <div className="w-full pt-4">
                                            {user ? (
                                                <div className="border-t border-gray-300">
                                                    <div className="w-full flex items-center justify-between pt-1">
                                                        <div className="flex items-center">
                                                            <img
                                                                alt="profile-pic"
                                                                src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
                                                                className="w-8 h-8 rounded-full"
                                                            />
                                                            <p className=" text-gray-800 text-base leading-4 ml-2 font-semibold">
                                                                Jane Doe
                                                            </p>
                                                        </div>
                                                        <ul className="flex">
                                                            <li className="cursor-pointer text-gray-800 pt-5 pb-3">
                                                                <div className="w-6 h-6 md:w-8 md:h-8">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="icon icon-tabler icon-tabler-messages"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1
                                                                        }
                                                                        stroke="currentColor"
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    >
                                                                        <path
                                                                            stroke="none"
                                                                            d="M0 0h24v24H0z"
                                                                        />
                                                                        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                                                        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                                                    </svg>
                                                                </div>
                                                            </li>
                                                            <li className="cursor-pointer text-gray-800 pt-5 pb-3 pl-3">
                                                                <div className="w-6 h-6 md:w-8 md:h-8">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="icon icon-tabler icon-tabler-bell"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1
                                                                        }
                                                                        stroke="currentColor"
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    >
                                                                        <path
                                                                            stroke="none"
                                                                            d="M0 0h24v24H0z"
                                                                        />
                                                                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                                                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                                                    </svg>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center w-full h-full gap-2">
                                                    <Button
                                                        className="font-semibold cursor-pointer"
                                                        color="rose"
                                                        size="sm"
                                                        onClick={
                                                            handleOpenLoginDialog
                                                        }
                                                    >
                                                        Đăng nhập
                                                    </Button>
                                                    <Link href="/new-review">
                                                        <a>
                                                            <Button
                                                                className="font-semibold cursor-pointer"
                                                                variant="solid"
                                                                color="rose"
                                                                size="sm"
                                                            >
                                                                Viết review
                                                            </Button>
                                                        </a>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </div>

            {/* Dialog login */}
            <Transition show={showLoginDialog} as={React.Fragment}>
                <Dialog
                    initialFocus={inputRef}
                    as="div"
                    className="fixed inset-0 overflow-y-auto z-modal"
                    open={showLoginDialog}
                    onClose={handleCloseLoginDialog}
                >
                    <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
                    <Transition.Child
                        as={React.Fragment}
                        enter="transition ease-out duration-150"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                    >
                        <div
                            className={cx(
                                "relative flex flex-col w-full mx-auto my-24 rounded shadow-lg",
                                "bg-white border border-gray-200",
                                "dark:bg-neutral-800 dark:border-neutral-700",
                                "max-w-md px-2"
                            )}
                        >
                            <header className="relative px-3 pt-3 pb-2 text-lg font-semibold">
                                Đăng nhập
                            </header>
                            <button
                                onClick={handleCloseLoginDialog}
                                className="absolute text-sm text-gray-600 cursor-base dark:text-gray-400 hover:text-rose-500 top-4 right-4"
                            >
                                <CloseRoundedIcon className="w-4 h-4" />
                            </button>
                            <Divider
                                orientation="horizontal"
                                className="border-neutral-200 dark:border-neutral-700"
                            />
                            <Tab.Group
                                as="div"
                                className="flex flex-col px-4"
                                defaultIndex={0}
                            >
                                <Tab.List
                                    aria-label="tabs example"
                                    className={cx(
                                        "flex flex-row justify-start",
                                        "border-b border-neutral-200 dark:border-neutral-700"
                                    )}
                                >
                                    <Tab
                                        value={"dang-nhap"}
                                        className={cx(
                                            "px-4 h-10 py-2 -mb-px text-sm text-center whitespace-nowrap cursor-base focus:outline-none font-semibold",
                                            "text-neutral-900 bg-transparent border-b-2 border-transparent",
                                            "hover:border-neutral-300",
                                            "selected:border-rose-500 selected:text-rose-600",
                                            // dark
                                            "dark:text-neutral-100",
                                            "dark:hover:border-neutral-600",
                                            "dark:selected:border-rose-500"
                                        )}
                                    >
                                        Đăng nhập
                                    </Tab>
                                    <Tab
                                        value={"dang-ky"}
                                        className={cx(
                                            "px-4 h-10 py-2 -mb-px text-sm text-center whitespace-nowrap cursor-base focus:outline-none font-semibold",
                                            "text-neutral-900 bg-transparent border-b-2 border-transparent",
                                            "hover:border-neutral-300",
                                            "selected:border-rose-500 selected:text-rose-600",
                                            // dark
                                            "dark:text-neutral-100",
                                            "dark:hover:border-neutral-600",
                                            "dark:selected:border-rose-500"
                                        )}
                                    >
                                        Đăng ký
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel
                                        value={"dang-nhap"}
                                        className="py-4 flex-grow-1"
                                    >
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="space-y-4"
                                        >
                                            <FormControl
                                                invalid={Boolean(
                                                    errors.username
                                                )}
                                            >
                                                <FormLabel>
                                                    Email
                                                    {/* <RequiredIndicator /> */}
                                                </FormLabel>
                                                <Input
                                                    {...register("username", {
                                                        required: true,
                                                    })}
                                                    placeholder="Nhập địa chỉ email của bạn"
                                                />
                                                {errors.username &&
                                                    errors.username.type ===
                                                        "required" && (
                                                        <FormErrorMessage>
                                                            Bạn cần nhập Email
                                                        </FormErrorMessage>
                                                    )}
                                            </FormControl>

                                            <FormControl
                                                invalid={Boolean(
                                                    errors.password
                                                )}
                                            >
                                                <FormLabel>
                                                    Mật khẩu
                                                    {/* <RequiredIndicator /> */}
                                                </FormLabel>
                                                <Input.Group>
                                                    <Input
                                                        className="pr-16"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Nhập mật khẩu của bạn"
                                                        {...register(
                                                            "password",
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                    />
                                                    <Input.RightElement className="w-16">
                                                        <Button
                                                            type="button"
                                                            size="xs"
                                                            variant="solid"
                                                            onClick={
                                                                handleToggleShowPassword
                                                            }
                                                        >
                                                            {showPassword
                                                                ? "Ẩn"
                                                                : "Hiện"}
                                                        </Button>
                                                    </Input.RightElement>
                                                </Input.Group>
                                                {errors.password &&
                                                    errors.password.type ===
                                                        "required" && (
                                                        <FormErrorMessage>
                                                            Bạn cần nhập mật
                                                            khẩu
                                                        </FormErrorMessage>
                                                    )}
                                            </FormControl>

                                            <Button
                                                className="w-full"
                                                type="submit"
                                                variant="solid"
                                                color="rose"
                                                loading={loading}
                                            >
                                                Đăng nhập
                                            </Button>
                                        </form>
                                    </Tab.Panel>
                                    <Tab.Panel
                                        value={"dang-ky"}
                                        className="py-4 flex-grow-1"
                                    >
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="space-y-4"
                                        >
                                            <FormControl
                                                invalid={Boolean(
                                                    errors.username
                                                )}
                                            >
                                                <FormLabel>
                                                    Email
                                                    {/* <RequiredIndicator /> */}
                                                </FormLabel>
                                                <Input
                                                    {...register("username", {
                                                        required: true,
                                                    })}
                                                    placeholder="Nhập địa chỉ email của bạn"
                                                />
                                                {errors.username &&
                                                    errors.username.type ===
                                                        "required" && (
                                                        <FormErrorMessage>
                                                            Bạn cần nhập Email
                                                        </FormErrorMessage>
                                                    )}
                                            </FormControl>

                                            <FormControl
                                                invalid={Boolean(
                                                    errors.password
                                                )}
                                            >
                                                <FormLabel>
                                                    Mật khẩu
                                                    {/* <RequiredIndicator /> */}
                                                </FormLabel>
                                                <Input.Group>
                                                    <Input
                                                        className="pr-16"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Nhập mật khẩu của bạn"
                                                        {...register(
                                                            "password",
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                    />
                                                    <Input.RightElement className="w-16">
                                                        <Button
                                                            type="button"
                                                            size="xs"
                                                            variant="solid"
                                                            onClick={
                                                                handleToggleShowPassword
                                                            }
                                                        >
                                                            {showPassword
                                                                ? "Ẩn"
                                                                : "Hiện"}
                                                        </Button>
                                                    </Input.RightElement>
                                                </Input.Group>
                                                {errors.password &&
                                                    errors.password.type ===
                                                        "required" && (
                                                        <FormErrorMessage>
                                                            Bạn cần nhập mật
                                                            khẩu
                                                        </FormErrorMessage>
                                                    )}
                                            </FormControl>

                                            <Button
                                                className="cursor-pointer w-full"
                                                type="submit"
                                                variant="solid"
                                                color="rose"
                                                loading={loading}
                                            >
                                                Tạo tài khoản
                                            </Button>
                                        </form>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>

                            <Divider
                                orientation="horizontal"
                                className="border-neutral-200 dark:border-neutral-700"
                            />
                            <footer className="flex justify-end px-3 py-2 space-x-4">
                                <Button onClick={handleCloseLoginDialog}>
                                    Đóng
                                </Button>
                                {/* <Button
                                        variant="solid"
                                        color="red"
                                        onClick={handleCloseLoginDialog}
                                    >
                                        Delete
                                    </Button> */}
                            </footer>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}

export default Header
