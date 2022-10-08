import {
    LogoutOutlined,
    UserOutlined,
    ProfileOutlined,
} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import React from "react"
const { Header, Content, Footer, Sider } = Layout
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export default function AdminLayout({ children }) {
    const router = useRouter()
    const [active, setActive] = useState([router.pathname])
    const handleClick = ({ item, key, keyPath, domEvent }) => {
        if (key === "logout" || key === "/management/account") {
            return
        } else {
            router.push(key)
            setActive(keyPath)
        }
    }

    return (
        <Layout className="h-full">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken)
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type)
                }}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo h-[32px] m-5 bg-slate-400" />
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={handleClick}
                    defaultSelectedKeys={active}
                    selectedKeys={active}
                    items={[
                        {
                            key: "/management/places",
                            icon: <ProfileOutlined />,
                            label: `Địa điểm`,
                        },
                        {
                            key: "/management/categories",
                            icon: <ProfileOutlined />,
                            label: `Danh mục`,
                        },
                        {
                            key: "/management/account",
                            icon: <UserOutlined />,
                            label: `Tài khoản`,
                        },
                        {
                            key: "logout",
                            icon: <LogoutOutlined />,
                            label: `Đăng xuất`,
                        },
                    ]}
                />
            </Sider>
            <Layout className="md:ml-[200px]">
                <Header
                    className="site-layout-sub-header-background !bg-white"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    className="bg-white"
                    style={{
                        margin: "24px 16px 0",
                        overflow: "initial",
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                {/* <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    )
}
