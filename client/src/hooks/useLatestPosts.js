import useSWR from "swr";
import axios from "axios";

const fetcher = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const useLatestPosts = (token) => {
  const fetchUrl = "http://localhost:3001/posts/getLatestPosts";

  const { data, error, isLoading, mutate } = useSWR(
    token ? fetchUrl : null,
    (url) => fetcher(url, token)
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useLatestPosts;
