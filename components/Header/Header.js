import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {
    Button,
    cx,
    Divider,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Input,
} from '@vechaiui/react'
import { Dialog, Transition, Tab } from '@headlessui/react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOut } from 'next-auth/react'
import { signUp } from 'lib/services/user'
import { Avatar, Alert, Tabs, Modal, Drawer, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Logo from 'components/Logo'
import Cookies from 'js-cookie'
import useBearStore from 'lib/data/zustand'
import axios from 'config/axios'
import SearchBar from 'components/HomeSection/components/SearchBar'

const navLinkItems = [
    {
        key: '/',
        label: 'Trang chủ',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="22"
                height="22"
            >
                <path
                    fill="#231f20"
                    d="M13.85 7.6 13 6.77 8.35 2.15a.48.48 0 0 0-.7 0L3 6.72l-.83.82a.5.5 0 1 0 .7.71v5.2a.5.5 0 0 0 .5.5h9.29a.5.5 0 0 0 .5-.5V8.3a.52.52 0 0 0 .35.14.51.51 0 0 0 .36-.15.49.49 0 0 0-.02-.69ZM6.38 13V8.92h3V13Zm5.76 0H10.4V8.42a.51.51 0 0 0-.5-.5h-4a.51.51 0 0 0-.5.5V13H3.85V7.31L8 3.2l4.14 4.11Z"
                    data-name="Layer 2"
                />
            </svg>
        ),
    },
    // {
    //     key: "/explore",
    //     label: "Khám phá",
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
        key: '/add-place',
        label: 'Đóng góp địa điểm',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="22"
                height="22"
            >
                <path d="M296.354,207.344a28.33,28.33,0,1,0-28.022-24.1l-33.485,16.068a28.343,28.343,0,1,0-1.871,43.221l35.163,16.126c-.078.856-.124,1.721-.124,2.6a28.389,28.389,0,1,0,8.888-20.582L243.5,225.35a28.359,28.359,0,0,0,.49-5.222,28.7,28.7,0,0,0-.153-2.948l34.326-16.472A28.2,28.2,0,0,0,296.354,207.344Zm0-36.68a8.34,8.34,0,1,1-8.339,8.34A8.35,8.35,0,0,1,296.354,170.664Zm-80.708,57.805a8.341,8.341,0,1,1,8.339-8.341A8.35,8.35,0,0,1,215.646,228.469Zm80.708,24.444a8.34,8.34,0,1,1-8.339,8.34A8.35,8.35,0,0,1,296.354,252.913Z" />
                <path d="M256,26.872c-108.907,0-197.51,84.9-197.51,189.261,0,33.493,10.3,68.523,30.613,104.116,15.986,28.011,38.2,56.469,66.035,84.587,47.119,47.6,93.523,77.47,95.476,78.718a10,10,0,0,0,10.772,0c1.953-1.248,48.357-31.116,95.476-78.718,27.832-28.118,50.049-56.576,66.035-84.587,20.313-35.593,30.613-70.623,30.613-104.116C453.51,111.774,364.907,26.872,256,26.872ZM405.627,310.159c-15.074,26.457-36.171,53.485-62.706,80.33A622.086,622.086,0,0,1,256,463.1a621.015,621.015,0,0,1-86.646-72.336c-26.6-26.876-47.758-53.937-62.878-80.43C87.905,277.8,78.49,246.105,78.49,216.133,78.49,122.8,158.121,46.872,256,46.872S433.51,122.8,433.51,216.133C433.51,246.051,424.129,277.686,405.627,310.159Z" />
                <path d="M256,74.172c-81,0-146.9,65.9-146.9,146.9s65.9,146.9,146.9,146.9,146.9-65.9,146.9-146.9S337,74.172,256,74.172Zm0,273.8a126.9,126.9,0,1,1,126.9-126.9A127.046,127.046,0,0,1,256,347.975Z" />
            </svg>
        ),
    },
    {
        key: '/promo',
        label: 'Khuyến mãi',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15.118 15.107"
                width="22"
                height="22"
            >
                <path d="M14.059 5.436V3.245l-2.204-1.102L9.712 0 7.559.538 5.406 0 3.263 2.143 1.059 3.245v2.191L0 7.554l1.059 2.118v2.191l2.204 1.102 2.143 2.143 2.153-.538 2.153.538 2.143-2.143 2.204-1.102V9.672l1.059-2.118-1.059-2.118zm-1 4v1.809l-1.724.862L9.406 14l-1.847-.462L5.712 14l-1.8-1.8-1.854-.956V9.436l-.94-1.882.941-1.882V3.863l1.724-.862 1.93-1.894 1.847.462 1.847-.462 1.8 1.8 1.854.956v1.809L14 7.554l-.941 1.882z" />
                <path d="m4.205 10.2 6-6 .707.708-6 6zM5.559 7.054c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5-1.5.673-1.5 1.5.673 1.5 1.5 1.5zm0-2a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1zm4 3c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm0 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z" />
            </svg>
        ),
    },
]

