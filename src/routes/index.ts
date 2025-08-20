import { Router } from 'express';
import authRoutes from './auth.routes';
import carbonRoutes from './carbon.routes';
import adminRoutes from './admin.routes';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/carbon', carbonRoutes);
router.use('/admin', adminRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router; 