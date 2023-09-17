import { useQuery } from "react-query"
import { AllRubriqueApi } from "../utils/api"

const useAllRubriques = () => {
    const query = useQuery({
        // cacheTime: Infinity,
        // staleTime: Infinity,
        queryKey: ["allRubriques"],
        queryFn: AllRubriqueApi,
    })

    return query
}

export default useAllRubriques