const navLinkUserItems = [
    {
        label: 'Hồ sơ',
        key: '/profile/setting',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 32 32"
            >
                <path
                    // fill="#F43F5E"
                    d="M25 28H7c-.6 0-1-.4-1-1v-2c0-5.5 4.5-10 10-10 1.2 0 2.5.2 3.6.7.5.2.8.8.6 1.3-.2.5-.8.8-1.3.6-.9-.4-1.9-.6-2.9-.6-4.4 0-8 3.6-8 8v1h17c.6 0 1 .4 1 1s-.4 1-1 1zm-9-14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
                />
                <path
                    // fill="#F43F5E"
                    d="M21 25.2c-.5 0-1-.4-1-.9l-.2-3.6c0-.2 0-.4.1-.6l4.6-7.8c.3-.5.9-.6 1.4-.4l3.4 2c.5.3.6.9.4 1.4l-4.6 7.8c-.1.2-.2.3-.4.4l-3.2 1.6c-.2 0-.4.1-.5.1zm.8-4.4.1 1.8 1.6-.8 3.9-6.6-1.7-1-3.9 6.6zm2.4 1.8z"
                />
            </svg>
        ),
    },
    {
        label: 'Địa đểm đã thích',
        key: '/profile/liked',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
            >
                <path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z" />
            </svg>
        ),
    },
    {
        label: 'Địa điểm đã đánh giá',
        key: '/profile/reviewed',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
            >
                <path
                    fill="#000"
                    d="M512.3 188.342a14.66 14.66 0 0 0-11.907-10.04l-35.737-5.192q-.353-.086-.717-.14l-25.393-3.69-27.769-56.266a14.955 14.955 0 0 0-26.7.001L356.31 169.28l-25.394 3.69a7.198 7.198 0 0 0-.71.14l-29.439 4.277-30.105-61a17.5 17.5 0 0 0-31.386 0l-29.967 60.72-27.508-3.997q-.353-.086-.717-.14l-25.393-3.69-27.77-56.264a14.954 14.954 0 0 0-26.7 0L73.454 169.28l-25.392 3.69a7.198 7.198 0 0 0-.711.14l-35.743 5.193a14.75 14.75 0 0 0-8.175 25.16l44.93 43.797-10.607 61.84a14.733 14.733 0 0 0 21.403 15.551l55.414-29.134 48.263 25.374-11.174 65.149a17.5 17.5 0 0 0 25.392 18.449l76.754-40.353a2.492 2.492 0 0 1 2.325.001l76.754 40.352a17.5 17.5 0 0 0 25.391-18.448l-11.004-64.162 50.155-26.362 55.415 29.134a14.75 14.75 0 0 0 21.401-15.55l-10.605-61.842 44.93-43.796a14.659 14.659 0 0 0 3.732-15.121ZM166.32 300.575l-.819 4.77-44.187-23.23a14.8 14.8 0 0 0-6.618-1.686 5.128 5.128 0 0 0-.248 0 14.811 14.811 0 0 0-6.618 1.686l-55.205 29.023 10.544-61.473a14.75 14.75 0 0 0-4.243-13.055l-44.661-43.536 35.964-5.226a7.202 7.202 0 0 0 .71-.139l24.8-3.603a14.745 14.745 0 0 0 11.108-8.07l27.725-56.177 27.725 56.176a14.745 14.745 0 0 0 11.107 8.07l24.794 3.603c.237.058.475.105.718.14l23.413 3.402-1.43 2.897a2.502 2.502 0 0 1-1.881 1.368l-85.814 12.47a17.5 17.5 0 0 0-9.7 29.85l62.098 60.528a2.5 2.5 0 0 1 .717 2.212Zm176.178 90.446a2.398 2.398 0 0 1-2.632.19l-76.753-40.35a17.489 17.489 0 0 0-16.288-.001l-76.752 40.352a2.501 2.501 0 0 1-3.629-2.636l14.659-85.465a17.495 17.495 0 0 0-5.033-15.491l-62.094-60.527a2.5 2.5 0 0 1 1.384-4.265l85.815-12.469a17.5 17.5 0 0 0 13.176-9.573l38.377-77.76a2.5 2.5 0 0 1 4.483 0l38.376 77.758a17.497 17.497 0 0 0 13.178 9.575l85.812 12.47a2.5 2.5 0 0 1 1.385 4.264l-62.095 60.527a17.5 17.5 0 0 0-5.032 15.49l2.742 15.986.01.06 11.906 69.42a2.401 2.401 0 0 1-.995 2.445ZM453.075 236.61a14.74 14.74 0 0 0-4.242 13.057l10.542 61.472-55.204-29.022a14.806 14.806 0 0 0-6.62-1.687 5.126 5.126 0 0 0-.247 0 14.804 14.804 0 0 0-6.617 1.686l-46.08 24.22-.988-5.76a2.497 2.497 0 0 1 .719-2.213l62.095-60.528a17.5 17.5 0 0 0-9.7-29.85l-85.811-12.469a2.5 2.5 0 0 1-1.883-1.368l-1.292-2.618 25.337-3.68a7.201 7.201 0 0 0 .711-.14l24.8-3.603a14.745 14.745 0 0 0 11.107-8.07l27.726-56.178 27.724 56.177a14.745 14.745 0 0 0 11.108 8.07l24.794 3.603c.236.058.474.105.718.14l35.964 5.227Z"
                />
            </svg>
        ),
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
            type: '',
            message: '',
        },
        login: {
            type: '',
            message: '',
        },
    })

    useEffect(() => {
        if (session) {
            const data = JSON.stringify({
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
                roles: session.roles,
            })
            Cookies.set('auth', data)
            axios.defaults.headers.common['Authorization'] =
                'Token ' + session.accessToken
        } else {
            Cookies.remove('auth')
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
        const res = await signIn('credentials', {
            ...data,
            redirect: false,
        })
        setLoading(false)
        if (res.error) {
            setAlert((prev) => ({
                ...prev,
                login: {
                    type: 'error',
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
                        type: 'success',
                        message: res.message,
                    },
                }))

                await signIn('credentials', {
                    ...data,
                    redirect: false,
                })

                toggleModalLogin()
                message.success(res.message)

                return
            }
            setAlert((prev) => ({
                ...prev,
                register: {
                    type: 'error',
                    message: res.message,
                },
            }))
        } catch (error) {
            setAlert((prev) => ({
                ...prev,
                register: {
                    type: 'error',
                    message: error.message || error,
                },
            }))
        }
    }

    return (
        <>
            <div className="w-full h-full bg-gray-200">
                {/* Navbar desktop */}
                <nav className="block w-full bg-white shadow">
                    <div className="container flex items-center justify-between h-16 px-3 mx-auto lg:items-stretch">
                        <div className="flex items-center justify-between w-full md:justify-start">
                            {/* Logo */}
                            <h3 className="text-base font-bold leading-tight tracking-normal text-gray-800">
                                <Link href="/" passHref legacyBehavior>
                                    <a>
                                        <Logo />
                                    </a>
                                </Link>
                            </h3>
                            {pathname !== '/' && (
                                <SearchBar
                                    iconSearch={true}
                                    inputClass="hidden md:flex items-center px-2 rounded-lg border"
                                />
                            )}
                            <ul
                                className={`hidden lg:flex items-center h-full gap-6 ${
                                    pathname !== '/' ? '' : 'ml-6'
                                }`}
                            >
                                {navLinkItems.map((item, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={item.key}
                                            passHref
                                            legacyBehavior
                                        >
                                            <a className="flex items-center font-bold">
                                                <li
                                                    className={`cursor-pointer h-full flex items-center text-base tracking-normal ${
                                                        pathname === item.key
                                                            ? 'text-rose-500'
                                                            : 'hover:text-rose-500 text-gray-800'
                                                    }`}
                                                >
                                                    <span
                                                        className={`${
                                                            pathname ===
                                                            item.key
                                                                ? 'active'
                                                                : ''
                                                        } mr-1`}
                                                    >
                                                        {item?.icon}
                                                    </span>
                                                    {item.label}
                                                </li>
                                            </a>
                                        </Link>
                                    )
                                })}
                            </ul>
                            <div className="ml-auto lg:hidden">
                                <div
                                    id="menu"
                                    className="text-gray-800"
                                    onClick={() => handleToggleShow('drawer')}
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
                        <div className="items-center justify-end hidden h-full lg:flex">
                            <div className="flex items-center h-full">
                                <Link
                                    href="/new-review"
                                    passHref
                                    legacyBehavior
                                >
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
                                        className="relative flex items-center gap-2 ml-2 cursor-pointer"
                                        onClick={() => setProfile(!profile)}
                                    >
                                        {profile && (
                                            <ul className="px-4 py-2 w-[220px] drop-shadow-md bg-white absolute rounded right-0 shadow top-[56px] z-10 transition duration-300 ease-in ">
                                                {navLinkUserItems.map(
                                                    (item, index) => {
                                                        return (
                                                            <Link
                                                                key={index}
                                                                href={item.key}
                                                                passHref
                                                                legacyBehavior
                                                            >
                                                                <li
                                                                    className={`cursor-pointer text-gray-600 text-sm leading-3 py-2 font-bold ${
                                                                        pathname ===
                                                                        item.key
                                                                            ? '!text-rose-500'
                                                                            : 'hover:text-rose-500 text-gray-600'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={
                                                                                pathname ===
                                                                                item.key
                                                                                    ? 'active'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            {
                                                                                item?.icon
                                                                            }
                                                                        </span>

                                                                        <span className="ml-2">
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            </Link>
                                                        )
                                                    },
                                                )}
                                                {session.roles.includes(
                                                    'ADMIN',
                                                ) && (
                                                    <Link
                                                        href={
                                                            '/management/places'
                                                        }
                                                        passHref
                                                        legacyBehavior
                                                    >
                                                        <li
                                                            className={`cursor-pointer text-gray-600 text-sm leading-3 py-2 font-bold ${
                                                                pathname ===
                                                                '/management/places'
                                                                    ? '!text-rose-500'
                                                                    : 'hover:text-rose-500 text-gray-600'
                                                            }`}
                                                        >
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={
                                                                        pathname ===
                                                                        '/management/places'
                                                                            ? 'active'
                                                                            : ''
                                                                    }
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        data-name="Line Gradient"
                                                                        width="22"
                                                                        height="22"
                                                                        viewBox="0 0 64 64"
                                                                    >
                                                                        <defs>
                                                                            <linearGradient
                                                                                id="a"
                                                                                x1="3.998"
                                                                                x2="60.002"
                                                                                y1="32"
                                                                                y2="32"
                                                                                gradientUnits="userSpaceOnUse"
                                                                            >
                                                                                <stop
                                                                                    offset="0"
                                                                                    stopColor="#ffa68d"
                                                                                />
                                                                                <stop
                                                                                    offset="1"
                                                                                    stopColor="#fd3a84"
                                                                                />
                                                                            </linearGradient>
                                                                        </defs>
                                                                        <path
                                                                            fill="#000"
                                                                            d="M59.99756,29.32422a2.05254,2.05254,0,0,0-1.80274-2.0332l-4.94824-.64844a22.79954,22.79954,0,0,0-2.46972-5.9707l3.04589-3.90723a2.05419,2.05419,0,0,0-.16845-2.71289l-3.749-3.74121a2.05219,2.05219,0,0,0-2.71289-.16309L43.228,13.19336A22.82938,22.82938,0,0,0,37.2666,10.7041l-.60889-4.9082a2.0552,2.0552,0,0,0-2.0371-1.79883l-5.29541.00586a2.05262,2.05262,0,0,0-2.03467,1.80176l-.64746,4.94922a22.79551,22.79551,0,0,0-5.97071,2.46875l-3.90771-3.0459a2.0557,2.0557,0,0,0-2.71192.16992l-3.74218,3.74805a2.05389,2.05389,0,0,0-.16309,2.71289l3.04688,3.96386A22.781,22.781,0,0,0,10.7041,26.7334l-4.9082.6084a2.05277,2.05277,0,0,0-1.79834,2.03711l.00488,5.29687A2.05254,2.05254,0,0,0,5.80518,36.709l4.94824.64844a22.79975,22.79975,0,0,0,2.46972,5.97071l-3.04589,3.90722a2.05419,2.05419,0,0,0,.16845,2.71289l3.749,3.74121a2.05106,2.05106,0,0,0,2.71289.16309l3.96435-3.0459A22.82938,22.82938,0,0,0,26.7334,53.2959l.60889,4.9082a2.0552,2.0552,0,0,0,2.0371,1.79883l5.29541-.00586a2.05262,2.05262,0,0,0,2.03467-1.80176l.64746-4.94922a22.79551,22.79551,0,0,0,5.97071-2.46875l3.90771,3.0459a2.05344,2.05344,0,0,0,2.71192-.16992l3.74218-3.748a2.05389,2.05389,0,0,0,.16309-2.71289l-3.04688-3.96386A22.781,22.781,0,0,0,53.2959,37.2666l4.9082-.6084a2.05277,2.05277,0,0,0,1.79834-2.03711ZM57.958,34.67383l-4.90772.6084a2.0431,2.0431,0,0,0-1.73388,1.54882,19.76791,19.76791,0,0,1-2.22657,5.37012,2.04206,2.04206,0,0,0,.13428,2.32227l3.04981,3.96972-3.80909,3.752-3.90771-3.0459a2.042,2.042,0,0,0-2.32324-.12891,19.75257,19.75257,0,0,1-5.36621,2.23633A2.04232,2.04232,0,0,0,35.32324,53.044l-.64941,4.95312L29.32666,57.958l-.6084-4.90821A2.03755,2.03755,0,0,0,27.169,51.31738a19.82679,19.82679,0,0,1-5.36866-2.22656,2.04046,2.04046,0,0,0-2.32324.13379l-3.96924,3.04883-3.75342-3.8086,3.04639-3.9082a2.04014,2.04014,0,0,0,.1294-2.32226,19.75228,19.75228,0,0,1-2.23731-5.36622,2.04325,2.04325,0,0,0-1.73633-1.54492l-4.9541-.64941L6.042,29.32617l4.90772-.6084A2.0431,2.0431,0,0,0,12.68359,27.169a19.76791,19.76791,0,0,1,2.22657-5.37012,2.04206,2.04206,0,0,0-.13428-2.32227l-3.04981-3.96972,3.80909-3.752,3.90771,3.0459a2.042,2.042,0,0,0,2.32324.12891,19.75257,19.75257,0,0,1,5.36621-2.23633,2.04232,2.04232,0,0,0,1.54444-1.73731l.64941-4.95312,5.34717.03906.6084,4.90821a2.03755,2.03755,0,0,0,1.54931,1.73242,19.82679,19.82679,0,0,1,5.36866,2.22656,2.03934,2.03934,0,0,0,2.32324-.13379l3.96924-3.04883,3.75342,3.8086-3.04639,3.9082a2.04016,2.04016,0,0,0-.1294,2.32227,19.75209,19.75209,0,0,1,2.23731,5.36621,2.04325,2.04325,0,0,0,1.73633,1.54492l4.9541.64941.00488,5.29688,1-.001ZM42.87549,21.10254C33.35535,11.443,16.5037,18.44338,16.60516,32.01362A15.46708,15.46708,0,0,0,32.01525,47.39538C45.58618,47.4697,52.55278,30.60068,42.87549,21.10254Zm2.47113,9.91113h-7.187c-.11811-4.98382-1.12348-9.37494-2.69123-11.94348A13.40459,13.40459,0,0,1,45.34662,31.01367ZM32,18.60449c2.49872.60686,3.93037,6.25935,4.1589,12.40906l-8.31478.00012C28.029,23.30892,30.32459,18.60794,32,18.60449Zm-9.481,3.93262a13.30274,13.30274,0,0,1,6.0329-3.47144c-1.66461,2.72821-2.59192,7.34949-2.70813,11.948h-7.1911A13.28726,13.28726,0,0,1,22.519,22.53711ZM18.65472,33.01367h7.186c.121,4.9726,1.12591,9.3523,2.69086,11.91614A13.406,13.406,0,0,1,18.65472,33.01367ZM32,45.39551c-2.49594-.60581-3.926-6.24582-4.15848-12.38172l8.31388-.00012C35.96566,40.70231,33.67345,45.39206,32,45.39551Zm9.481-3.93262a13.30274,13.30274,0,0,1-6.0329,3.47144c1.66132-2.72278,2.58844-7.33118,2.70764-11.92066H45.346A13.28724,13.28724,0,0,1,41.481,41.46289Z"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                                <span className="ml-2">
                                                                    Quản lý
                                                                    website
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </Link>
                                                )}
                                                <li
                                                    onClick={() => signOut()}
                                                    className="py-2 mt-2 text-sm font-bold leading-3 tracking-normal text-gray-600 border-t cursor-pointer hover:text-rose-500 focus:text-rose-500 focus:outline-none"
                                                >
                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 64 64"
                                                        >
                                                            <path
                                                                fill="#F43F5E"
                                                                d="M53.42 32.299a21.42 21.42 0 1 1-36.24-15.47 2 2 0 0 1 2.77 2.887 17.42 17.42 0 1 0 24.102 0 2 2 0 0 1 2.77-2.887A21.253 21.253 0 0 1 53.42 32.3ZM32 35.045a2 2 0 0 0 2-2V12.279a2 2 0 0 0-4 0v20.766a2 2 0 0 0 2 2Z"
                                                            />
                                                        </svg>
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
                    {/*Mobile responsive sidebar*/}
                    <Drawer
                        title={
                            session ? (
                                <div
                                    className="flex items-center gap-4"
                                    onClick={() => {
                                        push('/profile/setting') &&
                                            handleToggleShow('drawer')
                                    }}
                                >
                                    <Avatar
                                        size={'large'}
                                        icon={<UserOutlined />}
                                    />
                                    <div className>
                                        <h3 className="text-base font-bold">
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
                                    onClick={() => handleToggleShow('drawer')}
                                >
                                    <Link
                                        href="/new-review"
                                        passHref
                                        legacyBehavior
                                    >
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
                                    className="w-full font-semibold cursor-pointer"
                                    color="rose"
                                    onClick={toggleModalLogin}
                                >
                                    Đăng xuất
                                </Button>
                            ) : null
                        }
                        placement="right"
                        onClose={() => handleToggleShow('drawer')}
                        open={show?.drawer}
                    >
                        <div id="mobile-nav">
                            <div
                                className="w-full h-full bg-gray-800 opacity-50"
                                onClick={() => handleToggleShow('drawer')}
                            />
                            <div className="">
                                <div className="h-full">
                                    <div className="flex flex-col justify-between w-full h-full">
                                        <div>
                                            {navLinkItems.map((item) => {
                                                return (
                                                    <Link
                                                        href={item.key}
                                                        key={item.key}
                                                        passHref
                                                        legacyBehavior
                                                    >
                                                        <li
                                                            onClick={() =>
                                                                handleToggleShow(
                                                                    'drawer',
                                                                )
                                                            }
                                                            className={`flex gap-2 items-center py-2 px-4 rounded cursor-pointer mb-2 ${
                                                                pathname ===
                                                                item.key
                                                                    ? 'bg-gray-100'
                                                                    : 'hover:bg-gray-100'
                                                            }`}
                                                        >
                                                            <span
                                                                className={
                                                                    pathname ===
                                                                    item.key
                                                                        ? 'active'
                                                                        : ''
                                                                }
                                                            >
                                                                {item?.icon || (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="22"
                                                                        height="22"
                                                                        viewBox="0 0 32 32"
                                                                    >
                                                                        <path
                                                                            // fill="#F43F5E"
                                                                            d="M25 28H7c-.6 0-1-.4-1-1v-2c0-5.5 4.5-10 10-10 1.2 0 2.5.2 3.6.7.5.2.8.8.6 1.3-.2.5-.8.8-1.3.6-.9-.4-1.9-.6-2.9-.6-4.4 0-8 3.6-8 8v1h17c.6 0 1 .4 1 1s-.4 1-1 1zm-9-14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
                                                                        />
                                                                        <path
                                                                            // fill="#F43F5E"
                                                                            d="M21 25.2c-.5 0-1-.4-1-.9l-.2-3.6c0-.2 0-.4.1-.6l4.6-7.8c.3-.5.9-.6 1.4-.4l3.4 2c.5.3.6.9.4 1.4l-4.6 7.8c-.1.2-.2.3-.4.4l-3.2 1.6c-.2 0-.4.1-.5.1zm.8-4.4.1 1.8 1.6-.8 3.9-6.6-1.7-1-3.9 6.6zm2.4 1.8z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                            <span
                                                                className={`font-bold text-base ${
                                                                    pathname ===
                                                                    item.key
                                                                        ? 'text-rose-500'
                                                                        : ''
                                                                }  `}
                                                            >
                                                                {item.label}
                                                            </span>
                                                        </li>
                                                    </Link>
                                                )
                                            })}
                                            {session && (
                                                <>
                                                    {navLinkUserItems.map(
                                                        (item) => {
                                                            return (
                                                                <Link
                                                                    href={
                                                                        item.key
                                                                    }
                                                                    key={
                                                                        item.key
                                                                    }
                                                                    passHref
                                                                    legacyBehavior
                                                                >
                                                                    <li
                                                                        onClick={() =>
                                                                            handleToggleShow(
                                                                                'drawer',
                                                                            )
                                                                        }
                                                                        className={`flex gap-2 items-center py-2 px-4 rounded cursor-pointer mb-2 ${
                                                                            pathname ===
                                                                            item.key
                                                                                ? 'bg-gray-100'
                                                                                : 'hover:bg-gray-100'
                                                                        }`}
                                                                    >
                                                                        <span
                                                                            className={
                                                                                pathname ===
                                                                                item.key
                                                                                    ? 'active'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            {item?.icon || (
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="22"
                                                                                    height="22"
                                                                                    viewBox="0 0 32 32"
                                                                                >
                                                                                    <path
                                                                                        // fill="#F43F5E"
                                                                                        d="M25 28H7c-.6 0-1-.4-1-1v-2c0-5.5 4.5-10 10-10 1.2 0 2.5.2 3.6.7.5.2.8.8.6 1.3-.2.5-.8.8-1.3.6-.9-.4-1.9-.6-2.9-.6-4.4 0-8 3.6-8 8v1h17c.6 0 1 .4 1 1s-.4 1-1 1zm-9-14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
                                                                                    />
                                                                                    <path
                                                                                        // fill="#F43F5E"
                                                                                        d="M21 25.2c-.5 0-1-.4-1-.9l-.2-3.6c0-.2 0-.4.1-.6l4.6-7.8c.3-.5.9-.6 1.4-.4l3.4 2c.5.3.6.9.4 1.4l-4.6 7.8c-.1.2-.2.3-.4.4l-3.2 1.6c-.2 0-.4.1-.5.1zm.8-4.4.1 1.8 1.6-.8 3.9-6.6-1.7-1-3.9 6.6zm2.4 1.8z"
                                                                                    />
                                                                                </svg>
                                                                            )}
                                                                        </span>
                                                                        <span
                                                                            className={`font-bold text-base ${
                                                                                pathname ===
                                                                                item.key
                                                                                    ? 'text-rose-500'
                                                                                    : ''
                                                                            }  `}
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                </Link>
                                                            )
                                                        },
                                                    )}
                                                </>
                                            )}
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
                                    {...register('username', {
                                        required: true,
                                    })}
                                    placeholder="Nhập tên đăng nhập"
                                />
                                {errors.username &&
                                    errors.username.type === 'required' && (
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
                                            show.password ? 'text' : 'password'
                                        }
                                        placeholder="Nhập mật khẩu của bạn"
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                    <Input.RightElement className="w-16">
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="solid"
                                            onClick={() =>
                                                handleToggleShow('password')
                                            }
                                        >
                                            {show.password ? 'Ẩn' : 'Hiện'}
                                        </Button>
                                    </Input.RightElement>
                                </Input.Group>
                                {errors.password &&
                                    errors.password.type === 'required' && (
                                        <FormErrorMessage>
                                            Bạn cần nhập mật khẩu
                                        </FormErrorMessage>
                                    )}
                            </FormControl>
                            {alert?.login?.message && (
                                <Alert
                                    message={alert.login.message}
                                    type={alert.login.type || 'success'}
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
                                    {...register2('name', {
                                        required: true,
                                    })}
                                    placeholder="Nhập tên hiển thị"
                                />
                                {errors2.name &&
                                    errors2.name.type === 'required' && (
                                        <FormErrorMessage>
                                            Bạn cần nhập tên hiển thị
                                        </FormErrorMessage>
                                    )}
                            </FormControl>
                            <FormControl invalid={Boolean(errors2.username)}>
                                <FormLabel>Tên đăng nhập</FormLabel>
                                <Input
                                    {...register2('username', {
                                        required: true,
                                    })}
                                    placeholder="Nhập tên đăng nhập"
                                />
                                {errors2.username &&
                                    errors2.username.type === 'required' && (
                                        <FormErrorMessage>
                                            Bạn cần nhập tên đăng nhập
                                        </FormErrorMessage>
                                    )}
                            </FormControl>

                            <FormControl invalid={Boolean(errors2.email)}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    {...register2('email', {
                                        required: true,
                                        pattern:
                                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    })}
                                    placeholder="Nhập địa chỉ email"
                                />
                                {errors2?.email?.type === 'required' && (
                                    <FormErrorMessage>
                                        Bạn cần nhập Email
                                    </FormErrorMessage>
                                )}
                                {errors2?.email?.type === 'pattern' && (
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
                                            show.password ? 'text' : 'password'
                                        }
                                        placeholder="Nhập mật khẩu của bạn"
                                        {...register2('password', {
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
                                                handleToggleShow('password')
                                            }
                                        >
                                            {show.password ? 'Ẩn' : 'Hiện'}
                                        </Button>
                                    </Input.RightElement>
                                </Input.Group>
                            </FormControl>
                            {errors2?.password?.type === 'required' && (
                                <FormErrorMessage>
                                    Bạn cần nhập mật khẩu
                                </FormErrorMessage>
                            )}
                            {errors2?.password?.type === 'minLength' && (
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
                                                ? 'text'
                                                : 'password'
                                        }
                                        placeholder="Nhập lại mật khẩu"
                                        {...register2('confirm_password', {
                                            required: true,
                                            validate: (value) => {
                                                if (watch('password') != value)
                                                    return 'Nhập lại mật khẩu không đúng'
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
                                                    'confirmPassword',
                                                )
                                            }
                                        >
                                            {show.confirmPassword
                                                ? 'Ẩn'
                                                : 'Hiện'}
                                        </Button>
                                    </Input.RightElement>
                                </Input.Group>
                            </FormControl>
                            {errors2.confirm_password && (
                                <FormErrorMessage>
                                    {errors2.confirm_password.message ||
                                        'Bạn cần nhập lại mật khẩu'}
                                </FormErrorMessage>
                            )}
                            {alert?.register?.message && (
                                <Alert
                                    message={alert.register.message}
                                    type={alert.register.type || 'success'}
                                    showIcon
                                />
                            )}
                            <Button
                                className="w-full cursor-pointer"
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
