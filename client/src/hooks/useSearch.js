import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const useSearch = (parameter) => {
  const fetchUrl = `http://localhost:3001/search?query=${encodeURIComponent(
    parameter
  )}`;
  const { data, error, isValidating, mutate } = useSWR(fetchUrl, fetcher);

  return {
    data,
    error,
    isValidating,
    mutate,
  };
};

export default useSearch;
