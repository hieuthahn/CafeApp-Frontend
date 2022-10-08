import { Space, Table, Tag, Button, Tooltip } from "antd"
import React from "react"
import listPlace from "./listPlace.json"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const status = ["published", "pending", "rejected", "draft"]
const getStatusLabel = (postStatus) => {
    const map = {
        rejected: {
            text: "Không duyệt",
            color: "error",
        },
        published: {
            text: "Đã duyệt",
            color: "success",
        },
        pending: {
            text: "Chờ duyệt",
            color: "warning",
        },
        draft: {
            text: "Tin nháp",
            color: "volcano",
        },
    }

    const { text, color } = map[postStatus]

    return (
        <Tag color={color}>
            <b>{text.toUpperCase()}</b>
        </Tag>
    )
}

const columns = [
    {
        title: "Ảnh",
        dataIndex: "img",
        key: "img",
        render: (src) => (
            <img
                className="rounded"
                width="100"
                height="auto"
                src={`/static/images/place/ban-cong-cafe/ban-cong-cafe-${Math.floor(
                    Math.floor(Math.random() * 10) + 1
                )}.jpeg`}
            />
        ),
    },
    {
        title: "Tên quán",
        dataIndex: "name",
        key: "name",
        render: (name) => <a className="font-bold text-slate-800">{name}</a>,
    },
    {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Đánh giá",
        dataIndex: "review",
        key: "review",
        render: (_, record) => (
            <>{`${record.avgRate || "/"} ${record.reviewCount}`}</>
        ),
    },
    {
        title: "Giá tiền",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Giờ mở cửa",
        dataIndex: "openingTime",
        key: "openingTime",
    },
    {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
        render: (_, { openingType }) => (
            <>
                {getStatusLabel(
                    status[Math.floor(Math.random() * status.length)]
                )}
            </>
        ),
    },
    {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
            <Space size="middle" key={record}>
                <Tooltip title="Sửa">
                    <Button icon={<EditOutlined />} />
                </Tooltip>
                <Tooltip title="Xóa">
                    <Button type="primary" icon={<DeleteOutlined />} />
                </Tooltip>
            </Space>
        ),
    },
]

const App = () => <Table columns={columns} dataSource={listPlace} />

App.layout = "admin"

export default App
