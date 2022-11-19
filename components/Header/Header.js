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
import { Avatar, Alert, Tabs, Modal, Drawer, Menu } from "antd"
import { UserOutlined } from "@ant-design/icons"
import Logo from "components/Logo"
import { signUp } from "lib/services/user"
import Cookies from "js-cookie"
import useBearStore from "lib/data/zustand"
import axios from "config/axios"
import SearchBar from "components/HomeSection/components/SearchBar"

const navLinkItems = [
    {
        key: "/",
        label: "Trang chủ",
        icon: null,
    },
    // {
    //     key: "/explore",
    //     label: "Khám phá",
    //     icon: null,
    // },
    // {
    //     key: "/promo",
    //     label: "Khuyến mại",
    //     icon: null,
    // },
    // {
    //     key: "/about",
    //     label: "Giới thiệu",
    //     icon: null,
    // },
    // {
    //     key: "/contact",
    //     label: "Liên hệ - Góp ý",
    //     icon: null,
    // },
    {
        key: "/add-place",
        label: "Đóng góp địa điểm",
        icon: null,
    },
]

const navLinkUserItems = [
    // {
    //     key: "/profile/setting",
    //     label: "Trang cá nhân",
    //     icon: null,
    // },
    {
        key: "/profile/setting",
        label: "Chỉnh sửa hồ sơ",
        icon: null,
    },
    {
        key: "/contact",
        label: "Liên hệ - Góp ý",
        icon: null,
    },
    {
        key: "/about",
        label: "Giới thiệu",
        icon: null,
    },
]

const Header = () => {
    const { push, pathname } = useRouter()
    const { data: session } = useSession()
    const [profile, setProfile] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false,
        drawer: false,
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
            axios.defaults.headers.common["Authorization"] =
                "Token " + session.accessToken
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

    const handleClickMenu = ({ item, key, keyPath, event }) => {
        console.log(key, keyPath)
        push(key)
        handleToggleShow("drawer")
    }

    return (
        <>
            <div className="bg-gray-200 h-full w-full">
                {/* Navbar desktop */}
                <nav className="w-full bg-white hidden xl:block shadow">
                    <div className="container px-6 h-16 flex justify-between items-center lg:items-stretch mx-auto">
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="flex items-center">
                                <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight hidden lg:block">
                                    <Link href="/">
                                        <a>
                                            <Logo />
                                        </a>
                                    </Link>
                                </h3>
                            </div>
                            {pathname !== "/" && (
                                <SearchBar
                                    iconSearch={true}
                                    inputClass="flex items-center px-2 rounded-lg border"
                                />
                            )}
                            <ul className="hidden xl:flex items-center h-full gap-6">
                                {navLinkItems.map((item, index) => {
                                    return (
                                        <Link key={index} href={item.key}>
                                            <a className="flex items-center font-bold">
                                                <li
                                                    className={`cursor-pointer h-full flex items-center text-sm tracking-normal transition duration-150 ease-in ${
                                                        pathname === item.key
                                                            ? "text-rose-500"
                                                            : "hover:text-rose-500 text-gray-800"
                                                    }`}
                                                >
                                                    <span className="mr-2">
                                                        {item.icon}
                                                    </span>
                                                    {item.label}
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
                                            <ul className="p-2 w-40 drop-shadow-md bg-white absolute rounded right-0 shadow top-[56px] z-10">
                                                {navLinkUserItems.map(
                                                    (item, index) => {
                                                        return (
                                                            <Link
                                                                key={index}
                                                                href={item.key}
                                                            >
                                                                <a>
                                                                    {console.log(
                                                                        pathname ===
                                                                            item.key
                                                                    )}
                                                                    <li
                                                                        className={`cursor-pointer text-gray-600 text-sm leading-3 py-2 font-bold ${
                                                                            pathname ===
                                                                            item.key
                                                                                ? "!text-rose-500"
                                                                                : "hover:text-rose-500 text-gray-600"
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <span className="ml-2">
                                                                                {
                                                                                    item.label
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
                                onClick={() => handleToggleShow("drawer")}
                            >
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
                            </div>
                        </div>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    <Drawer
                        title={
                            session ? (
                                <div
                                    className="flex gap-4 items-center"
                                    onClick={() => {
                                        push("/profile/setting") &&
                                            handleToggleShow("drawer")
                                    }}
                                >
                                    <Avatar
                                        size={"large"}
                                        icon={<UserOutlined />}
                                    />
                                    <div className>
                                        <h3 className="font-bold text-base">
                                            {session?.name ||
                                                session?.username ||
                                                session?.email}
                                        </h3>
                                        {session?.roles.map((role, index) => (
                                            <span
                                                key={index}
                                                className="text-sm"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex items-center"
                                    onClick={() => handleToggleShow("drawer")}
                                >
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
                                    <div className="ml-2">
                                        <Button
                                            className="font-semibold cursor-pointer"
                                            color="rose"
                                            onClick={toggleModalLogin}
                                        >
                                            Đăng nhập/Đăng ký
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                        footer={
                            session ? (
                                <Button
                                    className="font-semibold cursor-pointer w-full"
                                    color="rose"
                                    onClick={toggleModalLogin}
                                >
                                    Đăng xuất
                                </Button>
                            ) : null
                        }
                        placement="right"
                        onClose={() => handleToggleShow("drawer")}
                        open={show?.drawer}
                    >
                        <div id="mobile-nav">
                            <div
                                className="bg-gray-800 opacity-50 w-full h-full"
                                onClick={() => handleToggleShow("drawer")}
                            />
                            <div className="">
                                <div className="px-6 h-full">
                                    <div className="flex flex-col justify-between h-full w-full">
                                        <div>
                                            {session && (
                                                <Menu
                                                    onClick={handleClickMenu}
                                                    defaultSelectedKeys={[
                                                        pathname,
                                                    ]}
                                                    className="border-b"
                                                    items={navLinkUserItems}
                                                />
                                            )}
                                            <Menu
                                                onClick={handleClickMenu}
                                                defaultSelectedKeys={[pathname]}
                                                items={navLinkItems}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Drawer>
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
