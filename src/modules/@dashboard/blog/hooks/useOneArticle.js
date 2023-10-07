import { useQuery } from "react-query"
import { ArticleAPI } from "../utils/api"
import { errorHandler } from "../../../../configs/errorConfigs"

const useOneArticle = (id) => {
    const query = useQuery({
        queryKey: ["article"],
        queryFn: () => ArticleAPI(id),
        onError: error => errorHandler(error)
    })

    return query
}

export default useOneArticle
