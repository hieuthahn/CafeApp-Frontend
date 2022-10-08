import { useState, useEffect } from "react"
import { Divider, List, Typography, Button, Input, Space, Tooltip } from "antd"
import React from "react"
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons"
import { purposes, benefits, regions, tags } from "../../../lib/data/sample"

const listCategories = [
    {
        label: "Khu vực",
        value: "regions",
    },
    {
        label: "Mục đích",
        value: "purposes",
    },
    {
        label: "Kiểu quán",
        value: "tags",
    },
    {
        label: "Tiện ích",
        value: "benefits",
    },
]

const data = {
    purposes,
    benefits,
    regions,
    tags,
}

const App = () => {
    const [add, setAdd] = useState({
        regions: false,
        benefits: false,
        tags: false,
        purposes: false,
    })
    const [edit, setEdit] = useState({
        regions: false,
        benefits: false,
        tags: false,
        purposes: false,
    })

    const handleAdd = (type, cancel) => {
        if (cancel) {
            setAdd((prev) => ({
                ...prev,
                [type]: false,
            }))
        } else {
            setAdd((prev) => ({
                ...prev,
                [type]: true,
            }))
        }
    }

    const handleEditCategory = (type, cancel, item) => {
        if (cancel) {
            setEdit((prev) => ({
                ...prev,
                [type]: false,
            }))
        } else {
            setEdit((prev) => ({
                ...prev,
                [type]: item,
            }))
        }
    }

    return (
        <>
            {listCategories.map((category, index) => {
                return (
                    <div key={index}>
                        <div className="my-4">
                            <div className="flex justify-between">
                                <div className="font-bold text-lg">
                                    {category.label}
                                </div>
                                <Button
                                    onClick={() => handleAdd(category.value)}
                                    className=""
                                >
                                    {`+ Thêm ${category.label}`}
                                </Button>
                            </div>

                            {add[category.value] && (
                                <div className="my-3 flex gap-2">
                                    <Input placeholder="Nhập tên khu vực" />
                                    <Button>Thêm</Button>
                                    <Button
                                        onClick={() =>
                                            handleAdd(category.value, "cancel")
                                        }
                                        className
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            )}
                        </div>

                        <List
                            className="max-h-[300px] overflow-hidden overflow-y-auto"
                            bordered
                            dataSource={data[category.value]}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Space size="small">
                                            <Button>Xóa</Button>
                                            {edit[category.value] &&
                                            edit[category.value] === item ? (
                                                <>
                                                    <Button
                                                        onClick={() =>
                                                            handleEditCategory(
                                                                category.value,
                                                                "cancel",
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Lưu lại
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            handleEditCategory(
                                                                category.value,
                                                                "cancel",
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Hủy
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        handleEditCategory(
                                                            category.value,
                                                            null,
                                                            item
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </Button>
                                            )}
                                        </Space>,
                                    ]}
                                >
                                    {edit[category.value] &&
                                    edit[category.value] === item ? (
                                        <Input
                                            className="max-w-[500px]"
                                            placeholder={item.label}
                                        />
                                    ) : (
                                        item.label
                                    )}
                                </List.Item>
                            )}
                        />
                    </div>
                )
            })}
        </>
    )
}

App.layout = "admin"

export default App
