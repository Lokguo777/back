import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hashPassword, comparePassword } from '@/utils/passwords';
import { successResponse, errorResponse } from '@/utils/responses';
import { loginSchema, registerSchema } from '@/validators/auth.validator';
import { authenticateToken } from '@/middleware/auth';
import { env } from '@/config/env';

const router = Router();

// Register endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    // 1. 數據驗證
    const validatedData = registerSchema.parse(req.body);
    
    // 2. 檢查用戶是否已存在
    const existingUser = await db.select().from(users).where(eq(users.mail, validatedData.email));
    
    if (existingUser.length > 0) {
      return errorResponse(res, 'User with this email already exists', 400);
    }

    // 3. 加密密碼
    const hashedPassword = await hashPassword(validatedData.password);

    // 4. 創建用戶
    const [newUser] = await db
      .insert(users)
      .values({
        name: validatedData.name,
        password: hashedPassword,
        role: validatedData.role === 'user' ? '1' : validatedData.role === 'admin' ? '2' : '3',
        mail: validatedData.email,
        createTime: new Date(),
      })
      .returning({
        id: users.id,
        name: users.name,
        role: users.role,
        mail: users.mail,
      });

    if (!newUser) {
      return errorResponse(res, 'Failed to create user', 500);
    }

    // 5. 生成JWT token (使用any類型避免TypeScript問題)
    const payload = {
      id: newUser.id,
      email: newUser.mail,
      name: newUser.name,
      role: newUser.role,
    };
    const token = (jwt as any).sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

    return successResponse(res, { user: newUser, token }, 'User registered successfully', 201);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(res, error.message, 400);
    }
    return errorResponse(res, 'Registration failed', 500);
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    // 1. 數據驗證
    const validatedData = loginSchema.parse(req.body);
    
    // 2. 查找用戶
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        password: users.password,
        mail: users.mail,
      })
      .from(users)
      .where(eq(users.mail, validatedData.email));

    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // 3. 驗證密碼
    const isValidPassword = await comparePassword(validatedData.password, user.password);
    if (!isValidPassword) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // 4. 生成JWT token (使用any類型避免TypeScript問題)
    const payload = {
      id: user.id,
      email: user.mail,
      name: user.name,
      role: user.role,
    };
    const token = (jwt as any).sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

    const { password, ...userWithoutPassword } = user;

    return successResponse(res, { user: userWithoutPassword, token }, 'Login successful');
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(res, error.message, 401);
    }
    return errorResponse(res, 'Login failed', 500);
  }
});

// Get profile endpoint (protected)
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'User not found', 404);
    }

    // 查找用戶資料
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        mail: users.mail,
        createTime: users.createTime,
      })
      .from(users)
      .where(eq(users.id, req.user.id));

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, user, 'Profile retrieved successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to get profile', 500);
  }
});

export default router; 