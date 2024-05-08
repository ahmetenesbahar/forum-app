import useSWR from "swr";
import axios from "axios";
import usePosts from "./usePosts";
import useLatestPosts from "./useLatestPosts";
import { useCallback } from "react";

const useHandlePosts = (token) => {
  const { data: posts, mutate: mutatePosts } = usePosts(token);
  const { mutate: mutateLatestPosts } = useLatestPosts(token);

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
          mutateLatestPosts();
        }

        return response.data;
      } catch (error) {
        console.error("Post deletion failed:", error);
        throw error;
      }
    },
    [mutatePosts, token, mutateLatestPosts]
  );

  const handleUpVote = useCallback(
    async (postId, userId) => {
      try {
        const response = await axios.post();
      } catch (error) {
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token]
  );

  return { handleDelete };
};

export default useHandlePosts;
