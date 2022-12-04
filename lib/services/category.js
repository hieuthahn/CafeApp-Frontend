import axios from 'config/axios'
const restUrl = '/api/v1'
const getRegions = async () => {
    try {
        const res = await axios.get(`${restUrl}/region`)
        return res.data
    } catch (error) {
        return error?.response?.data || error
    }
}

const getPurposes = async () => {
    try {
        const res = await axios.get(`${restUrl}/purpose`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const getTags = async () => {
    try {
        const res = await axios.get(`${restUrl}/tag`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const getBenefits = async () => {
    try {
        const res = await axios.get(`${restUrl}/benefit`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const createRegion = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/region`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}
const createTag = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/tag`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}
const createPurpose = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/purpose`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const createBenefit = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/benefit`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const updateRegion = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/region/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const updateTag = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/tag/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const updatePurpose = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/purpose/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const updateBenefit = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/benefit/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const deleteRegion = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/region/${id}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const deleteTag = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/tag/${id}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const deletePurpose = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/purpose/${id}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const deleteBenefit = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/benefit/${id}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

export {
    getRegions,
    getPurposes,
    getTags,
    getBenefits,
    createRegion,
    createTag,
    createPurpose,
    createBenefit,
    updateRegion,
    updateTag,
    updatePurpose,
    updateBenefit,
    deleteRegion,
    deleteTag,
    deletePurpose,
    deleteBenefit,
}
