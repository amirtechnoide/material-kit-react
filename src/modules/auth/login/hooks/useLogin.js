import { useMutation } from 'react-query';
import { loginAPI } from "../utils/api";
import { errorHandler } from '../../../../configs/errorConfigs';

export const useLogin = () => { 
    const mutation = useMutation({
        mutationKey: 'login',
        mutationFn: loginAPI,
        onSuccess: (data) => {
            localStorage.setItem('token', data?.data?.token)
        },
        onError: (error) => {
            errorHandler(error)
        },
        
    })

    return mutation
}
