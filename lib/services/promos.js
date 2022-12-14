import axios from 'config/axios'
const restUrl = '/api/v1'

const getPromos = async (page, pageSize) => {
    try {
        const res = await axios.get(`${restUrl}/promos`, {
            params: {
                page,
                pageSize: pageSize,
            },
        })
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const getPromosByUserId = async (page, pageSize) => {
    try {
        const res = await axios.get(`${restUrl}/promos`, {
            params: {
                page,
                pageSize: pageSize,
            },
        })
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const createPromos = async (formData) => {
    try {
        const res = await axios.post(`${restUrl}/promos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const deletePromosById = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/promos/${id}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const updatePromote = async (id, formData, filesRemove) => {
    try {
        const res = await axios.put(`${restUrl}/promos/${id}`, formData, {
            params: {
                files: filesRemove,
            },
        })
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

export {
    getPromos,
    createPromos,
    getPromosByUserId,
    deletePromosById,
    updatePromote,
}
