import { useState, useEffect } from "react"
import { Divider, List, Typography, Button, Input, Space, Tooltip } from "antd"
import React from "react"
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons"
import { purposes, benefits, regions, tags } from "../../../lib/data/sample"
import {
    getRegions,
    getTags,
    getPurposes,
    getBenefits,
    createRegion,
    createTag,
    createPurpose,
    createBenefit,
    updateRegion,
    updateTag,
    updatePurpose,
    updateBenefit,
    deleteRegion,
    deleteTag,
    deletePurpose,
    deleteBenefit,
} from "lib/services/category"

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

const App = () => {
    const [categories, setCategories] = useState({
        regions: [],
        benefits: [],
        tags: [],
        purposes: [],
    })
    const [inputAdd, setInputAdd] = useState({
        regions: "",
        benefits: "",
        tags: "",
        purposes: "",
    })
    const [inputUpdate, setInputUpdate] = useState({
        regions: "",
        benefits: "",
        tags: "",
        purposes: "",
    })
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

    const getData = async (type) => {
        let res = {}
        switch (type) {
            case "regions": {
                res.regions = await getRegions()
                setCategories((prev) => ({
                    ...prev,
                    regions: res.regions?.data,
                }))
                break
            }
            case "tags": {
                res.tags = await getTags()
                setCategories((prev) => ({
                    ...prev,
                    tags: res.tags?.data,
                }))
                break
            }
            case "purposes": {
                res.purposes = await getPurposes()
                setCategories((prev) => ({
                    ...prev,
                    purposes: res.purposes?.data,
                }))
                break
            }
            case "benefits": {
                res.benefits = await getBenefits()
                setCategories((prev) => ({
                    ...prev,
                    benefits: res.benefits?.data,
                }))
            }
            default: {
                res.regions = await getRegions()
                res.purposes = await getPurposes()
                res.tags = await getTags()
                res.benefits = await getBenefits()
                setCategories({
                    regions: res.regions?.data,
                    purposes: res.purposes?.data,
                    tags: res.tags?.data,
                    benefits: res.benefits?.data,
                })
            }
        }
    }

    useEffect(() => {
        try {
            getData()
        } catch (error) {
            console.log("error", error)
        }
    }, [])

    const handleAdd = async (category, type) => {
        if (type === "cancel") {
            setAdd((prev) => ({
                ...prev,
                [category]: false,
            }))
        } else {
            setAdd((prev) => ({
                ...prev,
                [category]: true,
            }))
        }
        const res = null
        if (type === "create") {
            switch (category) {
                case "regions": {
                    res = await createRegion({ name: inputAdd.regions })
                    break
                }
                case "tags": {
                    res = await createTag({ name: inputAdd.tags })
                    break
                }
                case "purposes": {
                    res = await createPurpose({ name: inputAdd.purposes })
                    break
                }
                case "benefits": {
                    res = await createBenefit({ name: inputAdd.benefits })
                }
            }
            if (res) {
                getData(category)
                setAdd((prev) => ({
                    ...prev,
                    [category]: false,
                }))
                setInputAdd((prev) => ({
                    ...prev,
                    [category]: "",
                }))
            }
        }
    }

    const handleEditCategory = async (category, type, item) => {
        if (type === "cancel") {
            setEdit((prev) => ({
                ...prev,
                [category]: false,
            }))
        } else {
            setEdit((prev) => ({
                ...prev,
                [category]: item,
            }))
        }
        const res = null
        if (type === "save") {
            switch (category) {
                case "regions": {
                    res = await updateRegion(
                        { name: inputUpdate.regions },
                        item._id
                    )
                    break
                }
                case "tags": {
                    res = await updateTag({ name: inputUpdate.tags }, item._id)
                    break
                }
                case "purposes": {
                    res = await updatePurpose(
                        { name: inputUpdate.purposes },
                        item._id
                    )
                    break
                }
                case "benefits": {
                    res = await updateBenefit(
                        { name: inputUpdate.benefits },
                        item._id
                    )
                }
            }
        }
        if (type === "delete") {
            switch (category) {
                case "regions": {
                    res = await deleteRegion(item._id)
                    break
                }
                case "tags": {
                    res = await deleteTag(item._id)
                    break
                }
                case "purposes": {
                    res = await deletePurpose(item._id)
                    break
                }
                case "benefits": {
                    res = await deleteBenefit(item._id)
                }
            }
        }

        if (res) {
            getData(category)
            setEdit((prev) => ({
                ...prev,
                [category]: false,
            }))
            setInputUpdate((prev) => ({
                ...prev,
                [category]: "",
            }))
        }
    }

    const handleInputAddChange = (e, name) => {
        setInputAdd((prev) => ({
            ...prev,
            [name]: e.target.value,
        }))
    }

    const handleInputUpdateChange = (e, name) => {
        setInputUpdate((prev) => ({
            ...prev,
            [name]: e.target.value,
        }))
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
                                    onClick={() =>
                                        handleAdd(category.value, "active")
                                    }
                                    className=""
                                >
                                    {`+ Thêm ${category.label}`}
                                </Button>
                            </div>

                            {add[category.value] && (
                                <div className="my-3 flex gap-2">
                                    <Input
                                        value={inputAdd[category.value]}
                                        onChange={(e) =>
                                            handleInputAddChange(
                                                e,
                                                category.value
                                            )
                                        }
                                        placeholder="Nhập tên khu vực"
                                    />
                                    <Button
                                        onClick={() =>
                                            handleAdd(category.value, "create")
                                        }
                                    >
                                        Thêm
                                    </Button>
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
                            dataSource={categories[category.value]}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Space size="small">
                                            {edit[category.value] !== item && (
                                                <Button
                                                    onClick={() =>
                                                        handleEditCategory(
                                                            category.value,
                                                            "delete",
                                                            item
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </Button>
                                            )}
                                            {edit[category.value] &&
                                            edit[category.value] === item ? (
                                                <>
                                                    <Button
                                                        onClick={() =>
                                                            handleEditCategory(
                                                                category.value,
                                                                "save",
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
                                            value={
                                                inputUpdate[category.value]
                                                    ? inputUpdate[
                                                          category.value
                                                      ]
                                                    : item.name
                                            }
                                            onChange={(e) =>
                                                handleInputUpdateChange(
                                                    e,
                                                    category.value
                                                )
                                            }
                                            className="max-w-[500px]"
                                            placeholder={item.name}
                                        />
                                    ) : (
                                        item.name
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
