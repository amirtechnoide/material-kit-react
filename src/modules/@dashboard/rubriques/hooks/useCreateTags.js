import { useMutation, useQueryClient } from 'react-query';

import { TagAPI } from '../utils/api';
import { errorHandler } from '../../../../configs/errorConfigs';

export const useCreateTags = () => {

    const mutation = useMutation({
        mutationKey: 'createTags',
        mutationFn: TagAPI,

        // onError: (error) => {
        //     errorHandler(error)
        // },

    })

    return mutation
}
