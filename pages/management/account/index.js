import {
    Space,
    Table,
    Tag,
    Button,
    Tooltip,
    Modal,
    message,
    Select,
} from 'antd'
import React, { useState, useEffect } from 'react'
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    SaveOutlined,
} from '@ant-design/icons'
import {
    getAllAccounts,
    updateProfileByAdmin,
    deleteProfileByAdmin,
} from 'lib/services/account'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'

const { confirm } = Modal
const listRole = {
    admin: {
        text: 'Quản trị viên',
        color: '#ff4d4f',
    },
    moderator: {
        text: 'Biên tập viên',
        color: '#ffa940',
    },
    user: {
        text: 'Người dùng',
        color: '#bfbfbf',
    },
}
const getStatusLabel = (postStatus) => {
    const map = {
        admin: {
            text: 'Quản trị viên',
            color: '#ff4d4f',
        },
        moderator: {
            text: 'Biên tập viên',
            color: '#597ef7',
        },
        user: {
            text: 'Người dùng',
            color: '#ffa940',
        },
    }

    // const { text, color } = map[postStatus]

    return (
        <Tag color={map[postStatus]?.color}>
            <b>{map[postStatus]?.text?.toUpperCase()}</b>
        </Tag>
    )
}

const App = () => {
    const router = useRouter()
    const [accounts, setAccounts] = useState([])
    const [roleChosen, setRoleChosen] = useState()
    const [body, setBody] = useState({
        page: 1,
        pageSize: 10,
        status: [],
    })
    const getListAccounts = async () => {
        try {
            const res = await getAllAccounts(body.page, body.pageSize)
            setAccounts(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListAccounts()
    }, [body])

    const handleChange = (pagination, filters, sorter) => {
        if (pagination?.current !== body.page || filters?.status?.length)
            setBody((prev) => ({
                ...prev,
                page: pagination.current,
                pageSize: pagination.pageSize,
                status: filters.status,
            }))

        if (!filters?.status) {
            setBody((prev) => ({
                ...prev,
                page: pagination.current,
                pageSize: pagination.pageSize,
                status: [],
            }))
        }
    }

    const handleDeleteAccount = (account) => {
        confirm({
            title: `Bạn muốn xóa tài khoản ${account?.username}?`,
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                try {
                    const res = await deleteProfileByAdmin(account?._id)
                    if (res.success) {
                        message.success(res.message)
                        getListAccounts()
                        return
                    }
                    message.error(res.message)
                } catch (error) {
                    message.error(error.message || 'Xóa không thành công')
                }
            },
            onCancel() {},
        })
    }

    const handleChangeRole = (value, role, account) => {
        confirm({
            title: `Bạn sẽ đổi vai trò ${account?.username} thành ${listRole[value]?.text}?`,
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                try {
                    const body = {
                        roles: [{ name: value }],
                    }
                    const res = await updateProfileByAdmin(account._id, body)
                    if (res.success) {
                        message.success(res.message)
                        getListAccounts()
                        return
                    }
                    message.error(res.message)
                } catch (error) {
                    message.error(error.message || 'Xóa không thành công')
                }
            },
            onCancel() {
                setRoleChosen()
            },
        })
        setRoleChosen({
            newRole: value,
            ...role,
            account,
        })
    }

    const columns = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
            render: (username, record) => (
                <a
                    href={`/account/${record?._id}`}
                    className="font-bold text-slate-800"
                >
                    {username}
                </a>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <div className="text-slate-800">{email}</div>,
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'name',
            key: 'name',
            render: (name) => <div className="text-slate-800">{name}</div>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => <div className="text-slate-800">{phone}</div>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt, place) => (
                <>{moment(createdAt).format('DD/MM/YYYY')}</>
            ),
        },
        {
            title: 'Cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt, place) => (
                <>{moment(updatedAt).format('DD/MM/YYYY')}</>
            ),
        },
        {
            title: 'Vai trò',
            key: 'roles',
            dataIndex: 'roles',
            render: (roles, record) => (
                <div>
                    <Select
                        placeholder="Chọn vai trò"
                        optionFilterProp="children"
                        onChange={(value) =>
                            handleChangeRole(value, roles[0], record)
                        }
                        value={
                            record?._id === roleChosen?.account?._id
                                ? roleChosen?.newRole
                                : roles[0].name
                        }
                    >
                        {Object.keys(listRole).map((role, i) => {
                            return (
                                <Select.Option key={i} value={role}>
                                    {/* {listRole[role]?.text} */}
                                    <Tag color={listRole[role]?.color}>
                                        <b>{listRole[role]?.text}</b>
                                    </Tag>
                                </Select.Option>
                            )
                        })}
                    </Select>
                </div>
            ),
            filters: [
                {
                    text: 'Người dùng',
                    value: 'user',
                },
                {
                    text: 'Biên tập viên',
                    value: 'mod',
                },
                {
                    text: 'Quản trị viên',
                    value: 'admin',
                },
            ],
            // onFilter: (value, place) => place.status.startsWith(value),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" key={record}>
                    <Tooltip title="Xóa">
                        <Button
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteAccount(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ]

    return (
        <Table
            scroll={('x', 'y')}
            columns={columns}
            dataSource={accounts.data}
            onChange={handleChange}
            pagination={{
                defaultCurrent: +body?.page,
                total: +accounts?.meta?.totalItems,
                pageSizeOptions: [10, 20, 30],
            }}
            rowKey={(record) => record._id}
        />
    )
}

App.layout = 'admin'

export default App
