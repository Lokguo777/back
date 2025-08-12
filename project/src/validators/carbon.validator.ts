import { z } from 'zod';

export const createCarbonDataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().optional(),
  carbonAmount: z.number().positive('Carbon amount must be positive'),
  unit: z.string().default('kg'),
  category: z.enum(['transport', 'energy', 'waste', 'water', 'other']),
  date: z.string().datetime('Invalid date format'),
});

export const updateCarbonDataSchema = createCarbonDataSchema.partial();

export const reviewCarbonDataSchema = z.object({
  status: z.enum(['approved', 'rejected', 'request_changes']),
  reviewNotes: z.string().optional(),
});

export const carbonDataQuerySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  category: z.enum(['transport', 'energy', 'waste', 'water', 'other']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type CreateCarbonDataInput = z.infer<typeof createCarbonDataSchema>;
export type UpdateCarbonDataInput = z.infer<typeof updateCarbonDataSchema>;
export type ReviewCarbonDataInput = z.infer<typeof reviewCarbonDataSchema>;
export type CarbonDataQueryInput = z.infer<typeof carbonDataQuerySchema>; 