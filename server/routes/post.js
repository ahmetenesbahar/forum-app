import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  upVote,
  downVote,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/

router.get("/getPosts", verifyToken, getFeedPosts);
router.get("/:id/posts", verifyToken, getUserPosts); //! bir ara buradaki idyi username olarak değiştireceğim

/*UPDATE*/
router.patch("/:id/upvote", verifyToken, upVote);
router.patch("/:id/downvote", verifyToken, downVote);

export default router;
