import express from "express";
import {
  getUser,
  getUserCategories,
  addRemoveCategories,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUser);
router.get("/:id/categories", verifyToken, getUserCategories);

/* UPDATE */

router.patch("/:id/:categorieId", verifyToken, addRemoveCategories);

export default router;
