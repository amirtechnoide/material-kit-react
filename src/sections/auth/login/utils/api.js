import axios from "../../../../configs/axios"

const loginAPI = async(inputs)=>{
  const response = await axios.post('/auth/login', inputs)
  return response?.data
}

export { loginAPI }
