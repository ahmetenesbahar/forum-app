import express from "express";
import { searchAll } from "../controllers/search.js";

const router = express.Router();

/*READ*/
router.get("/", searchAll);
/*UPDATE*/

export default router;
