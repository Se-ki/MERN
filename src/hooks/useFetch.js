import { useEffect, useState } from "react";

const useFetch = ({ url }) => {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // const fetchdata = async () => {
    //     const res = await fetch(url)
    //     const data = await res.json();
    //     if (!res.ok) throw Error("We're unable to connect you to the server! ")
    //     return data;
    // }

    useEffect(() => {
        setLoading(true);
        fetch(url).then(res => {
            // if (!res.ok) throw Error("We're unable to connect you to the server!")
            return res.json()
        }).then((data) => {
            setLoading(false)
            setData(data)
        }).catch((err) => {
            setLoading(false)
            setError(err.message)
        })
    }, [])

    return { data, setData, isLoading, error };
}

export default useFetch;