import axios from "axios";
import usePosts from "./usePosts";
import useLatestPosts from "./useLatestPosts";
import useUserPosts from "./useUserPosts";
import useCommunity from "./useCommunity";
import usePost from "./usePost";
import { useCallback, useMemo } from "react";

const useHandlePosts = (token, post, userId) => {
  const { mutate: mutatePosts } = usePosts(token);
  const { mutate: mutateLatestPosts } = useLatestPosts(token);
  const { mutate: mutateUserPosts } = useUserPosts(token, userId);
  const { data: singlePost, mutate: mutatePost } = usePost(token, post?._id);

  const hasVoted = useMemo(() => {
    const voteType = singlePost?.votes
      .map((vote) => {
        if (vote.userId === userId) {
          return vote.type;
        }
      })
      .filter(Boolean)
      .join("");

    return voteType;
  }, [singlePost, userId]);

  const handleComment = useCallback(
    async (postId, userId, text) => {
      try {
        const response = await axios.patch(
          `http://localhost:3001/posts/${postId}/comment`,
          { userId, text },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          mutatePost();
          mutatePosts();
          mutateLatestPosts();
        }
        return response.data;
      } catch (error) {
        console.log("Commenting failed:", error);
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token, mutatePost]
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
          mutatePost();
          mutatePosts();
          mutateLatestPosts();
          mutateUserPosts();
        }

        return response.data;
      } catch (error) {
        console.log("Upvote failed:", error);
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token, mutatePost]
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
          mutatePost();
          mutatePosts();
          mutateLatestPosts();
          mutateUserPosts();
        }

        return response.data;
      } catch (error) {
        console.log("Upvote failed:", error);
        throw error;
      }
    },
    [mutateLatestPosts, mutatePosts, token, mutatePost]
  );

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
          mutatePost();
          mutatePosts();
          mutateLatestPosts();
          mutateUserPosts();
        }

        return response.data;
      } catch (error) {
        console.error("Post deletion failed:", error);
        throw error;
      }
    },
    [mutatePosts, token, mutateLatestPosts, mutatePost]
  );

  return {
    handleDelete,
    handleUpVote,
    handleDownVote,
    hasVoted,
    handleComment,
  };
};

export default useHandlePosts;
