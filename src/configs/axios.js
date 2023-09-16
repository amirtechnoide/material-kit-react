import Axios from "axios"
import { BASE_API_URL } from './baseUrl';

const axios = Axios.create({
  baseURL: BASE_API_URL,
})

const authRequestInterceptor = async (config) => {
  const token = localStorage.getItem("token")
  config.headers = { ...config.headers }

  if (token) {
    config.headers.Authorization = `Bearer ${ token }`
  }

  config.headers.Accept = "application/json"
  return config
}

axios.interceptors.request.use(authRequestInterceptor)

export default axios
