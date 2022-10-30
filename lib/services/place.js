import axios from "config/axios"
const restUrl = "/api/v1"

const searchPlaces = async (body) => {
    try {
        const res = await axios.post(`${restUrl}/place/search`, body)
        return res.data
    } catch (error) {
        return error.response.data || error.response
    }
}

const getPlaceBySlug = async (slug) => {
    try {
        const res = await axios.get(`${restUrl}/place/${slug}`)
        return res.data
    } catch (error) {
        return error.response.data || error.response
    }
}

const updatePlaceById = async (id) => {
    try {
        const res = await axios.put(`${restUrl}/place/${id}`, null)
        return res.data
    } catch (error) {
        return error.response.data || error.response
    }
}

export { searchPlaces, getPlaceBySlug, updatePlaceById }
