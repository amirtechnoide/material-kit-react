import { useMutation } from 'react-query';

import { uploadAPI } from '../utils/api';
import { errorHandler } from '../../../../configs/errorConfigs';

export const useUploadImage = () => {

    const mutation = useMutation({
        mutationKey: 'uploadImage',
        mutationFn: uploadAPI,

        onError: (error) => {
            errorHandler(error)
        },

    })

    return mutation
}
