import { useQuery } from "react-query"
import { AllArticleAPI } from "../utils/api"

const useAllArticles = (page, limit) => {
    const query = useQuery({
        queryKey: ["allArticles"],
        queryFn: () => AllArticleAPI(page, limit),
    })

    return query
}

export default useAllArticles
