import axios from 'config/axios'
const restUrl = '/api/v1'

const getAllAccounts = async (page, pageSize) => {
    try {
        const res = await axios.get(`${restUrl}/profile/all`, {
            params: {
                page,
                pageSize,
            },
        })
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const updateProfileByAdmin = async (id, body) => {
    try {
        const res = await axios.put(`${restUrl}/profile/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const deleteProfileByAdmin = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/profile/${id}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

export { getAllAccounts, updateProfileByAdmin, deleteProfileByAdmin }
