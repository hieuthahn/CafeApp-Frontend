import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button, Tooltip, Form, Input, Switch, message } from "antd"
import {
    EditOutlined,
    UserOutlined,
    LoginOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    FacebookOutlined,
    InstagramOutlined,
} from "@ant-design/icons"
import { updateProfile, getProfile } from "lib/services/profile"

const Info = () => {
    const { data: session } = useSession()
    const [info, setInfo] = useState({})
    const [editInfo, setEditInfo] = useState()
    const listInfo = [
        {
            label: "Tên hiển thị",
            key: "name",
            icon: <UserOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: "Tên người dùng",
            key: "username",
            icon: <LoginOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: "Mật khẩu",
            key: "password",
            icon: <LockOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: "Email",
            key: "email",
            icon: <MailOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: "Điện thoại",
            key: "phone",
            icon: <PhoneOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: "Facebook",
            key: "facebook",
            icon: <FacebookOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: "Instagram",
            key: "instagram",
            icon: <InstagramOutlined style={{ fontSize: "20px" }} />,
        },
    ]

    const onEditInfo = async (value) => {
        try {
            const res = await updateProfile(value)
            if (res.success) {
                message.success(res?.message)
                setEditInfo()
                getInfo()
                return
            }
            message.error(res?.message)
        } catch (error) {
            message.error(error)
            console.log(error)
        }
    }

    const getInfo = async () => {
        const res = await getProfile()
        if (res.success) {
            setInfo(res.data)
            return
        }
        message.error(res.message)
    }

    useEffect(() => {
        getInfo()
    }, [])

    const handleEdit = (name) => {
        if (editInfo !== name) {
            setEditInfo(name)
        }
    }

    const handleChangeInfoBoolean = (e, name) => {
        setInfo((prev) => ({
            ...prev,
            [name]: !prev[name],
        }))
        onEditInfo({ [name]: !info[name] })
    }

    return (
        <div className="bg-white rounded-md p-4">
            <ul>
                {listInfo.map((list, index) => {
                    return (
                        <li
                            key={index}
                            className="flex gap-4 items-center cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md border-b mb-2"
                            onClick={() => handleEdit(list.key)}
                        >
                            <div className="flex items-center justify-between grow">
                                <div className="grow">
                                    <div className="font-bold text-lg flex items-center gap-2">
                                        {list.icon}
                                        {list.label}
                                    </div>
                                    {editInfo === list.key ? (
                                        <Form
                                            className="!mt-2"
                                            initialValues={info}
                                            onFinish={onEditInfo}
                                            // onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
                                            {list.key === "password" ? (
                                                <>
                                                    <Form.Item
                                                        className="!mb-3"
                                                        name={[
                                                            "password",
                                                            "old",
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: `Cần nhập mật khẩu hiện tại`,
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className="!w-[250px]"
                                                            placeholder={`Nhập mật khẩu hiện tại`}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        className="!mb-3"
                                                        name={[
                                                            "password",
                                                            "new",
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: `Cần nhập mật khẩu mới`,
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className="!w-[250px]"
                                                            placeholder={`Nhập mật khẩu mới`}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        className="!mb-3"
                                                        name={[
                                                            "password",
                                                            "confirm",
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: `Cần nhập lại mật khẩu mới`,
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className="!w-[250px]"
                                                            placeholder={`Nhập lại mật khẩu mới`}
                                                        />
                                                    </Form.Item>
                                                </>
                                            ) : (
                                                <Form.Item
                                                    className="!mb-3"
                                                    name={list.key}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: `Cần nhập ${list.label}`,
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        className="!w-[250px]"
                                                        placeholder={`Nhập ${list.label}`}
                                                    />
                                                </Form.Item>
                                            )}
                                            <Form.Item className="!mb-3">
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                >
                                                    Cập nhật
                                                </Button>
                                                <Button
                                                    className="ml-2"
                                                    onClick={() =>
                                                        handleEdit("")
                                                    }
                                                >
                                                    Hủy
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    ) : (
                                        <div className="text-base ml-7">
                                            {info[list.key] === true
                                                ? "********"
                                                : info[list.key] || "---"}
                                        </div>
                                    )}
                                </div>
                                {editInfo !== list.key && (
                                    <Tooltip title="Sửa">
                                        <Button
                                            onClick={() => handleEdit(list.key)}
                                            shape="circle"
                                            icon={<EditOutlined />}
                                        />
                                    </Tooltip>
                                )}
                            </div>
                        </li>
                    )
                })}
                <li className="flex gap-4 items-center cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md border-b mb-2">
                    <div className="flex items-center justify-between grow">
                        <div className="grow">
                            <div className="font-bold text-lg flex items-center gap-2 mb-2">
                                <LockOutlined style={{ fontSize: "20px" }} />
                                Quyền riêng tư
                            </div>
                            <div className="ml-7">
                                <div>
                                    <Switch
                                        size="small"
                                        checked={info.publicSaved}
                                        onChange={(e) =>
                                            handleChangeInfoBoolean(
                                                e,
                                                "publicSaved"
                                            )
                                        }
                                    />
                                    <span className="ml-2">
                                        Công khai danh sách đã lưu
                                    </span>
                                </div>
                                <div>
                                    <Switch
                                        size="small"
                                        checked={info.publicSocial}
                                        onChange={(e) =>
                                            handleChangeInfoBoolean(
                                                e,
                                                "publicSocial"
                                            )
                                        }
                                    />
                                    <span className="ml-2">
                                        Hiển thị mạng xã hội trên trang cá nhân
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Info
