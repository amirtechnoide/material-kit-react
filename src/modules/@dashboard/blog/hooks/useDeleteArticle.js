import { useMutation, useQueryClient } from "react-query"
import { DeleteArticleAPI } from "../utils/api"

const useDeleteArticle = (id) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: ["deleteArticle"],
        mutationFn: () => DeleteArticleAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["allArticles"])
        },
    })

    return mutation
}

export default useDeleteArticle
