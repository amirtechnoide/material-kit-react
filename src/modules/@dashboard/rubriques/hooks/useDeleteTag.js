import { useMutation, useQueryClient } from "react-query"
import { DeleteTagAPI } from "../utils/api"

const useDeleteTag = (id) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        // cacheTime: Infinity,
        // staleTime: Infinity,
        mutationKey: ["allTags"],
        mutationFn: () => DeleteTagAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["allTags"])
        },
    })

    return mutation
}

export default useDeleteTag
