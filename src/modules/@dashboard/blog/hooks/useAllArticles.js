import { useQuery } from "react-query"
import { AllArticleAPI } from "../utils/api"

const useAllArticles = () => {
    const query = useQuery({
        queryKey: ["allArticles"],
        queryFn: AllArticleAPI,
    })

    return query
}

export default useAllArticles
