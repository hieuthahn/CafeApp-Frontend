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

export { searchPlaces }
