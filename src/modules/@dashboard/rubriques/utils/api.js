import axios from "../../../../configs/axios"

const RubriqueAPI = async (inputs) => {
    const response = await axios.post('/rubriques/create', inputs)
    return response?.data
}

const AllRubriqueApi = async (filter) => {
    const response = await axios.get('/rubriques/list')
    return response?.data
}

export { AllRubriqueApi, RubriqueAPI }
