import express from "express";
import {
  getUser,
  getUserCommunities,
  addRemoveCommunities,
  getUserPosts,
  getUserUpVotes,
  getUserDownVotes,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUser);
router.get("/:id/communities", verifyToken, getUserCommunities);
router.get("/:id/getUserPosts", verifyToken, getUserPosts);
router.get("/:id/getUserUpvotes", verifyToken, getUserUpVotes);
router.get("/:id/getUserDownvotes", verifyToken, getUserDownVotes);

/* UPDATE */

router.patch("/:id/:communityId", verifyToken, addRemoveCommunities);

export default router;
