import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message: string = 'Error occurred',
  statusCode: number = 500,
  error?: string
): Response<ApiResponse> => {
  const response: ApiResponse = {
    success: false,
    message,
    ...(error && { error }),
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
};

export const validationErrorResponse = (
  res: Response,
  message: string = 'Validation error',
  errors?: any
): Response<ApiResponse> => {
  return errorResponse(res, message, 400, errors);
};

export const notFoundResponse = (
  res: Response,
  message: string = 'Resource not found'
): Response<ApiResponse> => {
  return errorResponse(res, message, 404);
};

export const unauthorizedResponse = (
  res: Response,
  message: string = 'Unauthorized'
): Response<ApiResponse> => {
  return errorResponse(res, message, 401);
};

export const forbiddenResponse = (
  res: Response,
  message: string = 'Forbidden'
): Response<ApiResponse> => {
  return errorResponse(res, message, 403);
}; 