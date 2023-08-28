import { useState, useEffect } from "react";

const useApiFetcher = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try{    
            const response = await fetch(url)
            console.log(response)
            if(!response.ok) {

                throw new Error("Network request failed")
            }

            const jsonData = await response.json()
            console.log(jsonData)
            setData(jsonData)
            console.log(data)
        } catch(error) {
            setError(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    fetchData()
  },[url])

  return { data, error, loading };

};

export default useApiFetcher;