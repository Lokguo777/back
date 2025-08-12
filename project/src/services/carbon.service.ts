import { eq, and, desc } from 'drizzle-orm';
import { db } from '@/db';
import { carbonData } from '@/db/schema';
import { CreateCarbonDataInput, UpdateCarbonDataInput } from '@/validators/carbon.validator';

export class CarbonService {
  static async create(data: CreateCarbonDataInput, userId: number) {
    const [newData] = await db
      .insert(carbonData)
      .values({
        ...data,
        carbonAmount: data.carbonAmount.toString(),
        userId,
        date: new Date(data.date),
      })
      .returning();

    return newData;
  }

  static async findById(id: number) {
    const [data] = await db
      .select()
      .from(carbonData)
      .where(eq(carbonData.id, id));

    return data || null;
  }

  static async findByUser(userId: number) {
    const data = await db
      .select()
      .from(carbonData)
      .where(eq(carbonData.userId, userId))
      .orderBy(desc(carbonData.createdAt));

    return data;
  }

  static async update(id: number, data: UpdateCarbonDataInput, userId: number) {
    const { carbonAmount, ...restData } = data;
    const [updatedData] = await db
      .update(carbonData)
      .set({
        ...restData,
        ...(carbonAmount && { carbonAmount: carbonAmount.toString() }),
        updatedAt: new Date(),
      })
      .where(and(eq(carbonData.id, id), eq(carbonData.userId, userId)))
      .returning();

    return updatedData;
  }

  static async delete(id: number, userId: number) {
    const [deletedData] = await db
      .delete(carbonData)
      .where(and(eq(carbonData.id, id), eq(carbonData.userId, userId)))
      .returning();

    return deletedData;
  }
} 