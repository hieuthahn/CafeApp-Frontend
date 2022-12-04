import axios from 'config/axios'

const signUp = async (body) => {
    try {
        const res = await axios.post('/api/v1/auth/signup', body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

export { signUp }
