import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (initUrl, method = "get") => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await axios[method](url);
        setData(result.data);
        setError(null);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method]);

  return [{ data, isLoading, error }, setUrl];
};
