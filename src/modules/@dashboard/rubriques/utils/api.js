import axios from "../../../../configs/axios"

const TagAPI = async (inputs) => {
    const response = await axios.post('/tags/create', inputs)
    return response?.data
}
const DeleteTagAPI = async (id) => {
    const response = await axios.delete(`/tags/delete/${id}`)
    return response?.data
}
const AllTagAPI = async (filter) => {
    const response = await axios.get('/tags/list')
    return response?.data
}

export { TagAPI, AllTagAPI, DeleteTagAPI }
