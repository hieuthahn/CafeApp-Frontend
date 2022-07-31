import React, { useState } from "react"
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

const { Option } = Select
const format = "HH:mm"
const purposes = [
    {
        name: "Cafe Acoustic",
        slug: "cafe-acoustic",
        icon: null,
    },
    {
        name: "Cafe Bình Dân",
        slug: "cafe-binh-dan",
        icon: null,
    },
    {
        name: "Cafe Cổ Điển",
        slug: "cafe-co-dien",
        icon: null,
    },
    {
        name: "Cafe Lounge",
        slug: "cafe-lounge",
        icon: null,
    },
    {
        name: "Cafe Ngoài Trời",
        slug: "cafe-ngoai-troi",
        icon: null,
    },
    {
        name: "Cafe Sách",
        slug: "cafe-sach",
        icon: null,
    },
    {
        name: "Cafe Sang Trọng",
        slug: "cafe-sang-trong",
        icon: null,
    },
    {
        name: "Cafe Thú Cưng",
        slug: "cafe-thu-cung",
        icon: null,
    },
    {
        name: "Cafe Tone Màu",
        slug: "cafe-tone-mau",
        icon: null,
    },
    {
        name: "Cafe Trên Cao",
        slug: "cafe-tren-cao",
        icon: null,
    },
    {
        name: "Cafe View Đẹp",
        slug: "cafe-view-dep",
        icon: null,
    },
    {
        name: "Cafe Vườn",
        slug: "cafe-vuon",
        icon: null,
    },
    {
        name: "PUB",
        slug: "pub",
        icon: null,
    },
]

const benefits = [
    {
        name: "Bàn ngoài trời",
        slug: "cafe-acoustic",
        icon: null,
    },
    {
        name: "Bánh ngọt",
        slug: "cafe-binh-dan",
        icon: null,
    },
    {
        name: "Chiếu bóng đá",
        slug: "cafe-co-dien",
        icon: null,
    },
    {
        name: "Chỗ chơi cho trẻ em",
        slug: "cafe-lounge",
        icon: null,
    },
    {
        name: "Chỗ đậu ôtô",
        slug: "cafe-ngoai-troi",
        icon: null,
    },
    {
        name: "Giao hàng",
        slug: "cafe-sach",
        icon: null,
    },
    {
        name: "Giữ xe máy",
        slug: "cafe-sang-trong",
        icon: null,
    },
    {
        name: "Khu vực hút thuốc",
        slug: "cafe-thu-cung",
        icon: null,
    },
    {
        name: "Mang đồ ăn ngoài",
        slug: "cafe-tone-mau",
        icon: null,
    },
    {
        name: "Mang thú cưng",
        slug: "cafe-tren-cao",
        icon: null,
    },
    {
        name: "Máy lạnh & điều hòa",
        slug: "cafe-view-dep",
        icon: null,
    },
    {
        name: "Nhạc sống",
        slug: "cafe-vuon",
        icon: null,
    },
    {
        name: "Thanh toán bằng thẻ",
        slug: "pub",
        icon: null,
    },
    {
        name: "Wi-Fi miễn phí",
        slug: "pub",
        icon: null,
    },
]

const PlaceForm = () => {
    const onFinish = (values) => {
        console.log("Success:", values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    const onChange = (value) => {
        console.log(`selected ${value}`)
    }

    const onSearch = (value) => {
        console.log("search:", value)
    }

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [previewTitle, setPreviewTitle] = useState("")
    const [fileList, setFileList] = useState([])

    console.log(fileList)

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

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

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

    return (
        <Form
            name="basic"
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

                <div className="py-4 md:px-4">
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
                        <Input placeholder="Nhập tên quán" />
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
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập địa chỉ!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập địa chỉ cụ thể" />
                    </Form.Item>
                    <Form.Item label="Chỉ đường" name="direction">
                        <Input placeholder="Nhập chỉ đường chi tiết nếu có thể" />
                    </Form.Item>
                    <Form.Item label="Giới thiệu" name="intro">
                        <Input.TextArea placeholder="Nhập giới thiệu về quán" />
                    </Form.Item>
                    <Form.Item
                        label="Bạn là chủ quán"
                        name="isBoss"
                        valuePropName="checked"
                    >
                        <Switch checked={false} onChange={onChange} />
                    </Form.Item>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-xl text-rose-500">
                    Thông tin khác
                </h2>
                <hr />

                <div className="py-4 md:px-4">
                    <Form.Item label="Thời gian mở cửa">
                        <Form.Item
                            name={["time", "opening"]}
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
                        name="purpose"
                        valuePropName="checked"
                    >
                        <Row>
                            {purposes.map((purpose, index) => {
                                return (
                                    <Col key={index} span={8}>
                                        <Checkbox value={purpose.name}>
                                            {purpose.name}
                                        </Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Form.Item>
                    <Form.Item
                        label="Tiện ích"
                        name="benefit"
                        valuePropName="checked"
                    >
                        <Row>
                            {benefits.map((benefit, index) => {
                                return (
                                    <Col key={index} span={8}>
                                        <Checkbox value={benefit.name}>
                                            {benefit.name}
                                        </Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Form.Item>
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-xl text-rose-500">
                        Thông tin liên hệ
                    </h2>
                    <hr />

                    <div className="py-4 md:px-4">
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

                    <div className="py-4 md:px-4">
                        <Upload
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            multiple
                            maxCount={20}
                        >
                            {fileList.length > 20 ? null : uploadButton}
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

                    <div className="py-4 md:px-4">
                        <Upload
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            multiple
                            maxCount={20}
                        >
                            {fileList.length > 20 ? null : uploadButton}
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
                >
                    Thêm địa điểm
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PlaceForm
