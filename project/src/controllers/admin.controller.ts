import { Request, Response } from 'express';
import { ReviewService } from '@/services/review.service';
import { successResponse, errorResponse, notFoundResponse } from '@/utils/responses';
import { reviewCarbonDataSchema } from '@/validators/carbon.validator';

export class AdminController {
  static async getPendingReviews(_req: Request, res: Response) {
    try {
      const pendingReviews = await ReviewService.getPendingReviews();
      return successResponse(res, pendingReviews, 'Pending reviews retrieved successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to get pending reviews');
    }
  }

  static async reviewCarbonData(req: Request, res: Response) {
    try {
      if (!req.user) {
        return errorResponse(res, 'User not authenticated', 401);
      }

      const carbonDataId = parseInt(req.params['id'] || '0');
      const validatedData = reviewCarbonDataSchema.parse(req.body);
      
      const reviewedData = await ReviewService.reviewCarbonData(
        carbonDataId,
        req.user.id,
        validatedData
      );

      if (!reviewedData) {
        return notFoundResponse(res, 'Carbon data not found');
      }

      return successResponse(res, reviewedData, 'Carbon data reviewed successfully');
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse(res, error.message, 400);
      }
      return errorResponse(res, 'Failed to review carbon data');
    }
  }

  static async getReviewHistory(req: Request, res: Response) {
    try {
      const carbonDataId = parseInt(req.params['id'] || '0');
      const history = await ReviewService.getReviewHistory(carbonDataId);
      
      return successResponse(res, history, 'Review history retrieved successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to get review history');
    }
  }
} 