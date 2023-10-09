import axios from "../../../../../configs/axios"


export const statisticsApi = async () => {
    const response = await axios.get(`/statistics/articles/stats`)
    return response?.data
}