import axios from "config/axios"
const restUrl = "/api/v1"

const getReviews = async (placeId, page, pageSize) => {
    try {
        const res = await axios.get(`${restUrl}/review/${placeId}`, {
            params: {
                page,
                pageSize: pageSize,
            },
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const createReview = async (formData) => {
    try {
        const res = await axios.post(`${restUrl}/review`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export { getReviews, createReview }
