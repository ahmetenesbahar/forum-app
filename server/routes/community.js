import express from "express";
import { getCommunities, getCommunity } from "../controllers/community.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getCommunities);
router.get("/:id", verifyToken, getCommunity);

/*UPDATE*/

export default router;
