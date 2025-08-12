import { Router } from 'express';
import { CarbonController } from '@/controllers/carbon.controller';
import { authenticateToken, requireUser } from '@/middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);
router.use(requireUser);

// Carbon data CRUD operations
router.post('/', CarbonController.create);
router.get('/my-data', CarbonController.getByUser);
router.get('/:id', CarbonController.getById);
router.put('/:id', CarbonController.update);
router.delete('/:id', CarbonController.delete);

export default router; 