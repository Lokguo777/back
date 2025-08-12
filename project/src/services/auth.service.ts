import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hashPassword, comparePassword } from '@/utils/passwords';
import { env } from '@/config/env';
import { LoginInput, RegisterInput } from '@/validators/auth.validator';

export interface AuthResult {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

export class AuthService {
  static async register(input: RegisterInput): Promise<AuthResult> {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, input.email));
    
    if (existingUser.length > 0) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(input.password);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email: input.email,
        password: hashedPassword,
        name: input.name,
        role: input.role,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      });

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    return {
      user: newUser,
      token,
    };
  }

  static async login(input: LoginInput): Promise<AuthResult> {
    // Find user by email
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, input.email));

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await comparePassword(input.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  static async getUserById(id: number) {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id));

    return user;
  }
} 