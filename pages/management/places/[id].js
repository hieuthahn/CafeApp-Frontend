import { Space, Table, Tag, Button, Tooltip } from "antd"
import React, { useState, useEffect } from "react"
import listPlace from "./listPlace.json"
import { EditOutlined, DeleteOutlined, LeftOutlined } from "@ant-design/icons"
import { searchPlaces, getPlaceBySlug } from "lib/services/place"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import PlaceForm from "components/PlaceForm"

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

const App = (props) => {
    const router = useRouter()
    console.log(props.place)
    return (
        <>
            <div className="flex justify-between">
                <Tooltip title="Quay lại">
                    <Button
                        onClick={() => router.back()}
                        shape="circle"
                        icon={<LeftOutlined />}
                    />
                </Tooltip>
            </div>
            <PlaceForm place={props?.place} />
        </>
    )
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    let res
    try {
        res = await getPlaceBySlug(id)
    } catch (error) {
        console.log(error)
    }

    return {
        props: { place: res?.data },
    }
}

export const getStaticPaths = async () => {
    const res = await searchPlaces({ page: 1, pagesize: -1 })
    const paths = res.data.map((post) => ({
        params: { id: post._id.toString() },
    }))

    return {
        paths,
        fallback: false,
    }
}

App.layout = "admin"

export default App
