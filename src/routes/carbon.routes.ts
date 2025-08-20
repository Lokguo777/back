import { Router, Request, Response } from 'express';
import { eq, and, desc } from 'drizzle-orm';
import { db } from '@/db';
import { carbon } from '@/db/schema';
import { successResponse, errorResponse, notFoundResponse } from '@/utils/responses';
import { createCarbonDataSchema, updateCarbonDataSchema } from '@/validators/carbon.validator';
import { authenticateToken, requireUser } from '@/middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);
router.use(requireUser);

// Create carbon data
router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'User not authenticated', 401);
    }

    // 1. 數據驗證
    const validatedData = createCarbonDataSchema.parse(req.body);
    
    // 2. 創建碳排資料
    const [newData] = await db
      .insert(carbon)
      .values({
        userId: req.user.id,
        fuelName: validatedData.fuelName,
        consumption: validatedData.consumption,
        electricity: validatedData.electricity,
        coefficient: validatedData.coefficient,
      })
      .returning();

    return successResponse(res, newData, 'Carbon data created successfully', 201);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(res, error.message, 400);
    }
    return errorResponse(res, 'Failed to create carbon data', 500);
  }
});

// Get carbon data by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] || '0');
    
    // 查找碳排資料
    const [data] = await db
      .select()
      .from(carbon)
      .where(eq(carbon.id, id));

    if (!data) {
      return notFoundResponse(res, 'Carbon data not found');
    }

    return successResponse(res, data, 'Carbon data retrieved successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to get carbon data', 500);
  }
});

// Get user's carbon data
router.get('/my-data', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'User not authenticated', 401);
    }

    // 查找用戶的碳排資料
    const data = await db
      .select()
      .from(carbon)
      .where(eq(carbon.userId, req.user.id))
      .orderBy(desc(carbon.id));

    return successResponse(res, data, 'Carbon data retrieved successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to get carbon data', 500);
  }
});

// Update carbon data
router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'User not authenticated', 401);
    }

    const id = parseInt(req.params['id'] || '0');
    const validatedData = updateCarbonDataSchema.parse(req.body);
    
    // 更新碳排資料 (只能更新自己的資料)
    const [updatedData] = await db
      .update(carbon)
      .set({
        fuelName: validatedData.fuelName,
        consumption: validatedData.consumption,
        electricity: validatedData.electricity,
        coefficient: validatedData.coefficient,
      })
      .where(and(eq(carbon.id, id), eq(carbon.userId, req.user.id)))
      .returning();

    if (!updatedData) {
      return notFoundResponse(res, 'Carbon data not found or not authorized');
    }

    return successResponse(res, updatedData, 'Carbon data updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(res, error.message, 400);
    }
    return errorResponse(res, 'Failed to update carbon data', 500);
  }
});

// Delete carbon data
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'User not authenticated', 401);
    }

    const id = parseInt(req.params['id'] || '0');
    
    // 刪除碳排資料 (只能刪除自己的資料)
    const [deletedData] = await db
      .delete(carbon)
      .where(and(eq(carbon.id, id), eq(carbon.userId, req.user.id)))
      .returning();

    if (!deletedData) {
      return notFoundResponse(res, 'Carbon data not found or not authorized');
    }

    return successResponse(res, null, 'Carbon data deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete carbon data', 500);
  }
});

export default router; 