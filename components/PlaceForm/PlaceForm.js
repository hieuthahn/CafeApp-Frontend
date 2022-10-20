import React, { useState, useRef } from "react"
import {
    Button,
    Form,
    Input,
    Select,
    Switch,
    TimePicker,
    InputNumber,
    Checkbox,
    Col,
    Row,
    Modal,
    Upload,
    BackTop,
} from "antd"
import { PlusOutlined } from "@ant-design/icons"
import moment from "moment"
import { toSlug, getBase64 } from "../../lib/utils"
import { tags, benefits, regions } from "../../lib/data/sample"
import axios from "axios"

const { Option } = Select
const format = "HH:mm"

const PlaceForm = () => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [previewTitle, setPreviewTitle] = useState("")
    const [fileListPhotos, setFileListPhotos] = useState([])
    const [fileListMenu, setFileListMenu] = useState([])
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        const data = JSON.stringify(values)
        const formData = new FormData()
        formData.append("data", data)
        fileListPhotos.forEach((photo, index) => {
            console.log(photo)
            formData.append("photo", photo.originFileObj)
        })
        fileListMenu.forEach((menu, index) => {
            formData.append("menu", menu.originFileObj)
        })

        try {
            setLoading(true)
            const res = await axios.post(
                "http://localhost:8000/api/v1/place",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            if (res.data) {
            }
        } catch (error) {
            console.log("Error:", error)
        }
        setLoading(false)
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    const onRegionChange = (value) => {
        // console.log(`selected ${value}`)
    }

    const onRegionSearch = (value) => {
        // console.log("search:", value)
    }

    const handleCancel = () => setPreviewVisible(false)

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        )
    }

    const handleChangePhotos = ({ file, fileList: newFileList }) => {
        setFileListPhotos(newFileList)
    }

    const handleChangeMenu = ({ file, fileList: newFileList }) => {
        setFileListMenu(newFileList)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Thêm ảnh
            </div>
        </div>
    )

    const handlePlaceFormChange = (name) => {
        // console.log(name)
    }

    return (
        <Form
            name="place-form"
            labelAlign="left"
            labelWrap
            labelCol={{
                span: 4,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            scrollToFirstError
        >
            <div className="mt-4">
                <h2 className="font-bold text-xl text-rose-500">
                    Thông tin cơ bản
                </h2>
                <hr />

                <div className="py-4 lg:px-4">
                    <Form.Item
                        label="Tên quán"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên quán!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên quán"
                            onChange={handlePlaceFormChange("name")}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Khu vực"
                        name="region"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn khu vực!",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn 1 quận"
                            optionFilterProp="children"
                            onChange={onRegionChange}
                            onSearch={onRegionSearch}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {regions.map((region, i) => {
                                return (
                                    <Option key={i} value={region.label}>
                                        {region.label}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            labelAlign="left"
                            labelWrap
                            labelCol={{
                                span: 4,
                            }}
                            label="Địa chỉ"
                            name={["address", "specific"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập địa chỉ cụ thể" />
                        </Form.Item>
                        <Form.Item
                            labelAlign="left"
                            labelWrap
                            labelCol={{
                                span: 4,
                            }}
                            label="Chỉ đường"
                            name={["address", "desc"]}
                        >
                            <Input placeholder="Nhập chỉ đường chi tiết nếu có thể" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Giới thiệu" name="intro">
                        <Input.TextArea placeholder="Nhập giới thiệu về quán" />
                    </Form.Item>
                    <Form.Item
                        label="Bạn là chủ quán"
                        name="isOwner"
                        valuePropName="checked"
                    >
                        <Switch
                            checked={false}
                            onChange={handlePlaceFormChange("isBoss")}
                        />
                    </Form.Item>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-xl text-rose-500">
                    Thông tin khác
                </h2>
                <hr />

                <div className="py-4 lg:px-4">
                    <Form.Item label="Thời gian mở cửa">
                        <Form.Item
                            name={["time", "open"]}
                            style={{
                                marginBottom: 0,
                                display: "inline-block",
                                width: "calc(50% - 25px)",
                            }}
                        >
                            <TimePicker
                                style={{ width: "100%" }}
                                // defaultValue={moment("07:00", format)}
                                format={format}
                            />
                        </Form.Item>
                        <span
                            style={{
                                border: "none",
                                display: "inline-block",
                                width: "30px",
                                lineHeight: "32px",
                                textAlign: "center",
                                margin: "0 10px",
                            }}
                        >
                            đến
                        </span>
                        <Form.Item
                            name={["time", "close"]}
                            style={{
                                marginBottom: 0,
                                display: "inline-block",
                                width: "calc(50% - 25px)",
                            }}
                        >
                            <TimePicker
                                style={{ width: "100%" }}
                                // defaultValue={moment("23:00", format)}
                                format={format}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Khoảng giá">
                        <Form.Item
                            name={["price", "min"]}
                            style={{
                                marginBottom: 0,
                                display: "inline-block",
                                width: "calc(50% - 25px)",
                            }}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                min={1}
                                // defaultValue={10000}
                                placeholder="Nhập giá thấp nhất"
                            />
                        </Form.Item>
                        <span
                            style={{
                                border: "none",
                                display: "inline-block",
                                width: "30px",
                                lineHeight: "32px",
                                textAlign: "center",
                                margin: "0 10px",
                            }}
                        >
                            đến
                        </span>
                        <Form.Item
                            name={["price", "max"]}
                            style={{
                                marginBottom: 0,
                                display: "inline-block",
                                width: "calc(50% - 25px)",
                            }}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                min={1}
                                // defaultValue={500000}
                                placeholder="Nhập giá cao nhất"
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Wifi (nếu có)">
                        <Form.Item
                            name={["wifi", "name"]}
                            style={{
                                marginBottom: 0,
                                display: "inline-block",
                                width: "calc(50% - 25px)",
                            }}
                        >
                            <Input placeholder="Nhập tên wifi" />
                        </Form.Item>
                        <span
                            style={{
                                border: "none",
                                display: "inline-block",
                                width: "30px",
                                lineHeight: "32px",
                                textAlign: "center",
                                margin: "0 10px",
                            }}
                        >
                            -
                        </span>
                        <Form.Item
                            name={["wifi", "password"]}
                            style={{
                                marginBottom: 0,
                                display: "inline-block",
                                width: "calc(50% - 25px)",
                            }}
                        >
                            <Input placeholder="Nhập mật khẩu wifi" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="Kiểu quán"
                        name="tags"
                        valuePropName="checked"
                    >
                        <Checkbox.Group>
                            <Row>
                                {tags.map((purpose, index) => {
                                    return (
                                        <Col key={index} xs={12} lg={8}>
                                            <Checkbox value={purpose.label}>
                                                {purpose.label}
                                            </Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item
                        label="Tiện ích"
                        name="benefits"
                        valuePropName="checked"
                    >
                        <Checkbox.Group>
                            <Row>
                                {benefits.map((benefit, index) => {
                                    return (
                                        <Col key={index} xs={12} lg={8}>
                                            <Checkbox value={benefit.label}>
                                                {benefit.label}
                                            </Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-xl text-rose-500">
                        Thông tin liên hệ
                    </h2>
                    <hr />

                    <div className="py-4 lg:px-4">
                        <Form.Item label="Điện thoại" name="phone">
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="Nhập địa chỉ email" />
                        </Form.Item>
                        <Form.Item label="Facebook" name="facebook">
                            <Input placeholder="Nhập link facebook" />
                        </Form.Item>
                        <Form.Item label="Instagram" name="instagram">
                            <Input placeholder="Nhập link instagram" />
                        </Form.Item>
                        <Form.Item label="Website" name="website">
                            <Input placeholder="Nhập link website" />
                        </Form.Item>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-xl text-rose-500">
                        Hình ảnh
                    </h2>
                    <hr />

                    <div className="py-4 lg:px-4">
                        <Upload
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileListPhotos}
                            onPreview={handlePreview}
                            onChange={handleChangePhotos}
                            multiple
                            maxCount={20}
                        >
                            {fileListPhotos.length > 20 ? null : uploadButton}
                        </Upload>

                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img
                                alt="example"
                                style={{
                                    width: "100%",
                                }}
                                src={previewImage}
                            />
                        </Modal>
                        <small>Chọn tối đa 20 ảnh</small>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-xl text-rose-500">Menu</h2>
                    <hr />
                    <div className="py-4 lg:px-4">
                        <Upload
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileListMenu}
                            onPreview={handlePreview}
                            onChange={handleChangeMenu}
                            multiple
                            maxCount={20}
                        >
                            {fileListMenu.length > 20 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img
                                alt="example"
                                style={{
                                    width: "100%",
                                }}
                                src={previewImage}
                            />
                        </Modal>
                        <small>Chọn tối đa 20 ảnh</small>
                    </div>
                </div>
            </div>
            <Form.Item>
                <Button
                    block
                    htmlType="submit"
                    type="primary"
                    shape="round"
                    size={"large"}
                    disabled={loading}
                >
                    Thêm địa điểm
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PlaceForm
