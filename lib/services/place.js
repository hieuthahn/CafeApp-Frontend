import axios from "config/axios"
const restUrl = "/api/v1"

const searchPlaces = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/place/search`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const getPlaceBySlug = async (slug) => {
    try {
        const res = await axios.get(`${restUrl}/place/${slug}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const updatePlaceById = async (id) => {
    try {
        const res = await axios.put(`${restUrl}/place/${id}`, null)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const submitPlace = async (formData) => {
    try {
        const res = await axios.post(`${restUrl}/place`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res
    } catch (error) {
        return error.response.data
    }
}

const updatePlace = async (id, formData) => {
    try {
        const res = await axios.put(`${restUrl}/place/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res
    } catch (error) {
        return error.response.data
    }
}

const deletePlaceById = async (id) => {
    try {
        const res = await axios.delete(`${restUrl}/place/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export {
    searchPlaces,
    getPlaceBySlug,
    updatePlaceById,
    submitPlace,
    updatePlace,
    deletePlaceById,
}
