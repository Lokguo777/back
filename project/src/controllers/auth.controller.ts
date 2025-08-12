import { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { successResponse, errorResponse } from '@/utils/responses';
import { loginSchema, registerSchema } from '@/validators/auth.validator';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await AuthService.register(validatedData);
      
      return successResponse(res, result, 'User registered successfully', 201);
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse(res, error.message, 400);
      }
      return errorResponse(res, 'Registration failed');
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await AuthService.login(validatedData);
      
      return successResponse(res, result, 'Login successful');
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse(res, error.message, 401);
      }
      return errorResponse(res, 'Login failed');
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return errorResponse(res, 'User not found', 404);
      }

      const user = await AuthService.getUserById(req.user.id);
      if (!user) {
        return errorResponse(res, 'User not found', 404);
      }

      return successResponse(res, user, 'Profile retrieved successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to get profile');
    }
  }
} 