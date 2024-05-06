import useSWR from "swr";
import axios from "axios";

const fetcher = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const useCommunities = () => {
  const fetchUrl = "http://localhost:3001/communities";

  const { data, error, isLoading, mutate } = useSWR(fetchUrl, (url) =>
    fetcher(url)
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCommunities;
