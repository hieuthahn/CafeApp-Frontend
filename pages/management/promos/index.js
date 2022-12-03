import { useState, useEffect, useCallback } from 'react'
import {
    getPromos,
    createPromos,
    deletePromosById,
    updatePromote,
} from 'lib/services/promos'
import { searchPlaces } from 'lib/services/place'
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
    Spin,
    Table,
    Tooltip,
    Space,
    Popconfirm,
    message,
} from 'antd'
const { RangePicker } = DatePicker
const { TextArea } = Input
import Link from 'next/link'
import Image from 'next/image'
import { debounce } from 'lib/utils/utils'
import moment from 'moment'
const dateFormat = 'DD/MM/YYYY'
const weekFormat = 'DD/MM'
const monthFormat = 'MM/YYYY'

const App = () => {
    const [promos, setPromos] = useState([])
    const [params, setParams] = useState({
        page: 1,
        pageSize: 10,
    })
    const [textSearch, setTextSearch] = useState('')
    const [form] = Form.useForm()
    const [promoteEdit, setPromoteEdit] = useState()
    const [filesRemove, setFilesRemove] = useState([])
    const [searchResult, setSearchResult] = useState()
    const [place, setPlace] = useState('')
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

    const getListPromos = async () => {
        try {
            const res = await getPromos(params.page, params.pageSize)
            setPromos(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListPromos()
        handleSearchOptions('')
    }, [])

    const handleSearchOptions = async (nextValue) => {
        const body = {
            name: nextValue,
            status: 'published',
        }
        try {
            const res = await searchPlaces(body)
            if (res.data.length > 0) {
                const data = res.data.map((item) => ({
                    label: item.name,
                    value: item._id,
                }))
                setSearchResult(data)
            } else {
                setSearchResult()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const debounceSearch = useCallback(
        debounce((nextValue) => handleSearchOptions(nextValue), 300),
        [],
    )

    const onSearchPlace = (value) => {
        debounceSearch(value)
        setTextSearch(value)
    }

    const onFinish = async (values) => {
        const formData = new FormData()
        if (promoteEdit?._id) {
            delete values.place
            formData.append('data', JSON.stringify(values))
        } else {
            values.place = values.place.value
            formData.append('data', JSON.stringify(values))
        }
        fileListPhotos.map((photo, index) =>
            formData.append('photo', photo?.originFileObj),
        )
        try {
            let res
            if (promoteEdit?._id) {
                res = await updatePromote(
                    promoteEdit?._id,
                    formData,
                    filesRemove,
                )
            } else {
                res = await createPromos(formData)
            }
            if (res.success) {
                getListPromos()
                setPromoteEdit()
                form.resetFields()
                message.success('Cập nhật thành công')
                return
            }
            message.error('Cập nhật thất bại')
        } catch (error) {
            message.error(error?.message || error)
        }
    }

    const handleChangeImage = ({ file, fileList: newFileList }) => {
        setFileListPhotos(newFileList)
    }

    const handleRemoveImage = (file) => {
        setFilesRemove((prev) => [...prev, file?.filename])
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok')
        }, 0)
    }

    const handleChange = (pagination, filters, sorter) => {
        if (pagination?.current !== params.page)
            setBody((prev) => ({
                ...prev,
                page: pagination.current,
                pageSize: pagination.pageSize,
                status: filters.status,
            }))
    }

    const handleDelete = async (promote) => {
        if (promos.includes(promote)) {
            const res = await deletePromosById(promote._id)
            if (res?.success) {
                message.success(res.message)
                getListPromos()
                return
            }
            message.error(res?.message)
        } else {
            message.error('Dữ liệu đang xử lý')
        }
    }

    const handleEdit = (promote) => {
        setPlace({
            label: promote.place.name,
            value: promote.place._id,
        })
        setFileListPhotos(promote?.images)
        setPromoteEdit({
            ...promote,
            label: promote.place.name,
            value: promote.place._id,
        })
        form.setFieldsValue(promote)
    }

    const handleResetForm = () => {
        setPlace()
        setPromoteEdit()
        setFileListPhotos([])
        form.resetFields()
    }

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <Image
                    alt="cafe-app"
                    className="rounded"
                    width={80}
                    height={80}
                    objectFit="cover"
                    src={images[0]?.url || images[0]}
                />
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (title, record) => (
                <div className="text-slate-800">{title}</div>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (description) => (
                <div className="text-slate-800 truncate">{description}</div>
            ),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'place',
            key: 'place',
            render: (place) => (
                <div className="text-slate-800 truncate">{place?.name}</div>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
            render: (time) => (
                <div className="text-slate-800 truncate">
                    {time?.[0]}
                    {' - '}
                    {time?.[1]}
                </div>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" key={record}>
                    {/* <Link
                        href={`${router.pathname}/${record?._id}`}
                        passHref
                        legacyBehavior
                    > */}
                    <Tooltip title="Sửa">
                        <Button
                            onClick={() => handleEdit(record)}
                            icon={<EditOutlined />}
                        />
                    </Tooltip>
                    {/* </Link> */}
                    <Popconfirm
                        title="Bạn có muốn xóa khuyến mãi này?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button type="primary" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Table
                scroll={('x', 'y')}
                columns={columns}
                dataSource={promos}
                onChange={handleChange}
                pagination={{
                    defaultCurrent: +params?.page,
                    total: +params?.meta?.totalItems,
                    pageSizeOptions: [10, 20, 30],
                }}
            />
            <>
                <Form
                    form={form}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    // onValuesChange={onFormLayoutChange}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Chọn địa điểm"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn địa điểm!',
                            },
                        ]}
                        name="place"
                    >
                        <Select
                            defaultValue={place}
                            showSearch
                            labelInValue
                            optionFilterProp="children"
                            filterOption={false}
                            onSearch={onSearchPlace}
                            notFoundContent={
                                searchResult ? (
                                    <Spin size="small" />
                                ) : (
                                    <span className="text-black">
                                        Không tìm thấy địa điểm này
                                    </span>
                                )
                            }
                            options={searchResult}
                            value={place}
                            searchValue={
                                promoteEdit?.place?.name
                                    ? promoteEdit?.place?.name
                                    : textSearch
                            }
                            onChange={(newValue) => {
                                setPlace(newValue)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tiêu đề!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <TextArea rows={4} />
                    </Form.Item>
                    {/* <Form.Item label="Thời gian" name="time">
                        <RangePicker format={dateFormat} />
                    </Form.Item> */}
                    <Form.Item
                        label="Hiển thị"
                        valuePropName="checked"
                        name="showing"
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" valuePropName="fileList">
                        <Upload
                            customRequest={dummyRequest}
                            listType="picture-card"
                            fileList={fileListPhotos}
                            onChange={handleChangeImage}
                            onRemove={handleRemoveImage}
                            multiple
                            maxCount={1}
                        >
                            {fileListPhotos.length > 2 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Chọn ảnh
                                    </div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <div className="text-right">
                        {promoteEdit?._id && (
                            <Button
                                className={'mr-3'}
                                onClick={handleResetForm}
                            >
                                Reset
                            </Button>
                        )}
                        <Button htmlType="submit">
                            {promoteEdit?._id
                                ? 'Sửa khuyến mãi'
                                : 'Thêm khuyến mãi'}
                        </Button>
                    </div>
                </Form>
            </>
        </div>
    )
}

App.layout = 'admin'
export default App
