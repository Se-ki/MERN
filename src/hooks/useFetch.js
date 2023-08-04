import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetch = ({ url }) => {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { author } = useAuthContext();

    const fetchdata = async () => {
        try {
            const response = await fetch(url, {
                headers: { "Authorization": `Bearer ${author.token}` }
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
                setLoading(false)
                return;
            }
            setData(json)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        setLoading(true);
        if (author) {
            fetchdata();
        }
    }, [])

    return { data, isLoading, error };
}

export default useFetch;