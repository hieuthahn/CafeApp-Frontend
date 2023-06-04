import axios from 'axios'
import Cookies from 'js-cookie'
import { getSession } from 'next-auth/react'

let auth = {}

const instance = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_BASE_ENDPOINT_URL || 'http://localhost:8000',
    headers: {
        Authorization: auth ? 'Token ' + auth.accessToken : '',
    },
})

instance.defaults.headers.common['Authorization'] = auth
    ? 'Token ' + auth.accessToken
    : ''

instance.interceptors.request.use(async (config) => {
    if (!auth?.accessToken) {
        auth = await getSession()
    }
    config.headers['Authorization'] = auth ? 'Token ' + auth.accessToken : ''
    return config
})

export default instance
