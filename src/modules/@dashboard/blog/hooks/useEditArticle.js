import { useMutation, useQueryClient } from 'react-query';

import { EditArticleAPI } from '../utils/api';
import { errorHandler } from '../../../../configs/errorConfigs';

export const useEditArticle = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: 'editArticle',
        mutationFn: EditArticleAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["allArticles","editArticle"])
        },
        onError: (error) => {
            errorHandler(error)
        },

    })

    return mutation
}
