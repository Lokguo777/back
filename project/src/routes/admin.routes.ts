import { Router } from 'express';
import { AdminController } from '@/controllers/admin.controller';
import { authenticateToken, requireReviewer } from '@/middleware/auth';

const router = Router();

// All routes require authentication and reviewer/admin role
router.use(authenticateToken);
router.use(requireReviewer);

// Admin/reviewer routes
router.get('/pending-reviews', AdminController.getPendingReviews);
router.post('/review/:id', AdminController.reviewCarbonData);
router.get('/review-history/:id', AdminController.getReviewHistory);

export default router; 