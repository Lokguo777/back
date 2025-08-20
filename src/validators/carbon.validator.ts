import { z } from 'zod';

export const createCarbonDataSchema = z.object({
  fuelName: z.string().min(1, 'Fuel name is required').max(255, 'Fuel name too long'),
  consumption: z.number().positive('Consumption must be positive'),
  electricity: z.number().optional(),
  coefficient: z.number().positive('Coefficient must be positive'),
});

export const updateCarbonDataSchema = createCarbonDataSchema.partial();

export const carbonDataQuerySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type CreateCarbonDataInput = z.infer<typeof createCarbonDataSchema>;
export type UpdateCarbonDataInput = z.infer<typeof updateCarbonDataSchema>;
export type CarbonDataQueryInput = z.infer<typeof carbonDataQuerySchema>; 