import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  upVote,
  downVote,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/

router.get("/", verifyToken, getFeedPosts);
router.get("/username/posts", verifyToken, getUserPosts);

/*UPDATE*/
router.patch("/:id/upvote", verifyToken, upVote);
router.patch("/:id/downvote", verifyToken, downVote);

export default router;
