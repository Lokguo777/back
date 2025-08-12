import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { carbonData, reviewHistory } from '@/db/schema';
import { ReviewCarbonDataInput } from '@/validators/carbon.validator';

export class ReviewService {
  static async reviewCarbonData(
    carbonDataId: number,
    reviewerId: number,
    input: ReviewCarbonDataInput
  ) {
    // Update carbon data status
    const [updatedData] = await db
      .update(carbonData)
      .set({
        status: input.status,
        reviewNotes: input.reviewNotes,
        reviewerId,
        updatedAt: new Date(),
      })
      .where(eq(carbonData.id, carbonDataId))
      .returning();

    // Create review history record
    await db.insert(reviewHistory).values({
      carbonDataId,
      reviewerId,
      action: input.status,
      notes: input.reviewNotes,
    });

    return updatedData;
  }

  static async getReviewHistory(carbonDataId: number) {
    const history = await db
      .select()
      .from(reviewHistory)
      .where(eq(reviewHistory.carbonDataId, carbonDataId));

    return history;
  }

  static async getPendingReviews() {
    const pendingData = await db
      .select()
      .from(carbonData)
      .where(eq(carbonData.status, 'pending'));

    return pendingData;
  }
} 