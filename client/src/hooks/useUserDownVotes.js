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

const useUserDownVotes = (token, userId) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    userId ? `http://localhost:3001/users/${userId}/getUserDownvotes` : null,
    (url) => fetcher(url, token)
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUserDownVotes;
