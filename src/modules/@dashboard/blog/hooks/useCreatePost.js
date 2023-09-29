import { useMutation, useQueryClient } from 'react-query';

import { postAPI } from '../utils/api';
import { errorHandler } from '../../../../configs/errorConfigs';

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: 'createPost',
        mutationFn: postAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["allArticles"])
        },
        onError: (error) => {
            errorHandler(error)
        },

    })

    return mutation
}
