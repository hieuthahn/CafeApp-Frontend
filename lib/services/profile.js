import axios from 'config/axios'
const restUrl = '/api/v1'

const updateProfile = async (body) => {
    try {
        const res = await axios.put(`${restUrl}/profile`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const getProfile = async () => {
    try {
        const res = await axios.get(`${restUrl}/profile`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const updateAvatar = async (formData) => {
    try {
        const res = await axios.put(`${restUrl}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

export { updateProfile, getProfile, updateAvatar }
