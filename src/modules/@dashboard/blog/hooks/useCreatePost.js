import { useMutation } from 'react-query';

import { postAPI } from '../utils/api';
import { errorHandler } from '../../../../configs/errorConfigs';

export const useCreatePost = () => {

    const mutation = useMutation({
        mutationKey: 'createPost',
        mutationFn: postAPI,

        onError: (error) => {
            errorHandler(error)
        },

    })

    return mutation
}
