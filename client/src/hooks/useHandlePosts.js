import useSWR from "swr";
import axios from "axios";
import usePosts from "./usePosts";
import useLatestPosts from "./useLatestPosts";
import usePost from "./usePost";
import { useCallback, useMemo } from "react";

const useHandlePosts = (token) => {
  const { mutate: mutatePosts } = usePosts(token);
  const { mutate: mutateLatestPosts } = useLatestPosts(token);
  // const { data: singlePost, mutate: mutatePost } = usePost(token, post._id);

  const hasVoted = useMemo(() => {});

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
        const response = await axios.patch(
          `http://localhost:3001/posts/${postId}/upvote`,
          { userId },
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
        console.log("Upvote failed:", error);
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token]
  );

  const handleDownVote = useCallback(
    async (postId, userId) => {
      try {
        const response = await axios.patch(
          `http://localhost:3001/posts/${postId}/downvote`,
          { userId },
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
        console.log("Upvote failed:", error);
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token]
  );

  return { handleDelete, handleUpVote, handleDownVote };
};

export default useHandlePosts;
