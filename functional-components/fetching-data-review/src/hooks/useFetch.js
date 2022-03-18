import axios from "axios";
import { useEffect, useState, useReducer } from "react";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Invalid action for data fetch reducer");
  }
};

export const useFetch = (initUrl, method = "get") => {
  const [url, setUrl] = useState(initUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios[method](url);
        if (mounted) dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        if (mounted) dispatch({ type: "FETCH_FAILURE", payload: err });
      }
    };
    fetchData();
    return function cleanup() {
      mounted = false;
    };
  }, [url, method]);

  return [state, setUrl];
};
