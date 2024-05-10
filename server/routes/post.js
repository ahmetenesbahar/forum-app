import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  upVote,
  downVote,
  getLatestPosts,
  deletePost,
  getSinglePost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/

router.get("/getPosts", verifyToken, getFeedPosts);
router.get("/:id/posts", verifyToken, getUserPosts); //! bir ara buradaki idyi username olarak değiştireceğim
router.get("/getLatestPosts", verifyToken, getLatestPosts);
router.get("/:id/getSinglePost", verifyToken, getSinglePost);

/*UPDATE*/
router.patch("/:id/upvote", verifyToken, upVote);
router.patch("/:id/downvote", verifyToken, downVote);

/*DELETE*/
router.delete("/:id/deletePost", verifyToken, deletePost);

export default router;
