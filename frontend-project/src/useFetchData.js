import axios from "axios";
import { useState, useEffect } from "react";

const useFetchData = (requestConfig) => {
  const [requestState, setRequestState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRequestState({
          ...requestState,
          loading: true,
        });

        const response = await axios(requestConfig);

        setRequestState({
          ...requestState,
          data: response.data,
          loading: false,
        });
      } catch (err) {
        setRequestState({
          ...requestState,
          loading: false,
          error: err,
        });
      }
    };

    fetchData();
  }, []);

  return requestState;
};

export default useFetchData;
