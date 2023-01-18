import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_API_URL } from "../constants";

const useFetch = (uri, params = null, fetchOnMount = true, initialData = null, callback = null) => {

  params = { api_key: "1fc89cfcfd77b6ec5f1b735bce27dc4a", ...params };

  const ignore = useRef(false);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const queryString = JSON.stringify(params || {});

  const handleFetch = useCallback(() => {
    setLoading(true);
    setError(null);

    window.axios.get(BASE_API_URL + uri, { params })
      .then((response) => {
        if (!ignore.current) {
          setData(callback ? callback(response) : response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!ignore.current) {
          setLoading(false);
          setError(error);
        }
      });
  }, [uri, queryString]);

  useEffect(() => {
    ignore.current = false;
    if (fetchOnMount) {
      handleFetch();
    }

    return () => {
      ignore.current = true;
    };
  }, [handleFetch]);

  return { data, loading, error, handleFetch, setData, setError };
};

export default useFetch;
