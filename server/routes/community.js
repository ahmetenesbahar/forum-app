import express from "express";
import { getCommunities } from "../controllers/community.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getCommunities);
/*UPDATE*/

export default router;
