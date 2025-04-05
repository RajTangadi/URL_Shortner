import { Router } from "express";
const router = Router();
import {
  createShortUrl,
  getUrls,
} from "../controllers/url.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";

router.post("/shorten", verifyToken, createShortUrl);
router.get("/", verifyToken, getUrls);

export default router;
