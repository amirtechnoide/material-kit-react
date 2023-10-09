import { useQuery } from "react-query"
import { statisticsApi } from "../utils/api"

const useStats = () => {
    const query = useQuery({
        // cacheTime: Infinity,
        // staleTime: Infinity,
        queryKey: ["statistics"],
        queryFn: statisticsApi,
    })

    return query
}

export default useStats
