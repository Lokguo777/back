import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/responses';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error in development
  if (process.env['NODE_ENV'] === 'development') {
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      body: req.body,
      user: req.user,
    });
  }

  errorResponse(res, message, statusCode, process.env['NODE_ENV'] === 'development' ? err.stack : undefined);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 