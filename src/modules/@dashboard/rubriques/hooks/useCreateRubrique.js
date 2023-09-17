import { useMutation, useQueryClient } from 'react-query';

import { RubriqueAPI } from '../utils/api';
import { errorHandler } from '../../../../configs/errorConfigs';

export const useCreateRubrique = () => {

    const mutation = useMutation({
        mutationKey: 'createRubrique',
        mutationFn: RubriqueAPI,

        // onError: (error) => {
        //     errorHandler(error)
        // },

    })

    return mutation
}
