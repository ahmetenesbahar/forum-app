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

const usePost = (token, postId) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    postId ? `http://localhost:3001/posts/${postId}/getSinglePost` : null,
    (url) => fetcher(url, token)
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
