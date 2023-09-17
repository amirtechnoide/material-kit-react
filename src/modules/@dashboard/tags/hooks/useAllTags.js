import { useQuery } from "react-query"
import { AllTagAPI } from "../utils/api"

const useAllTags = () => {
    const query = useQuery({
        // cacheTime: Infinity,
        // staleTime: Infinity,
        queryKey: ["allTags"],
        queryFn: AllTagAPI,
    })

    return query
}

export default useAllTags
