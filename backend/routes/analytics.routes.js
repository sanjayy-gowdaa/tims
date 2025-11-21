import express from 'express';
import {
  getDashboardStats,
  getTicketStats,
  getAgentPerformance,
  getCategoryStats,
} from '../controllers/analytics.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/tickets', authorize('manager', 'admin'), getTicketStats);
router.get('/agents', authorize('manager', 'admin'), getAgentPerformance);
router.get('/categories', authorize('manager', 'admin'), getCategoryStats);

export default router;
