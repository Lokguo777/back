import { Request, Response } from 'express';
import { CarbonService } from '@/services/carbon.service';
import { successResponse, errorResponse, notFoundResponse } from '@/utils/responses';
import { createCarbonDataSchema, updateCarbonDataSchema } from '@/validators/carbon.validator';

export class CarbonController {
  static async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return errorResponse(res, 'User not authenticated', 401);
      }

      const validatedData = createCarbonDataSchema.parse(req.body);
      const carbonData = await CarbonService.create(validatedData, req.user.id);
      
      return successResponse(res, carbonData, 'Carbon data created successfully', 201);
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse(res, error.message, 400);
      }
      return errorResponse(res, 'Failed to create carbon data');
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'] || '0');
      const carbonData = await CarbonService.findById(id);
      
      if (!carbonData) {
        return notFoundResponse(res, 'Carbon data not found');
      }

      return successResponse(res, carbonData, 'Carbon data retrieved successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to get carbon data');
    }
  }

  static async getByUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        return errorResponse(res, 'User not authenticated', 401);
      }

      const carbonData = await CarbonService.findByUser(req.user.id);
      return successResponse(res, carbonData, 'Carbon data retrieved successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to get carbon data');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      if (!req.user) {
        return errorResponse(res, 'User not authenticated', 401);
      }

      const id = parseInt(req.params['id'] || '0');
      const validatedData = updateCarbonDataSchema.parse(req.body);
      const carbonData = await CarbonService.update(id, validatedData, req.user.id);
      
      if (!carbonData) {
        return notFoundResponse(res, 'Carbon data not found or not authorized');
      }

      return successResponse(res, carbonData, 'Carbon data updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse(res, error.message, 400);
      }
      return errorResponse(res, 'Failed to update carbon data');
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      if (!req.user) {
        return errorResponse(res, 'User not authenticated', 401);
      }

      const id = parseInt(req.params['id'] || '0');
      const carbonData = await CarbonService.delete(id, req.user.id);
      
      if (!carbonData) {
        return notFoundResponse(res, 'Carbon data not found or not authorized');
      }

      return successResponse(res, null, 'Carbon data deleted successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to delete carbon data');
    }
  }
} 