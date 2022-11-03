import { Space, Table, Tag, Button, Tooltip } from "antd"
import React, { useState, useEffect } from "react"
import listPlace from "./listPlace.json"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { searchPlaces } from "lib/services/place"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

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

    // const { text, color } = map[postStatus]

    return (
        <Tag color={map[postStatus]?.color}>
            <b>{map[postStatus]?.text?.toUpperCase()}</b>
        </Tag>
    )
}

const App = () => {
    const router = useRouter()
    const [places, setPlaces] = useState([])
    const [body, setBody] = useState({
        page: 1,
        pagesize: 10,
    })
    const getPlaces = async () => {
        try {
            const res = await searchPlaces(body)
            setPlaces(res)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPlaces()
    }, [body])

    const handleChange = (pagination, filters, sorter) => {
        setBody((prev) => ({
            ...prev,
            page: pagination.current,
            pagesize: pagination.pageSize,
        }))
    }

    const columns = [
        {
            title: "Ảnh",
            dataIndex: "photos",
            key: "photos",
            render: (photos) => (
                <Image
                    className="rounded"
                    width={80}
                    height={80}
                    objectFit="cover"
                    src={photos[0]?.url || photos[0]}
                />
            ),
        },
        {
            title: "Tên quán",
            dataIndex: "name",
            key: "name",
            render: (name) => (
                <a className="font-bold text-slate-800">{name}</a>
            ),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            render: (address) => (
                <div className="text-slate-800">{address.specific}</div>
            ),
        },
        // {
        //     title: "Đánh giá",
        //     dataIndex: "review",
        //     key: "review",
        //     render: (_, record) => (
        //         <>{`${record.avgRate || "/"} ${record.reviewCount}`}</>
        //     ),
        // },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
            render: (price) => (
                <div className="text-slate-800">
                    <span>
                        {price?.min?.toLocaleString("vi-VN")}
                        {"đ"}
                        {" - "}
                        {price?.max?.toLocaleString("vi-VN")}
                        {"đ"}
                    </span>
                </div>
            ),
        },
        {
            title: "Đánh giá",
            dataIndex: "rate",
            key: "rate",
            render: (rate) => (
                <div className="text-slate-800">
                    <div>{rate?.avg}</div>
                </div>
            ),
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => <>{getStatusLabel(status)}</>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle" key={record}>
                    <Link href={`${router.pathname}/${record?._id}`}>
                        <Tooltip title="Sửa">
                            <Button icon={<EditOutlined />} />
                        </Tooltip>
                    </Link>
                    <Tooltip title="Xóa">
                        <Button type="primary" icon={<DeleteOutlined />} />
                    </Tooltip>
                </Space>
            ),
        },
    ]

    return (
        <Table
            scroll={("x", "y")}
            columns={columns}
            dataSource={places.data}
            onChange={handleChange}
            pagination={{
                defaultCurrent: +body?.page,
                total: +places?.meta?.totalItems,
            }}
        />
    )
}

App.layout = "admin"

export default App
