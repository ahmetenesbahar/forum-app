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

const useCommunity = (token, communityId) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    communityId ? `http://localhost:3001/communities/${communityId}` : null,
    (url) => fetcher(url, token)
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCommunity;
