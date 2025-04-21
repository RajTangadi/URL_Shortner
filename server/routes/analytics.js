import express from "express";
const router = express.Router();
import {
  trackClick,
  getAnalytics,
} from "../controllers/analyticsController.js";

// Track click
router.post("/track/:shortUrl", trackClick);

// Get analytics data
router.get("/:shortUrl", getAnalytics);

export default router;
