import axios from 'config/axios'
const restUrl = '/api/v1'

const getLikeByPlaceId = async (placeId) => {
    try {
        const res = await axios.get(`${restUrl}/like/${placeId}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const getLikeByUserId = async () => {
    try {
        const res = await axios.get(`${restUrl}/like`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

const likePlace = async (placeId) => {
    try {
        const res = await axios.post(`${restUrl}/like/${placeId}`)
        return res.data
    } catch (error) {
        return error.response.data || error.message || error
    }
}

export { getLikeByPlaceId, likePlace, getLikeByUserId }
