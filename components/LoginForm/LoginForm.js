import { Fragment, useRef } from "react"
import { Button, Modal, TextInput, Label, No, Tabs } from "flowbite-react"

const LoginForm = () => {
    // const tabEl = useRef()
    // const handleClick = () => {
    //     console.log(tabEl)
    // }

    return (
        <Fragment>
            <Modal show={true} size="md" popup={true}>
                <Modal.Header className="p-2"></Modal.Header>

                <Modal.Body>
                    <Tabs.Group style="underline">
                        <Tabs.Item active={true} title="Đăng nhập">
                            <div className="space-y-6 pb-4 sm:pb-6 xl:pb-8">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email"
                                            value="Địa chỉ email"
                                        />
                                    </div>
                                    <TextInput
                                        id="email"
                                        placeholder="name@gmail.com"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password"
                                            value="Mật khẩu"
                                        />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        required={true}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <Label htmlFor="remember">
                                            Ghi nhớ mật khẩu
                                        </Label>
                                    </div>
                                    <a
                                        href="/modal"
                                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div className="w-full">
                                    <Button>Đăng nhập</Button>
                                </div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Bạn chưa có tài khoản?{" "}
                                    <a
                                        href="/modal"
                                        className="text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Đăng ký miễn phí tại đây
                                    </a>
                                </div>
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Đăng ký">
                            <div className="space-y-6 pb-4 sm:pb-6 xl:pb-8">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email"
                                            value="Địa chỉ email"
                                        />
                                    </div>
                                    <TextInput
                                        id="email"
                                        placeholder="name@gmail.com"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password"
                                            value="Mật khẩu"
                                        />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        required={true}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <Label htmlFor="remember">
                                            Ghi nhớ mật khẩu
                                        </Label>
                                    </div>
                                    <a
                                        href="/modal"
                                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div className="w-full">
                                    <Button>Đăng nhập</Button>
                                </div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Bạn đã có tài khoản?{" "}
                                    <a
                                        href="/modal"
                                        className="text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Đăng nhập
                                    </a>
                                </div>
                            </div>
                        </Tabs.Item>
                    </Tabs.Group>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default LoginForm
