import React, { useState, useEffect, useRef } from 'react'
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
    message,
    Tag,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { toSlug, getBase64 } from '../../lib/utils'
import {
    getBenefits,
    getTags,
    getRegions,
    getPurposes,
} from 'lib/services/category'
import { submitPlace, updatePlace } from 'lib/services/place'
import { useRouter } from 'next/router'
import useBearStore from 'lib/data/zustand'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const { Option } = Select
const format = 'HH:mm'
const listStatus = {
    rejected: {
        text: 'Không duyệt',
        color: 'error',
    },
    published: {
        text: 'Đã duyệt',
        color: 'success',
    },
    pending: {
        text: 'Chờ duyệt',
        color: 'warning',
    },
    // draft: {
    //     text: "Tin nháp",
    //     color: "volcano",
    // },
}

const PlaceForm = (props) => {
    const { place } = props
    const { data: session } = useSession()
    const router = useRouter()
    const toggleModalLogin = useBearStore((state) => state.toggleModalLogin)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileListPhotos, setFileListPhotos] = useState(() => {
        if (place?.photos?.length) {
            if (!place?.photos[0]?.url) {
                return place?.photos.map((photo, index) => ({
                    uid: index + 1,
                    name: `Ảnh ${place?.name} ${index + 1}`,
                    url: photo,
                }))
            } else {
                return place?.photos
            }
        } else {
            return []
        }
    })
    const [fileListMenu, setFileListMenu] = useState(() => {
        if (place?.menu?.length) {
            if (!place?.menu[0]?.url) {
                return place?.menu.map((item, index) => ({
                    uid: index + 1,
                    name: `Menu ${place?.name} ${index + 1}`,
                    url: item,
                }))
            } else {
                return place?.menu
            }
        } else {
            return []
        }
    })
    const [categories, setCategories] = useState({
        tags: [],
        benefits: [],
        regions: [],
        purposes: [],
    })
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        const data = JSON.stringify(values)
        const formData = new FormData()
        formData.append('data', data)
        fileListPhotos.forEach((photo, index) => {
            formData.append('photo', photo.originFileObj)
        })
        fileListMenu.forEach((menu, index) => {
            formData.append('menu', menu.originFileObj)
        })
        const key = 'onFinish'
        try {
            setLoading(true)
            message.loading({
                content: 'Loading...',
                key,
            })

            if (place) {
                const res = await updatePlace(place?._id, formData)
                if (res.success) {
                    message.success({
                        content: res?.message || 'Cập nhật thành công',
                        key,
                        duration: 4,
                    })
                } else {
                    message.error({
                        content: res?.message,
                        key,
                        duration: 4,
                    })
                }
            } else {
                const res = await submitPlace(formData)
                if (res.success) {
                    message.success({
                        content: 'Thàng công!',
                        key,
                        duration: 4,
                    })
                    router.push('/add-place/success')
                } else {
                    message.error({
                        content: res?.message,
                        key,
                        duration: 4,
                    })
                }
            }
        } catch (error) {
            console.log(error)
            message.error({
                content: error || error.message,
                key,
                duration: 4,
                style: {
                    marginTop: '20vh',
                },
            })
        }

        setLoading(false)
    }

    const onFinishFailed = (errorInfo) => {
        message.error('Không thành công!')
    }

    const getCategories = async () => {
        try {
            const _benefits = getBenefits()
            const _tags = getTags()
            const _regions = getRegions()
            const _purposes = getPurposes()
            const benefits = await _benefits
            const tags = await _tags
            const regions = await _regions
            const purposes = await _purposes
            setCategories({
                tags: tags.data,
                benefits: benefits.data,
                regions: regions.data,
                purposes: purposes.data,
            })
        } catch (error) {
            message.error(error || error.message)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

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

        setPreviewImage(file.url || file.preview || file)
        setPreviewVisible(true)
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        )
    }

    const handleChangePhotos = ({ file, fileList: newFileList, event }) => {
        // console.log(file, event)
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

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok')
        }, 0)
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
                    {place && (
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn trạng thái!',
                                },
                            ]}
                            initialValue={place?.status || 'pending'}
                        >
                            <Select
                                placeholder="Chọn trạng thái"
                                optionFilterProp="children"
                            >
                                {Object.keys(listStatus).map((status, i) => {
                                    return (
                                        <Option key={i} value={status}>
                                            {/* {listStatus[status]?.text} */}
                                            <Tag
                                                color={
                                                    listStatus[status]?.color
                                                }
                                            >
                                                <b>
                                                    {listStatus[status]?.text}
                                                </b>
                                            </Tag>
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Tên quán"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên quán!',
                            },
                        ]}
                        initialValue={place?.name}
                    >
                        <Input
                            placeholder="Nhập tên quán"
                            onChange={handlePlaceFormChange('name')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Khu vực"
                        name="region"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn khu vực!',
                            },
                        ]}
                        initialValue={place?.region}
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
                            // value={"quan-ba-dinh"}
                        >
                            {categories.regions.map((region, i) => {
                                return (
                                    <Option key={i} value={region.name}>
                                        {region.name}
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
                            name={['address', 'specific']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ!',
                                },
                            ]}
                            initialValue={place?.address?.specific}
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
                            name={['address', 'desc']}
                        >
                            <Input placeholder="Nhập chỉ đường chi tiết nếu có thể" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="Giới thiệu"
                        name="intro"
                        initialValue={place?.intro}
                    >
                        <Input.TextArea
                            rows={5}
                            placeholder="Nhập giới thiệu về quán"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Bạn là chủ quán"
                        name="isOwner"
                        valuePropName="checked"
                    >
                        <Switch
                            checked={false}
                            onChange={handlePlaceFormChange('isBoss')}
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
                            name={['time', 'open']}
                            style={{
                                marginBottom: 0,
                                display: 'inline-block',
                                width: 'calc(50% - 25px)',
                            }}
                            initialValue={
                                place ? moment(place?.time?.open, format) : ''
                            }
                        >
                            <TimePicker
                                style={{ width: '100%' }}
                                // defaultValue={moment(
                                //     place?.openingType.slice(0, 5),
                                //     format
                                // )}
                                format={format}
                            />
                        </Form.Item>
                        <span
                            style={{
                                border: 'none',
                                display: 'inline-block',
                                width: '30px',
                                lineHeight: '32px',
                                textAlign: 'center',
                                margin: '0 10px',
                            }}
                        >
                            đến
                        </span>
                        <Form.Item
                            name={['time', 'close']}
                            style={{
                                marginBottom: 0,
                                display: 'inline-block',
                                width: 'calc(50% - 25px)',
                            }}
                            initialValue={
                                place ? moment(place?.time?.close, format) : ''
                            }
                        >
                            <TimePicker
                                style={{ width: '100%' }}
                                // defaultValue={moment("23:00", format)}
                                format={format}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Khoảng giá">
                        <Form.Item
                            name={['price', 'min']}
                            style={{
                                marginBottom: 0,
                                display: 'inline-block',
                                width: 'calc(50% - 25px)',
                            }}
                            initialValue={place?.price?.min}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                                // defaultValue={10000}
                                placeholder="Nhập giá thấp nhất"
                            />
                        </Form.Item>
                        <span
                            style={{
                                border: 'none',
                                display: 'inline-block',
                                width: '30px',
                                lineHeight: '32px',
                                textAlign: 'center',
                                margin: '0 10px',
                            }}
                        >
                            đến
                        </span>
                        <Form.Item
                            name={['price', 'max']}
                            style={{
                                marginBottom: 0,
                                display: 'inline-block',
                                width: 'calc(50% - 25px)',
                            }}
                            initialValue={place?.price?.max}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                                // defaultValue={500000}
                                placeholder="Nhập giá cao nhất"
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Wifi (nếu có)">
                        <Form.Item
                            name={['wifi', 'name']}
                            style={{
                                marginBottom: 0,
                                display: 'inline-block',
                                width: 'calc(50% - 25px)',
                            }}
                            initialValue={place?.wifi?.name}
                        >
                            <Input placeholder="Nhập tên wifi" />
                        </Form.Item>
                        <span
                            style={{
                                border: 'none',
                                display: 'inline-block',
                                width: '30px',
                                lineHeight: '32px',
                                textAlign: 'center',
                                margin: '0 10px',
                            }}
                        >
                            -
                        </span>
                        <Form.Item
                            name={['wifi', 'password']}
                            style={{
                                marginBottom: 0,
                                display: 'inline-block',
                                width: 'calc(50% - 25px)',
                            }}
                            initialValue={place?.wifi?.password}
                        >
                            <Input placeholder="Nhập mật khẩu wifi" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="Kiểu quán"
                        name="tags"
                        valuePropName="checked"
                        initialValue={place?.tags}
                    >
                        <Checkbox.Group defaultValue={place?.tags}>
                            <Row>
                                {categories.tags.map((tags, index) => {
                                    return (
                                        <Col key={index} xs={12} lg={8}>
                                            <Checkbox value={tags?.name}>
                                                {tags?.name}
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
                        initialValue={place?.benefits}
                    >
                        <Checkbox.Group defaultValue={place?.benefits}>
                            <Row>
                                {categories.benefits.map((benefit, index) => {
                                    return (
                                        <Col key={index} xs={12} lg={8}>
                                            <Checkbox value={benefit?.name}>
                                                {benefit?.name}
                                            </Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item
                        label="Mục đích"
                        name="purposes"
                        valuePropName="checked"
                        initialValue={place?.purposes}
                    >
                        <Checkbox.Group defaultValue={place?.purposes}>
                            <Row>
                                {categories.purposes.map((purpose, index) => {
                                    return (
                                        <Col key={index} xs={12} lg={24}>
                                            <Checkbox value={purpose?.name}>
                                                {purpose?.name}
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
                        <Form.Item
                            label="Điện thoại"
                            name="phone"
                            initialValue={place?.phone}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={place?.email}
                        >
                            <Input placeholder="Nhập địa chỉ email" />
                        </Form.Item>
                        <Form.Item
                            label="Facebook"
                            name="facebook"
                            initialValue={place?.facebook}
                        >
                            <Input placeholder="Nhập link facebook" />
                        </Form.Item>
                        <Form.Item
                            label="Instagram"
                            name="instagram"
                            initialValue={place?.instagram}
                        >
                            <Input placeholder="Nhập link instagram" />
                        </Form.Item>
                        <Form.Item
                            label="Website"
                            name="website"
                            initialValue={place?.website}
                        >
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
                            customRequest={dummyRequest}
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
                            open={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img
                                alt="example"
                                style={{
                                    width: '100%',
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
                            customRequest={dummyRequest}
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
                            open={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img
                                alt="example"
                                style={{
                                    width: '100%',
                                }}
                                src={previewImage}
                            />
                        </Modal>
                        <small>Chọn tối đa 20 ảnh</small>
                    </div>
                </div>
            </div>
            <Form.Item>
                {session ? (
                    <Button
                        block
                        htmlType="submit"
                        type="primary"
                        shape="round"
                        size={'large'}
                        disabled={loading}
                    >
                        {place ? 'Cập nhật' : 'Thêm địa điểm'}
                    </Button>
                ) : (
                    <Button
                        block
                        type="primary"
                        shape="round"
                        size={'large'}
                        onClick={toggleModalLogin}
                    >
                        {place ? 'Cập nhật' : 'Thêm địa điểm'}
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default PlaceForm
