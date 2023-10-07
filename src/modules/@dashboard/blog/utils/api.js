import axios from "../../../../configs/axios"

const postAPI = async (inputs) => {
    const response = await axios.post('/articles/create', inputs)
    return response?.data
}

const uploadAPI = async (inputs) => {
    const response = await axios.post('/articles/upload-image', inputs, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return response?.data
}

const DeleteArticleAPI = async (id) => {
    const response = await axios.delete(`/articles/delete/${id}`)
    return response?.data
}

const EditArticleAPI = async (inputs) => {
    const response = await axios.patch(`/articles/update/${inputs?.id}`, inputs?.datas)
    return response?.data
}

const AllArticleAPI = async (page, limit) => {
    const response = await axios.get(`/articles/list?page=${ page + 1 }&limit=${ limit }`)
    return response?.data
}

const ArticleAPI = async (id) => {
    const response = await axios.get(`/articles/display/${ id }`)
    return response?.data
}

export { postAPI, AllArticleAPI, uploadAPI, DeleteArticleAPI, ArticleAPI, EditArticleAPI }
