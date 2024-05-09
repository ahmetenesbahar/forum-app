import useSWR from "swr";
import axios from "axios";
import usePosts from "./usePosts";
import useLatestPosts from "./useLatestPosts";
import { useCallback, useState } from "react";

const useHandlePosts = (token) => {
  const { mutate: mutatePosts } = usePosts(token);
  const { mutate: mutateLatestPosts } = useLatestPosts(token);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

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
          setUpVoted(!upVoted);
          setDownVoted(false);
          mutatePosts();
          mutateLatestPosts();
        }

        return response.data;
      } catch (error) {
        console.log("Upvote failed:", error);
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token, upVoted]
  );

  const handleDownVote = useCallback(
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
          setDownVoted(!downVoted);
          setUpVoted(false);
          mutatePosts();
          mutateLatestPosts();
        }

        return response.data;
      } catch (error) {
        console.log("Upvote failed:", error);
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token, downVoted]
  );

  return { handleDelete, handleUpVote, handleDownVote, upVoted, downVoted };
};

export default useHandlePosts;
