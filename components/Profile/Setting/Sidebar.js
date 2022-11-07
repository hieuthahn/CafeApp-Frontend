import React from "react"
import { useSession } from "next-auth/react"
import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import { signOut } from "next-auth/react"

const Sidebar = () => {
    const { data: session } = useSession()
    console.log(session)
    return (
        <div className="bg-white rounded-md p-4">
            <div className="flex gap-4 items-center border-b pb-4 mb-2">
                <Avatar size={64} icon={<UserOutlined />} />
                <div className>
                    <h3 className="font-bold text-xl">{session?.username}</h3>
                    {session?.roles.map((role, index) => (
                        <span className="text-base lowercase">{role}</span>
                    ))}
                </div>
            </div>
            <ul>
                <li className="flex gap-2 items-center py-2 px-4 bg-gray-100 rounded cursor-pointer mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 32 32"
                    >
                        <path
                            fill="#F43F5E"
                            d="M25 28H7c-.6 0-1-.4-1-1v-2c0-5.5 4.5-10 10-10 1.2 0 2.5.2 3.6.7.5.2.8.8.6 1.3-.2.5-.8.8-1.3.6-.9-.4-1.9-.6-2.9-.6-4.4 0-8 3.6-8 8v1h17c.6 0 1 .4 1 1s-.4 1-1 1zm-9-14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
                        />
                        <path
                            fill="#F43F5E"
                            d="M21 25.2c-.5 0-1-.4-1-.9l-.2-3.6c0-.2 0-.4.1-.6l4.6-7.8c.3-.5.9-.6 1.4-.4l3.4 2c.5.3.6.9.4 1.4l-4.6 7.8c-.1.2-.2.3-.4.4l-3.2 1.6c-.2 0-.4.1-.5.1zm.8-4.4.1 1.8 1.6-.8 3.9-6.6-1.7-1-3.9 6.6zm2.4 1.8z"
                        />
                    </svg>
                    <span className="font-bold text-base text-rose-500">
                        Tổng quan
                    </span>
                </li>
            </ul>
            <div
                className="flex gap-2 items-center py-2 px-4 hover:bg-gray-100 rounded cursor-pointer"
                onClick={signOut}
            >
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
                <span className="font-bold text-base text-rose-500">
                    Đăng xuất
                </span>
            </div>
        </div>
    )
}

export default Sidebar
