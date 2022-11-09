import React, { useState, useEffect } from "react"
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
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Alert, Tabs, Modal } from "antd"
import { UserOutlined } from "@ant-design/icons"
import Logo from "components/Logo"
import { signUp } from "lib/services/user"
import Cookies from "js-cookie"
import useBearStore from "lib/data/zustand"

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
        path: "/profile/setting",
        title: "Trang cá nhân",
        icon: null,
    },
    {
        path: "/profile/setting",
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
]

const Header = () => {
    const { pathname } = useRouter()
    const { data: session } = useSession()
    const [profile, setProfile] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false,
    })
    const modalLogin = useBearStore((state) => state.modalLogin)
    const toggleModalLogin = useBearStore((state) => state.toggleModalLogin)
    const [alert, setAlert] = useState({
        register: {
            type: "",
            message: "",
        },
        login: {
            type: "",
            message: "",
        },
    })

    useEffect(() => {
        if (session) {
            const data = JSON.stringify({
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
                roles: session.roles,
            })
            Cookies.set("auth", data)
        } else {
            Cookies.remove("auth")
        }
    }, [session])

    const handleToggleShow = (name) => {
        return setShow((prev) => ({
            ...prev,
            [name]: !prev[name],
        }))
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const {
        register: register2,
        watch,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        setAlert()
        const res = await signIn("credentials", {
            ...data,
            redirect: false,
        })
        setLoading(false)
        if (res.error) {
            setAlert((prev) => ({
                ...prev,
                login: {
                    type: "error",
                    message: res.error,
                },
            }))
            return
        }
        toggleModalLogin()
    }

    const onSubmitRegister = async (data) => {
        setLoading(true)
        setAlert()
        try {
            const res = await signUp(data)
            setLoading(false)
            if (res.success) {
                setAlert((prev) => ({
                    ...prev,
                    register: {
                        type: "success",
                        message: res.message,
                    },
                }))
                return
            }
            setAlert((prev) => ({
                ...prev,
                register: {
                    type: "error",
                    message: res.message,
                },
            }))
        } catch (error) {
            setAlert((prev) => ({
                ...prev,
                register: {
                    type: "error",
                    message: res.message,
                },
            }))
        }
    }

    return (
        <>
            <div className="bg-gray-200 h-full w-full">
                {/* Navbar desktop */}
                <nav className="w-full bg-white hidden xl:block shadow">
                    <div className="container px-6 h-16 flex justify-between items-center lg:items-stretch mx-auto">
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="mr-10 flex items-center">
                                <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight hidden lg:block">
                                    <Link href="/">
                                        <a>
                                            <Logo />
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
                            <div className="h-full flex items-center">
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
                                {session ? (
                                    <div
                                        className="flex items-center ml-2 relative cursor-pointer gap-2"
                                        onClick={() => setProfile(!profile)}
                                    >
                                        {profile && (
                                            <ul className="p-2 w-40 drop-shadow-md border-r bg-white absolute rounded right-0 shadow mt-16 top-0 z-10">
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
                                                {session.roles.includes(
                                                    "ADMIN"
                                                ) && (
                                                    <Link
                                                        href={
                                                            "/management/places"
                                                        }
                                                    >
                                                        <a>
                                                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-rose-500 focus:text-rose-500 focus:outline-none font-bold">
                                                                <div className="flex items-center">
                                                                    <span className="ml-2">
                                                                        Quản lý
                                                                        website
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </a>
                                                    </Link>
                                                )}
                                                <li
                                                    onClick={() => signOut()}
                                                    className="border-t mt-2 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-rose-500 focus:text-rose-500 focus:outline-none font-bold"
                                                >
                                                    <div className="flex items-center">
                                                        <span className="ml-2">
                                                            Đăng xuất
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        )}
                                        <Avatar
                                            size="large"
                                            icon={<UserOutlined />}
                                        />
                                        <p className="text-gray-800 text-sm mb-0 font-semibold">
                                            {session?.name ||
                                                session?.username ||
                                                session?.email}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="ml-2">
                                        <Button
                                            className="font-semibold cursor-pointer"
                                            color="rose"
                                            onClick={toggleModalLogin}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Navbar mobile */}
                <nav>
                    <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white top-0 z-40">
                        <div className="w-24">
                            <Link href="/">
                                <a>
                                    <Logo />
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
                                                <div className="flex items-center justify-center w-full">
                                                    <Logo />
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
                                            {session ? (
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
                                                            toggleModalLogin
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
            <Modal open={modalLogin} onCancel={toggleModalLogin} footer={null}>
                <Tabs defaultActiveKey="1" destroyInactiveTabPane>
                    <Tabs.TabPane tab="Đăng nhập" key="1">
                        <form
                            id="dang-nhap"
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormControl invalid={Boolean(errors.username)}>
                                <FormLabel>Tên đăng nhập</FormLabel>
                                <Input
                                    {...register("username", {
                                        required: true,
                                    })}
                                    placeholder="Nhập tên đăng nhập"
                                />
                                {errors.username &&
                                    errors.username.type === "required" && (
                                        <FormErrorMessage>
                                            Bạn cần nhập tên đăng nhập
                                        </FormErrorMessage>
                                    )}
                            </FormControl>

                            <FormControl invalid={Boolean(errors.password)}>
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input.Group>
                                    <Input
                                        className="pr-16"
                                        type={
                                            show.password ? "text" : "password"
                                        }
                                        placeholder="Nhập mật khẩu của bạn"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    <Input.RightElement className="w-16">
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="solid"
                                            onClick={() =>
                                                handleToggleShow("password")
                                            }
                                        >
                                            {show.password ? "Ẩn" : "Hiện"}
                                        </Button>
                                    </Input.RightElement>
                                </Input.Group>
                                {errors.password &&
                                    errors.password.type === "required" && (
                                        <FormErrorMessage>
                                            Bạn cần nhập mật khẩu
                                        </FormErrorMessage>
                                    )}
                            </FormControl>
                            {alert?.login?.message && (
                                <Alert
                                    message={alert.login.message}
                                    type={alert.login.type || "success"}
                                    showIcon
                                />
                            )}
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
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đăng ký" key="2">
                        <form
                            id="dang-ky"
                            onSubmit={handleSubmit2(onSubmitRegister)}
                            className="space-y-4"
                        >
                            <FormControl invalid={Boolean(errors2.name)}>
                                <FormLabel>Tên hiển thị</FormLabel>
                                <Input
                                    {...register2("name", {
                                        required: true,
                                    })}
                                    placeholder="Nhập tên hiển thị"
                                />
                                {errors2.name &&
                                    errors2.name.type === "required" && (
                                        <FormErrorMessage>
                                            Bạn cần nhập tên hiển thị
                                        </FormErrorMessage>
                                    )}
                            </FormControl>
                            <FormControl invalid={Boolean(errors2.username)}>
                                <FormLabel>Tên đăng nhập</FormLabel>
                                <Input
                                    {...register2("username", {
                                        required: true,
                                    })}
                                    placeholder="Nhập tên đăng nhập"
                                />
                                {errors2.username &&
                                    errors2.username.type === "required" && (
                                        <FormErrorMessage>
                                            Bạn cần nhập tên đăng nhập
                                        </FormErrorMessage>
                                    )}
                            </FormControl>

                            <FormControl invalid={Boolean(errors2.email)}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    {...register2("email", {
                                        required: true,
                                        pattern:
                                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    })}
                                    placeholder="Nhập địa chỉ email"
                                />
                                {errors2?.email?.type === "required" && (
                                    <FormErrorMessage>
                                        Bạn cần nhập Email
                                    </FormErrorMessage>
                                )}
                                {errors2?.email?.type === "pattern" && (
                                    <FormErrorMessage>
                                        Địa chỉ email không hợp lệ
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl invalid={Boolean(errors2.password)}>
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input.Group>
                                    <Input
                                        className="pr-16"
                                        type={
                                            show.password ? "text" : "password"
                                        }
                                        placeholder="Nhập mật khẩu của bạn"
                                        {...register2("password", {
                                            required: true,
                                            minLength: 6,
                                        })}
                                    />
                                    <Input.RightElement className="w-16">
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="solid"
                                            onClick={() =>
                                                handleToggleShow("password")
                                            }
                                        >
                                            {show.password ? "Ẩn" : "Hiện"}
                                        </Button>
                                    </Input.RightElement>
                                </Input.Group>
                            </FormControl>
                            {errors2?.password?.type === "required" && (
                                <FormErrorMessage>
                                    Bạn cần nhập mật khẩu
                                </FormErrorMessage>
                            )}
                            {errors2?.password?.type === "minLength" && (
                                <FormErrorMessage>
                                    Mật khẩu phải có ít nhất 6 ký tự
                                </FormErrorMessage>
                            )}
                            <FormControl
                                invalid={Boolean(errors2.confirmPassword)}
                            >
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                <Input.Group>
                                    <Input
                                        className="pr-16"
                                        type={
                                            show.confirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Nhập lại mật khẩu"
                                        {...register2("confirm_password", {
                                            required: true,
                                            validate: (value) => {
                                                if (watch("password") != value)
                                                    return "Nhập lại mật khẩu không đúng"
                                            },
                                        })}
                                    />
                                    <Input.RightElement className="w-16">
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="solid"
                                            onClick={() =>
                                                handleToggleShow(
                                                    "confirmPassword"
                                                )
                                            }
                                        >
                                            {show.confirmPassword
                                                ? "Ẩn"
                                                : "Hiện"}
                                        </Button>
                                    </Input.RightElement>
                                </Input.Group>
                            </FormControl>
                            {errors2.confirm_password && (
                                <FormErrorMessage>
                                    {errors2.confirm_password.message ||
                                        "Bạn cần nhập lại mật khẩu"}
                                </FormErrorMessage>
                            )}
                            {alert?.register?.message && (
                                <Alert
                                    message={alert.register.message}
                                    type={alert.register.type || "success"}
                                    showIcon
                                />
                            )}
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
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        </>
    )
}

export default Header
