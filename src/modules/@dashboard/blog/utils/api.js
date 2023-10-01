import axios from "../../../../configs/axios"

const postAPI = async (inputs) => {
    const response = await axios.post('/articles/create', inputs)
    return response?.data
}

const uploadAPI = async (inputs) => {
    const response = await axios.post('/articles/upload-image', inputs)
    return response?.data
}

const DeleteTagAPI = async (id) => {
    const response = await axios.delete(`/tags/delete/${id}`)
    return response?.data
}

const AllArticleAPI = async () => {
    const response = await axios.get('/articles/list?page=1&limit=100')
    return response?.data
}

export { postAPI, AllArticleAPI, DeleteTagAPI, uploadAPI }
