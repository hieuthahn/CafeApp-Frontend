import { Space, Table, Tag, Button, Tooltip, Modal, message } from "antd"
import React, { useState, useEffect } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons"
import { searchPlaces, deletePlaceById } from "lib/services/place"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import moment from "moment"

const { confirm } = Modal
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
        pageSize: 10,
        status: [],
    })
    const getPlaces = async () => {
        try {
            const res = await searchPlaces(body)
            setPlaces(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPlaces()
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

    const handleRemovePlace = (place) => {
        confirm({
            title: `Bạn muốn xóa địa điểm ${place?.name}?`,
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                try {
                    const res = await deletePlaceById(place?._id)
                    if (res.success) {
                        message.success(res.message)
                        getPlaces()
                        return
                    }
                    message.error(res.message)
                } catch (error) {
                    message.error(error.message || "Xóa không thành công")
                }
            },
            onCancel() {},
        })
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
            render: (name, record) => (
                <a
                    href={`/place/${record?.slug}`}
                    className="font-bold text-slate-800"
                >
                    {name}
                </a>
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
            sorter: {
                compare: (a, b) => a.price?.min - b.price?.min,
                multiple: 1,
            },
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
            sorter: {
                compare: (a, b) => a.rate.avg - b.rate.avg,
                multiple: 2,
            },
        },
        {
            title: "Ngày gửi",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, createdAt) => (
                <>{moment(createdAt).format("DD/MM/YYYY")}</>
            ),
            sorter: {
                compare: (a, b) => a.createdAt - b.createdAt,
                multiple: 3,
            },
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => <>{getStatusLabel(status)}</>,
            filters: [
                {
                    text: "Đã duyệt",
                    value: "published",
                },
                {
                    text: "Chờ duyệt",
                    value: "pending",
                },
                {
                    text: "Không duyệt",
                    value: "rejected",
                },
            ],
            onFilter: (value, place) => place.status.startsWith(value),
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
                        <Button
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemovePlace(record)}
                        />
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
                pageSizeOptions: [10, 20, 30],
            }}
        />
    )
}

App.layout = "admin"

export default App
