import express from 'express';
import { redirectShortUrl } from '../controllers/url.controller.js';

const router = express.Router();

// Public redirect route
router.get('/:shortCode', redirectShortUrl);

export default router;
