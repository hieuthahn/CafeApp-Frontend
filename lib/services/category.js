import axios from "config/axios"
const restUrl = "/api/v1"
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
        return error.response.data
    }
}

const getTags = async () => {
    try {
        const res = await axios.get(`${restUrl}/tag`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const getBenefits = async () => {
    try {
        const res = await axios.get(`${restUrl}/benefit`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const createRegion = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/region`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
const createTag = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/tag`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
const createPurpose = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/purpose`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const createBenefit = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/benefit`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const updateRegion = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/region/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const updateTag = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/tag/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const updatePurpose = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/purpose/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const updateBenefit = async (body, id) => {
    try {
        const res = await axios.put(`${restUrl}/benefit/${id}`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const deleteRegion = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/region/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const deleteTag = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/tag/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const deletePurpose = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/purpose/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const deleteBenefit = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/benefit/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
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
