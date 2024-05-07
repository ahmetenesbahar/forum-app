import useSWR from "swr";
import axios from "axios";
import usePosts from "./usePosts";
import { useCallback } from "react";

const useHandlePosts = (token) => {
  const { data: posts, mutate: mutatePosts } = usePosts(token);

  const handleDelete = useCallback(
    async (postId) => {
      try {
        const response = await axios.delete(
          `http://localhost:3001/posts/${postId}/deletePost`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          mutatePosts();
        }

        return response.data;
      } catch (error) {
        console.error("Post deletion failed:", error);
        throw error;
      }
    },
    [mutatePosts, token]
  );

  return { handleDelete };
};

export default useHandlePosts;
