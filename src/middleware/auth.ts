import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { unauthorizedResponse, forbiddenResponse } from '@/utils/responses';

export interface JwtPayload {
  id: number;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    unauthorizedResponse(res, 'Access token required');
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    unauthorizedResponse(res, 'Invalid or expired token');
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      unauthorizedResponse(res, 'Authentication required');
      return;
    }

    if (!roles.includes(req.user.role)) {
      forbiddenResponse(res, 'Insufficient permissions');
      return;
    }

    next();
  };
};

export const requireAdmin = requireRole(['admin']);
export const requireReviewer = requireRole(['admin', 'reviewer']);
export const requireUser = requireRole(['user', 'admin', 'reviewer']); 