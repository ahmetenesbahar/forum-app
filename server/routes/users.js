import express from "express";
import {
  getUser,
  getUserCommunities,
  addRemoveCommunities,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUser);
router.get("/:id/communities", verifyToken, getUserCommunities);

/* UPDATE */

router.patch("/:id/:communityId", verifyToken, addRemoveCommunities);

export default router;
